import { Button, ListGroup, Modal } from "react-bootstrap";
import { NotificationDto } from "../../../../../common/notificationType";

interface NotificationsModalProps {
  show: boolean;
  onHide: () => void;
  notifications: NotificationDto[];
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ show, onHide, notifications }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="scrollable-list-group">
          <ListGroup>
            {notifications.map((notification, index) => (
              <ListGroup.Item key={index}>
                <h5>{notification.title}</h5>
                <p>{notification.message}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NotificationsModal;
