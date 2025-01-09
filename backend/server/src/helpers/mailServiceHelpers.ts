import { COMPANY_NAME, COMPANY_SUPPORT_EMAIL } from "../constants";
import { Promo, AdminWallet } from "../types/adminTypes";
import { Investor, Investment, DepositWallet, Referral } from "../types/investorTypes";



import { formatEndDate } from "./commonHelpers";
import fs from 'fs';
import path from 'path';

// Function to convert image to Base64
const encodeImageToBase64 = (filePath: string): string => {
  const bitmap = fs.readFileSync(filePath);
  return Buffer.from(bitmap).toString('base64');
};

// Usage example
const logoPath = path.join(__dirname, '../assets/blacklogo.png');
const logoBase64 = encodeImageToBase64(logoPath);

export const getInvestmentDepositReceivedEmailContent = (investor: Investor, investment: Investment) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Investment Deposit Received</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      </head>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <p>Dear ${investor.firstName} ${investor.lastName},</p>
        <p>We are pleased to inform you that we have received your investment.</p>
        <p>Here are the details of your deposit:</p>
        <ul>
          <li><strong>Investment Amount:</strong> $${investment.amountDeposited}</li>
          <li><strong>Deposit Date:</strong> ${investment.investmentDate && formatEndDate(investment.investmentDate)}</li>
        </ul>
        <p>Thank you for your trust in us. We are excited to help you achieve your investment goals.</p>
        <p>If you have any questions or need further assistance, please contact our support team at <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a>.</p>
        <p>We appreciate your continued trust and investment with us.</p>
        <p>Best regards,</p>
        <p>The Investment Team<br>${COMPANY_NAME}</p>
        <p class="d-flex justify-content-center">
          <img src="cid:unique@blacklogo" alt="Company Logo" style="max-width: 200px; height: auto;">
        </p>
      </body>
      </html>`;
};

export const getCustomEmailContent = (investor: Investor, email:{subject:string,body:string}) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${email.subject}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      </head>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <p class="d-flex justify-content-center">
          <img src="cid:unique@blacklogo" alt="Company Logo" style="max-width: 200px; height: auto;">
        </p>
        <p>Dear ${investor.firstName} ${investor.lastName},</p>
        <p>${email.body}</>
        <p>Thank you for your trust in us. We are excited to help you achieve your investment goals.</p>
        <p>If you have any questions or need further assistance, please contact our support team at <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a>.</p>
        <p>Best regards,</p>
        <p>The Investment Team<br>${COMPANY_NAME}</p>
      
      </body>
      </html>`;
};

export const getInvestmentPausedEmailContent = (investor: Investor, investment: Investment) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Investment Paused</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      </head>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <p>Dear ${investor.firstName} ${investor.lastName},</p>
        <p>We hope this message finds you well. We are writing to inform you that your investment with <strong>${COMPANY_NAME}</strong> has been paused.</p>
        <p>The grace period for completing the deposit required to activate your investment has elapsed, and we have not received the necessary funds to proceed. As a result, we have temporarily paused your investment to prevent any potential issues.</p>
        <p>Please review the details of your investment below:</p>
        <ul>
          <li>Investment Amount: ${investment.amount}</li>
          <li>Amount Deposited: ${investment.amountDeposited}</li>
          <li>Date of First Deposit: ${investment.investmentDate && formatEndDate(investment.investmentDate)}</li>
        </ul>
        <p>To resume your investment, please complete the deposit at your earliest convenience. If you have already made the deposit and believe this message is in error, kindly contact our support team immediately at <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a> or chat with us on our social media handles.</p>
        <p>We value your investment and are here to assist you with any questions or concerns you may have. Thank you for your understanding and prompt attention to this matter.</p>
        <p>Best regards,</p>
        <p>The Investment Team<br>${COMPANY_NAME}</p>
        <p class="d-flex justify-content-center">
          <img src="cid:unique@blacklogo" alt="Company Logo" style="max-width: 200px; height: auto;">
        </p>
      </body>
      </html>`;
};

export const getInvestmentPausedReminderEmailContent = (investor: Investor, investment: Investment) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Investment Paused Reminder</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      </head>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <p>Dear ${investor.firstName} ${investor.lastName},</p>
        <p>We hope this message finds you well. We are writing to remind you that your investment with <strong>${COMPANY_NAME}</strong> has been paused.</p>
        <p>The grace period for completing the deposit required to activate your investment has elapsed, and we have not received the necessary funds to proceed. As a result, we have temporarily paused your investment to prevent any potential issues.</p>
        <p>Please review the details of your investment below:</p>
        <ul>
          <li>Investment Amount: ${investment.amount}</li>
          <li>Amount Deposited: ${investment.amountDeposited}</li>
          <li>Date of First Deposit: ${investment.investmentDate && formatEndDate(investment.investmentDate)}</li>
        </ul>
        <p>To resume your investment, please complete the deposit at your earliest convenience. If you have already made the deposit and believe this message is in error, kindly contact our support team immediately at <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a> or chat with us on our social media handles.</p>
        <p>We value your investment and are here to assist you with any questions or concerns you may have. Thank you for your understanding and prompt attention to this matter.</p>
        <p>Best regards,</p>
        <p>The Investment Team<br>${COMPANY_NAME}</p>
        <p class="d-flex justify-content-center">
          <img src="cid:unique@blacklogo" alt="Company Logo" style="max-width: 200px; height: auto;">
        </p>
      </body>
      </html>`;
};

