
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form,Spinner } from 'react-bootstrap';

import ErrorMessage from '../../../common/components/ErrorMessage';
import { createPromo } from '../../promo/helpers/promoApiHelpers';
import { CreatePromoDto } from '../../../../../common/promoTypes';
import { extractErrorCode, hasEmptyKey } from '../../../common/utils/utils';

interface PromoFormModalProps {
  show: boolean
}

const PromoFormModal: React.FC<PromoFormModalProps> = ({ show }) => {
  const [promoData, setPromoData] = useState<CreatePromoDto|null>(null);
  const [modalShow, setModalShow] = useState<boolean>(show);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setModalShow(show);
  }, [show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPromoData((prevPromoData) => {
      if (prevPromoData) {
        return {
          ...prevPromoData,
          [name]:value,
        };
      } else {
        return {
          startDate: new Date(),
          bonusPercent: 0,
          endDate: new Date(),
          [name]:  value,
        } as CreatePromoDto;
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const shouldNotSubmit = !promoData || hasEmptyKey(promoData);
    if (!shouldNotSubmit){
      setSubmitting(true);
    try {
     await createPromo(promoData); 
      
    } catch (error:any) {
      console.error(error);
      const code = extractErrorCode(error.message)
      if(code === 409){
        setErrorMessage('promo already exists,kindly delete the existing one and try again')
      }else{
      setErrorMessage('error trying to create promo')
      }
    }finally{
      setSubmitting(false)
    }
  };
}

  const onHide = () => {
    setModalShow(false);
    window.location.reload()
  };

  return (
    <Modal show={modalShow} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Promo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={promoData?.startDate && new Date(promoData.startDate).toISOString().split('T')[0]}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </Form.Group>

          <Form.Group controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={promoData?.endDate  && new Date(promoData.endDate).toISOString().split('T')[0]}
              onChange={handleChange}
              min={promoData?.startDate  && new Date(promoData.startDate).toISOString().split('T')[0]}
            />
          </Form.Group>
          <Form.Group controlId="formEndDate">
            <Form.Label>Bonus Percentage</Form.Label>
            <Form.Control
              type="number"
              name="bonusPercent"
              value={promoData?.bonusPercent}
              onChange={handleChange}
              min={1}
            />
          </Form.Group>

          <Button disabled={submitting} variant="primary" type="submit">
          {submitting? <Spinner animation='border' size='sm' /> :'Create Promo'}
          </Button>
        </Form>
        <ErrorMessage message={errorMessage} />
      </Modal.Body>
    </Modal>
  );
};

export default PromoFormModal;
