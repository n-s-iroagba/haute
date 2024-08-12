import { CreatePromoDto } from "../../../../../common/promoTypes";
import { getAdPromoUrl, getDueBonusUrl, payBonusRoute } from "../../../constants/constants";
import { postData, getData, patchItem, deleteItem  } from "../../../common/utils/apiUtils";
import { createPromoUrl, getPromoUrl, patchPromoUrl, deletePromoRoute } from "../../../constants/constants";

export const createPromo= async (data:CreatePromoDto) => {
    try {
      
      const response = await postData(createPromoUrl, data);
      if (response.status === 201) {
      alert('promo added succesfully')
      window.location.reload();
      } 
  }catch (error:any) {

     throw new Error(error);
   }
  };
  
  export const getPromo=async ()=>{
    
    try{
    const response:any = await getData(getPromoUrl);
    if (response.status ===200){
    return response.data
    }
    return null
    }catch(error:any){
      throw new Error(error);
    }

  }

  export const patchPromo=async ( data:any) =>{
    try {
      
      const response = await patchItem(patchPromoUrl, data);
      if (response.status === 200) {
        alert('promo updated succesfully')
        window.location.reload();
      }
  }catch (error:any) {
    throw new Error(error);
  }
  }
  
  export const deletePromo= async (id:number) => {
    const url =`${deletePromoRoute}/${id}`
      try {
        
        const response = await deleteItem(url);
        if (response.status === 200) {
          alert('promo deleted succesfully')
          window.location.reload();
        }
      return response.status
    }catch (error:any) {
      throw new Error(error);
    }
    }

  export const getAdPromo=async ()=>{
    
    try{
    const response:any = await getData(getAdPromoUrl);
    if (response.status ===200){
    return response.data
    }
    return null
    }catch(error:any){
      throw new Error(error);
   
    }
  }
  
export const payPromoBonus =async (id:number)=>{
  const url = `${payBonusRoute}/${id}`
  try{
  const response:any = await getData(url);
  if (response.status ===200){
    alert('promo bonus successfully paid')
    window.location.reload();
  }
  }catch(error:any){
    throw new Error(error);
  }
}

export const getDueBonus =async ()=>{
  const url = getDueBonusUrl
  try{
  const response:any = await getData(url);
  if (response.status ===200){
    return response.data
  }
  }catch(error:any){
    console.error(error)
   alert('unable to pay promo bonus at this time')
  }
}


