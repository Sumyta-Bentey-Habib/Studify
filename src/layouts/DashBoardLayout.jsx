import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authcontext/AuthProvider";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Dashboard — StudyFy";

    // Auto-preselect Overview for each role when landing on root /dashboard
    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
      const role = (user?.role || "student").toLowerCase().trim();
      const targetPath =
        role === "admin"
          ? "/dashboard/admin"
          : role === "tutor"
          ? "/dashboard/mentor"
          : "/dashboard/student";
      navigate(targetPath, { replace: true });
    }
  }, [location.pathname, user?.role, navigate]);

  return (
    <div className="min-h-screen flex bg-studify-bg text-studify-heading antialiased">
      {/* ── Left Sidebar ── */}
      <DashboardSidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />

      {/* ── Right Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <DashboardTopbar onOpenMobile={() => setIsMobileOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
