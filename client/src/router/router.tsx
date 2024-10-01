import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/common/Home";

import Login from "../pages/common/Login";
import AboutUs from "../pages/common/AboutUs";
import HowToGuides from "../pages/investor/HowToGuides";
import VerifyEmail from "../pages/common/VerifyEmail";
import Email from "../pages/common/Email";
import NewPassword from "../pages/common/NewPassword";
import Dashboard from "../pages/investor/Dashboard";

import InvestorsDashboard from "../pages/admin/InvestorDashboard";
import CheckMail from "../pages/common/CheckMail";
import InvestmentManagers from "../pages/investor/InvestmentManagers";
import NewInvestment from "../pages/investor/NewInvestment";
import PaymentWalletForm from "../pages/investor/PaymentWalletForm";
import Referrals from "../pages/investor/Referral";
import PatchManager from "../pages/admin/PatchManager";
import Investors from "../pages/admin/Investors";

import AdminReferral from "../pages/admin/AdminReferral";
import AdminWallets from "../pages/admin/AdminWallets";
import Promotion from "../pages/admin/Promotion";
import AdminManager from "../pages/admin/AdminManager";
import Notifications from "../pages/investor/Notifications";
import Portfolio from "../pages/investor/Portfolio";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSignUp from "../pages/admin/AdminSignUp";
import FundManagers from "../pages/common/FundManagers";
import EmailVerificationError from "../pages/common/EmailVerificationError";
import SignUp from "../pages/investor/SignUp";
import AlreadyVerified from "../pages/common/AlreadyVerified";
import PrivateRoute from "../wrappers/PrivateRoute";
import Bonus from "../pages/admin/Bonus";
import AdminPrivateRoute from "../wrappers/AdminPrivateRoute";
import WithdrawalDashboard from "../pages/investor/WithdrawalDashboard";

export const router = createBrowserRouter([

    {
        path: '/',
        element: <Home />
    },
    {
        path: '/signup',
        element: <SignUp/>
    },


    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/about-us',
        element: <AboutUs />
    },
    {
        path: '/enter-email',
        element: <Email />
    },
    {
        path: '/fund-managers',
        element: <FundManagers/>
    },
    {
        path: '/new-password/:token',
        element: <NewPassword />
    },
    {
        path: '/email-verification-error',
        element: <EmailVerificationError />
    },
    {
        path:'/already-verified/:email',
        element:<AlreadyVerified/>
    },
    {
        path: '/how-to-guide',
        element: <HowToGuides />
    },

    {
        path: '/verify-email',
        element: <VerifyEmail />
    },
    {
        path: '/forgot-password',
        element: <Email />
    },

    {
        path: '/new-password',
        element: <NewPassword />
    },
    {
        path: '/reset-password-info',
        element: <CheckMail />
    },
    {
        path: '/admin/signup',
        element: <AdminSignUp />
    },

    {
        path: '/withdraw',
        element: < PrivateRoute Component={WithdrawalDashboard }/>,
    },
  
    {
        path: '/dashboard',
        element:<PrivateRoute Component={Dashboard}/>,  

    },
    
    {
        path: '/investment-guide',

        element: <PrivateRoute Component={HowToGuides} />,
    },
   
   
  
    {
        path: '/invest',
        element: <PrivateRoute Component={NewInvestment}/>,
    },
    {
        path: '/investment/managers',
        element: <PrivateRoute Component={InvestmentManagers} />,
    },

    {
        path: '/invest/payment',
        element: <PrivateRoute Component={PaymentWalletForm} />
    },
    {
        path: '/referral',
        element: <PrivateRoute Component={Referrals}/>,
    },


    {
        path: '/portfolio',
        element: <PrivateRoute Component={Portfolio} />
    },
   
    {
        path: '/notifications',
        element: <PrivateRoute Component={Notifications }/>
    },

    {
        path: '/admin/investor-dashboard',
        element: <AdminPrivateRoute Component={InvestorsDashboard} />,
    },
    {
        path: '/admin/dashboard',
        element: <AdminPrivateRoute Component={AdminDashboard} />
    },

    {
        path: '/admin/managers',
        element: <AdminPrivateRoute Component={AdminManager} />
    },
    {
        path: '/admin/promo',
        element: < AdminPrivateRoute Component={Promotion} />
    },
    {
        path: '/admin/investor-dashboard',
        element: < AdminPrivateRoute Component={InvestorsDashboard} />
    },

    {
        path: '/admin/wallets',
        element: <AdminPrivateRoute Component={AdminWallets} />
    },
    {
        path: '/admin/referrals',
        element: <AdminPrivateRoute Component={AdminReferral}/>
    },
    {
        path: '/admin/bonus',
        element: <AdminPrivateRoute Component={Bonus} />
    },
    {
        path: '/admin/investors',
        element: <AdminPrivateRoute Component={Investors} />
    },
    {
        path: '/patch-manager',

        element: < AdminPrivateRoute Component={PatchManager} />
    },
   

])