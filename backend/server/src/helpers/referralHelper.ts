import { REFERRAL_BONUS_PERCENT } from "../constants";
import { Investor, Referral, Investment } from "../types/investorTypes";

export const handleFirstDepositReferral = async (investor: Investor, amount: number): Promise<void> => {
    if (investor.referrerId === null) {
        return;
    }
  
    const referral = await Referral.findOne({ where: { referredId: investor.id, referrerId: investor.referrerId } });
  
    if (!referral) {
       return;
    }
  
    referral.amount = amount * REFERRAL_BONUS_PERCENT;
  
    const referralInvestment = await Investment.findOne({ where: { investorId: investor.referrerId } });
  
    if (!referralInvestment) {
        return;
    }
    await referral.save();
  };