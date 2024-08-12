
import React from 'react';
import { Col, Row } from 'react-bootstrap'
import header from '../../../assets/images/header.gif'
import PopupToast from '../components/PopupToast';
import '../../../common/styles/styles.css'
import { companyName } from '../../../constants/constants';
import { GetStartedButton } from '../../../common/components/Button';

const Header: React.FC = () => {


  return (
    <header className='primary-background header py-4 px-4'>
      <PopupToast />
        <Row className='d-flex align-items-center'>
          <Col xs={12} lg={6}>
            <div className='text-light'>
              <h1 className=' heavy-font'>The best way to invest in the financial markets</h1>
              <h6 className='mid-font'>{companyName} is the safest and easiest way to make smarter investments and earn real returns. We make investing simple, accessible, and affordable.</h6>
              <div className='my-4 d-flex justify-content-center'>
             <GetStartedButton primaryBackground/>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <img className='header-image-border' src={header} alt='header' />
          </Col>
        </Row>
      </header>
      
  );
};

export default Header;
