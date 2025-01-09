import express, { Router } from 'express';
import multer from 'multer';


import { changePassword, confirmMailForPasswordChange, createAdmin, createInvestor, login, requestPasswordReset, resendVerificationToken, verifyMail } from './controllers/authController';
import { addEarnings, createInvestment, getInvestment, index, topUp, topUpWithId } from './controllers/investmentController';
import { deleteInvestor, getAllInvestors, getInvestorByPk, sendCustomMailController, updateVerificationDetails } from './controllers/investorController';
import { getAllDueReferrals, getReferralDetails, payReferralBonus } from './controllers/referralController';

import { createManager, patchManager, getAllManagers, getSingleManager, deleteManager } from './controllers/managerController';
import { createAdminWallet, deleteWallet, getAllWallets, patchWallet } from './controllers/adminWalletControllerr';
import { getNotifications, getTransactions } from './controllers/notificationAndTransactionController';
import { payPromoBonus, getPendingPromo, createPromo, getPromos, getAdvertPromos, updatePromo, deletePromo } from './controllers/promoController';
import { markAllUnreadAsRead } from './controllers/notificationController';
import { Notification } from './types/investorTypes';



const router: Router = express.Router();
const upload = multer();

router.get('/', async (req, res) => {
res.send('hello from server');
    }
)
  
// async (req, res) => {
//     try {
//       const investment = await Investment.findOne({ where: { investorId: 3 } });
      
//       if (!investment) {
//         return res.send('No investment found');
//       }
      
//       investment.earnings = 0;
//       await investment.save(); // Await to ensure save completes before sending response
      
//       res.send('Success');
//     } catch (error) {
//       console.error('Error updating investment:', error);
//       res.status(500).send('An error occurred');
//     }
//   }

router.post('/login', login);
router.get('/verify-email/:token', verifyMail);
router.get('/resend-verification-token/:email', resendVerificationToken);
router.post('/request-passswordChange', requestPasswordReset);
router.get('/verify-password-token/:token', confirmMailForPasswordChange);
router.post('/new-password/:id', changePassword);
router.get ('/get-available-currencies',getAllWallets)
router.post('/create-admin', createAdmin);
router.post('/create-investor', createInvestor);
router.get('/get-investors',  getAllInvestors);
router.patch('/pay', topUp);
router.post('/email/:id',  sendCustomMailController)
router.patch('/pay-with-id/:id', topUpWithId);
router.get('/pay-referral/:id', payReferralBonus);
router.get('/pay-bonus/:id', payPromoBonus);
router.delete('/delete-investor/:id', deleteInvestor);
router.get('/get-pending-bonus', getPendingPromo);

router.post('/create-manager', upload.single('image'), createManager);
router.get('/get-managers', getAllManagers);
router.patch('/patch-manager/:id',upload.single('image'), patchManager);
router.get('/manager/:id', getSingleManager)
router.delete('/delete-manager/:id', deleteManager);

router.post('/create-investment/:id', createInvestment);
router.patch('/add-earnings/:id', addEarnings);
router.get('/get-investment/:id', getInvestment);
router.patch('/patch-investment', getPendingPromo);
router.delete('/delete-investment/:id', /* Add controller function */);

router.post('/create-wallet', createAdminWallet);
router.get('/get-wallets', getAllWallets);
router.patch('/patch-wallet', patchWallet);
router.delete('/delete-wallet/:id', deleteWallet);

router.post('/create-promo', createPromo);
router.get('/get-promo', getPromos);
router.get('/get-adpromo', getAdvertPromos);
router.patch('/patch-promo', updatePromo);
router.delete('/delete-promo/:id', deletePromo);

router.get('/get-notifications/:id', getNotifications);
router.patch('/notifications/mark-all-as-read/:id', markAllUnreadAsRead)
router.get('/get-transactions/:id', getTransactions);

router.get('/get-pending-referral`', getAllDueReferrals)
router.get('/get-referral-details/:id',getReferralDetails)

router.get('/investor/:id',getInvestorByPk)
router.patch('/update-verification/:id',updateVerificationDetails)

export default router;
