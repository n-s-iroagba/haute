import React from 'react';
import { faUser, faWallet, faBank } from '@fortawesome/free-solid-svg-icons';
import Information from '../../../common/components/Information';
import { Col, Row } from 'react-bootstrap';
import moneyBag from '../../../assets/images/moneyBag.webp';
import '../../../common/styles/styles.css';
import { GetStartedButton } from '../../../common/components/Button';


const Steps: React.FC = () => {
  return (
    <div className='px-4 py-4'>
      <div className='d-flex flex-column align-items-center'>
        <h2 className='text-center '>Unlock your</h2>
        <h2 className='text-center '>financial freedom</h2>
        <div className='primary-line mb-1'></div>
        <p>Attaining financial freedom has never been so easy. Get started in 3 easy steps:</p>
      </div>
      <Row className='d-flex align-items-center'>
        <Col sm={12} lg={6}>
          <img className='w-100'src={moneyBag} alt='money_bag' />
        </Col>
        <Col sm={12} lg={6}>
          <Row className='d-flex align-items-center'>
            <Col lg={6}>
              <Information head='Create an account' text='by filling in the sign-up form and verifying your email.' icon={faUser}/>
            </Col>
            <Col lg={6}>
              <Information head='Start Investing' text='by selecting a dedicated fund manager to oversee your account.' icon={faBank}/>
            </Col>
            <Col lg={12}>
              <Information head='Fund your account' text='via Paypal, CashApp, ands multiple crypto exchanges including Coinbase,Trustwallet etc.' icon={faWallet} />
            </Col>
            
          </Row>
        </Col>
      </Row>
      <div className='d-flex justify-content-center'>
      <GetStartedButton/>
      </div>
    
    </div>
  );
};

export default Steps;

