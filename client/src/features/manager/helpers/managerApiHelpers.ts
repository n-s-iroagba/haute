import { AxiosResponse } from "axios";
import { ManagerDto } from "../../../../../common/managerType";
import { deleteItem, getData, getNotProtectedData, patchFormDataItem, postFormData } from "../../../common/utils/apiUtils";
import { createManagerUrl, getManagersUrl, getSingleMangerRoute, patchManagerUrl, deleteManagerRoute } from "../../../constants/constants";

export const createManager= async (data:FormData) => {
    try {

      const response = await postFormData(createManagerUrl, data,);
      if (response.status === 201) {
      alert('manager added succesfully')
      window.location.reload();
    } 
  }catch (error:any) {
    console.error(error)
    alert('unable to create a manager at this time')
   }
  
  };
  
  export const getNotProtectedManagers = async (): Promise<ManagerDto[]|void> => {
    try {
      const response:AxiosResponse<ManagerDto[]> = await getNotProtectedData(getManagersUrl);
      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data as ManagerDto[];
      }
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  };
  
  export const getManagers = async (): Promise<ManagerDto[]> => {
    try {
  

  
      const response = await getData(getManagersUrl);
   
      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data as ManagerDto[];
      }
  
      return [];
      
    } catch (error: any) {
      console.error(error);
      return error
    
    }
  };
  
  export const getSingleManager = async (id:string)=>{
    const getSingleMangerUrl = `${getSingleMangerRoute}/${id}`
    try{
    const response = await getData(getSingleMangerUrl);
    if (response.status ===200){
    return response.data
    }
    }catch(error:any){
      console.error(error)
    }
  }
  
  export const patchManager=async ( data:FormData,navigate:(path:string)=>void,id:number) =>{
    console.log('id is' +id)
    const url = `${patchManagerUrl}/${id}`
    try {

      const response = await patchFormDataItem(url, data,);
      if (response.status === 200) {
        alert('manager updated succesfully')
       navigate('/admin/managers')
      } 
  }catch (error:any) {
    console.error(error)
    alert('error updating manager')
  }
  }
  
  export const deleteManager = async (id:number) => {
  const url =`${deleteManagerRoute}/${id}`
    try {

      const response = await deleteItem(url);
      if (response.status === 200) {
        alert('manager deleted succesfully')
        window.location.reload();
    } 
  }catch (error:any) {
    console.error(error)
    alert('unable to delete manager at this time')
   }
  }