export const getInvestmentPromoEmailContent = (investor: Investor, promo: Promo) => {
    return `
      <p>Dear ${investor.firstName} ${investor.lastName},</p>
  
      <p>We are excited to share an exclusive promotion from <strong>${COMPANY_NAME}</strong> with you!</p>
  
      <p>Introducing our latest promotion:<br />
      <strong>Earn up to ${promo.bonusPercent}% on your next investment!</strong></p>
  
      <p>This promotion is available until ${formatEndDate(promo.endDate)}. Don't miss out on this incredible opportunity to enhance your investment portfolio.</p>
  
      <p>If you have any questions or need further information, please contact our support team at <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a> or chat with us on any of our social media handles.</p>
  
      <p>We appreciate your continued trust and investment with <strong>${COMPANY_NAME}</strong>.</p>
  
      <p>Best regards,</p>
  
      <p>The Investment Team<br />
      ${COMPANY_NAME}</p>
    `;
}

export const getInvestmentPromoExtensionEmailContent = (investor: Investor, promo: Promo) => {
    return `
      <p>Dear ${investor.firstName} ${investor.lastName},</p>
  
      <p>We have some exciting news for you!</p>
  
      <p>Our promotion has been extended!<br />
      <strong>Earn up to ${promo.bonusPercent}% on your next investment!</strong></p>
  
      <p>You now have until ${formatEndDate(promo.endDate)} to take advantage of this amazing opportunity. Don’t miss out on enhancing your investment portfolio with our extended promotional offer.</p>
  
      <p>If you have any questions or need further information, please contact our support team at <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a> or chat with us on any of our social media handles.</p>
  
      <p>We appreciate your continued trust and investment with <strong>${COMPANY_NAME}</strong>.</p>
  
      <p>Best regards,</p>
  
      <p>The Investment Team<br />
      ${COMPANY_NAME}</p>
    `;
}

export const getHowToInvestEmailContent = (
  investor: Investor,
  depositWallet: DepositWallet,
  amount:number,
  adminWallet: AdminWallet
) => {
  return `
    <div style="text-align: center;">
      <img src="cid:unique@blacklogo" alt="Company Logo" style="max-width: 200px; height: auto;">
    </div>
    <p>Dear ${investor.firstName} ${investor.lastName},</p>

    <p>We hope this message finds you well. Thank you for choosing to invest with us.</p>

    <p>To complete your investment, please follow the instructions below:</p>
    <ol>
      <li>Transfer the investment amount of $${amount} to the following wallet address:
          <ul>
            <li>Currency: ${adminWallet?.currency || ' US Dollar'}</li>
            <li>Deposit Account/wallet: ${adminWallet.identification}</li>
          </ul>
      </li>
      
    </ol>

    <p>Once the transfer is complete, you will receive the deposit in your investment account within 12 hours.</p>

    <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a> or on any of our social media handles.</p>

    <p>We appreciate your trust and investment with us. We look forward to helping you achieve your investment goals.</p>

    <p>Best regards,</p>

    <p>The Investment Team<br />
    ${COMPANY_NAME}</p>
  `;
}


