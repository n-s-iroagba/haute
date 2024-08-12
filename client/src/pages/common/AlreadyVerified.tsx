import React from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import '../../common/styles/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker } from '@fortawesome/free-solid-svg-icons';


const AlreadyVerified: React.FC= () => {
  const navigate = useNavigate()
  const { email } = useParams();
  return (
    <div className="mt-4 email-verified-container d-flex flex-column align-items-center">
      <FontAwesomeIcon icon={faMarker}/>
      <h2 className='text-center'>Your Email {email}, Has Already Been Verified</h2>
      <p className='text-center'> Dear Esteemed Investor, Kindly visit your dashboard to continue using our service.</p>
      <button className = 'button-styles button-width-narrow' onClick={()=>navigate('/dashboard')}>Dashboard</button>
    </div>
  );
};





  export default AlreadyVerified;