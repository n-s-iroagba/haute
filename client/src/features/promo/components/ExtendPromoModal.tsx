import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { ExtendPromoFormModalProps } from "../types/types";
import { hasEmptyKey } from "../../../common/utils/utils";
import { patchPromo } from "../helpers/promoApiHelpers";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { ExtendPromoDto } from "../../../../../common/promoTypes";

const ExtendPromoFormModal: React.FC<ExtendPromoFormModalProps> = ({
  show,
  id,
}) => {
  const [formData, setFormData] = useState<ExtendPromoDto | null>(null);
  const [modalShow, setModalShow] = useState<boolean>(show);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    setModalShow(show);
  }, [show]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setFormData({ id: id, days: Number(value) });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();

    let shouldNotSubmit = !formData || hasEmptyKey(formData);
    if (shouldNotSubmit) {
      setErrorMessage("Kindly fill in the form appropriately");
      return;
    }
    setSubmitting(true);

    try {
      await patchPromo(formData);
      setModalShow(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error trying to extend promo days");
    } finally {
      setSubmitting(false);
    }
  };

  const onHide = () => {
    setModalShow(false);
    window.location.reload();
  };

  return (
    <Modal show={modalShow} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Extend Promo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDays">
            <Form.Label>Number of Days</Form.Label>
            <Form.Control
              type="number"
              name="days"
              value={formData?.days}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <br />

          <Button disabled={submitting} variant="primary" type="submit">
            {submitting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Extend Promo"
            )}
          </Button>
        </Form>
      </Modal.Body>
      <ErrorMessage message={errorMessage} />
    </Modal>
  );
};

export default ExtendPromoFormModal;
