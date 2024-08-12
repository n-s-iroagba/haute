import React from "react";
import Header from "../../features/home/layout/Header";
import { TickerTape, } from "react-ts-tradingview-widgets";
import Steps from "../../features/home/layout/Steps";
import SecurityAssurance from "../../features/home/layout/SecurityAssurance";
import Contact from "../../common/layout/Contact";
import Testimonial from "../../features/home/layout/Testimonial";
import Awards from "../../features/home/layout/Awards";
import OfficeMap from "../../features/home/layout/OfficeMap";
import Introduction from "../../features/home/layout/Introduction";
import Footer from "../../features/home/layout/Footer";
import Counter from "../../features/home/layout/Counter";
import Chart from "../../features/home/layout/Chart";
import ManagerCards from "../../common/layout/ManagerCards";
import '../../common/styles/styles.css'
import ReferAndEarn from "../../features/home/layout/Referrals";
import Certificate from "../../features/home/layout/Certificate";
import PromoAdvert from "../../features/home/layout/PromoAdvert";
import NavbarComponent from "../../common/components/NavbarComponent";
import useAppLoaded from "./hooks/useApploaded";
import LoadingSpinner from "../../common/components/LoadingSpinner";
const Home: React.FC = () => {


   const isLoaded = useAppLoaded()

  return (
    <>
      {!isLoaded ? (
        <LoadingSpinner fullheight />
      ) : (
        <>
          <NavbarComponent />
          <Header />
          <TickerTape colorTheme="light" />
          <Introduction />
          <SecurityAssurance />
          <Counter />
          <Testimonial />
          <Awards />
          <Certificate />
          <Steps />
          <PromoAdvert />
          <ManagerCards text="Select your investment tier and portfolio manager" />
          <ReferAndEarn />
          <Chart />
          <Contact />
          <OfficeMap />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;