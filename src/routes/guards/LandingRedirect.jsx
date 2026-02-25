import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROLES } from "../configs/roles.config";
import { ROUTES } from "../configs/routes.config";

export default function LandingRedirect() {
  const { user, isAuthenticated } = useSelector((state) => state.auth.main);

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  switch (user.role) {
  case "superadmin":
    return <Navigate to="/superadmin/dashboard" replace />;

  case "chief":
    return <Navigate to="/chief/dashboard" replace />;

  case "hr":
    return <Navigate to="/hr/dashboard" replace />;

  case "manager":
    return <Navigate to="/manager/dashboard" replace />;

  case "employee":
    return <Navigate to="/employee/dashboard" replace />;

  default:
    return <Navigate to="/login" replace />;
}
}
