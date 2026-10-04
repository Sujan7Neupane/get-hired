import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  allowedRoles: ("candidate" | "employer" | "admin")[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useSelector((state: any) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in but doesn't have permission
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
