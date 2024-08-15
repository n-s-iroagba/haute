import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Information from '../../common/components/Information';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from 'react-bootstrap';
import MiniFooter from '../../common/components/MiniFooter';
import { WalletDto } from '../../../../common/walletTypes';
import '../../common/styles/styles.css'
import {  useNavigate } from 'react-router-dom';


const PaymentWalletForm: React.FC = () => {
  const [wallet, setWallet] = useState<WalletDto>({
    id: 0,
    identification: 'no address available',
    identificationType:'',
    currency: 'not available',
    depositMeans:''
  
  })

const navigate = useNavigate()
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(wallet.identification);
      alert('Text copied to clipboard!');
    } catch (error) {
      console.error('Error copying text:', error);
    }
  };
  useEffect(() => {
    const storedWallet = localStorage.getItem('cassockPaymentWallet');
    console.log(storedWallet)

    if (storedWallet) {
      setWallet(JSON.parse(storedWallet));
    
    }
  }, [])

  return (
    <div className='d-flex flex-column pt-3 align-items-center'>
      <Information center head={'Proceed to make your deposit'} text={'Copy the wallet address and make a transfer, be sure to take note of the *CURRENCY AND BLOCKCHAIN*, in order not to loose your deposit'} icon={faDollarSign} />
      <Form className="form py-5">
        <Form.Group className='mb-4'>
          <Form.Label>Currency:</Form.Label>
          <FormControl
            value={wallet.currency}
            className='px-0 text-center text-light custom-input bg-transparent form-control'

          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>Deposit Means:</Form.Label>
          <FormControl
            value={wallet.depositMeans}
            className='px-0 text-center text-light custom-input bg-transparent form-control'

          />
        </Form.Group>
        {
          wallet.depositMeans === 'CRYPTOCURRENCY' && 
          <Form.Group className='mb-4'>
          <Form.Label>Take note of the currency and Blockchain which is in brackets</Form.Label>
          <FormControl
            value={wallet.currency}
            className='px-0 text-center text-light custom-input bg-transparent form-control'

          />
        </Form.Group>
        }

        <Form.Group  className='mb-4'>
          <Form.Label>Copy Payment {wallet.identificationType}</Form.Label>
          <Form.Control
            type="text"
            value={wallet.identification}
            className='px-0 text-center text-light  bg-transparent form-control'
          />
          <Form.Text className="text-light">
            Click the button to copy the text to the clipboard.
          </Form.Text>
        </Form.Group>
        <div className='d-flex justify-content-center'>
        <button className='button-styles button-width-narrow border-0 text-light' onClick={handleCopyToClipboard} disabled={wallet.identification === ''}>
          Copy to Clipboard
        </button>
        </div>
      </Form>
      <div className='d-flex justify-content-center mt-3'>
        <button className='button-styles button-width-narrow border-0 text-light' onClick={()=>navigate('/dashboard')}>
          Dashboard
        </button>
        </div>
      <MiniFooter/>
    </div>
  );
};

export default PaymentWalletForm;
