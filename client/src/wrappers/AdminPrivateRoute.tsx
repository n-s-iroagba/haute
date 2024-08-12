import React, { useEffect, useState } from 'react';
import AdminSignUp from '../pages/admin/AdminSignUp';
import { useNavigate } from 'react-router-dom';
import { Role } from '../features/auth/types/authTypes';
import { DecodedLoginToken } from '../../../common/authTypes';
import {  getLoginDecodedToken } from '../features/auth/helpers/helper';

const AdminPrivateRoute: React.FC<{ Component: React.FC<any> }> = ({ Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [username,setUsername] = useState<string>('')

  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token')
    if (token) {
      localStorage.setItem('cassockJwtToken', token);
      localStorage.setItem('cassockVerified', 'true');
    }
    const authData:DecodedLoginToken|null = getLoginDecodedToken()
    if (authData && authData.role ===Role.ADMIN) {
        setUsername(authData.username)
      
        setIsAuthenticated(true)
      }else{
      navigate('/login')
    }
  
  }, [navigate])

  return (
    isAuthenticated ? (
      <Component username={username} /> // Pass the name prop to AdminDashboard
    ) : (
      <AdminSignUp />
    )
  );
};

export default AdminPrivateRoute;