import { Request, Response } from 'express';

import { AdminWallet, Promo } from "../types/adminTypes";
import { DepositWallet, Investment, Investor,Notification, PendingPromo, Referral, Transaction } from "../types/investorTypes";
import { Op } from 'sequelize';
import { customError } from '../helpers/commonHelpers';
import { sendPromoMail, sendPromoExtensionMail, sendPromoBonusEmail } from '../service/mailService';

export const createPromo = async (req: Request, res: Response): Promise<Response> => {
    const { startDate, endDate, bonusPercent } = req.body;
  
    try {
      const promo = await Promo.create({ startDate, endDate, bonusPercent });;
      const investors = await Investor.findAll();
      investors.forEach(async (investor) => {
        await sendPromoMail(investor,promo)
        await Notification.create({
          investorId: investor.id, title: 'Promo Notification', message: `We are thrilled to announce an exclusive promotional period for you! 
      The promotion will run from ${startDate} to ${endDate}.Invest before the ${endDate} and earn a bonus of ${bonusPercent}% on your initial investment deposit`
        });
      });
  
      return res.status(201).json({ message: 'Promo created successfully', promo });
    } catch (error: any) {
      console.error('Error createPromo:', error);
      return res.status(error.status||500).json(error);
    }
  }
  
  export const updatePromo = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { days } = req.body;
    console.log(req.body)
    try {
      const promo = await Promo.findOne()
      if (!promo) {
        throw customError(`promo to be updated with id ${id}  not found in database`, 404)
      }
   
      const dateObject = new Date(promo.endDate);
      console.log('dateObject',dateObject)
      console.log('date before update', dateObject.getDate())
      const millisecs = dateObject.getTime()+ days* 24 * 60 * 60 * 1000;

      console.log('date object  updated', dateObject)
      promo.endDate = new Date (millisecs);
      console.log('promo date',promo.endDate)
      await promo.save();
  
      const investors = await Investor.findAll();
      investors.forEach(async (investor) => {
        sendPromoExtensionMail(investor, promo)
        await Notification.create({
          investorId: investor.id, title: 'Promo Extension', message: `We are thrilled to announce the extension of our exclusive promotional period for you! 
      The promotion will run from ${promo.startDate.getDate()} to ${promo.endDate.getDate()}.Invest before the ${promo.endDate.getDate()} and earn a bonus of ${promo.bonusPercent}% on your initial investment deposit`
        });
      });
  
      return res.status(200).json({ message: 'Promo updated successfully', promo });
    } catch (error: any) {
      console.error('Error updating promo:', error);
      return res.status(error.status||500).json({ error: 'Error updating promo' });
    }
  }
  
  export const getAdvertPromos = async (req: Request, res: Response): Promise<Response> => {
    try {
      const promo = await Promo.findOne()
      if (promo){
      const today = new Date()
      const isActive =  promo.startDate <= today
      if (isActive) return res.status(200).json(promo) 
      }
      throw customError('no active promo',404)
    } catch (error: any) {
      console.error('Error in getPromos function:', error);
      return res.status(error.status||500).json({ error: 'Error getting promo from database' });
    }
  }
  export const getPromos = async (req: Request, res: Response): Promise<Response> => {
    try {
      const promo = await Promo.findOne()
     
      return res.status(200).json(promo) 
     
    } catch (error: any) {
      console.error('Error in getPromos function:', error);
      return res.status(error.status||500).json({ error: 'Error getting promo from database' });
    }
  }
  export const deletePromo = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const promo = await Promo.findByPk(id)
      if (!promo) {
        throw customError(`promo to be deleted with id ${id}  not found in database`, 404)
      }
      await promo.destroy();
      return res.status(200).json({ message: 'Promo deleted successfully' });
  
    } catch (error: any) {
      console.error('Error deletePromo function:', error);
      return res.status(error.status||500).json(error)
    }
  }
  
  export const getPendingPromo = async (req: Request, res: Response): Promise<Response> => {
    try {
      const pendingPromos:PendingPromo[] = await PendingPromo.findAll(
        {
        where: {
          amount: {
            [Op.gt]: 0,
          },
          settled: null
        },
      }
    );
    let responseBody = []
    for (const promo of pendingPromos){
      const investorId = promo.investorId
      const investor = await Investor.findByPk(promo.investorId)
      if (!investor){
        throw customError('investor for promo not found',404)
      }
      const investment = await Investment.findOne({where:{
        investorId:investor.id
      }})
  
      if (!investment){
        throw customError('investor for the promo payment has not invested',404)
      }
    
     const wallet = await DepositWallet.findOne({where:{
      investmentId:investment.id
     }})

    if (!wallet) {
      throw customError('wallet for promo not found',404)
    }   

    const   adminWallet = await AdminWallet.findOne({where:{
      depositMeans:wallet.depositMeans
    }})

    if (!adminWallet) {
      throw customError('admin Wallet for promo not found',404)
    }   
    console.log(wallet)
    responseBody.push({id:promo.id,amount:promo.amount,wallet:{identification:wallet.identification,currency:adminWallet.currency}})
      
    }
      return res.status(200).json(responseBody)
  
    } catch (error: any) {
      console.error('Error in getPendingPromo function:', error);
      return res.status(error.status || 500).json(error);
    }
  
  }

  export const payPromoBonus = async (req: Request, res: Response): Promise<Response> => {
    try {
     const {id} = req.params
  
   let promo = await PendingPromo.findByPk(id)

   if (!promo){
    throw customError('promo not found', 404)
   }
  
      await Transaction.create({
        investorId: promo.investorId,
        amount: promo.amount,
        type: 'Debit',
        participatingAccount: 'Your Wallet',
        date: new Date(),
        narration: 'Promo bonus imbursement',
      });
  
      await Notification.create({ title: 'Bonus Payout', message: `Your Promo bonus of ${promo.amount} was paid to your crypto wallet kindly check to confirm`,investorId: promo.investorId });
      promo.settled = true;
      promo.save()
      const investor = await Investor.findByPk(promo.investorId);
      if (investor){
      await sendPromoBonusEmail(investor, promo.amount);
    }
      return res.status(200).json({ message: 'Payment successful'});
  
    } catch (error: any) {
      console.error('error in PayPromoBonus function', error);
      return res.status(error.status).json(error);
    }
  }
