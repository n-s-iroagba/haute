import React from 'react';
import { Card } from 'react-bootstrap';
import { WalletCardProps } from '../types/props/props'; // Adjust path as needed
import '../../../common/styles/styles.css';

const WalletCard: React.FC<WalletCardProps> = ({
  currency,
  identificationType,
  identification,
  depositMeans,
  editButton,
  deleteButton,
}) => {
  return (
    
      <Card className='shade round-card my-1 w-100'>
        <Card.Body className='px-2'>
          <div className='mb-3'>
            <small>Currency:</small>
            <Card.Text>{currency}</Card.Text>
          </div>
          <div className='mb-3'>
            <small>Identification Type:</small>
            <Card.Text>{identificationType}</Card.Text>
          </div>
          <div className='mb-3'>
            <small>Identification:</small>
            <Card.Text>{identification}</Card.Text>
          </div>
          <div className='mb-3'>
            <small>Deposit Means:</small>
            <Card.Text>{depositMeans}</Card.Text>
          </div>
          <div className='d-flex flex-column align-items-center'>
          {editButton}
          {deleteButton}
          </div>
        </Card.Body>
      </Card>
    
  );
};

export default WalletCard;



