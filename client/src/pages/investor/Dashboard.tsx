import React, { useEffect, useState } from 'react'
import { Row, Col} from 'react-bootstrap'
import { DashboardBar } from '../../features/investment/components/DashboardNav'
import { faWallet, faHandHoldingDollar, faQuestion,  faMoneyBill, faUserFriends, faCircleArrowUp, faArrowCircleDown, faCircleDollarToSlot, faUser } from '@fortawesome/free-solid-svg-icons'
import '../../common/styles/styles.css'
import MiniFooter from '../../common/components/MiniFooter'
import { logOut } from '../../features/auth/helpers/helper'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircularButton from '../../features/investor/components/CircularButton'
import { numberWithCommas } from '../../common/utils/utils'
import { useNavigate } from 'react-router-dom'
import { getInvestment } from '../../features/investment/helpers/investmentApiHelpers'
import { PortfolioDto } from '../../../../common/investmentTypes'
import useAppLoaded from '../common/hooks/useApploaded'
import LoadingSpinner from '../../common/components/LoadingSpinner'




const DashboardCard: React.FC<{ title: string, amount: number, icon: any }> = ({ title, amount, icon }) => {


  return (
    <div className='px-1  '>
      <div className='dash-nav py-1'>

        <small className='text-light text center mb-1'>{title}</small>
        <div className='d-flex justify-content-center flex-column align-items-center'>

          <FontAwesomeIcon className='text-light mb-1' icon={icon} />
        </div>

        <h6 className='text-light'> ${numberWithCommas(amount) + '.00'}</h6>




      </div>
    </div>
  )
}

const DashboardHeader: React.FC <{username:string,id:number}> = ({username,id}) => {
  const [earnings,setEarnings] = useState(0)
  const [amountInvested,setAmountInvested] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const investment = await getInvestment(id);
        if (investment.status === 200 && investment.data) {
          console.log('earnings',investment.data.investment.earnings);
          setEarnings(investment.data.investment.earnings)
          setAmountInvested(investment.data.investment.amountDeposited)
          localStorage.setItem('cassockInvestment',JSON.stringify(investment.data as PortfolioDto)) 
       
        }  
      } catch (error) {
        console.error('Error fetching investment data:', error);
      }
    }
    fetchData();
  }, [id]);
  const amount = earnings+amountInvested
 
  return (


    <div className='primary-background  dashboard-header  pt-4 pb-5 w-100'>
      <div className='d-flex flex-column align-items-center'>
        <DashboardBar id={id} username={username} />
      </div>
      <div className='px-3'>
        <h4 className='amount-text text-center mt-3'>Current Balance</h4>
        <div className='d-flex justify-content-center flex-column align-items-center'>

          <FontAwesomeIcon className='text-light mb-1' icon={faCircleDollarToSlot} />
        </div>

        <h1 className=' text-center mb-4 text-light '> ${numberWithCommas(amount) + '.00'}

        </h1>
        <Row className='d-flex justify-content-between'>
          <Col xs={6}>
            <DashboardCard icon={faCircleArrowUp} title='Amount invested' amount={amountInvested} />
          </Col>
          <Col>
            <DashboardCard icon={faArrowCircleDown} title='Earnings' amount={earnings} />
          </Col>
        </Row>
      </div>

    </div>


  )
}


const DashboardActions: React.FC = () => {
  const navigate = useNavigate()
  const icons = [faQuestion, faHandHoldingDollar, faWallet, faMoneyBill, faUserFriends];
  const actions: string[] = ['how-to-guide', 'investment/managers', 'portfolio', 'withdraw', `referral`];
  const texts: string[] = ['Guides', 'Invest', 'Earnings', 'Withdraw', 'Referrals',];
  return (
    <div className=' my-3 px-3'>
      <h4 className='text-center actions'>  Quick Actions</h4>
      <Row className=' gy-3 w-100 d-flex justify-content-center mt-3'>
        {texts.map((text, index) => (
          <Col className='d-flex justify-content-center' xs={4} md={2}>
            <CircularButton icon={icons[index]} title={text} path={actions[index]}  />
          </Col>
        ))
        }
        
         <Col className='d-flex justify-content-center' xs={4} md={2}>
         <button onClick={()=>logOut(navigate)} className="circular-button d-flex py-4 align-items-center justify-content-evenly flex-column">
          <FontAwesomeIcon icon={faUser}/>
          <small>logout</small>
          </button>
          </Col>
      </Row>
    </div>
  )
}

const Dashboard: React.FC<{username: string; id: number}> = ({username, id}) => {
  const isLoaded = useAppLoaded();

  return (
    <>
   { !isLoaded ? (
      <LoadingSpinner fullheight />
    ) : (
      <>
        <DashboardHeader username={username} id={id} />
        <DashboardActions />
        {/* <Transactions id={id} /> */}
      </>
    )
  }
  <div className='w-100 d-flex justify-content-center'>
    <MiniFooter />
    </div>
       </>
  );
  
};

export default Dashboard;