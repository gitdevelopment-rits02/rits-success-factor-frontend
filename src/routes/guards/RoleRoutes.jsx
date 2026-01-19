import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { roleRoutes } from "../configs/roleRoutes.config";

export default function RoleRoute({ children }) {
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.auth.main);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoutes = roleRoutes[user.role] || [];

  if (!allowedRoutes.includes(location.pathname)) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
}