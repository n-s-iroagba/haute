import { useEffect, useState } from "react";
import { getAdminWallets } from "../../wallet/helpers/walletHelper"
import {WalletDto} from '../../../../../common/walletTypes'


const useGetAdminWallets = (): { wallets: WalletDto[]|null, errorMessage: string } => {
    const [wallets, setWallets] = useState<WalletDto[]|null>(null);
    const [errorMessage, setErrorMessage] = useState('');
   const fetchWalletData = async () => {
        try {
          const walletData = await getAdminWallets();
          if (walletData) {
            setWallets(walletData);
          }
        } catch (error) {
          setErrorMessage('Error fetching wallets');
          console.error(error);
         
        }
      };
  
    useEffect(() => {
     
      fetchWalletData();
    }, []); 
  
    return {
      wallets,
      errorMessage,
    };
  };
  
  export default useGetAdminWallets;