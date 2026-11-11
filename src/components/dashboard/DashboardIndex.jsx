import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext/AuthProvider";

const DashboardIndex = () => {
  const { user } = useAuth();
  const role = (user?.role || "student").toLowerCase().trim();

  if (role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }
  if (role === "tutor") {
    return <Navigate to="/dashboard/mentor" replace />;
  }
  return <Navigate to="/dashboard/student" replace />;
};

export default DashboardIndex;
