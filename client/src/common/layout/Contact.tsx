import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Col, Row } from "react-bootstrap";
import { SocialMediaButton } from "../components/Button";
import { companySupportEmail } from "../../constants/constants";

const Contact = () => {
    return (
        <div>
            <div className="d-flex flex-column align-items-center mt-3">
                <h2 className="text-center">We'll Be Happy To Hear From You.</h2>
                <div className="primary-line mb-3"></div>
            </div>
            <p className="text-center mb-4">Let's talk! We're happy to answer any questions you have.</p>
            <Row className="mb-4 px-4">
                <Col xs={12} md={4}>
                    <div className="d-flex flex-column align-items-center px-4 mb-3">
                        < div ><FontAwesomeIcon icon={faEnvelope} className="my-2 primary-color icon-size" /></div>
                        <div className="text-center">
                            <p className="text-center">{companySupportEmail}</p>
                            <p>We reply immediately in less than 24hrs on week days.</p>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={4}>
                    <div className="d-flex flex-column align-items-center pt-2">
                        < div className="mb-3"><SocialMediaButton /></div>
                        <div className="text-center">
                            <p>Click the icon above to follow us on social media</p>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={4}>
                    <div className="d-flex flex-column align-items-center pt-2">
                        < div ><FontAwesomeIcon icon={faMapMarkerAlt} className="my-2 primary-color icon-size" /></div>
                        <div className="text-center">
                            <p> 1015 15th St NW 6th Floor, Washington, DC, 20005, USA.
                            </p>
                            <p>Monday - Fridays</p>
                            <p>9am- 3pm</p>
                            <p>EDT Timezone</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Contact