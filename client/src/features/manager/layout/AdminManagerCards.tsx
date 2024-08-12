import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ManagerDto } from '../../../../../common/managerType';
import '../../../common/styles/styles.css'
import ManagerCard from '../../../common/components/ManagerCard';
import DeleteModal from '../../../common/components/DeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../../common/components/ErrorMessage'
import useGetManagers from '../../../common/hooks/useGetManagers';



export const MoveToPatchManager: React.FC<{ manager: ManagerDto }> = ({ manager }) => {
  const navigate = useNavigate();

  const handleInvestClick = () => {
    localStorage.setItem('cassockManager', JSON.stringify(manager.id));
    navigate('/patch-manager');
  };

  return (
    <button onClick={handleInvestClick} className='button-styles'>
      <div>Update This Manager</div>
      <div><FontAwesomeIcon icon={faDollarSign} beatFade /></div>
    </button>
  );
};


const AdminManagerCards: React.FC = () => {
  const [idToBeDeleted, setIdToBeDeleted] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {managers, errorMessage} = useGetManagers()

  const handleDelete = (id: number) => {
    setShowDeleteModal(true);
    setIdToBeDeleted(id);
  };

  return (
    <div>
      {managers.length > 0 ? (
        <>
          <h3 className='text-center mt-4 text-light'>
            Your Managers
          </h3>
          <Row className='d-flex justify-content-center mt-2 gy-3'>
            {managers.map((manager:ManagerDto) => (
              <Col key={manager.id} xs={12} md={6} lg={3}>
                <ManagerCard
                  {...manager}
                  button={<MoveToPatchManager manager={manager} />}
                  deleteButton={<button className='red-button' onClick={() => handleDelete(manager.id)}>
                    Delete Manager
                  </button>}/>
              </Col>
            ))}
          </Row>
          <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='manager' />
        </>
      ) : (
        <>
          <h3 className='text-center mt-4 text-light'>
            No Managers yet, kindly add a manager.
          </h3>
          <ErrorMessage message={errorMessage} />
        </>
      )}
    </div>
  );
}

export default AdminManagerCards;
