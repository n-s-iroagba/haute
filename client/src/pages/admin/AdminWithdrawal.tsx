import React, { useState } from 'react';
import '../../common/styles/styles.css';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faCalendarAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import MiniFooter from '../../common/components/MiniFooter';

interface InvestorWithdrawalProps {
  investorName: string;
  withdrawalAmount: string;
  investedAmount: string;
  investmentDate: Date;
  depositDate: Date;
}

const InvestorWithdrawal: React.FC<InvestorWithdrawalProps> = ({ investorName, withdrawalAmount, depositDate, investmentDate, investedAmount }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h5 className="mb-1 text-center">Congratulations!!!</h5>
        <h5 className="mb-1 text-center">{investorName}</h5>
        <h5 className="mb-1 text-center">Your Withdrawal was successful!!!</h5>
        <div className="d-flex justify-content-center">
          <FontAwesomeIcon icon={faCheck} size="2x" className="text-success" />
        </div>
        <Row className="align-items-center">
          <Col md={6} xs={12} className="text-center">
            <FontAwesomeIcon icon={faDollarSign} className="text-success me-2" />
            <span><strong>Withdrawal: </strong>{withdrawalAmount}</span>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <FontAwesomeIcon icon={faDollarSign} className="text-success me-2" />
            <span><strong>Deposit: </strong>{investedAmount}</span>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-info me-2" />
            <span><strong>Investment Date: </strong>{investmentDate.toDateString()}</span>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-info me-2" />
            <span><strong>Withdrawal Date: </strong>{depositDate.toDateString()}</span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

interface Person {
  name: string;
  surname: string;
  investmentDate: Date;
  depositDate: Date;
  amountDeposited: number;
  amountReceived: number;
}

const AdminWithdrawal: React.FC = () => {
  const [person, setPerson] = useState<Person>({
    name: '',
    surname: '',
    amountDeposited: 0,
    amountReceived: 0,
    investmentDate: new Date(),
    depositDate: new Date(),
  });
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: name.includes("amount") ? Number(value) : value,
    }));
  };

  const handleDateChange = (name: keyof Pick<Person, 'investmentDate' | 'depositDate'>, date: Date) => {
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: date,
    }));
  };

  const handleShowModal = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedPerson(person);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
    setShowModal(false);
  };

  return (
    <div>
      <div className="px-4 full-height">
        <h3 className="text-center">Add Investor Withdrawal</h3>
        <Form onSubmit={handleShowModal} className="mb-4">
          <Form.Group controlId="formName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              required
              name="name"
              value={person.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter surname"
              required
              name="surname"
              value={person.surname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAmountDeposited">
            <Form.Label>Amount Deposited</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter deposited amount"
              required
              name="amountDeposited"
              value={person.amountDeposited}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAmountReceived">
            <Form.Label>Amount Received</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter received amount"
              required
              name="amountReceived"
              value={person.amountReceived}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formInvestmentDate">
            <Form.Label>Investment Date</Form.Label>
            <Form.Control
              type="date"
              required
              value={person.investmentDate.toISOString().substring(0, 10)}
              onChange={(e) => handleDateChange('investmentDate', new Date(e.target.value))}
            />
          </Form.Group>
          <Form.Group controlId="formDepositDate">
            <Form.Label>Withdrawal Date</Form.Label>
            <Form.Control
              type="date"
              required
              value={person.depositDate.toISOString().substring(0, 10)}
              onChange={(e) => handleDateChange('depositDate', new Date(e.target.value))}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Investor
          </Button>
        </Form>

        {selectedPerson && (
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Investor Withdrawal Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InvestorWithdrawal
                investorName={`${selectedPerson.name} ${selectedPerson.surname}`}
                investedAmount={`$${selectedPerson.amountDeposited.toLocaleString()}`}
                withdrawalAmount={`$${selectedPerson.amountReceived.toLocaleString()}`}
                investmentDate={selectedPerson.investmentDate}
                depositDate={selectedPerson.depositDate}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      <MiniFooter />
    </div>
  );
};

export default AdminWithdrawal;
