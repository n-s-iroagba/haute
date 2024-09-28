

import React, { useEffect, useState } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { sendEmail } from '../helpers/investorHelpers';



interface ModalFormProps {
    show: boolean;
    id:number;
    name:string;
  }
  
  const EmailModal: React.FC<ModalFormProps> = ({ show,id,name }) => {
   const [emailData,setEmailData]= useState({
    subject:'',
    body:''
   })
    const [modalShow, setModalShow] = useState<boolean>(false)
    const [submitting,setSubmitting] = useState<boolean>(false)
  
  
  
    useEffect(() => {
      setModalShow(show);
    }, [show]);
  
  
 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setEmailData(prevFormData => {
      
          return { ...prevFormData, [name]: value };
        
     
      });
    };
  
  
    const handleClose = () => {
      setModalShow(false);
     
    }
  
    const handleConfirm = () => {
      localStorage.setItem('cassockCreditedState', 'true')
     
    };
  
    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
      console.log(emailData)
      e.preventDefault();
      try{
       if (emailData.body && emailData.body){
      setSubmitting(true);
       await sendEmail(id,emailData)
       }else{
        alert('Please fill the form properly')
       }
      handleConfirm()
   
    }catch(error:any){
      console.error(error)
    
    }finally{
      setSubmitting(false);
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
  
          <Modal.Title>Send A Mail to {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAmount">
              <Form.Label>Subject of Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject"
                name="subject"
                value={emailData.subject}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="formAmount">
              <Form.Label>Email</Form.Label>
              <Form.Control
                 as="textarea" 
                 rows={15} 
                 placeholder="Enter mail body"
                name="body"
                value={emailData.body}
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

  export default EmailModal

