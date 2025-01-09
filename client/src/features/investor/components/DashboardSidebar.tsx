import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faDollarSign,
  faUser,
  faChartPie,
  faArrowDown,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

interface NavigationItem {
  title: string;
  icon: JSX.Element;
  url: string;
}

const navigationItems: NavigationItem[] = [
  { title: "Help", icon: <FontAwesomeIcon icon={faCircleQuestion} />, url: "/help" },
  { title: "Invest", icon: <FontAwesomeIcon icon={faDollarSign} />, url: "/invest" },
  { title: "Profile", icon: <FontAwesomeIcon icon={faUser} />, url: "/profile" },
  { title: "Portfolio", icon: <FontAwesomeIcon icon={faChartPie} />, url: "/portfolio" },
  { title: "Withdraw", icon: <FontAwesomeIcon icon={faArrowDown} />, url: "/withdraw" },
  { title: "Transactions", icon: <FontAwesomeIcon icon={faClockRotateLeft} />, url: "/transactions" },
];

export function DashboardSidebar(): JSX.Element {
  return (
    <Navbar bg="light" className="flex-column align-items-start p-3" style={{ height: "100vh" }}>
      <Navbar.Brand className="mb-4">Actions</Navbar.Brand>
      <Nav className="flex-column w-100">
        {navigationItems.map((item) => (
          <Nav.Link
            key={item.title}
            href={item.url}
            className="d-flex align-items-center gap-2 text-dark"
          >
            {item.icon}
            <span>{item.title}</span>
          </Nav.Link>
        ))}
      </Nav>
    </Navbar>
  );
}
export default DashboardSidebar;