import React, { useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import '../../../common/styles/styles.css'
import { Col, Row } from 'react-bootstrap';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../../../assets/logo/whitelogo.png'
import { getGreeting } from '../utils/utils';
import Logo from '../../../common/components/Logo';
import NotificationsModal from '../../notification/layout/NotificationsModal';
import { getNotifications } from '../../notification/helpers/notificationApiHelpers';
import { NotificationDto } from '../../../../../common/notificationType';
import { markNotificationsAsRead } from '../helpers/notificationHelpers';


export const DashboardBar: React.FC<{ username: string,id:number }> = (props) => {
  const [modalShow, setModalShow] = useState(false);
 const [notifications,setNotifications] = useState<NotificationDto[]>([])


 const [ numberOfNewNotifications,setNumberOfNewNotifications] = useState(0)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        
        
        const notifs = await getNotifications(props.id)
         notifs.length && setNumberOfNewNotifications(notifs.length||0)

        setNotifications(notifs);
      
      } catch (error) {
        console.error('Error loading notifications from localStorage:', error);
      }
    };

    fetchNotifications();
  }, [props.id]);

  const handleNotifications = () => {
    setModalShow(true);
    markNotificationsAsRead(props.id)
  }

  return (
    <Row className="text-light w-100 d-flex align-items-center justify-content-between">
  
<NotificationsModal
  show={modalShow}
  onHide={() => setModalShow(false)}
  notifications={notifications}
/>
      <Col>
        <small className='smallest-font'>{getGreeting() + ','}</small>
        <h3 className='text-wrap'>{props.username}</h3>
      </Col >

      <Col className='d-flex justify-content-center' >  <Logo logoImage={logoImage} /></Col>

      <Col className="d-flex justify-content-end align-items-center">
        <FontAwesomeIcon className='icon' onClick={() => handleNotifications()} icon={faBell} />
        {
          numberOfNewNotifications > 0 &&
          <small className='rounded-circle dash-nav text-center'>+{numberOfNewNotifications}</small>

        }
      </Col>
    </Row>
  );
};




export const AdminDashboardBar: React.FC<{ username: string }> = (props) => {
  return (
    <Row className="d-flex text-light align-items-center w-100">
      <Col className='text-light mb-2' xs={12} md={6}>
        <h6 className='mb-2'>{getGreeting() + ','}</h6>
        <h6 className='text-wrap'>{props.username}</h6>
      </Col>
    </Row>
  );
};


const DashboardNav: React.FC<{ notifIcon?: IconProp, icon: IconProp; text: string; action: () => void }> = (props) => {
  return (
    <div>
      <div onClick={props.action} className="w-100 admin-dash-nav" >
        <FontAwesomeIcon className="nav-icon" icon={props.icon} />
        <p className="dashbutton-text mt-1 text-wrap">{props.text}</p>
      </div>
    </div>
  );
};

export default DashboardNav;


