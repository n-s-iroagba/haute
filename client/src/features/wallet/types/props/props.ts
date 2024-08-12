import { CreateWalletDto } from "../../../../../../common/walletTypes";

export interface WalletCardProps extends CreateWalletDto {
    editButton:React.ReactNode;
    deleteButton: React.ReactNode;

}

