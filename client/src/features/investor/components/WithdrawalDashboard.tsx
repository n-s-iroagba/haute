
import React from 'react';
import '../../../common/styles/styles.css'
import { useNavigate } from 'react-router-dom';
import MiniFooter from '../../../common/components/MiniFooter';
import { PortfolioDto } from '../../investment/types/types';

export const getInvestmentDataWithUpdatedDate = (): number | null => {
  const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
  const savedData = localStorage.getItem('cassockInvestment');

  if (!savedData) {
    return null;
  }

  const portfolio: PortfolioDto = JSON.parse(savedData);

  // Parse the investmentDate as a Date object
  const investmentDate = new Date(portfolio.investment.investmentDate);

  // Add 2 weeks (14 days) to the investment date
  const newDate = new Date(investmentDate.getTime() + 14 * MILLISECONDS_IN_A_DAY);

  // Calculate the difference in days from today until the new date
  const today = new Date();
  const timeDiff = newDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / MILLISECONDS_IN_A_DAY);

  return daysDiff
}

const WithdrawalDashboard: React.FC = () => {


  const navigate = useNavigate()

  const renderMessage = () => {
    const investment = getInvestmentDataWithUpdatedDate()
    console.log(investment)
    if (investment!==null){
        return  <div className='d-flex flex-column align-items-center'>
        <p className='text-center'>No investment yet</p>
        <button onClick={() => navigate('/investment/managers')} className='button-styles button-width-narrow'>Invest</button>
      </div>
    }else{
        return (
          <div className='d-flex flex-column align-items-center px-3'>
          <p  className='text-center ' >You can not make withdrawals not until your pay out day.</p>
          <p  className='text-center ' >You've got {investment} days left</p>
          <button onClick={() => navigate('/dashboard')} className='button-styles button-width-narrower'>Dashboard</button>
        </div>
        );
     
  };
  }
  return (
   <>
    <div className='d-flex flex-column  py-5 align-items-center full-height '>
      <h2 className='mb-5'>Withdrawal</h2>
      {renderMessage()}
    </div>
<MiniFooter/>
    </>
  );
}

export default WithdrawalDashboard;
