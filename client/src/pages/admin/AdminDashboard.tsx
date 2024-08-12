import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { faHandHoldingDollar, faWallet, faUser } from '@fortawesome/free-solid-svg-icons';

import MiniFooter from '../../common/components/MiniFooter';
import { useNavigate } from 'react-router-dom';
import '../../common/styles/styles.css'

import Logo from '../../common/components/Logo';
import logo from '../../assets/logo/whitelogo.png'
import DashboardNav, { AdminDashboardBar } from '../../features/investment/components/DashboardNav';
import { logOut } from '../../features/auth/helpers/helper';


const AdminDashboard: React.FC<{ username: string }> = ({ username }) => {
  const navigate = useNavigate();
  const icons = [faUser, faWallet, faUser, faHandHoldingDollar];
  const actions: string[] = ['admin/managers', 'admin/wallets', 'admin/investor-dashboard', 'admin/promo'];
  const texts: string[] = ['Managers', 'Wallets', 'Investors', 'Promo'];



  return (
    <div className='primary-background'>
    <div className='full-height px-5 py-4'>
      <div className='d-flex justify-content-center align-items-center mb-4'><Logo logoImage={logo}/></div>
      <AdminDashboardBar username={username} />
      <Row className="d-flex justify-content-center gy-2 gx-2">
        {texts.map((text, index) => (
          <Col key={text} xs={6} sm={4} md={3}>

                <DashboardNav action={() => navigate('/' + actions[index])} text={text} icon={icons[index]} />
              

          </Col>
        ))}
        <Col xs={12} md={6}>
          <button className='mt-5 button-styles text-light'onClick={()=>logOut(navigate)}>Logout</button>
        </Col>
      </Row>
    </div>
     <MiniFooter primaryVariant={true} />
     </div>
  );
};

export default AdminDashboard