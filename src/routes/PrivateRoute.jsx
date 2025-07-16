
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authcontext/AuthProvider";
import Loading from "../components/Loading";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (user && (!requiredRole || role === requiredRole)) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
