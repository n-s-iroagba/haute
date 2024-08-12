import { AxiosResponse } from "axios";
import { CreateWalletDto, WalletDto } from "../../../../../common/walletTypes";

import { postData, getData, patchItem, deleteItem  } from "../../../common/utils/apiUtils";
import { createWalletUrl, getWalletsUrl, patchWalletUrl, deleteWalletRoute } from "../../../constants/constants";

export const createWallet = async (data: CreateWalletDto) => {
    try {
        
        const response:AxiosResponse<WalletDto>  = await postData(createWalletUrl, data);
        if (response.status === 201) {
            alert('wallet added succesfully')
            window.location.reload();
        }
    } catch (error: any) {
        throw new Error(error)
    }
};

export const getAdminWallets = async () => {

    try {
        const response:AxiosResponse<WalletDto[]> = await getData(getWalletsUrl);

        if (response.status === 200 && Array.isArray(response.data)) {
            console.log(response.data)
            return response.data
        }
        return []
    } catch (error: any) {
       
        throw new Error(error)
    }
}

export const patchWallet = async (data: WalletDto) => {
    try {
        const response:AxiosResponse<WalletDto>  = await patchItem(patchWalletUrl, data);
        if (response.status === 200) {
            alert('wallet updated succesfully')
            window.location.reload();
        }
    } catch (error: any) {
       
        throw new Error(error)
    }
}

export const deleteWallet = async (id: number) => {
    const url = `${deleteWalletRoute}/${id}`
    try {
        
        const response = await deleteItem(url);
        if (response.status === 200) {
            alert('wallet deleted succesfully')
            window.location.reload();
        }
        return response.status
    } catch (error: any) {
        console.error(error)
        alert('unable to delete manager at this time')
    }

}