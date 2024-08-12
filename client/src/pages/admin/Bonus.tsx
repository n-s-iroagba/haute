import React from 'react';
import { Col, Row } from 'react-bootstrap';
import MiniFooter from '../../common/components/MiniFooter';
import PaymentCard from '../../features/payments/components/PaymentCard';
import useGetBonus from './hooks/useGetBonus';
import '../../common/styles/styles.css'


const Bonus = () => {
  const dueBonuses = useGetBonus();
  console.log(dueBonuses);

  return (
    <div className='primary-background full-height'>
      <h2 className='py-3 text-center text-light'>Pending Bonus Payments</h2>
      <Row className='d-flex justify-content-center align-items-center gy-2'>
        {dueBonuses.length > 0 ? (
          dueBonuses.map((dueBonus: any) => (
            <Col key={dueBonus.id} xs={12} md={4} lg={3}>
              <PaymentCard
                amount={dueBonus.amount}
                currency={dueBonus.wallet.currency}
                address={dueBonus.wallet.identification}
                id={dueBonus.id}
                entity='promo'
              />
            </Col>
          ))
        ) : (
          <div className='text-center'>
            <h2 className='text-light'>No Due Bonus Payments.</h2>
           
          </div>
        )}
      </Row>
      <MiniFooter primaryVariant />
    </div>
  );
};

export default Bonus;
