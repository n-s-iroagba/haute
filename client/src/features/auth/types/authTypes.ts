

export interface AdminData {
    name: string;
    password: string;
    confirmPassword: string;
    email: string;
    secretCode: string;
  }

  export interface InvestorData {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
    dateOfBirth: string;
    gender:string;
    country:string
    bank:string;
    referralCode:string
  }
export interface NewPasswordData{
  password: string;
  confirmPassword: string;
}
export interface LoginData{
  password: string;
  email: string;
}
export interface AuthContextType {
    adminData:AdminData
    newPasswordData:NewPasswordData,
    setNewPasswordData: React.Dispatch<React.SetStateAction<NewPasswordData>>,
    submitting: boolean;
    errorMessage: string;
    passwordType:string;
    passwordValidityMessage:string[]
    investorData:InvestorData;
    setAdminData: React.Dispatch<React.SetStateAction<AdminData>>;
    setInvestorData: React.Dispatch<React.SetStateAction<InvestorData>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    validated: boolean;
    setValidated: React.Dispatch<React.SetStateAction<boolean>>;
    handleConfirmPasswordsChange: (
        data:AdminData,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setState: React.Dispatch<React.SetStateAction<InvestorData|AdminData|NewPasswordData>> 
    ) => void;
  
    setReferralToken:(token:string) => void;
    showPassword: () => void;
    handleSubmit:(data:AdminData | InvestorData ,event: React.FormEvent<HTMLFormElement>,domain:string,navigate:(path:string)=>void)=>void;
    handleChange:(data:AdminData | InvestorData | NewPasswordData, event:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,setState: React.Dispatch<React.SetStateAction<InvestorData|AdminData|NewPasswordData>> )=>void
    handleSubmitForChangePassword:(data: NewPasswordData, event: React.FormEvent<HTMLFormElement>, navigate: (path: string) => void) =>void
    isMatchingPassword:boolean
    loginData:LoginData
    handleSubmitForLogin : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    handleChangeForLogin :(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,navigate:(path:string)=>void)=>void
    handleEmailVerification:(response: any,shouldReload:boolean,navigate:(path:string)=>void)=>void
   
  }
  export interface DecodedChangePasswordToken {
    id:number;
    email:string;
    role:Role
}

export  enum Role {
  INVESTOR = 'investor',
  ADMIN = 'admin'
  
  }