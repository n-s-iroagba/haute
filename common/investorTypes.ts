
export interface InvestorCreationPayLoad{ 
    lastName: string;
    firstName: string;
    password: string;
    email: string;
    dateOfBirth: Date;
    gender:string;
    country:string
    bank:string;
    referralCode?:number
  }