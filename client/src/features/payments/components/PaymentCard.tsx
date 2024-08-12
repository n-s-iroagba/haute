import React from 'react';
import { Card, } from 'react-bootstrap';
import { useState } from 'react';
import PayModal from './PayModal';

const PaymentCard: React.FC<{ address: string; amount: number; id: number,currency:string,entity:'referral'|'promo' }> = ({ address, amount,currency,id,entity}) => {
  const [copied,setCopied] = useState(false)
  const [showModal,setShowModal] = useState(false)
  const [idToBePaid,setIdToBePaid]=useState(0)
  const [confirmAmount,setConfirmAmount] = useState(0)
  

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true)
    setTimeout (()=>{
      setCopied(false)
    },3000)
  };
const pay = ()=>{
  setShowModal(true)
  setIdToBePaid(id)
  setConfirmAmount(amount)
}

  return (
    <>
    <PayModal  show={showModal} id={idToBePaid} confirmAmount={confirmAmount} paymentEntity={entity}/>
    <Card>
      <Card.Body>
        <Card.Text>
          Wallet Address: {address}
          </Card.Text>
          <Card.Text>
          Amount: {amount}
          </Card.Text> 
          <Card.Text>
          Currency: {currency}
        </Card.Text>
        
        < button className='button-styles' onClick={() => copyToClipboard(address)}>
          Copy Address
        </  button>
        {copied && <Card.Text>Address copied</Card.Text>}
        <br/>
        < button className='button-styles mt-3' onClick={() =>pay() }>
          Confirm Payment
        </  button>
      </Card.Body>
    </Card>
    </>
  );
};

export default PaymentCard


