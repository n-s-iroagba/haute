import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Information from '../../../common/components/Information';
import security from '../../../assets/images/padlock.webp'
import '../../../common/styles/styles.css'
import { faBank } from '@fortawesome/free-solid-svg-icons';

const SecurityAssurance: React.FC = () => {
  return (
    <div className='px-4'>
  
      <Row className="flex-row-reverse d-flex align-items-center flex-lg-row">
        <Col sm={12} lg={4} className="order-lg-2">
          <img style={{ width: '100%' }} src={security} alt='home1' />
        </Col>
        <Col sm={12} lg={8}>
        <div className='d-flex flex-column align-items-center'>
        <h2 className='text-center'>Your money is safe</h2>
        <h2 className='text-center '>with us</h2>
        <div className='primary-line mb-2' />
      </div>
          <p className='px-4 text-center'>You trust us with your investments and we take that very seriously. We are committed to protecting your money and information with the highest standards of security available.</p>
          <Row>
            <Col lg={6}>
              <Information head='Bank level security' text="
            We use state-of-the-art data encryption when handling your financial information and two-factor authentication (2FA) protection. 
             We're backed by top financial market operators and we not only meet traditional banking security standards, we exceed them." icon={faBank} />
            </Col>
            <Col lg={6}>
              <Information head='Deposit Insurance' text="To safeguard our clients' financial interests and eliminate all risk, all deposits are insured securely under the European Deposit Insurance Scheme. This comprehensive insurance coverage ensures that no liability falls upon us in the event of unforeseen circumstances." icon={faBank} />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Information head='Covered by US SEC' text="Trading accounts are held by our partners, a firm duly registered by the Securities and Exchange Commission  in the US." icon={faBank} />
            </Col>
            <Col lg={6}>
              <Information head="Secure payments" text="Our payment processor is PADSS & PCIDSS compliant satisfying the highest level of Security Audit available." icon={faBank} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='d-flex justify-content-center align-items-center'>
        <div className=' button-width-wide'>
      
        </div>
      </Row>
    </div>
  );
};

export default SecurityAssurance;
