import React from 'react';
import {  Col } from 'react-bootstrap';
import MiniFooter from '../../common/components/MiniFooter';
import '../../common/styles/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faDiagramNext } from '@fortawesome/free-solid-svg-icons';
// Define types for the step
type Step = {
  title: string;


};

// Steps data
const steps: Step[] = [
  {
    title: 'Ensure you have a cryptocurrency wallet for deposits and withdrawals'
  },
  {
    title: 'Click on the "Invest" button on the dashboard',


  },
  {
    title: 'Select the manager you wish to manage your investment',


  },
  {
    title: 'Fill in the form accordingly and submit. Ensure that the currency selected matches the currency and wallet you wish to invest with.',


  },
  {
    title: 'Copy the address and proceed to make a deposit to the copied wallet address ',

  },
  {
    title: 'Monitor the progress of your investment',


  },
  {
    title: 'On your payout date, click the "Withdraw" button on the dashboard and then click the "Withdraw" button on the Withdrawal page',


  },

];

// HowToGuides component
const HowToGuides: React.FC = () => {
  return (
    <div >
      <div className='full-height px-3'>
        <h2 className="text-center">Investment Process</h2>
        <div className='d-flex justify-content-center'>
        <div className='primary-line mb-2'></div>
        </div>
        <div className='d-flex justify-content-center flex-column align-items-center'>

          <FontAwesomeIcon icon={faCircleQuestion} />
        </div>

        {steps.map((step, index) => (

          <Col key={index}>

            <FontAwesomeIcon icon={faDiagramNext} />
            <h5>{`Step ${index+1}`}</h5>
            <p>{step.title}</p>

          </Col>

        ))}
        <p className='text-center'>Thank you for trusting us...</p>
      </div>
      <MiniFooter primaryVariant />
    </div>
  );
};

export default HowToGuides;
