
import { getData, patchItem, postData  } from "../../../common/utils/apiUtils";
import { addDepositUrl, addEarningUrl, createInvestmentRoute, getInvestmentRoute, getInvestmentStatusRoute, payUrl,  } from "../../../constants/constants";

import { PayInvestorDto } from "../../../../../common/investmentTypes";
import { extractErrorCode } from "../../../common/utils/utils";
import { CreateInvestmentDto } from "../../../../../common/compositeTypes";




export const createInvestment = async (data:CreateInvestmentDto,investorId:number) => {
    const createInvestmentUrl = `${createInvestmentRoute}/${investorId}`;
    try {
;
      return await postData(createInvestmentUrl, data);
    }catch (error:any) {
      console.error(error)
      const code = extractErrorCode(error.message);
      if (code === 409) {
        alert('You already have an investment portfolio, make a deposit to top up')
        return(error)

       }else if (code === 400){
         alert('Some fields are missing, kindly fill the form properly and retry')
       }
      else {
        alert('Our server is currently down. Please try again later.');
      }
     }
  };
  
  export const getInvestment = async (id:number)=>{
    const url = `${getInvestmentRoute}/${id}`

    try{
      const response:any = await getData(url);
      return response
      }catch(error:any){
        console.error(error)
  
      }
  }
  
  export const getInvestmentStatus = async (id:string)=>{
    const url = `${getInvestmentStatusRoute}/${id}`
    
    try{
      const response:any = await getData(url);
      console.log(response.data)
      if (response.status ===200){
      return response.data
      }
      }catch(error:any){
        console.error(error)
      }
  }
  
  export const creditInvestment =async (data:PayInvestorDto) =>{
    try {
      const response = await patchItem(payUrl,data);
      if (response.status === 200) {
        alert('investment deposit successfully added succesfully')
        window.location.reload();
    }
  }catch (error:any) {
   console.error(error)
   const code = extractErrorCode(error.message);
    if (code === 400){
      alert('Some fields are missing, kindly fill the form properly and retry')
    }
   else {
    alert('unable to add investment amount at this time')
   }
  }
  }

    
  export const creditInvestmentWithId =async (id:number,data:{amount:number}) =>{
    const url = `${addDepositUrl}/${id}`
    alert(url)
    try {
      const response = await patchItem(url,data);
      if (response.status === 200) {
        alert('investment deposit successfully added succesfully')
        window.location.reload();
    }
  }catch (error:any) {
   console.error(error)
   const code = extractErrorCode(error.message);
    if (code === 400){
      alert('Some fields are missing, kindly fill the form properly and retry')
    }
   else {
    alert('unable to add investment amount at this time')
   }
  }
  }


    
  export const creditEarningsWithId =async (id:number,data:{amount:number}) =>{
    const url = `${addEarningUrl}/${id}`
    alert(url)
    try {
      const response = await patchItem(url,data);
      if (response.status === 200) {
        alert('investment deposit successfully added succesfully')
        window.location.reload();
    }
  }catch (error:any) {
   console.error(error)
   const code = extractErrorCode(error.message);
    if (code === 400){
      alert('Some fields are missing, kindly fill the form properly and retry')
    }
   else {
    alert('unable to add investment amount at this time')
   }
  }
  }