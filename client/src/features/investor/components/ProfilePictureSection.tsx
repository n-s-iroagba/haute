import React, { useState } from "react";
import { Alert, Container, Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ReactCrop, { Crop } from "react-image-crop";
import axios from "axios";
import "react-image-crop/dist/ReactCrop.css";
import "../styles/ProfilePictureSection.css";

const ProfilePictureSection: React.FC<{image:string|null}> = ({image}) => {
  const [profileImage, setProfileImage] = useState<string | null>(image);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height:50,
    x: 0,
    y: 0,
  });
  const [imageToCrop, setImageToCrop] = useState<HTMLImageElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          setImageToCrop(img);
          setShowModal(true);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async () => {
    if (imageToCrop && crop.width && crop.height) {
      // Create a new canvas each time
      const canvas = document.createElement("canvas");
  
      // Scale the cropping area based on the image's natural size
      const scaleX = imageToCrop.naturalWidth / imageToCrop.width;
      const scaleY = imageToCrop.naturalHeight / imageToCrop.height;
  
      // Set the canvas size based on the crop dimensions
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
  
      const ctx = canvas.getContext("2d");
  
      if (ctx) {
        // Clear any previous content in the canvas (optional)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Draw the cropped section onto the canvas
        ctx.drawImage(
          imageToCrop,
          crop.x * scaleX, // Crop start position on x-axis
          crop.y * scaleY, // Crop start position on y-axis
          crop.width * scaleX, // Width of the cropped area
          crop.height * scaleY, // Height of the cropped area
          0, 0, canvas.width, canvas.height // Drawing position on the canvas
        );
  
        // Convert the canvas to a base64 image
        const croppedBase64 = canvas.toDataURL("image/jpeg");
  
        // Hide the modal after crop
        setShowModal(false);
  
        // Simulate API call
        setLoading(true);
        try {
          await axios.post("https://api.example.com/upload", {
            image: croppedBase64,
          });
          setProfileImage(croppedBase64)
        } catch (error) {
          console.error("Error uploading image:", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };


  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col xs="auto" className="text-center">
          <div className="profile-picture-frame">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="profile-picture"
              />
            ) : (
              <div className="placeholder-text">No Image</div>
            )}
            <label className="camera-icon-btn">
              <FontAwesomeIcon icon={faCamera} />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageSelect}
              />
            </label>
          </div>
          <div className="mt-3">
            {loading ? (
              <Spinner animation="border" role="status" />
            ) : !profileImage ? (
              <Alert variant="danger">Kindly upload a profile picture</Alert>
            ) : (
              <Alert variant="success">
                <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                Your profile picture looks cool
              </Alert>
            )}
          </div>
        </Col>
      </Row>

      {/* Cropping Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crop Your Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {imageToCrop && (
            <ReactCrop
          
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel  
          </Button>
          <Button variant="primary" onClick={handleCropComplete}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePictureSection;
