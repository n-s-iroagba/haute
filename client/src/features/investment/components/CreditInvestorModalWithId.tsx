
import {  creditInvestmentWithId } from '../helpers/investmentApiHelpers';
import React, { useEffect, useState } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap';



interface ModalFormProps {
    show: boolean;
    id:number;
    name:string;
  }
  
  const CreditInvestorModalWithId: React.FC<ModalFormProps> = ({ show,id,name }) => {
    const [amount,setAmount] = useState(0)
    const [modalShow, setModalShow] = useState<boolean>(false)
    const [submitting,setSubmitting] = useState<boolean>(false)
  
  
  
    useEffect(() => {
      setModalShow(show);
    }, [show]);
  
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      setAmount(e.target.value as unknown as number);
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
       if (amount){
      setSubmitting(true);
       await creditInvestmentWithId(id,{amount:amount})
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
  
          <Modal.Title className='text-center'>Add funds to {name}'s account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                name="amount"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              />
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting?<Spinner size='sm'/>:'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  export default CreditInvestorModalWithId

