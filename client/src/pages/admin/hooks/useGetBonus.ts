import { useEffect, useState } from "react";
import { getDueBonus } from "../../../features/promo/helpers/promoApiHelpers";



const useGetBonus = () =>{
const [dueBonuses, setDueBonus] = useState([])

useEffect(() => {
  const fetchBonusData = async () => {
    try {
      const bonusData: any = await getDueBonus();
      console.log(bonusData)
      bonusData && setDueBonus(bonusData);
    } catch (error) {
      console.error('Error fetching bonus data:', error);
    }
  };

  fetchBonusData();

}, [])
  return dueBonuses
}

export default useGetBonus