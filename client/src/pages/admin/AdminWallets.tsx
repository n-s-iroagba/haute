import React, { useState } from 'react';
import MiniFooter from '../../common/components/MiniFooter';
import WalletForm from '../../features/wallet/layout/WalletForm';
import AdminWalletLayout from '../../features/wallet/layout/AdminWalletLayout';
import '../../common/styles/styles.css'


const AdminWallets: React.FC = () => {
  const [showWallets, setShowWallets] = useState<boolean>(true)

  const handleToggle = () => {
    setShowWallets(!showWallets)

  }
  return (
    <div className='primary-background px-3'>
    <div className=' full-height pt-5'>
          {showWallets ?
           <>
           <div className='d-flex justify-content-center'>
             <button className='button-styles button-width-narrow text-light mb-3' onClick={handleToggle}>Add Wallet</button>
             </div>       
             <AdminWalletLayout />
             
            </>
            :
            <>
          <div className='d-flex flex-column align-items-center'>
            <button className='button-styles button-width-narrow text-light'onClick={handleToggle}>View Wallets</button>
            <WalletForm />
            </div>
              
            </>
          }
               
      </div >
      <MiniFooter primaryVariant />
    </div>
  )

}


export default AdminWallets;
