import React from "react";
import Information from "../../common/components/Information";
import { companyName } from "../../constants/constants";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import image from '../../assets/images/artboard (1).webp'
import MiniFooter from "../../common/components/MiniFooter";
import Contact from "../../common/layout/Contact";
import NavbarComponent from "../../common/components/NavbarComponent";
import '../../common/styles/styles.css'


const AboutUs: React.FC = () => {
    return <>
        <NavbarComponent />
        <div className="d-flex flex-column align-items-center px-5">
            <h1>About Us</h1>
            <div className='primary-line mb-4' />
            <Row>
                <Col xs={12} md={6}><img src={image} className="w-100  " alt='about-us' /></Col>
                <Col>
                    <Information head={''} text={` Welcome to ${companyName}, where your financial success is our top priority. 
                                               With over 10 years of collective experience, our expert investment managers bring a wealth of knowledge and a proven track record across diverse asset classes, including equities, fixed income, 
                                               and alternative investments. We leverage cutting-edge technology and data analytics to uncover opportunities and manage risks, ensuring your investments are poised for growth. 
                                               Our client-centric approach means we tailor strategies to your unique financial goals, maintaining transparency and open communication throughout our partnership. 
                                               At ${companyName}, integrity and excellence guide us in helping you achieve a prosperous future. .`} icon={faCity} />
                    <Contact />
                </Col>
            </Row>
        </div>
        <MiniFooter />
    </>


}
export default AboutUs
