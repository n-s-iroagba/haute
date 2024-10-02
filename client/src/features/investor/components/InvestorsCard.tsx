import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import '../../../common/styles/styles.css'

const InvestorsCard: React.FC<{ amountDeposited:number,
  sendMailButton:any,
  firstName: string, lastName: string ,deleteButton:any,
  verificationButton:any,
  addInvestmentButton:any,amount:number,date?:string}> = ({ 
   lastName,
  amount,
  firstName,
     
     amountDeposited,
     date,
     addInvestmentButton,
     sendMailButton,
     verificationButton,
     deleteButton}) => {
      const withdrawalDate = date?new Date(new Date(date).setDate(new Date(date).getDate() + 3)).toLocaleDateString():'Has Not invested'
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header> {firstName} {lastName}</Accordion.Header>
        <Accordion.Body>
          <Card className='w-100'>
            <Card.Body>
              <Card.Text>Investment Amount: {amount}</Card.Text>
              <Card.Text>Amount Deposited: {amountDeposited}</Card.Text>
              <Card.Text>Withdrawal Date: {withdrawalDate} </Card.Text>
            </Card.Body> 
          </Card>
          <div className='d-flex justify-content-center mt-3'>{verificationButton}</div>
          <div className='d-flex justify-content-center mt-3'>{sendMailButton}</div>
          <div className='d-flex justify-content-center mt-3'>{addInvestmentButton}</div>
         <div className='d-flex justify-content-center mt-3'>{deleteButton}</div>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  );
};


export default InvestorsCard;

