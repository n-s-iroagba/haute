
import { sendPausedInvestmentEmail } from "../service/mailService";
import { Investment, Investor,Transaction,Notification } from "../types/investorTypes";
import { customError } from "./commonHelpers";

export const handleIsPaused = (investment: Investment): void => {
    if (investment.amountDeposited >= investment.amount) {
        investment.isPaused = false;
        Notification.create({
            investorId: investment.investorId,
            title: 'Investment Continued',
            message: `Congratulations!\nYou just completed your portfolio deposit, and your investment has been unpaused`,
        });
    } else {
        throw customError('Investment amount not reached', 400); // Throw error if investment amount not reached
    }
  };

  export const createDepositNotificationAndTransaction = async (investment:Investment,amount:number,investorId:number) => {
    const notificationTitle = investment.amountDeposited >= investment.amount ? 'Investment deposit' : 'Incomplete Investment Deposit';
    const notificationMessage =
      investment.amountDeposited >= investment.amount
        ? `Thank you,\nWe have received your deposit of $${amount}, we look forward to growing wealth with you.\nCheers,`
        : `Thank you,\nWe have received your deposit. However, we wish to notify you that the deposited amount (${investment.amountDeposited}) is lower than the actual required amount (${investment.amount}). Kindly ensure you pay the remaining amount as soon as possible.\nCheers,`;
  
    await Notification.create({
      title: notificationTitle,
      message: notificationMessage,
      investorId: investorId,
    });
  
    await Transaction.create({
      type: 'Credit',
      amount: amount,
      date: new Date(),
      narration: 'Investment Deposit',
      participatingAccount: 'Your Wallet',
      investorId: investorId
    });
  }
  
  export const checkPausedInvestmentStatusAndSendEmail = async (investor:Investor,investment:Investment) => {
    try {
      const currentDate = new Date();
      let investmentDate
      if (investment.investmentDate){
      investmentDate = new Date(investment.investmentDate);
      }
      let threeDaysLater 
      if (investmentDate){
       threeDaysLater = new Date(investmentDate);
      
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);
    
      if (investment.amountDeposited < investment.amount && currentDate > threeDaysLater) {
        investment.isPaused = true;
        await sendPausedInvestmentEmail(investor, investment)
        await investment.save();
        console.log('Investment paused successfully.');
      } 
    }else {
        console.log('Investment does not meet the criteria for pausing.');
    }
    } catch (error) {
      console.error('Error checking investment status:', error);
    }
  };