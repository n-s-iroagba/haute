import nodemailer from 'nodemailer';

import { SERVER_VERIFY_EMAIL_ROUTE, TOKEN_EXPIRATION_TIME, COMPANY_NAME, COMPANY_VERIFICATION_EMAIL, COMPANY_REFERRAL_EMAIL, VERIFY_PASSWORD_RESET_TOKEN_URL, COMPANY_SUPPORT_EMAIL } from '../constants';
import { customError } from '../helpers/commonHelpers';
import { getVerificationEmailContent, getNewPasswordEmailContent, getHowToInvestEmailContent, getInvestmentDepositReceivedEmailContent, getInvestmentPausedEmailContent, getInvestmentPausedReminderEmailContent, getInvestmentPromoBonusEmailContent, getInvestmentPromoEmailContent, getReferralBonusEmailContent, getReferralThankYouEmailContent, getCustomEmailContent } from '../helpers/mailServiceHelpers';
import { Admin, Promo, AdminWallet } from '../types/adminTypes';
import { Investor, Investment, DepositWallet, Referral, Manager,Notification} from '../types/investorTypes';
import path from 'path';
import { changeManager } from '../helpers/managerHelpers';

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: 'hauteequity@gmail.com',
    pass: 'cprf immt omzt espd',
  },
  logger: true, // Enable logger
  debug: true // Enable debug output
})

const logoPath = path.join(__dirname, '../assets/blacklogo.png');

export const sendVerificationEmail = async (user: Investor|Admin) => {
  const verificationToken = user.verificationToken
  const verificationUrl = `${SERVER_VERIFY_EMAIL_ROUTE}/${verificationToken}`;
  const emailHtmlContent = getVerificationEmailContent(verificationUrl, TOKEN_EXPIRATION_TIME, COMPANY_NAME);

  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_VERIFICATION_EMAIL,
      to: user.email,
      subject: `Verify your email address to complete registration at ${COMPANY_NAME}`,
      attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
      ...emailBody,

    });
  } catch (error:any) {
    console.error('Error sending verification email:', error);
  }
};

export const sendCustomMail = async (user:Investor, emailContent:{body:string,subject:string})=>{
  const content = getCustomEmailContent(user,emailContent);

  try {
    const emailBody = { html: content };
    await transporter.sendMail({
      from: COMPANY_VERIFICATION_EMAIL,
      to: user.email,
      subject: emailContent.subject,
      attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
      ...emailBody,

    });
  } catch (error:any) {
    console.error('Error sending verification email:', error);
  }
};




export const sendReferalCompletedMail = async (refreeInvestor: Investor, newInvestor: Investor) => {
  const emailBody = getReferralThankYouEmailContent(refreeInvestor,newInvestor,COMPANY_NAME);
  let mailOptions = {
    from: COMPANY_REFERRAL_EMAIL,
    to: refreeInvestor.email,
    subject: 'Referral Registeration',
     html:emailBody
  };
  try{
    await transporter.sendMail(mailOptions);
  } catch (error:any) {
    console.error('Error sending referral completed email:', error);
  
  }
};

export const sendPasswordResetEmail = async (user:Investor|Admin) => {
  const verificationToken = user.changePasswordToken;
  const verificationUrl = `${VERIFY_PASSWORD_RESET_TOKEN_URL}/${verificationToken}`;
  const emailHtmlContent = getNewPasswordEmailContent(verificationUrl, TOKEN_EXPIRATION_TIME, COMPANY_NAME);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_VERIFICATION_EMAIL,
      to: user.email,
      subject: `Change your ${COMPANY_NAME} account password`,
      attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
      ...emailBody,
    });
  } catch (error:any) {
    console.error('Error sending password reset email:', error.message);
  }
};

export const sendPausedInvestmentEmail = async (investor: Investor, investment: Investment) => {
  // Ensure getInvestmentPausedEmailContent is properly called with investor and investment arguments
  const emailHtmlContent = getInvestmentPausedEmailContent(investor, investment);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
       attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
      subject: `Pause of investment earnings due to Incomplete Deposit`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};

export const sendPausedReminderEmail = async (investor: Investor, investment: Investment) => {
  const emailHtmlContent = getInvestmentPausedReminderEmailContent(investor, investment);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Reminder concerning paused investment`,
      ...emailBody,
      attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};

export const sendPromoMail = async (investor:Investor,promo:Promo) => {
  const emailHtmlContent = getInvestmentPromoEmailContent(investor, promo);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Promotion !!!`,
      attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};



export const sendPromoExtensionMail = async (investor: Investor, promo:Promo) => {
  const emailHtmlContent = getInvestmentPromoEmailContent(investor, promo);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
      subject: `Promo extension`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
}
export const sendHowToInvestMail = async (investor: Investor,  depositWallet: DepositWallet,
  amount: number,
  adminWallet: AdminWallet) => {
  const emailHtmlContent = getHowToInvestEmailContent(investor,  depositWallet,amount,adminWallet);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
      subject: `How To Make Your Investment Deposit`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
}

