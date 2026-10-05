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
    if (user.role === "candidate") {
      return <Navigate to="/candidate/dashboard" replace />;
    }

    if (user.role === "employer") {
      return <Navigate to="/employer/dashboard" replace />;
    }

    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
