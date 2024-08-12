import React, { useEffect, useState } from 'react';


import { useNavigate } from 'react-router-dom';
import SignUp from '../pages/investor/SignUp';
import { getLoginDecodedToken } from '../features/auth/helpers/helper';
import { DecodedLoginToken } from '../../../common/authTypes';

const PrivateRoute: React.FC<{ Component: React.FC<any> }> = ({ Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [username,setUsername] = useState<string>('')
  const [id,setId]= useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token')
    if (token) {
      localStorage.setItem('cassockJwtToken', token);
      localStorage.setItem('cassockVerified', 'true');
    }
    const authData:DecodedLoginToken|null = getLoginDecodedToken()
    if (authData) {
        setUsername(authData.username)
        setId(authData.id)
        setIsAuthenticated(true)
      }else{
      navigate('/login')
    }
  
  }, [navigate])

  return (
    isAuthenticated ? (
      <Component username={username} id={id}/> 
    ) : (
      <SignUp />
    )
  );
};

export default PrivateRoute;