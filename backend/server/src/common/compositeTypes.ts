
import { CreateWalletDto } from "./walletTypes";
import { Manager, ManagerDto } from "./managerType";







export interface CreateInvestmentDto{
  wallet:CreateWalletDto
  amount:number
  managerId: number
}

export interface ReadableItem {
  read: boolean|null;
}