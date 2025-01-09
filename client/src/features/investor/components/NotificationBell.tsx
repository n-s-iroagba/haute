import React from "react";
import { Dropdown, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const notifications: string[] = [
  "New message from Taylor Swift",
  "Ed Sheeran accepted your video call request",
  "Upcoming phone call with Justin Bieber",
];

export function NotificationBell(): JSX.Element {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="div"
        className="d-inline-block position-relative"
        id="notification-bell"
      >
        <Button variant="link" className="p-0">
          <FontAwesomeIcon icon={faBell} size="lg" />
        </Button>
        {notifications.length > 0 && (
          <Badge
            bg="danger"
            pill
            className="position-absolute top-0 start-100 translate-middle"
          >
            {notifications.length}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Dropdown.Item key={index} className="text-wrap">
              {notification}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item className="text-muted">No notifications</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default NotificationBell;