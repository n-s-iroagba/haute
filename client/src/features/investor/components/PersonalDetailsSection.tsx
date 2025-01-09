import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner, Modal } from "react-bootstrap";


interface PersonalDetailsProps {
  details: {
    firstName: string;
    middleName?: string;
    surname: string;
    dob: string;
    country: string;
    phone: string;
    occupation: string;
  };
  onSave: (updatedDetails: PersonalDetailsProps["details"]) => Promise<{ status: string; message: string }>;
}

const PersonalDetailsSection: React.FC<PersonalDetailsProps> = ({ details, onSave }) => {
  const [editable, setEditable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<{ status: string; message: string } | null>(null);
  const [formData, setFormData] = useState(details);

  // Toggle Editable State
  const handleEditClick = () => setEditable(true);

  // Save Details
  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      const response = await onSave(formData);
      setModalMessage(response);
    } catch (error) {
      setModalMessage({ status: "Error", message: "Something went wrong. Please try again!" });
    } finally {
      setIsSaving(false);
      setEditable(false);
      setShowModal(true);
    }
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "dob" && !isOlderThan18(value)) {
      setModalMessage({
        status: "Error",
        message: "Date of birth indicates the user is under 18. Please select a valid date.",
      });
      setShowModal(true);
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Helper to Check Age
  const isOlderThan18 = (dob: string): boolean => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    return age > 18 || (age === 18 && monthDifference >= 0);
  };

  return (
    <>
     {editable ? (
          <Button variant="success" onClick={handleSaveClick} disabled={isSaving}>
            {isSaving ? <Spinner animation="border" size="sm" /> : "Save Details"}
          </Button>
        ) : (
          <Button variant="primary" onClick={handleEditClick}>
            Update Details
          </Button>
        )}
    <Container>
           <div className="mt-4 text-center">
       
      </div>
      <Row className="gy-4">
        {Object.entries(formData).map(([key, value]) => (
          <Col xs={12} md={6} lg={4} key={key}>
            <Form.Group>
              <Form.Label className="fw-bold text-capitalize">{key.replace(/([A-Z])/g, " $1")}</Form.Label>
              <Form.Control
                type={key === "dob" ? "date" : "text"}
                value={value}
                name={key}
                readOnly={!editable}
                onChange={handleInputChange}
                style={{ borderBottom: editable ? "2px solid #007bff" : "none" }}
              />
            </Form.Group>
          </Col>
        ))}
      </Row>

   

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalMessage?.status}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage?.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </>
  );
};

export default PersonalDetailsSection;
