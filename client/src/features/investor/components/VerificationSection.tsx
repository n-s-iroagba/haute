import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface VerificationSectionProps {
  investor: {
    firstName: string;
    middleName?: string;
    surname: string;
    dob: string;
    country: string;
    phone: string;
    occupation: string;
    governmentIdFront?: string;
    governmentIdBack?: string;
    verificationCode?: string;
    changePasswordField?: string;
  };
}

const VerificationSection: React.FC<VerificationSectionProps> = ({ investor }) => {
  const [governmentIdFront, setGovernmentIdFront] = useState<File | null>(null);
  const [governmentIdBack, setGovernmentIdBack] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [modalMessage, setModalMessage] = useState<{ status: string; message: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Exclude verificationCode and changePasswordField from verification checks
  const fieldsToVerify = { ...investor };
  delete fieldsToVerify.verificationCode;
  delete fieldsToVerify.changePasswordField;

  // Find Empty Fields
  const emptyFields = Object.entries(fieldsToVerify).filter(([_, value]) => !value);

  // Upload Government ID
  const handleUpload = async () => {
    if (!governmentIdFront || !governmentIdBack) {
      setModalMessage({ status: "Error", message: "Both front and back ID images are required." });
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("governmentIdFront", governmentIdFront);
    formData.append("governmentIdBack", governmentIdBack);

    try {
      setIsUploading(true);
      const response = await axios.post("/api/investor/upload-id", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setModalMessage({ status: "Success", message: "Government ID uploaded successfully!" });
    } catch (error: any) {
      setModalMessage({ status: "Error", message: error.response?.data?.message || "Upload failed." });
    } finally {
      setIsUploading(false);
      setShowModal(true);
    }
  };

  // Handle Update of Government ID
  const handleUpdateId = () => {
    setIsUpdating(true);
    setGovernmentIdFront(null);  // Allow the user to select a new file
    setGovernmentIdBack(null);   // Allow the user to select a new file
  };

  return (
    <div className="mt-4">
      <h2>Verification Section</h2>

      {/* Government ID Upload or Display */}
      <Row className="gy-4">
        {investor.governmentIdFront && investor.governmentIdBack ? (
          <>
            <Col xs={12} md={6}>
              <Form.Group controlId="governmentIdFront">
                <Form.Label>Uploaded Front of Government ID</Form.Label>
                <div>
                  <img
                    src={investor.governmentIdFront}
                    alt="Government ID Front"
                    className="img-fluid"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="governmentIdBack">
                <Form.Label>Uploaded Back of Government ID</Form.Label>
                <div>
                  <img
                    src={investor.governmentIdBack}
                    alt="Government ID Back"
                    className="img-fluid"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button variant="secondary" onClick={handleUpdateId}>
                Update Document
              </Button>
            </Col>
          </>
        ) : (
          <>
            <Col xs={12} md={6}>
              <Form.Group controlId="governmentIdFront">
                <Form.Label>Upload Front of Government ID</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e:any) => setGovernmentIdFront(e.target.files ? e.target.files[0] : null)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="governmentIdBack">
                <Form.Label>Upload Back of Government ID</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e:any) => setGovernmentIdBack(e.target.files ? e.target.files[0] : null)}
                />
              </Form.Group>
            </Col>
          </>
        )}
      </Row>
      <div className="mt-3 text-center">
        <Button variant="primary" onClick={handleUpload} disabled={isUploading || isUpdating}>
          {isUploading ? "Uploading..." : "Upload Government ID"}
        </Button>
      </div>
            {/* Verification Status */}
            <div className="row justify-content-center">
      {emptyFields.length > 0 ? (
        <div className="col-12 col-md-6 col-lg-4" >
          <FontAwesomeIcon icon={faTimesCircle} className="text-danger me-2" />
          <strong>Not Verified Yet</strong>
          <ul className="mt-2">
            {emptyFields.map(([key]) => (
              <li key={key} >
              <Alert variant="danger" className="text-capitalize">
                {key.replace(/([A-Z])/g, " $1")} is missing.
                </Alert>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Alert className="col-12 col-md-6 col-lg-4" variant="success">
          <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
          <strong>Verified</strong>
        </Alert>
      )}
    </div>

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
    </div>
  );
};

export default VerificationSection;
