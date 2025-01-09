import { Request, Response } from 'express';
import { Notification } from '../types/investorTypes';

export const markAllUnreadAsRead = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
      // Update all notifications where 'read' is false
      const [affectedRows] = await Notification.update(
        { read: true },
        { where: { 
            read: null,
            investorId: id,  
         } }
      );
  
      res.status(200).json({ message: `${affectedRows} notifications marked as read.` });
    } catch (error:any) {
      console.error(error);
      res.status(error.status||500).json({ message: 'An error occurred while updating notifications.' });
    }
  };