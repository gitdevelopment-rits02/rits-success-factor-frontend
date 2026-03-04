import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROLES } from "../configs/roles.config";
import { ROUTES } from "../configs/routes.config";

export default function LandingRedirect() {
  const { user, isAuthenticated } = useSelector((state) => state.auth.main);

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  switch (user.role?.toLowerCase()) {
    case ROLES.SUPERADMIN:
      return <Navigate to="/superadmin/dashboard" replace />;

    case ROLES.CHIEF:
      return <Navigate to="/chief/dashboard" replace />;

    case ROLES.HR:
      return <Navigate to="/hr/dashboard" replace />;

    case ROLES.MANAGER:
      return <Navigate to="/manager/dashboard" replace />;

    case ROLES.EMPLOYEE:
      return <Navigate to="/employee/dashboard" replace />;

    default:
      return <Navigate to="/login" replace />;
  }
}
 