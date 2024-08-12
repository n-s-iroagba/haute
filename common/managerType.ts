
export interface CreateManagerDto{
    firstName: string;
    lastName: string;
    image:  Blob|string|Promise<Blob>;
    duration: number;
    qualification: string;
    minimumInvestmentAmount: number;
    percentageYield: number;
  }
  export interface Manager {
    firstName: string;
    lastName: string;
    duration: number;
    qualification: string;
    minimumInvestmentAmount:number;
    percentageYield: number;
    
  }

  export interface  ManagerDto extends Manager{
    id:number;
    image:  any;
  }