import { deleteItem, getData, postData } from "../../../common/utils/apiUtils";
import { deleteInvestorRoute, emailRoute, getInvestorsUrl } from "../../../constants/constants";

export const getInvestors = async ()=>{
    const url = getInvestorsUrl
   
     const response = await getData(url)
     if (response.status ===200){
      return response.data
     }
       return   []
  }


export const deleteInvestor = async (id:number)=>{
    const url =`${deleteInvestorRoute}/${id}`
    try {
     
      const response = await deleteItem(url);
      if (response.status === 200) {
        alert('investor deleted succesfully')
        window.location.reload();
    }
    return response.status
  }catch (error:any) {
   console.error(error)
    alert('unable to delete promo at this time')
  }
  }
export const sendEmail= async (id:number,body:{subject:string,body:string})=>{
  const url = `${emailRoute}/${id}`
    try {
     
      const response = await postData(url,body);
      if (response.status === 200) {
        alert('Email sent succesfully')
    }
    return response.status
  }catch (error:any) {
   console.error(error)
    alert('Unable to send email at this time')
  }
  
}