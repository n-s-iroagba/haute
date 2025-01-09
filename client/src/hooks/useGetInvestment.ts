import { useState, useEffect } from "react";
import { getInvestment } from "../features/investment/helpers/investmentApiHelpers";
import { PortfolioDto } from "../../../common/investmentTypes";


const useGetInvestment = (id: number) => {
  const [earnings, setEarnings] = useState<number>(0);
  const [amountInvested, setAmountInvested] = useState<number>(0);
  const [periodInDays, setPeriodInDays] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const investment = await getInvestment(id);
        if (investment.status === 200 && investment.data) {
          console.log('earnings', investment.data.investment.earnings);
          setEarnings(investment.data.investment.earnings);
          setAmountInvested(investment.data.investment.amountDeposited);
          setPeriodInDays(
            Math.floor(
              (new Date().getTime() -
                new Date(investment.data.investment.investmentDate).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          );
          localStorage.setItem('cassockInvestment', JSON.stringify(investment.data as PortfolioDto));
        }
      } catch (error) {
        console.error('Error fetching investment data:', error);
      }
    };

    fetchData();
  }, [id]);

  return { earnings, amountInvested, periodInDays };
};

export default useGetInvestment;