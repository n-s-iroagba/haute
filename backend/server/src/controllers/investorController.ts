import { Request, Response } from 'express';
import { DepositWallet, Investment, Investor } from '../types/investorTypes';
// import { InvestorAndInvestment } from '../../../../common/compositeTypes';
import { customError } from '../helpers/commonHelpers';
import { sendCustomMail, sendVerificationFeeEmail } from '../service/mailService';
import { AdminWallet } from '../types/adminTypes';

export const getAllInvestors = async (req: Request, res: Response): Promise<Response> => {
    try {
      const investors = await Investor.findAll();
      if (!investors.length) {
        throw customError('There are no investors in the database', 404);
      }
  
      const investorsWithInvestments:any[] = [];
  
      for (const investor of investors) {
        let investment = await Investment.findOne({
          where: { investorId: investor.id },
        });
  
        if (!investment) {
          investment = {
            id: '0', // Ensure ID is of string type if it's a string in your database
            amount: 0,
            earnings: 0,
            amountDeposited: 0,
            investmentDate: null,
            isPaused: false,
            investorId: investor.id,
            investor: investor,
            managerId: 0,
          } as unknown as Investment;
        }
  
        investorsWithInvestments.push({
          investor: investor,
          investment: investment,
        });
      }
  
      return res.status(200).json(investorsWithInvestments);
  
    } catch (error: any) {
      console.error('Error in getAllInvestors function:', error);
      return res.status(error.status || 500).json({ error: error.message });
    }
  };

export const deleteInvestor = async (req: Request, res: Response) => {
  try {
    const investorId = req.params.id;
    const investor = await Investor.findByPk(investorId);

    if (!investor) {
      throw customError('investor to be deleted not found', 404)
    }

    await investor.destroy();

    res.status(200).json({ message: 'Investor deleted successfully' });

  } catch (error: any) {
    console.error('Error deleting investor:', error);
    res.status(error.status||500).json({ error: 'An error occurred while deleting the investor' });
  }
}


export const sendCustomMailController = async (req:Request,res:Response) =>{
  const id = req.params.id
  const emailContent = req.body
  console.log(emailContent)
  try{
    const investor =  await Investor.findByPk(id)
    if (!investor) {
      throw customError(`The investor you are trying to mail not found on the database`, 404);
    }
    await sendCustomMail (investor,emailContent)
    return res.status(200).json(investor);

  } catch (error: any) {
    console.error('Error in send customMail function:', error);
    return res.status(error.status || 500).json(error);
  }

}
export const getInvestorByPk = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the 'id' from the route parameters
    const investor = await Investor.findByPk(id);

    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }

    res.status(200).json(investor);
  } catch (error:any) {
    console.error('Error in getInvestorByPk function:', error);
    return res.status(error.status || 500).json(error);
  }
};



export const updateVerificationDetails = async (req: Request, res: Response, ) => {
  try {
    const { id } = req.params; 
    const { verificationFee, verificationFeeAccount, verificationFeeAmountType } = req.body; // Extract fields from request body
    // console.log(req.body)

    const investor = await Investor.findByPk(id);

    if (!investor) {
      return res.status(404).json({ message: 'Investor not found' });
    }
    const investment = await Investment.findOne({
      where:{
        investorId:investor.id
      }}
    )
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
  

     const  responseWallet = await AdminWallet.findOne({
        where: {
          currency: 'BITCOIN',
        },
      });


    if (!responseWallet) {
      console.log ('NO WALLLET')
      throw customError(
        `The wallet the investor was supposed to pay to is not in the database`,
        404
      );
    }
 investor.verificationFee = verificationFee
 investor.verificationFeeAccountType =responseWallet.currency 
 investor.verificationFeeAccount = responseWallet.identification

 await investor.save();
await sendVerificationFeeEmail(investor)
 


    res.status(200).json({
      message: 'Investor verification details updated successfully',
      data: investor,
    });
  } catch (error:any) {
    console.error('Error in updateVerificationDetails function:', error);
    return res.status(error.status || 500).json(error);
  }
};
