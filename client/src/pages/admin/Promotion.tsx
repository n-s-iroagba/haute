import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PromoFormModal from '../../features/promo/components/PromoFormModal';
import MiniFooter from '../../common/components/MiniFooter';
import ExtendPromoFormModal from '../../features/promo/components/ExtendPromoModal';
import ErrorMessage from '../../common/components/ErrorMessage';
import { PromoDto } from '../../../../common/promoTypes';
import { formatStartDate } from '../../features/investment/utils/utils';
import '../../common/styles/styles.css';
import { getPromo } from '../../features/promo/helpers/promoApiHelpers';
import DeleteModal from '../../common/components/DeleteModal';
import { AdminDashboardButton } from '../../common/components/Button';
import LoadingSpinner from '../../common/components/LoadingSpinner'; // Assuming you have a LoadingSpinner component

const Promotion = () => {
  const [promo, setPromo] = useState<PromoDto | null>(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [showAddPromoModal, setShowAddPromoModal] = useState(false);
  const [showEditPromoModal, setShowEditPromoModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [idToBeDeleted, setIdToBeDeleted] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const receivedPromo = await getPromo();
        setPromo(receivedPromo);
      } catch (error) {
        console.error('Error fetching promo:', error);
        setErrorMessage('Error getting promo from database');
      } finally {
        setLoading(false); // Set loading to false after the API call completes
      }
    };

    fetchPromoData();
  }, []);

  const handleDelete = (id: number) => {
    setShowDeleteModal(true);
    setIdToBeDeleted(id);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="primary-background">
      <div className="d-flex pt-5 flex-column align-items-center text-light full-height">
        {promo === null ? (
          <div>
            <PromoFormModal show={showAddPromoModal} />
            <h4>No active promo</h4>
            <button
              className="button-styles button-width-narrow mt-4 text-light"
              onClick={() => setShowAddPromoModal(true)}
            >
              Create Promo
            </button>
          </div>
        ) : (
          <>
            <ExtendPromoFormModal id={promo.id} show={showEditPromoModal} />
            <div className="px-1">
              <h4 className="text-center">Promo</h4>
              <Card style={{ width: '8cm' }}>
                <Card.Body>
                  <Card.Title className="mb-4">
                    From: {formatStartDate(promo.startDate)}
                  </Card.Title>
                  <Card.Title className="mb-4">
                    To: {formatStartDate(promo.endDate)}
                  </Card.Title>
                  <Card.Title className="mb-4">
                    Bonus Percentage: {promo.bonusPercent}
                  </Card.Title>
                  <button
                    className="button-styles mb-4"
                    onClick={() => setShowEditPromoModal(true)}
                  >
                    Extend Promo
                  </button>
                  <button
                    className="red-button"
                    onClick={() => handleDelete(promo.id)}
                  >
                    Delete
                  </button>
                </Card.Body>
              </Card>
            </div>
          </>
        )}
        <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity="promo" />
        <AdminDashboardButton />
        <ErrorMessage message={errorMessage} />
      </div>
      <MiniFooter primaryVariant />
    </div>
  );
};

export default Promotion;
