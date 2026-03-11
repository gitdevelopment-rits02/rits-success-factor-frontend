import { ROUTES } from "../configs/routes.config";
// import LoginPage from "../../features/Auth/pages/LoginPage";
import Login from "../../features/Auth/Pages/LoginPage";
import Register from "../../features/Auth/Pages/RegistrationPage";
import OtpValidation from "../../features/Auth/pages/OtpValidation";
// import ForgotPassword from "../../features/Auth/pages/ForgotPassword";
import ForgotPassword from "../../features/Auth/Pages/ForgotPassword";
import ResetPassword from "../../features/Auth/pages/ResetPassword";
import ForgotPasswordOtp from "../../features/Auth/Pages/forgotpasswordotp";
import AboutUs from "../../features/Auth/Pages/AboutUs";

import PolicyPage from "../../features/Auth/Pages/PolicyPage";
import NotFound from "../../features/Auth/Pages/NotFound";
import ContactUs from "../../features/Auth/pages/ContactUs";

const authRoutes = [
  {
    path: ROUTES.AUTH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.AUTH.REGISTER,
    element: <Register />,

  },
  {
    path: ROUTES.AUTH.OTP,
    element: <OtpValidation />,

  },
  {
    path: ROUTES.AUTH.FORGOTPASSWORD,
    element: <ForgotPassword />,

  },
  {
    path: ROUTES.AUTH.RESET,
    element: <ResetPassword />,

  },
  {
    path: ROUTES.AUTH.FORGOTPASSWORDOTPVERIFY,
    element: <ForgotPasswordOtp />,
  },
  {
    path: ROUTES.AUTH.ABOUTUS,
    element: <AboutUs />
  },
  {
    path: ROUTES.AUTH.CONTACTUS,
    element: <ContactUs />
  },
  {
    path: ROUTES.AUTH.POLICYPAGE,
    element: <PolicyPage />
  },
  {
    path: ROUTES.AUTH.NOTFOUND,
    element: < NotFound />
  }
];

export default authRoutes;

