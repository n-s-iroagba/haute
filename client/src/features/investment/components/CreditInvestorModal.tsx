import { PayInvestorDto } from '../../../../../common/investmentTypes';
import { creditInvestment } from '../helpers/investmentApiHelpers';
import React, { useEffect, useState } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap';



interface ModalFormProps {
    show: boolean;
  }
  
  const CreditInvestorModal: React.FC<ModalFormProps> = ({ show }) => {
    const [formData, setFormData] = useState< PayInvestorDto|null>(null);
    const [modalShow, setModalShow] = useState<boolean>(false)
    const [submitting,setSubmitting] = useState<boolean>(false)
  
  
  
    useEffect(() => {
      setModalShow(show);
    }, [show]);
  
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prevFormData => {
        if (prevFormData) {
          return { ...prevFormData, [name]: value };
        }
        return { [name]: value } as unknown as PayInvestorDto; 
      });
    };
  
    const handleClose = () => {
      setModalShow(false);
      window.location.reload()
    }
  
    const handleConfirm = () => {
      localStorage.setItem('cassockCreditedState', 'true')
     
    };
  
    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
       if (formData){
      setSubmitting(true);
       await creditInvestment(formData)
       }else{
        alert('Please fill the form')
       }
      handleConfirm()
   
    }catch(error:any){
      console.error(error)
    
    }finally{
      handleClose()
    }
    }
    
  
  
    return (
  
      <Modal
        show={modalShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
  
          <Modal.Title>Add New Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                name="amount"
                value={formData?.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              />
            </Form.Group>
  
            <Form.Group controlId="formWalletAddress">
              <Form.Label>Wallet Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter wallet address"
                name="address"
                value={formData?.address||''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting?<Spinner size='sm'/>:'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  export default CreditInvestorModal

