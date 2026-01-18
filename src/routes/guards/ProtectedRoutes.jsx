import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { restoring, isAuthenticated } = useSelector((state) => state.auth.main);

  if (restoring) return null;

  if (!isAuthenticated) 
    return <Navigate to="/login" replace />;

  return children;
}
