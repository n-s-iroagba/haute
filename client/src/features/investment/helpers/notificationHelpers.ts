import { patchItem } from "../../../common/utils/apiUtils"
import { markNotificationsRoute } from "../../../constants/constants"

export const markNotificationsAsRead = async (id:number) => {
    const url = `${markNotificationsRoute}/${id}`
    try{
    await patchItem(url,null)
    }catch(error:any){
        console.error(error)
    }
}