import React from "react";
import "../../../common/styles/styles.css";
import { howWeDoIt, whoWeAre } from "../../../constants/constants";
import { Col, Row } from "react-bootstrap";
import woodenIcon from "../../../assets/images/wooden-icons.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import useIsLargeScreen from "../../../common/hooks/useIsLargeScreen";

const Introduction: React.FC = () => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <>
      <Row className="d-flex align-items-center px-4 pb-3">
        <Col className={`${isLargeScreen ? "" : "pb-4"} `} xs={12} md={6}>
          {" "}
          <img className="w-100" src={woodenIcon} alt="money_bag" />
        </Col>
        <Col>
          <div className="px-4 d-flex flex-column align-items-center">
            <h1>Invest With Ease</h1>
            <div className="primary-line mb-2"></div>
            <p className="text-center">
              {" "}
              Investing has never being easier and safer.
            </p>
            <div className="d-flex flex-column align-items-center pb-2">
              <FontAwesomeIcon
                className="primary-color icon-size"
                icon={faQuestionCircle}
              />
              <h4>Who we are?</h4>
              <p className="text-center">{whoWeAre}</p>
            </div>
            <div className="d-flex flex-column align-items-center pb-2">
              <FontAwesomeIcon
                className="primary-color icon-size"
                icon={faQuestionCircle}
              />
              <h4>How we do it.</h4>

              <p className="text-center">{howWeDoIt}</p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Introduction;
