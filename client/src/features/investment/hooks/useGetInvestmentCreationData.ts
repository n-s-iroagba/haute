import { useState, useEffect } from 'react';
import { ManagerDto } from "../../../../../common/managerType";
import { getManagers } from "../../manager/helpers/managerApiHelpers";
import { findManagerById } from "../../manager/helpers/managerHelpers";
import { getAvailableWallets } from "../utils/apiUtills";
import { WalletDto } from '../../../../../common/walletTypes';

const useGetInvestmentCreationData = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const[wallets, setWallets] = useState<WalletDto[]>([]);
    const [managers, setManagers] = useState<ManagerDto[]>([]);
    const [selectedManager, setSelectedManager] = useState<ManagerDto | null>(null);

    const fetchManagerData = async () => {
        try {
            const tempManagers: ManagerDto[] = await getManagers();
            console.log(tempManagers)
            setManagers(tempManagers);
            const tempWallets= await getAvailableWallets();
            setWallets(tempWallets);

            const managerId = localStorage.getItem('cassockNewInvestmentInitmanagerId');
            setSelectedManager(findManagerById(tempManagers, Number(managerId)));
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        fetchManagerData();
    }, []); // Empty dependency array ensures this runs only once on mount

    return {
        wallets,
        managers,
        selectedManager,
        setSelectedManager,
        errorMessage,
        setErrorMessage
    };
}

export default useGetInvestmentCreationData;





