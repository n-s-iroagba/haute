import React from "react";
import { Col, Row } from "react-bootstrap";
import image1 from "../../../assets/awards/award1.png";
import image2 from "../../../assets/awards/award2.png";
<<<<<<< HEAD
import image3 from "../../../assets/awards/award4.png";
import image4 from "../../../assets/awards/award5.png";
import "../../../common/styles/styles.css";
const awards = [image3, image1, image2, image4];
=======
import image3 from "../../../assets/awards/award3.png";

import "../../../common/styles/styles.css";
const awards = [image1, image2, image3,];
>>>>>>> 0d01e79 (initial commit)

const Awards: React.FC = () => {
  return (
    <div className="d-flex flex-column align-items-center px-4 py-4 ">
      <h4>Awards</h4>
      <div className="primary-line mb-2"></div>
<<<<<<< HEAD
      <Row>
=======
      <Row className="d-flex justify-content-center">
>>>>>>> 0d01e79 (initial commit)
        {awards.map((award: any, index: number) => (
          <Col
            key={index}
            xs={12}
<<<<<<< HEAD
            md={6}
            lg={3}
            className="gx-3 primary-background border border-white "
          >
            <img
              className="p-1"
=======
            md={4}
            lg={4}
            className="gx-3 primary-background border border-white "
          >
            <img
              className=""
>>>>>>> 0d01e79 (initial commit)
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              src={award}
              alt="award"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Awards;
