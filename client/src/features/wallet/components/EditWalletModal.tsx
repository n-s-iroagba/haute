import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { WalletDto } from "../../../../../common/walletTypes";
import { patchWallet } from "../../wallet/helpers/walletHelper";
import { Spinner } from "react-bootstrap";
import { hasEmptyKey } from "../../../common/utils/utils";

const EditWalletModal: React.FC<{ data: WalletDto; show: boolean }> = ({
  data,
  show,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(show);
  const [walletData, setWalletData] = useState<WalletDto>(data);
  const [submiting, setSubmiting] = useState<boolean>(false);

  useEffect(() => {
    setShowModal(show);
    setWalletData(data)
  }, [data, show]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    let shouldNotSubmit = hasEmptyKey(walletData);
    try {
      if (walletData||!shouldNotSubmit) {
        setSubmiting(true);
        await patchWallet(walletData);
      } else {
        alert("Kindly Fill in the form.");
      }
    } catch (error: any) {
      setError("Sorry an error occured while attempting to edit wallet");
    } finally {
      setSubmiting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === 'currency'){
      value = value.toUpperCase()
     }
    setWalletData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update {data.depositMeans} identification (wallet or tag or email)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="adminPassword">
          <Form.Control
            type="text"
            placeholder="enter new address"
            value={walletData.identification}
            name="identification"
            onChange={handleChange}
          />
          {error && <Form.Text className="text-danger text-center">{error}</Form.Text>}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className ='button-width-narrower'variant="primary" disabled={submiting} onClick={handleConfirm}>
          {submiting ? <Spinner variant="light" size="sm" /> : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditWalletModal;
