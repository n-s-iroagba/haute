import React, {useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../../common/styles/styles.css'
import EditWalletModal from '../components/EditWalletModal';
import DeleteModal from '../../../common/components/DeleteModal';
import WalletCard from  '../components/WalletCard'

import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../../common/components/ErrorMessage';

import { WalletDto } from '../../../../../common/walletTypes';
import useGetAdminWallets from '../hooks/useGetAdminWallet';
import LoadingSpinner from '../../../common/components/LoadingSpinner';


const AdminWalletLayout = () => {
  const [showModal, setShowModal] = useState(false)

  const [walletToBeEdited, setWalletToBeDeleted] = useState<WalletDto|null>(null)
  const [idToBeDeleted, setIdToBeDeleted] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const navigate = useNavigate()

  const {wallets, errorMessage}  = useGetAdminWallets()
  const handleEdit = (wallet: WalletDto) => {
    setShowModal(true)
    setWalletToBeDeleted(wallet)
  }

  const handleDelete = (id: number) => {
    setShowDeleteModal(true)
    setIdToBeDeleted(id)

  }
  return (
    <section>
    <ErrorMessage message={errorMessage} />
    {wallets === null ? (
      <LoadingSpinner primaryBackground />
    ) : wallets.length > 0 ? (
      <>
        {walletToBeEdited && <EditWalletModal data={walletToBeEdited} show={showModal} />}
        <Row className='d-flex justify-content-center gx-2'>
          {wallets.map((wallet, index) => (
            <Col className=' d-flex justify-content-center' xs={1} md={4}>
            <WalletCard
              key={wallet.id}
              currency={wallet.currency}
              identificationType={wallet.identificationType}
              identification={wallet.identification}
              depositMeans={wallet.depositMeans}
              deleteButton={<button className='red-button button-width-narrow' onClick={() => handleDelete(wallet.id)}>Delete</button>}
              editButton={<button className='button-styles button-width-narrow' onClick={() => handleEdit(wallet)}>Edit</button>} 
            />
            </Col>
          ))}
        </Row>
      </>
    ) : (
      <>
        <h2 className='text-light text-center'>No Wallets Added yet.</h2>
        <div className='d-flex justify-content-center'>
          <button className='button-width-narrow button-styles my-4 text-light' onClick={() => navigate('/admin/dashboard')}>
            Dashboard
          </button>
        </div>
      </>
    )}
    <DeleteModal id={idToBeDeleted} show={showDeleteModal} entity='wallet' />
  </section>
  )
}
export default AdminWalletLayout

