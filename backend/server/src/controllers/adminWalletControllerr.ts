import { Request, Response } from 'express';

import { AdminWallet } from '../types/adminTypes';
import { customError } from '../helpers/commonHelpers';
import { CreateWalletDto } from '../common/walletTypes';


export const createAdminWallet = async (req: Request, res: Response): Promise<Response> => {
  console.log(req.body)
  try {
    let { identification,identificationType,  currency,depositMeans } = req.body as CreateWalletDto

    if ( !identification|| !identificationType||!depositMeans) {
      throw customError('incomplete payload from client', 400)
    }
    let existingWallet
    if(currency !== null) {
     existingWallet =await  AdminWallet.findOne({
      where:{
        currency: currency,
      }})
      
    }else {
      existingWallet =await  AdminWallet.findOne({
        where:{
          depositMeans: depositMeans,
        }})
        currency = 'NATIONAL CURRENCY OR USD'
    }

     if (existingWallet){
      throw customError(`${existingWallet.currency} wallet already exist`,409)
     }

    const wallet = await AdminWallet.create({
      identification,
      currency,
      identificationType,
      depositMeans
    });

    return res.status(201).json(wallet);
  } catch (error: any) {
    console.error('Error createWalletAddress function:', error);
    return res.status(error.status || 500).json(error);
  }
}



export const getAllWallets = async (req: Request, res: Response): Promise<Response> => {
  try {
    const wallets = await AdminWallet.findAll();
    return res.status(200).json(wallets);
  } catch (error: any) {
    console.error('Error in getAllWallets function:', error);
    return res.status(error.status || 500).json(error);
  }
}

export const patchWallet = async (req: Request, res: Response): Promise<Response> => {
  const { id, identification,identificationType } = req.body;
  console.log(req.body)
  try {
    const wallet = await AdminWallet.findByPk(id);
    if (!wallet) {
      throw customError('wallet to be updated not found', 404)
    }
    wallet.identification = identification
    wallet.identificationType = identificationType
    await wallet.save();
    return res.status(200).json(wallet);
  } catch (error: any) {
    console.error('Error in patchWallet function:', error);
    return res.status(error.status || 500).json(error);
  }
}

export const deleteWallet = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const wallet = await AdminWallet.findByPk(id);
    if (!wallet) {
      throw customError('wallet to be deleted not found', 404)
    }
    await wallet.destroy();
    return res.status(200).json({ message: 'Wallet address deleted successfully' });
  } catch (error: any) {
    console.error('Error deleteWallet function:', error);
    return res.status(error.status || 500).json(error);
  }
}







