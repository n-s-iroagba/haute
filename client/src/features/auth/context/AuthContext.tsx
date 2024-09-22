import React, {
  createContext,
  useState,
  ReactNode,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

import { doPasswordsMatch } from "../utils/utils";
import { postChangePasswordData, postData } from "../../../common/utils/apiUtils";
import {
  AdminData,
  AuthContextType,
  InvestorData,
  LoginData,
  NewPasswordData,
  DecodedChangePasswordToken,
  Role,
} from "../types/authTypes";
import { loginUrl, newPasswordRoute } from "../../../constants/constants";
import { extractErrorCode } from "../../../common/utils/utils";

import { decodeChangePasswordToken, getLoginDecodedToken } from "../helpers/helper";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {

  const [passwordValidityMessage, setPasswordValidityMessage] = useState<
    string[]
  >([]);
  const [passwordType, setPasswordType] = useState<string>("password");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isMatchingPassword, setIsMatchingPassword] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<AdminData>({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    secretCode: "",
  });
  const [investorData, setInvestorData] = useState<InvestorData>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    bank: "",
    referralCode: "",
  });
  const [newPasswordData, setNewPasswordData] = useState<NewPasswordData>({
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState<LoginData>({
    password: "",
    email: "",
  });

  const handleSubmit = async (
    data: AdminData | InvestorData,
    event: FormEvent<HTMLFormElement>,
    domain: string,
    navigate:(path:string)=>void
  ) => {
    event.preventDefault();
    console.log(data)
    const form = event.currentTarget;
    const secretCodeMatch =
      "secretCode" in data
        ? data.secretCode === process.env.REACT_APP_ADMIN_SECRET_KEY
        : true;
    setValidated(true)
    if (!("secretCode" in data) && investorData.dateOfBirth === "") {
      setErrorMessage('Date of birth field is required');
      return;
    }
    
    if (
      form.checkValidity() === false ||
      passwordValidityMessage.length ||
      !isMatchingPassword ||
      !secretCodeMatch

    ) {
  
      if ("secretCode" in data && !secretCodeMatch) {
        setErrorMessage("The secret code provided is wrong.");
      }else{
        setErrorMessage("Please fill in all fields and ensure passwords match.");
      }

      return;
    }

    setSubmitting(true);
    try {
      const response = await postData(domain, data);
      if (response.status === 201) {
       handleEmailVerification(response,false,navigate)
      }
      if (response.status === 409) {
        setErrorMessage("This email is already registered");
        return;
      } else {
        setErrorMessage("Something went wrong, please try again later");
      }
    } catch (error: any) {
      console.error(error);
      const code = extractErrorCode(error.message);
      if (code === 409) {
      setErrorMessage('user with this email already exists')
       }else{
        setErrorMessage('Our server is currently down. Please try again later.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  function handleEmailVerification(response: any,shouldReload:boolean=false,navigate:(path:string)=>void): void {
    localStorage.setItem(
        "cassockEmailVerificationToken",
        JSON.stringify(response.data)
       
    );
    console.log(response)
    shouldReload?window.location.reload(): navigateToVerifyEmailPage(navigate);
}
  const handleChange = (
    data: AdminData | InvestorData | NewPasswordData,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: Dispatch<
      SetStateAction<AdminData | InvestorData | NewPasswordData>
    >
  ) => {
    e.preventDefault();
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
    if (
      e.target.name === 'password'
    ) {
      validatePassword(e.target.value);
    }
  };

  const validatePassword = (password: string) => {
    const tempPasswordState: string[] = [];
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const length = password.length;

    if (!hasNumber) tempPasswordState.push("no number in password provided");
    if (!hasUppercase)
      tempPasswordState.push("no uppercase letter in password provided");
    if (!hasLowercase)
      tempPasswordState.push("no lowercase letter in password provided");
    if (length < 8)
      tempPasswordState.push("password is less than 8 characters");

    setPasswordValidityMessage(tempPasswordState);
  };

  const handleConfirmPasswordsChange = (
    data: AdminData | InvestorData | NewPasswordData,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: Dispatch<
      SetStateAction<AdminData | InvestorData | NewPasswordData>
    >
  ) => {
    handleChange(data, e, setState);
    setIsMatchingPassword(doPasswordsMatch(data.password, e.target.value));
  };

  const showPassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmitForChangePassword = async (
    data: NewPasswordData,
    event: FormEvent<HTMLFormElement>,
    navigate:(path:string)=>void
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(false);


    if (
      form.checkValidity() === false ||
      passwordValidityMessage.length ||
      !isMatchingPassword
    ) {
      return;
    }

    const token = localStorage.getItem("cassockChangePasswordToken");
    const decodedToken = getIdFromChangePasswordToken(token)

    if (
      decodedToken && token
    ){
      
      setSubmitting(true);
    }else{
      setErrorMessage('Your are not authorised to make this request')
      return;
    }
 
    try {
      const response = await postChangePasswordData(
        `${newPasswordRoute}/${decodedToken.id}`,
        {password:data.password},
        token
      );
      if (response.status === 200) {
        localStorage.setItem("cassockJwtToken", JSON.stringify(response.data));
        navigate(
          decodedToken.role === Role.ADMIN ? "/admin/dashboard" : "/dashboard"
        );
      }
    } catch (error: any) {
      console.error(error);
      alert("An error occurred, kindly try again later");
    } finally {
      setSubmitting(false);
    }
  };

  const getIdFromChangePasswordToken = (token: string | null): DecodedChangePasswordToken|null => {
    let decodedToken: DecodedChangePasswordToken | null = token
      ? decodeChangePasswordToken(token)
      : null;

    if (
      !token || !decodedToken
    ) {
      setErrorMessage("You are not authorized to make this request");
    }
    return decodedToken
  }

  const setReferralToken = (token: string) => {
    setInvestorData((prevState) => ({
      ...prevState,
      referralCode: token,
    }));
  };

const handleChangeForLogin =(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
  setLoginData((prevState) => ({
   ...prevState,
    [e.target.name]: e.target.value,
  }));
}
  
  const handleSubmitForLogin = async ( event: FormEvent<HTMLFormElement>,navigate:(path:string)=>void) =>{
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);
    
    if (form.checkValidity() === false) {
      setErrorMessage('Please fill in all fields.');
      event.stopPropagation();
      return;
    }
    setSubmitting(true)
    try {
      const response = await postData(loginUrl, loginData);
      handleLoginResponse(response,navigate);
    } catch (error) {
      handleLoginError(error);
    } finally {
      setSubmitting(false);
    }
  };

const handleLoginResponse = (response: any, navigate: (path: string) => void) => {
    if (response.status === 200) {
      handleSuccessfulLogin(response.data,navigate);
    }
    else if (response.status === 201) {
      handleEmailVerification(response,false,navigate);
    }
  };

  const handleSuccessfulLogin = (token:string,navigate:(path:string)=>void) => {
    localStorage.setItem('cassockJwtToken', JSON.stringify(token));
    const role  = getLoginDecodedToken()?.role
    const destination = role === Role.INVESTOR ? '/dashboard' : '/admin/dashboard';
    navigate(destination);
  };
  
  const handleLoginError = (error:any) => {
    console.error(error);
    const code = extractErrorCode(error.message);
    
    if (code === 403) {
      setErrorMessage('Invalid password.');
    } else if (code === 404) {
      setErrorMessage('You are not yet registered on our platform.');
    } else {
      setErrorMessage('Our server is currently down. Please try again later.');
    }
  };

  const navigateToVerifyEmailPage = (navigate:(path:string)=>void) => {
    navigate('/verify-email')
  }
  
  const authContextValue: AuthContextType = {
    setAdminData,
    adminData,
    submitting,
    handleSubmitForLogin,
    loginData,
    errorMessage,
    setErrorMessage,
    validated,
    setValidated,
    handleConfirmPasswordsChange,
    isMatchingPassword,
    showPassword,
    handleSubmit,
    handleChange,
    passwordType,
    passwordValidityMessage,
    setInvestorData,
    investorData,
    newPasswordData,
    setReferralToken,
    setNewPasswordData,
    handleSubmitForChangePassword,
    handleChangeForLogin,
    handleEmailVerification
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
