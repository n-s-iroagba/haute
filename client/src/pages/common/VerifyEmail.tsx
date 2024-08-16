import React, { useContext, useEffect, useState } from 'react';
import Information from '../../common/components/Information';
import { faMailchimp } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

import { resendVerificationTokenRoute } from '../../constants/constants';
import { getVerificationTokenData } from '../../features/auth/helpers/helper';
import ErrorMessage from '../../common/components/ErrorMessage';
import { Spinner } from 'react-bootstrap';
import '../../common/styles/styles.css'
import { getVerificationToken } from '../../common/utils/apiUtils';
import { AuthContext } from '../../features/auth/context/AuthContext';
import { DecodedVerificationToken } from '../../../../common/authTypes'


const VerifyEmail = () => {
  const [counter, setCounter] = useState(0);
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate();
  const [email, setEmail] = useState<any>();
  const { handleEmailVerification } = useContext<any>(AuthContext)



  useEffect(() => {
    const storedToken = localStorage.getItem('cassockEmailVerificationToken');

    if (!storedToken) {
      alert('You are not authorised to view this page')
      navigate('/signup');
      return;
    }

    const decodedToken: DecodedVerificationToken | null = getVerificationTokenData(storedToken);

    if (!decodedToken) {
      alert('You are not authorised to view this page')
      navigate('/login');
      return;
    }


    setEmail(decodedToken.email);

    const dateString = decodedToken.timeOfCreation;
    const dateObject = new Date(dateString);
    const currentTime = new Date().getTime();
    const dateObjectTime = dateObject.getTime();
    const minutesDifference = (currentTime - dateObjectTime) / (1000 * 60);

    if (minutesDifference > 0) {
      setCounter(600 - Math.floor(minutesDifference * 60));
    } else {
      setCounter(0)
    }

    const interval = setInterval(() => {
      setCounter((prevCounter) => Math.max(0, prevCounter - 1));
      const verificationStatus = localStorage.getItem('cassockVerified')
     
      if (verificationStatus!==null) {
        localStorage.removeItem('cassockVerified')
        localStorage.removeItem('cassockEmailVerificationToken')
       
        navigate(`/already-verified/${email}`)
      }
    }, 1000);

    return () => clearInterval(interval);
  },[email, navigate]);


  const verifyAndUpdateToken = async () => {
    const savedToken = localStorage.getItem('cassockEmailVerificationToken')
    setSubmitting(true)
    try {
      const response = await getVerificationToken(`${resendVerificationTokenRoute}/${email}`, savedToken);
      const shouldReload = true
      if (response.status === 200) {
        handleEmailVerification(response,shouldReload,navigate)
        alert('new mail successfully sent')
      }
    } catch (error) {
      console.error(error)
      setErrorMessage('Sorry we can not refresh your token at this time.')
    } finally {
      setSubmitting(false)
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
      {counter > 0 ? (
        <>
          <Information head='Verify your Email Address' text="Kindly open your registration email ON THIS DEVICE, and verify your email address." icon={faMailchimp} center />
          <p className='text-center py-0 text-nowrap mb-3'>Mail token will expire in {formatTime(counter)} seconds</p>
          <small className='text-center'>Haven't received token yet, resend mail.</small>
        </>
      ) : (

        <Information head='Verify your Email Address' text="The mail token we sent is expired, kindly click the button to receive a new mail" icon={faMailchimp} center />

      )}
      <div className='button-width-narrower my-1'>
        <button className='button-styles' onClick={() => verifyAndUpdateToken()}>{submitting ? <Spinner animation='border' size='sm' /> : 'Resend Mail'}</button>
      </div>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default VerifyEmail;



