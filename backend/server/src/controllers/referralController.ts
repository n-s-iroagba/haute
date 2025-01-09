import { Request, Response } from 'express';
import { Investor, Referral, Transaction,Notification, Investment, DepositWallet } from '../types/investorTypes';
import { Op } from 'sequelize';
import { customError } from '../helpers/commonHelpers';
import { sendReferralBonusEmail } from '../service/mailService';
import {ReferralDetailsDto} from '../common/referralTypes'



export const payReferralBonus = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const referral = await Referral.findByPk(id);
    if (!referral) {
      throw customError(`The referral  you are trying to pay bonus has no investment in the database `, 404);;
    }

    const referredInvestor = await Investor.findByPk(referral.referredId);
    if (!referredInvestor) {
      throw customError(`The referredInvestor  you are trying to pay bonus has no investment in the database `, 404);;
    }

    let referrerInvestor;

    if (referredInvestor.referrerId) {
      referrerInvestor = await Investor.findByPk(referredInvestor.referrerId);
      if (!referrerInvestor) {
        throw customError(`The referrerInvestor  you are trying to pay bonus has no investment in the database `, 404);;
      }
    } else {
      throw customError(`The referredInvestor has no referrer`, 404);;
    }

    await Transaction.create({
      type: 'Credit',
      amount: referral.amount,
      date: new Date(),
      narration: 'Referral bonus reimbursement',
      participatingAccount: 'Haute', // Replace COMPANY_NAME with the actual company name
      investorId: referrerInvestor.id,
    });

    await Notification.create({
      title: 'Referral bonus imbursement',
      message: `Congratulations! You have earned $${referral.amount} for referring ${referredInvestor.firstName} ${referredInvestor.lastName}.`,
      investorId: referrerInvestor.id,
    });
    referral.settled = true
    await referral.save()
    await sendReferralBonusEmail(referrerInvestor, referral);

    return res.status(200).json({ message: 'Referral bonus paid successfully' });

  } catch (error: any) {
    console.error('Error in payReferralBonus function:', error);
    return res.status(error.status).json(error);
  }
}

export const getReferralDetails = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const investor = await Investor.findByPk(id);
    if (!investor) {
      throw customError('Investor not found', 404);
    }
    const referrals = await Referral.findAll({ where: { referrerId: id } });
    let referrer
    if (!investor.referrerId) {
      referrer = { firstName: '', lastName: '' } as unknown as Investor
    } else {
      referrer = await Investor.findByPk(investor.referrerId);
      if (!referrer) {
        referrer = { firstName: '', lastName: '' } as unknown as Investor
      }
    }
    const referred = await Promise.all(
      referrals.map(async (referral) => {
        const referredInvestor = await Investor.findByPk(referral.referredId);
        return {
          firstName: referredInvestor?.firstName || '',
          lastName: referredInvestor?.lastName || '',
        };
      })
    );
    return res.status(200).json({ referralCode:investor.referralCode,referrer: referrer, referred: referred } as ReferralDetailsDto);
  }
  catch (error: any) {
    console.error(error);
    return res.status(error.status || 500).json(error);
  }
}

export const getAllDueReferrals = async (req: Request, res: Response): Promise<Response> => {
  try {
    const referrals = await Referral.findAll({
      where: {
        amount: {
          [Op.gt]: 0,
        },
        settled: false
      },
    });
    let responseData = []
    for (const referral of referrals) {
      const investment = await Investment.findOne({ where: { investorId: referral.referrerId } })

      if (investment === null) {
        throw customError('The referrer has no investment', 404)
      }
      const wallet = DepositWallet.findOne({ where: { investmentId: investment.id } })

      responseData.push({id:referral.id,amount:referral.amount,wallet: wallet })

    }
    return res.status(200).json(responseData);
  } catch (error: any) {
    console.error('Error in getAllDueRefferal function:', error);
    return res.status(error.status).json(error);
  }
}