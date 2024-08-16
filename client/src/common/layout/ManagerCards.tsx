import React from "react";
import { Row, Col } from "react-bootstrap";
import ManagerCard from "../components/ManagerCard";
import { SelectManagerButton } from "../components/Button";

import useGetManagers from "../hooks/useGetManagers";
import { ManagerDto } from "../../../../common/managerType";
import ErrorMessage from "../components/ErrorMessage";

const ManagerCards: React.FC<{ text?: string }> = ({ text }) => {
  const { managers, errorMessage } = useGetManagers();

  return (
    <>
      <div className="d-flex flex-column align-items-center ">
        <h3 className="text-center mt-4">{text}</h3>
        {text && <div className="primary-line mb-4" />}
      </div>
      <Row className="gx-3 gy-3 px-3 d-flex justify-content-center">
        {managers.map((manager: ManagerDto) => (
          <Col key={manager.id} xs={12} md={6} lg={3}>
            <ManagerCard
              percentageYield={manager.percentageYield}
              image={manager.image}
              firstName={manager.firstName}
              lastName={manager.lastName}
              qualification={manager.qualification}
              minimumInvestmentAmount={manager.minimumInvestmentAmount}
              duration={manager.duration}
              button={<SelectManagerButton managerId={manager.id} />}
            />
          </Col>
        ))}
      </Row>
      <ErrorMessage message={errorMessage} />
    </>
  );
};
export default ManagerCards;
