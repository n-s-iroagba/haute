import { getData } from "../../../common/utils/apiUtils";
import { getTransactionsRoute } from "../../../constants/constants";

export const getTransactions = async (id:number)=>{
    const url = `${getTransactionsRoute}/${id}`

    try{
      const response:any = await getData(url);
      if (response.status ===200){
      return response.data
      }
      return []
      }catch(error:any){
        console.error(error)
        
      }
  }