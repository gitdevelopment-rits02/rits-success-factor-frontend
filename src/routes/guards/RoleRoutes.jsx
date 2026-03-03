import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { roleRoutes } from "../configs/role.Routes.config";

export default function RoleRoute({ children, requiredRole }) {
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.auth.main);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required for this route branch
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/notfound" replace />;
  }

  // Fallback to specific path checking if no branch role is specified
  if (!requiredRole) {
    const allowedRoutes = roleRoutes[user.role] || [];
    if (!allowedRoutes.includes(location.pathname)) {
      return <Navigate to="/notfound" replace />;
    }
  }

  return children;
}