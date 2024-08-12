import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { payReferral } from '../../referral/helpers/referralHelpers';
import { payPromoBonus } from '../../promo/helpers/promoApiHelpers';


const PayModal:React.FC<{id:number,show:boolean,confirmAmount:number,paymentEntity:'referral'|'promo'}>= ({ id, show,confirmAmount,paymentEntity}) => {
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState('');
  const [showModal, setShowModal]= useState(false);
  const [submitting,setSubmitting] = useState(false);

  useEffect(() => {
    setShowModal(show);
  }, [show])

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = parseFloat(e.target.value);
  setAmount(inputAmount);
  };
  
  const handleClose = ()=>{
    setShowModal(false);
    window.location.reload()
  }
  const handleConfirm = async () => {
    try {
      if (amount === confirmAmount) {
        setSubmitting(true);
        if (paymentEntity === 'referral') {
          await payReferral(id);
        } else {
          await payPromoBonus(id);
        }
        handleClose();
      } else {
        setError('Incorrect Amount');
        return;
      }

    } catch (error) {
      console.error('Error handling confirmation:', error);
      setError('Error making payment, contact Nnamdi')
    }finally {
      setSubmitting(false);
      
    }
  };
  
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Admin Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="adminAccount">
          <Form.Label>Enter the amount you transferred:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAccountChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Back
        </Button>
        <Button disabled={submitting}variant="primary" onClick={handleConfirm}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PayModal;
