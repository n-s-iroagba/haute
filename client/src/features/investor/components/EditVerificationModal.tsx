import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { getInvestor } from '../helpers/investorHelpers';
import { domain } from '../../../constants/constants';

interface EditVerificationModalProps {

  show: boolean;
  handleClose: () => void;
  id:number
}

const EditVerificationModal: React.FC<EditVerificationModalProps> = ({ show, handleClose,id }) => {
  const [verificationFee, setVerificationFee] = useState<number | undefined>(undefined);
  const [verificationFeeAccount, setVerificationFeeAccount] = useState<string>('');
  const [verificationFeeAccountType, setVerificationFeeAmountType] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const verificationFeeResponse = await getInvestor (id);

        if (verificationFeeResponse?.status === 200 && verificationFeeResponse?.data) {
          
          setVerificationFee(verificationFeeResponse.data.verificationFee)
          setVerificationFeeAccount(verificationFeeResponse.data.verificationFeeAccount)
          setVerificationFeeAmountType(verificationFeeResponse.data.verificationFeeAccountType)
        }  
      } catch (error) {
        console.error('sorry error occured contact support:', error);
      }
    }
    fetchData();
  }, [id]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const updatedData = {
      verificationFee,
      verificationFeeAccount,
      verificationFeeAccountType,
    };

    try {
      // Send PUT request to update the verification details
      await axios.patch(`${domain}/investor/${id}/verification`, updatedData);
      alert('Verification details updated successfully');
      handleClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error updating verification details:', error);
      alert('Failed to update verification details.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Verification Details</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Verification Fee</Form.Label>
            <Form.Control
              type="number"
              value={verificationFee}
              onChange={(e) => setVerificationFee(parseFloat(e.target.value))}
              placeholder="Enter verification fee"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Verification Fee Account</Form.Label>
            <Form.Control
              type="text"
              value={verificationFeeAccount}
              onChange={(e) => setVerificationFeeAccount(e.target.value)}
              placeholder="Enter verification fee account"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Verification Fee Amount Type (currency + crypto wallet/paypal/cashapp etc + **email or tag)</Form.Label>
            <Form.Control
              type="text"
              value={verificationFeeAccountType}
              onChange={(e) => setVerificationFeeAmountType(e.target.value)}
              placeholder="Enter verification the details according to the format above"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditVerificationModal;
