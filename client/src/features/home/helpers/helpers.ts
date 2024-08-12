export const getPromoRemainingTime = (startDate: string, endDate: string): number => {
    const startTimestamp = new Date(startDate).getTime(); 
    const endTimestamp = new Date(endDate).getTime(); 
    const remainingTime = endTimestamp - startTimestamp;
  
    return remainingTime; 
  }