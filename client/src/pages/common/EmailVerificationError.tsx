import React from 'react';
import {  useNavigate } from 'react-router-dom';
import '../../common/styles/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMultiply } from '@fortawesome/free-solid-svg-icons';


const EmailVerificationError: React.FC= () => {
  const navigate = useNavigate()
  return (
    <div className="mt-4 email-verified-container d-flex flex-column align-items-center">
      <FontAwesomeIcon icon={faMultiply}/>
      <h2 className='text-center'>Email Verification Error</h2>
      <p className='text-center'> An Error occured while attempting to verify your mail.</p>
      <p className='text-center'>Kindly attempt sign in up with a different mail.</p>
      <button className = 'button-styles button-width-narrow' onClick={()=>navigate('/signup')}>Sign Up</button>
    </div>
  );
};





  export default EmailVerificationError;
