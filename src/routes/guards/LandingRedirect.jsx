import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROLES } from "../configs/roles.config";
import { ROUTES } from "../configs/routes.config";

export default function LandingRedirect() {
  const { user, isAuthenticated } = useSelector((state) => state.auth.main);

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case ROLES.SUPERADMIN:
      return <Navigate to={ROUTES.SUPERADMIN.TIMESHEETAPPROVAL} replace />;

    case ROLES.MANAGER:
      return <Navigate to={ROUTES.MANAGER.DASHBOARD} replace />;

    case ROLES.KITCHEN:
      return <Navigate to={ROUTES.KITCHEN.KOT_VIEW} replace />;

    case ROLES.WAITER:
      return <Navigate to={ROUTES.WAITER.DASHBOARD} replace />;

    default:
      return <Navigate to="/not-found" replace />;
  }
}
