import React, { useState } from "react";
import { Row, Col, Offcanvas, Container } from "react-bootstrap";
import DashboardSidebar from "../../features/investor/components/DashboardSidebar";
import FinancialCard from "../../features/investor/components/FinancialCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NotificationBell from "../../features/investor/components/NotificationBell";
import SmallFinancialCharts from "../../features/investor/components/SmallFinancialCharts";
import { getGreeting } from "../../features/investment/utils/utils";
import useGetInvestment from "../../hooks/useGetInvestment";
import Logo from "../../common/components/Logo";
import image from '../../assets/logo/blacklogo.png'
const Dashboard: React.FC<{ username: string; id: number }> = ({ username = "User", id }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { earnings = 0, amountInvested = 0, periodInDays = 0 } = useGetInvestment(id);

  const amount = earnings + amountInvested;
  const percentage = amountInvested > 0 ? (earnings / amountInvested) * 100 : 0;

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  return (
    <div className="d-flex flex-column flex-lg-row min-vh-100 bg-light">
      <div className="d-flex justify-content-center">
        <Logo logoImage={image}/>
      </div>
      {/* Sidebar for larger screens */}
      <div className="d-none d-lg-block">
        <DashboardSidebar />
      </div>

      {/* Toggleable Sidebar for small screens */}
      <Offcanvas show={showSidebar} onHide={toggleSidebar} className="d-lg-none">
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DashboardSidebar />
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <div className="flex-grow-1 p-3">
        <div className="d-flex justify-content-between align-items-center">
          <FontAwesomeIcon
            className="d-lg-none"
            icon={faBars}
            onClick={toggleSidebar}
            role="button"
            aria-label="Toggle Sidebar"
            size="2x"
          />
          <div>
            <p className="mb-0">{`${getGreeting()},`}</p>
            <h1 className="fw-bold text-dark">{username}</h1>
          </div>
          <NotificationBell />
        </div>

        <Container fluid className="mt-3">
          <Row className="gy-4">
            <Col md={6} lg={4}>
              <FinancialCard title="Amount Deposited" amount={amountInvested} percentage={percentage} />
            </Col>
            <Col md={6} lg={4}>
              <FinancialCard title="Earnings" amount={earnings} periodInDays={periodInDays} percentage={percentage} />
            </Col>
            <Col md={6} lg={4}>
              <FinancialCard title="Account Balance" amount={amount} />
            </Col>
          </Row>
          <SmallFinancialCharts />
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
