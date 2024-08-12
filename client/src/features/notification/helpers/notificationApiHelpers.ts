import { getData } from "../../../common/utils/apiUtils";
import { getNotificationsRoute} from "../../../constants/constants";

export const getNotifications = async (id:number)=>{
    const url = `${getNotificationsRoute}/${id}`
    
    try{
      const response:any = await getData(url,);
    
      if (response.status ===200){
      return response.data
      }
      return []
      }catch(error:any){
        console.error(error)
      
      }
  }