export const getReferralBonusEmailContent = (investor: Investor, referral: Referral) => {
    return `
    <div style="text-align: center;">
      <img src="cid:unique@blacklogo" alt="Company Logo" style="max-width: 200px; height: auto;">
    </div>
      <p>Dear ${investor.firstName} ${investor.lastName},</p>
  
      <p>We are pleased to inform you that you have earned a referral bonus!</p>
  
      <p>Thanks for your referral, ${investor.firstName} ${investor.lastName}, you have received a bonus of $${referral.amount}.</p>
  
      <p>We greatly appreciate your trust and support in recommending <strong>${COMPANY_NAME}</strong> to your network.</p>
  
      <p>If you have any questions or need further assistance, please contact our support team at <a href="mailto:${COMPANY_SUPPORT_EMAIL}">${COMPANY_SUPPORT_EMAIL}</a> or chat with us on any of our social media handles.</p>
  
      <p>Thank you once again for being a valued investor and helping us grow our community.</p>
  
      <p>Best regards,</p>
  
      <p>The Investment Team<br />
      ${COMPANY_NAME}</p>
    `;
}

export const getInvestmentPromoBonusEmailContent = (investor: Investor, amount: Number) => {
    return `
    <div style="text-align: center;">
      <img src="cid:unique@blacklogo" alt="Company Logo" style="max-width: 200px; height: auto;">
    </div>
      <p>Dear ${investor.firstName} ${investor.lastName},</p>
  
      <p>We are excited to inform you about a special promotional bonus from us!</p>
  
      <p>As part of fulfilling our promotion offer, you have received a bonus of $${amount}.</p>
  
      <p>We appreciate your continued trust and investment with <strong>${COMPANY_NAME}</strong>.</p>
  
      <p>Best regards,</p>
  
      <p>The Investment Team<br />
      ${COMPANY_NAME}</p>
    `;
}

export const getVerificationEmailContent = (verificationUrl: string, TOKEN_EXPIRATION_TIME: string, COMPANY_NAME: string) => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email Address</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
      </head>
      <body class="text-center">
        <h1 class="text-center">Welcome to ${COMPANY_NAME}!</h1>
        <p class="d-flex justify-content-center">
          <img src="cid:unique@blacklogo" alt="Company Logo" style="max-width: 200px; height: auto;">
        </p>
        <p class="text-center">Thank you for signing up. To complete your registration, please click the button below to verify your email address.</p>
        <p class="text-center">
          <a href="${verificationUrl}">
            <button style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
              Verify Your Email
            </button>
          </a>
        </p>
        <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
        <p>${verificationUrl}</p>
        <p>This verification link will expire in ${TOKEN_EXPIRATION_TIME} hours.</p>
        <p>Sincerely,</p>
        <p>${COMPANY_NAME} Team</p>
      </body>
      </html>`;
}


export  const getNewPasswordEmailContent = (newPasswordUrl:string,TOKEN_EXPIRATION_TIME:string,COMPANY_NAME:string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Change your password</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>
<body class="text-center">
  <div style="text-align: center;">
      <img src="cid:unique@blacklogo" alt="Company Logo" style="max-width: 200px; height: auto;">
    </div>
  <p  class="text-center">Thank you made a request to change your password. Kindly click the link or buttion below to change your password.</p>
  <p  class="text-center">
    <a href="${newPasswordUrl}" class="btn btn-primary">Change Password
     <button style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
  Change Your Password
</button>
    </a>
  </p>
  <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
  <p>${newPasswordUrl}</p>
  <p>This verification link will expire in ${TOKEN_EXPIRATION_TIME} hours.</p>
  <p>Sincerely,</p>
  <p>${COMPANY_NAME} Team</p>
</body>
</html>`;

}

export const getReferralThankYouEmailContent = (
  refreeInvestor: Investor, 
  newInvestor: Investor, 
  COMPANY_NAME: string
) => {
  return `
   <p class="d-flex justify-content-center">
          <img src="cid:unique@blacklogo" alt="Company Logo" style="max-width: 200px; height: auto;">
        </p>
    <p>Dear ${refreeInvestor.firstName},</p>

    <p>Thank you for referring ${newInvestor.lastName}, ${newInvestor.firstName}.</p>

    <p>Your referral bonus shall be credited to ${COMPANY_NAME}'s most recent investment account when the referred investor makes the first deposit.</p>

    <p>Thank you, ${newInvestor.firstName}.</p>

    <p>Best regards,</p>

    <p>The Investment Team<br />
    ${COMPANY_NAME}</p>
  `;
};
