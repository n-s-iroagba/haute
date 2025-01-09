
import { Investment } from "../types/investorTypes";
import { Manager } from "./managerType";
import { WalletDto } from "./walletTypes";



export interface PortfolioDto{
  investment:Investment,
  manager:Manager,
  referrals:{totalAmount:number,count:number}
}

  export interface PayInvestorDto{
    address:string;
    amount:number;
  }



