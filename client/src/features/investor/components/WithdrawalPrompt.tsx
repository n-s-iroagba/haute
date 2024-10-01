
import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';

interface WithdrawalPromptProps {
  account: string; // Account number to display for payment
  verificationFeeRate: number; 
  accountType:string
}

const WithdrawalPrompt: React.FC<WithdrawalPromptProps> = ({accountType, account, verificationFeeRate }) => {
  const [withdrawalAmount, setWithdrawalAmount] = useState<number | null>(null);
  const [verificationFee, setVerificationFee] = useState<number | null>(null);
  const [showVerification, setShowVerification] = useState(false);

  const handleWithdrawAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    setWithdrawalAmount(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawalAmount && withdrawalAmount > 0) {
      const fee = (withdrawalAmount * verificationFeeRate) / 100;
      setVerificationFee(fee);
      setShowVerification(true);
    }
  };

  const handleCloseModal = () => setShowVerification(false);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="withdrawAmount">
          <Form.Label>Enter Withdrawal Amount in USD</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={withdrawalAmount || ''}
            onChange={handleWithdrawAmountChange}
            required
          />
        </Form.Group>
        <br/>
        <div className='d-flex justify-content-center'>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </div>
      </Form>

      {/* Modal to show verification fee and account number */}
      <Modal show={showVerification} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Verification Fee Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {verificationFee !== null && (
            <>
              <Alert variant="info">
                A verification fee of <strong>${verificationFee.toFixed(2)}</strong> is required for this transaction.
              </Alert>
              <Alert variant="info">
               If the verification fee payment has been confirmed then the amount you wish to withdraw {`($${withdrawalAmount})`} will be deposited in your account
              </Alert>
              <Alert variant="warning">
                Please pay the verification fee using {`${accountType}`} to the following : '<strong>{account}</strong>'
              </Alert>
              <Alert variant="info">
               In the case of confusion, kindly contact support.
              </Alert>

            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WithdrawalPrompt;
