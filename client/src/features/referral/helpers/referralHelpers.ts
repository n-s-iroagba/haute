import { getData } from "../../../common/utils/apiUtils";
import { getPendingReferralUrl, getReferralDetailsRoute, payReferralRoute } from "../../../constants/constants";

export const getUnpaidReferrals = async()=>{
    const url = getPendingReferralUrl
     const response = await getData(url)
     if (response.status ===200){
      return response.data
     }
       return   []
  }
  
  export const getReferralDetails =async (id:number)=>{
    const url = `${getReferralDetailsRoute}/${id}`
     const response = await getData(url)
     if (response.status ===200){
      return  response.data
     }
       return null
  }
  
export const payReferral = async (id:number)=>{
    const url = `${payReferralRoute}/${id}`
    try{
    const response:any =await getData(url);
    if (response.status ===200)
    alert('referral successfully paid')
    window.location.reload();
    }catch(error:any){
      console.error(error)
     alert('unable to pay referral at this time')
    }
  }