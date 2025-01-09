export interface ReferralDetailsDto{
  referred: {firstName:string,lastName:string}[]
  referrer: {firstName:string,lastName:string}
  referralCode:number
}

  export type ReferralDto = {
    id:number
   amount:number
   currency:string;
   address:string;
   
  }