import { useEffect, useState } from "react";
import {  getNotProtectedManagers } from "../../features/manager/helpers/managerApiHelpers";
import { ManagerDto } from "../../../../common/managerType";
import { sortManagers } from "../../features/manager/helpers/managerHelpers";

const useGetManagers = (): { managers: ManagerDto[], errorMessage: string } => {
    const [managers, setManagers] = useState<ManagerDto[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const fetchManagerData = async () => {
      try {
        const managerData = await getNotProtectedManagers(); 
        if (managerData){
          setManagers(sortManagers(managerData));
        }
      } catch (error:any) {
        console.error(error);
        setErrorMessage('Error retrieving managers')
      }
    };

    useEffect(() => {
      fetchManagerData();
    }, []);
  
    return {
      managers,
      errorMessage
    };
  };
  
  export default useGetManagers;