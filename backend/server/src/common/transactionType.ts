import {ReadableItem} from './compositeTypes'
export interface TransactionDto extends ReadableItem {
  id?:number,
  amount:number,
  type:'Debit'|'Credit'
  participatingAccount: 'Haute'|'Your Wallet'
  narration:'Referral bonus imbursement'|'Promo bonus imbursement'|'Investment Deposit'
  date:Date

}