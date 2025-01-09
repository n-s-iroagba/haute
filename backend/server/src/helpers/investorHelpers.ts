
import { REFERRAL_BONUS_PERCENT } from "../constants";
import { sendReferalCompletedMail } from "../service/mailService";
import { Investor, Referral,Notification } from "../types/investorTypes";
import { customError } from "./commonHelpers";

export const handleReferral = async (refereeInvestor:Investor,newInvestor:Investor) => {
    try{
    newInvestor.referrerId = refereeInvestor.id;

    await Referral.create({referrerId: refereeInvestor.id,referredId:newInvestor.id});
    await Notification.create({ investorId: refereeInvestor.id, title: 'Referral Registration', message: `Thank you!\n You just referred ${newInvestor.firstName} ${newInvestor.lastName}. You'd earn ${REFERRAL_BONUS_PERCENT*100}% on the first deposit` });
    newInvestor.save();
    await sendReferalCompletedMail(refereeInvestor, newInvestor);
    }catch(error:any){
        throw customError(error.message,error.statusCode)
    }

}
