import React, { useState } from 'react'
import { Form, Col, Spinner } from 'react-bootstrap'
import { required } from '../../auth/components/required'
import ErrorMessage from '../../../common/components/ErrorMessage'
import { useNavigate } from 'react-router-dom'
import '../../../common/styles/styles.css'

import { CreateInvestmentDto } from '../../../../../common/compositeTypes'

import useGetInvestmentCreationData from '../hooks/useGetInvestmentCreationData'
import { createInvestment } from '../helpers/investmentApiHelpers'
import { findManagerWithHighestMinInvestment } from '../helpers/investmentHelpers'
import { ManagerDto } from '../../../../../common/managerType'



const WAValidator = require('multicoin-address-validator')


const NewInvestmentForm: React.FC<{ username: string, id: number }> = ({ username, id }) => {
  const [submitting, setSubmitting] = useState(false)


  const [walletVerified, setWalletVerified] = useState<boolean>(true)
  const [amount, setAmount] = useState(0)
  const [validated, setValidated] = useState<boolean>(false);
  const [smallAmount, setSmallAmount] = useState<boolean>(false);
  const [address, setAddress] = useState('')

  const [investmentData, setInvestmentData] = useState<CreateInvestmentDto>({
    wallet:{
      identification: '',
      currency: null,
      identificationType:'CRYPTOCURRENCY WALLET',
      depositMeans:'CRYPTOCURRENCY'
    },
    managerId: 0,
    amount: 0
  });


  const navigate = useNavigate();

  const { wallets, managers, selectedManager, setSelectedManager, errorMessage, setErrorMessage } = useGetInvestmentCreationData()


  const handleAmountChange = (e: any) => {
    setSelectedManager(null)
    setAmount(e.target.value)
    const manager:ManagerDto|null = findManagerWithHighestMinInvestment(managers, e.target.value)
   

    if (manager !==null) {
      setInvestmentData({
        ...investmentData,
        amount: e.target.value,
        managerId: manager?.id
      });
      setSelectedManager(manager)
      setSmallAmount(false)
    } else {
      setInvestmentData({
        ...investmentData,
        amount: e.target.value,
        managerId: 0
        
      });
      setSmallAmount(true)
    }
  }
  const handleWalletChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInvestmentData((prevData: CreateInvestmentDto) => ({
      ...prevData,
      wallet: {
        ...prevData.wallet,
        depositMeans: e.target.value
      }
    }));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInvestmentData((prevData: CreateInvestmentDto) => ({
      ...prevData,
      wallet: {
        ...prevData.wallet,
        currency: e.target.value
      }
    }));
  };

  const verifyAddress = (address: any) => {
    return WAValidator.validate(address)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    try {
      setAddress(value)
      setWalletVerified(verifyAddress(value))
      if (walletVerified) {
        setInvestmentData((prevData: CreateInvestmentDto) => ({
          ...prevData,
          wallet: {
            ...prevData.wallet,
            identification: value
          }
        }));
      }
    } catch (e: any) {
      console.error(e)
      setErrorMessage('The address provided is invalid');
    }
  }

  const submitInvestment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(investmentData)
  
    const form = event.currentTarget;
    let shouldSubmit: boolean = true;

    if (form.checkValidity() === false  || smallAmount) {
      setValidated(false);
      shouldSubmit = false;
      event.stopPropagation();
    } else {
      setValidated(true);
    }

    if (shouldSubmit) {
      setSubmitting(true);
      try {

        const response = await createInvestment(investmentData, id);
        if (response && response.status === 200) {
          console.log(response.data);
          localStorage.setItem('cassockPaymentWallet', JSON.stringify(response.data));
          navigate('/invest/payment');
        }
      } catch (error: any) {
        
        console.error(error);
        setErrorMessage('We are sorry, we cannot create new Investment portfolio at this time');
      
      } finally {
        setSubmitting(false);
      }
    }
  };


  return (
    <>
    <h6 className='text-center w-100'>*{`${username}'s`} first portfolio*</h6>
    <Form className="form py-5" noValidate validated={validated} onSubmit={submitInvestment}>
      <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
        <Form.Label>Investment Amount (in USD) {required}</Form.Label>
        <Form.Control
          required
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => handleAmountChange(e)}
          className="custom-input bg-transparent form-control text-light"
        />
      </Form.Group>
      <br />
      <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
        <Form.Label className='mb-0'>Investment Manager{required}</Form.Label>
        <Form.Control
          type="text"
          value={selectedManager?`${selectedManager.firstName} ${selectedManager.lastName}`:''}
           
          className="custom-input bg-transparent form-control text-light"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="validationFormik04">
            <Form.Label>Preferred Deposit Means{required}</Form.Label>
            <Form.Select onChange={(e) => handleWalletChange(e)} value={investmentData.wallet.depositMeans}>
              <option value="">Select means of fund deposit</option>
              {wallets.map((wallet, index) => (
                <option key={index} value={wallet.depositMeans} className='text-dark'>
                  {wallet.depositMeans}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

       {   investmentData.wallet.depositMeans === 'CRYPTOCURRENCY' && (
      <>
        <Form.Group className="mb-1" controlId="validationFormik04">
          <Form.Label>Crypto Currency{required}</Form.Label>
          <Form.Select onChange={handleCurrencyChange} value={investmentData.wallet.currency || ''}>
            <option value="">Select Deposit Crypto Currency...</option>
            {wallets
              .filter(wallet => 
                wallet.identificationType === 'CRYPTOCURRENCY WALLET' && 
                wallet.depositMeans === 'CRYPTOCURRENCY'
              )
              .map((wallet, index) => (
                <option key={index} value={wallet.currency} className='text-dark'>
                  {wallet.currency}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
      </>
      )}
      <br />
    <Form.Group as={Col} lg="12" controlId="validationFormik04">
        <Form.Label>  {investmentData.wallet.depositMeans === 'CRYPTOCURRENCY'?'Wallet Address':<small className='text-center'>Tag or email address of deposit means entered previously for easy identification.</small>}</Form.Label>
        <Form.Control
          required
          type="text"
          name="address"
          value={address}
          onChange={handleAddressChange}
          className="custom-input bg-transparent form-control text-light"
        />
        <Form.Text className='text-light'>
          *This is to ensure you are credited and that you receive your returns on investment with ease.
        </Form.Text>
      </Form.Group>
       
      <br />
      <div className='d-flex justify-content-evenly w-100'>
        <button className='button-styles w-50 text-light' type='submit'>
          {submitting ? <Spinner animation='border' size='sm' /> : 'Submit'}
        </button>
        <button className='button-styles text-light w-50' onClick={() => navigate('/dashboard')} type='button'>
          Dashboard
        </button>
      </div>
    </Form>
    <ErrorMessage message={errorMessage} />
  </>

  );
};

export default NewInvestmentForm;
