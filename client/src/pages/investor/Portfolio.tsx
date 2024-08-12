import React from 'react';
import PortfolioLayout from '../../features/investment/layout/PortfolioLayout';
import { useNavigate } from 'react-router-dom';
import '../../common/styles/styles.css'
import { Manager } from '../../../../common/managerType';
import { PortfolioDto } from '../../features/investment/types/types';



const PortfolioWrapper:React.FC = ()=>{
  const savedData = localStorage.getItem('cassockInvestment');
const investmentData: PortfolioDto = savedData ? JSON.parse(savedData) :
     { investment: {
        id: 1,
        investmentDate: new Date(),
        amount: 0,
        earnings: 0,
        amountDeposited: 0,
        isPaused: false
      } ,
      manager:{
        firstName: '',
        lastName: '',
        duration: 0,
        qualification: '',
        minimumInvestmentAmount: 0,
        percentageYield: 0,
      } as Manager,
    referrals: { totalAmount: 0, count: 0 },
  
    }
    const navigate = useNavigate()
 return(
<div className='d-flex flex-column align-items-center'>
    <h1 className='text-center my-2'>My Portfolio</h1>
{investmentData.investment.amountDeposited===0 && <button className='mb-3 button-styles text-light button-width-narrow' onClick={()=>navigate('/investment/managers')}>Invest</button>
}
<PortfolioLayout investmentData={investmentData}/>
</div>

 )
 }
 export default PortfolioWrapper