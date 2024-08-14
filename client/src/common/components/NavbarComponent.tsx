import React from 'react';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';
import blacklogo from '../../assets/logo/blacklogo.png';
import Logo from './Logo';
import useIsLargeScreen from '../hooks/useIsLargeScreen';

const NavbarComponent: React.FC = () => {
  const [isIconDisplay,setIsIconDisplay] = useState<boolean>(true)
  const isLargeScreen = useIsLargeScreen()

  const navigate = useNavigate()

  const navLinks = [
    { path: 'about-us', text: 'About Us' },
    { path: 'fund-managers', text: 'Fund Managers' },
  ];
const handleToggele =()=>{
  setIsIconDisplay(!isIconDisplay)
}
  return (
    <Navbar
      onToggle={handleToggele}
      expand="lg"
      className={`bg-body-tertiary ${isLargeScreen ? '' : 'px-4'}`}
    >  
     {(isIconDisplay&&!isLargeScreen) && <div onClick={()=>navigate('/signup') }><FontAwesomeIcon icon = {faUser}/></div>}
        <Navbar.Brand onClick={()=>navigate('/')}><Logo logoImage={blacklogo}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
          <Nav.Link><div onClick={()=>navigate('/signup') }><FontAwesomeIcon icon = {faUser}/></div></Nav.Link>
          {navLinks.map((link, index) => (
        <Nav.Link key={index} className="text-dark" href={link.path}>
          {link.text}
        </Nav.Link>
      ))}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;