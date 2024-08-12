import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign} from '@fortawesome/free-solid-svg-icons';
import'../styles/styles.css'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { socialMediaLink } from '../../constants/constants';







export const GetStartedButton:React.FC<{primaryBackground?:boolean}> =({primaryBackground})=>{
  const navigate = useNavigate()
    return<button onClick={()=>navigate('/investment/managers')} className={`${ primaryBackground?'text-light border-0':''} button-styles button-width-narrower`}><span>Get Started</span><span ><FontAwesomeIcon icon={faDollarSign} beatFade/></span></button>
}
export const SelectManagerButton: React.FC<{ managerId?: number }> = ({ managerId }) => {
  const navigate = useNavigate();

  const handleInvestClick = () => {
      localStorage.setItem('cassockNewInvestmentInitmanagerId', JSON.stringify(managerId));
      navigate('/invest');
  };

  return (
      <button onClick={handleInvestClick} className='button-styles'>
          Invest with this Manager
      </button>
  );
};



export const  SocialMediaButton:React.FC = ()=>{
  return<div>
    <a href={socialMediaLink} target="_blank" rel="noopener noreferrer">
  <FontAwesomeIcon icon={faFacebook} className='primary-color icon-size' beatFade/>
</a>

  </div>
}



export const AdminDashboardButton:React.FC =()=>{
  const navigate = useNavigate()
  return <button onClick={()=>{navigate('/admin/dashboard')}} className='button-styles button-width-narrow mt-4 text-light'>
    Dashboard
    </button>
}