export const sendReferralBonusEmail = async (investor:Investor,referral:Referral) => {
  const emailHtmlContent = getReferralBonusEmailContent(investor, referral);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
      subject: `Payment of referral bonus`,
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};

export const sendPromoBonusEmail = async (investor:Investor,promoAmount:number) => {
  const emailHtmlContent = getInvestmentPromoBonusEmailContent(investor, promoAmount);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Payment of deposit Bonus`,
      attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
}
export const sendInvestmentDepositReceivedEmail = async (investor: Investor, investment:Investment) => {
  const emailHtmlContent = getInvestmentDepositReceivedEmailContent(investor, investment);
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: ` Deposit received`,
      attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
};

export const sendInvestmentReminderEmails = async ()=>{
 try{
  const investors = await Investor.findAll();

  for (const investor of investors) {

    const investment = await Investment.findOne({
      where: {
        investorId: investor.id
      }
    })
    if(!investment){
     return
    }
    const hasValidInvestment =  investment.amountDeposited > 0

    if (!hasValidInvestment) { 
      await sendReminderMail(investor)
    }
  }
}catch(error){
  console.error(error)
}
}

const sendReminderMail =async (investor:Investor) => {
  const emailHtmlContent = `Dear ${investor.firstName}  ${investor.lastName},\n\nIt looks like you have no investments or your investments have a zero balance Our Investors are making profits daily, do not be left out.
   Please consider making a deposit.\n\nBest regards,\n
   Investment Team`
  try {
    const emailBody = { html: emailHtmlContent };
    await transporter.sendMail({
      from: COMPANY_SUPPORT_EMAIL,
      to: investor.email,
      subject: `Make your first deposit`,
      attachments: [{
        filename: 'blacklogo.png',
        path: logoPath,
        cid: 'unique@blacklogo' // same CID as in the HTML img src
      }],
      ...emailBody,
    });
  } catch (error: any) {
    console.error('Error sending paused investment email:', error.message);
  }
}


export const updateInvestmentEarningsAndNotifiy = async ()=>{
  try{
   const investors = await Investor.findAll();
 
   for (const investor of investors) {
 
     const investment = await Investment.findOne({
       where: {
         investorId: investor.id
       }
     })
     if(!investment){
      return
     }
     const hasValidInvestment =  investment.amountDeposited > 0
 
     if (hasValidInvestment) {
      let manager
       if(investment.managerId){
        manager = await Manager.findByPk(investment.managerId);
       }
       if(!manager){
        manager = await changeManager(investment)
        investment.managerId=manager.id
       }
   
       investment.earnings += Number(investment.amountDeposited * (manager.percentageYield /(manager.duration * 100)));
       await investment.save()
       await  Notification.create({
        title:'Earnings',
        message: `You've earned a total of $${investment.earnings} in total.,\n Thanks for choosing us.`,
        investorId: investor.id,
       })
       await sendEarningsMail(investor, investment.earnings,investment.amountDeposited * (manager.percentageYield /(manager.duration * 100)))
     }
   }
 }catch(error){
   console.error(error)
 }
 }
 export const sendEarningsMail = async (investor: Investor, earnings: number, amount: number) => {
  const mailOptions = {
    from: '"Haute Equity" <hauteequity@gmail.com>',
    to: investor.email,
    subject: 'Congratulations on Your Earnings!',
    html: `
      <p class="d-flex justify-content-center">
          <img src="cid:unique@blacklogo" alt="Company Logo" style="max-width: 200px; height: auto;">
        </p>
      <p>Dear ${investor.firstName} ${investor.lastName},</p>
      <p>Congratulations!!</p>
      <p>You have just earned $${amount} on your investment with us.</p>
      <p>Your total earnings are now at $${earnings}.</p>
      <p>Making a total of $${amount+earnings} in your investment portfolio</>
      <p>Thank you for choosing us!</p>
      <p>Best Regards, <br> Haute Equity Team</p>
      <img src="cid:logo" alt="Haute Equity Logo" width="100" height="100" />
    `,
    attachments: [
      {
        filename: 'logo.png',
        path: logoPath,
        cid: 'logo',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Earnings email sent successfully');
  } catch (error) {
    console.error('Error sending earnings email:', error);
    throw new Error('Failed to send earnings email');
  }
};

export const sendVerificationFeeEmail = async (investor: Investor) => {
  const mailOptions = {
    from: '"Haute Equity" <hauteequity@gmail.com>',
    to: investor.email,
    subject: 'Verification Details Updated',
    html: `
      <p>Dear ${investor.firstName},</p>
      <p>Your verification details have been updated successfully. Please find the details below:</p>
      <ul>
        <li>Verification Fee: ${investor.verificationFee}</li>
        <li>Account: ${investor.verificationFeeAccount}  ${investor.verificationFeeAccountType}</li>
      </ul>
      <p>If you have any questions, feel free to contact us.</p>
      <p>Best Regards, <br> Haute Equity Team</p>
      <img src="cid:logo" alt="Haute Equity Logo" width="100" height="100" />
    `,
    attachments: [
      {
        filename: 'logo.png',
        path: logoPath,
        cid: 'logo',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};