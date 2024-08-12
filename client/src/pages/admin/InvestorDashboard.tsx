import React, { useState } from 'react'


import { useNavigate } from 'react-router-dom';
import MiniFooter from '../../common/components/MiniFooter';
import CreditInvestorModal from '../../features/investment/components/CreditInvestorModal';
import '../../common/styles/styles.css'




const InvestorsDashboard = () => {
  const [addInvestementShow, setAddInvestmentShow] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleInvestmentShow = () => {

    setAddInvestmentShow(true)

  }
  return (
    <div className='primary-background full-height'>

      <div className='col-lg-4 col-md-8 col-xs-12 d-flex flex-column align-items-center w-100 pt-5 text-light '>
        <h1>Investors Dashboard</h1>
        <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={() => handleInvestmentShow()}> Add investor Amount</button>
      
            <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={() => navigate('/admin/bonus')}> Pay Promo Bonus</button>
        
       
            <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={() => navigate('/admin/referrals')}> Pay Referral Bonus</button>
        

        <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={() => navigate('/admin/investors')}> View Investors</button>
      </div>
      <MiniFooter primaryVariant />
      <CreditInvestorModal show={addInvestementShow} />
    </div>
  )
}
export default InvestorsDashboard