import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { deleteInvestor } from '../../features/investor/helpers/investorHelpers';
import { deleteManager } from '../../features/manager/helpers/managerApiHelpers';
import { deleteWallet } from '../../features/wallet/helpers/walletHelper';
import { deletePromo } from '../../features/promo/helpers/promoApiHelpers';
import { Spinner } from 'react-bootstrap';


const DeleteModal:React.FC<{id:number,show:boolean,entity:'wallet'|'manager'|'investor'|'promo'}>= ({ id, show,entity }) => {
  const [error, setError] = useState('');
  const [showModal, setShowModal]= useState(false);
  const [password, setPassword] = useState('');
  const [submitting,setSubmitting] = useState(false)
  const secretCode =  process.env.REACT_APP_ADMIN_SECRET_KEY

  useEffect(() => {
    setShowModal(show);
  }, [show])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const handleClose = ()=>{
    setShowModal(false);
    window.location.reload()
  }

    const handleConfirm = async () => {
      if (password === secretCode) {
        setSubmitting(true);
        try {
          if (entity === 'manager') {
            await deleteManager(id);
          } else if (entity === 'wallet') {
            await deleteWallet(id);
          } else if (entity === 'investor') {
            await deleteInvestor(id);
          } else if (entity === 'promo') {

           await deletePromo(id);
          } else {
            setError('Invalid entity type');
          }
        } catch (error) {
          console.error('Deletion error:', error);
          setError(`An error occurred while deleting the ${entity}`);
        }finally{
          setSubmitting(false);
        }
      } else {
        setError('Incorrect secretCode');
      }
    };
    
  


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete {entity}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="adminPassword">
          <Form.Label>Enter Admin Secret Code:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Back
        </Button>
        <Button  disabled={submitting}variant="primary" onClick={handleConfirm}>
          {submitting?<Spinner size='sm'/>:'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

