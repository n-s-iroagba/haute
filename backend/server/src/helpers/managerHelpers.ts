import { Investment, Manager } from "../types/investorTypes";
import { customError } from "./commonHelpers";

export const changeManager = async(investment:Investment) => {
    const managers = await Manager.findAll()
    if(managers.length === 0){
      throw customError('No managers in database ', 404); 
    }
  
    let highestMinInvestmentManager;
    if (investment.managerId){
      highestMinInvestmentManager = await Manager.findByPk(investment.managerId);
    }
    if (!highestMinInvestmentManager) {
      highestMinInvestmentManager = managers[0];
    }
    let highestMinInvestment = investment.amountDeposited
  
    for (const manager of managers) {
      if (manager.minimumInvestmentAmount <= investment.amountDeposited  && manager.minimumInvestmentAmount > highestMinInvestment) {
        highestMinInvestment = manager.minimumInvestmentAmount;
        highestMinInvestmentManager = manager;
      }
    }
    investment.managerId = highestMinInvestmentManager.id;
    investment.amount =investment.amountDeposited
    investment.save()
    return highestMinInvestmentManager
  }