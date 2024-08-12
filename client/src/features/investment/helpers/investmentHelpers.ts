import { ManagerDto } from "../../../../../common/managerType";

export const canInvest = (investmentAmount:number, managers:ManagerDto[]) =>{
    if (!managers || managers.length === 0) {
      return false;
    }
    const minMinInvestment = Math.min(...managers.map((manager:any) => manager.minimumInvestmentAmount));
    return investmentAmount < minMinInvestment;
  }

  export const createInvestmentMultiplicationObject = (commenceDate: string, incrementAmount: number): Record<string, number> => {
    const startDate = new Date(commenceDate);
  
   console.log(incrementAmount)
    const currentDate = new Date();
  
    const daysDifference = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Number of days between commence date and current date
  
    const resultObject: Record<string, number> = {};
  
    for (let i = 0; i < daysDifference; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i); // Set the date to the current day in the loop
      const key = currentDate.toISOString().split('T')[0]; // Get the date in 'YYYY-MM-DD' format
      const value = incrementAmount * i; // Calculate the value as multiplication of the number by the day index
      resultObject[key] = value;
    }
    console.log(resultObject)
    return resultObject;
  };  

  export const findManagerWithHighestMinInvestment = (managers: ManagerDto[], amount: number):ManagerDto|null => {
    let highestMinInvestmentManager:ManagerDto|null = null;
    let highestMinInvestment = 0
   
    managers.forEach((manager:any) => {
      if (manager.minimumInvestmentAmount <= amount && manager.minimumInvestmentAmount > highestMinInvestment) {
        highestMinInvestment = manager.minimumInvestmentAmount;
        highestMinInvestmentManager = manager;
      }
    });
      return highestMinInvestmentManager;
  

  };