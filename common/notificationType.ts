import { ReadableItem } from "./compositeTypes"

export interface NotificationDto extends ReadableItem {
    id:number
    title:'Earnings'|'Bonus Payout'|'How To Deposit'|'Referral Registration'|'Referral bonus imbursement'|'Bonus imbursement'|
    'Investment Deposit'|'Incomplete Investment Deposit'|'Investment Paused' |'Investment Continued'|'Promo Notification'
    message:string
  
  }