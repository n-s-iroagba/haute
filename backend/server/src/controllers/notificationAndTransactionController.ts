import { Request, Response } from 'express';
import { Notification, Transaction } from '../types/investorTypes';
export const getNotifications = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
  
      const notifications = await Notification.findAll({ where: { investorId: id } });
  
      return res.status(200).json(notifications);
    } catch (error: any) {
      console.error('Error in getNotifications function:', error);
      return res.status(error.status).json(error);
    }
  }
  
  export const getTransactions = async (req: Request, res: Response): Promise<Response> => {
  
    try {
      const { id } = req.params;
  
      const transactions = await Transaction.findAll();
  
      return res.status(200).json(transactions);
    } catch (error: any) {
      console.error('Error in getTransactions function:', error);
      return res.status(error.status).json(error);
    }
  }