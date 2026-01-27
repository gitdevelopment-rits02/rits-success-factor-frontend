import { ROUTES } from "../configs/routes.config";
// import LoginPage from "../../features/Auth/pages/LoginPage";
import Login from "../../features/Auth/Pages/LoginPage";
import Register from "../../features/Auth/Pages/RegistrationPage";
import OtpValidation from "../../features/Auth/pages/OtpValidation";
import ForgotPassword from "../../features/Auth/pages/ForgotPassword";
import ResetPassword from "../../features/Auth/pages/ResetPassword";
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
];

export default authRoutes;
