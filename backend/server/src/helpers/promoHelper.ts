
import { Promo } from "../types/adminTypes";
import { Investor, PendingPromo,Notification,Transaction } from "../types/investorTypes";

export const handlePromo = async (investor: Investor, amount: number): Promise<void> => {
    const promo = await Promo.findOne();
  
    if (!promo) {
        return;
    }
  
    const promoBonus = (promo.bonusPercent/100) * amount;
  
    const pendingPromo = await PendingPromo.create({
        investorId: investor.id,
        amount: promoBonus,
    });
  
    await Notification.create({
        investorId: investor.id,
        title: 'Promo Bonus',
        message: `Congratulations!\nYou just earned $${promoBonus} on your first deposit`,
    });
  
    await Transaction.create({
      type: 'Credit',
      amount: promoBonus,
      date: new Date(),
      narration: 'Promo bonus',
      participatingAccount: 'Your Wallet',
      investorId: investor.id
    });
  }
  
  export const deleteRunningPromo= async ()=> {
    try {
      const promos = await Promo.findAll()
      for (const promo of promos) {
      const currentDate = new Date();
      const endDate = new Date(promo.endDate);

      if (currentDate > endDate) {
        await promo.destroy();
        
      }
    }
    } catch (error: any) {
      console.error('Error deleteRunningpromo function:', error);
      
    }
  }