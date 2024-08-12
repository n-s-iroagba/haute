import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import image from "../../../assets/awards/US Certificate of Incorporation.jpg";

const Certificate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="d-flex flex-column align-items-center mb-4">
      {!isModalOpen ? (
        <button
          className="button-styles button-width-narrow px-3"
          onClick={handleModal}
        >
          <div>View Certificate of Incorporation</div>
          <div>
            <FontAwesomeIcon icon={faFile} beatFade />
          </div>
        </button>
      ) : (
        <div>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title className="w-100 text-center">
                Certificate of Incoporation
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="d-flex justify-content-center">
              <img
                className=" certificate-image"
                src={image}
                alt="Certificate of Incorporation"
              />
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-center">
              <Button onClick={handleModal} variant="secondary">
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </div>
  );
};
export default Certificate;
