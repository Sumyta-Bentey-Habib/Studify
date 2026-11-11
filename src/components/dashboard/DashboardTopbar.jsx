import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import { Menu, Home, ChevronRight, User } from "lucide-react";

const ROUTE_TITLES = {
  "/dashboard/student": "Student Overview",
  "/dashboard/student/view-sessions": "Browse Sessions",
  "/dashboard/student/booked-session": "Booked Sessions",
  "/dashboard/student/view-materials": "Explore Materials",
  "/dashboard/student/study-materials": "Saved Materials",
  "/dashboard/student/view-notes": "My Notes",
  "/dashboard/student/create-note": "Create Note",
  "/dashboard/student/sent-request": "Become a Mentor",
  "/dashboard/mentor": "Mentor Workspace",
  "/dashboard/mentor/create-session": "Create Session",
  "/dashboard/mentor/view-sessions": "My Sessions",
  "/dashboard/mentor/upload-materials": "Upload Materials",
  "/dashboard/admin": "Admin Center",
  "/dashboard/admin/view-users": "All Users",
  "/dashboard/admin/view-study-sessions": "Study Sessions",
  "/dashboard/admin/view-study-materials": "Study Materials",
  "/dashboard/admin/upgrade-the-user": "Upgrade Requests",
  "/dashboard/profile": "Profile Settings",
};

const DashboardTopbar = ({ onOpenMobile }) => {
  const { user } = useAuth();
  const location = useLocation();

  const currentPath = location.pathname.replace(/\/$/, "");
  const pageTitle = ROUTE_TITLES[currentPath] || "Dashboard";

  // Build breadcrumb segments
  const segments = currentPath.split("/").filter(Boolean);

  const role = (user?.role || "student").toLowerCase().trim();
  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <header className="sticky top-0 z-30 bg-studify-surface/90 backdrop-blur-md border-b border-studify-border h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* ── Left: Mobile Toggle + Breadcrumb ── */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-studify-heading hover:bg-studify-bg transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb trail */}
        <nav
          aria-label="Breadcrumb"
          className="hidden sm:flex items-center gap-1.5 text-xs text-studify-muted truncate"
        >
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-studify-primary transition-colors"
          >
            <Home size={13} />
            <span>Home</span>
          </Link>

          {segments.map((seg, i) => {
            const path = `/${segments.slice(0, i + 1).join("/")}`;
            const isLast = i === segments.length - 1;
            const label =
              seg === "dashboard"
                ? "Dashboard"
                : seg === "student"
                ? "Student"
                : seg === "mentor"
                ? "Mentor"
                : seg === "admin"
                ? "Admin"
                : ROUTE_TITLES[path] || seg.replace(/-/g, " ");

            return (
              <React.Fragment key={path}>
                <ChevronRight size={12} className="text-studify-muted/50" />
                {isLast ? (
                  <span className="font-semibold text-studify-heading capitalize">
                    {label}
                  </span>
                ) : (
                  <Link
                    to={path}
                    className="hover:text-studify-primary transition-colors capitalize"
                  >
                    {label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Mobile Page Title */}
        <span className="sm:hidden text-sm font-bold text-studify-heading truncate">
          {pageTitle}
        </span>
      </div>

      {/* ── Right: User Pill & Quick Nav ── */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-studify-heading hover:text-studify-primary hover:bg-studify-bg rounded-xl border border-studify-border transition-colors"
        >
          <Home size={14} />
          <span>Exit to Website</span>
        </Link>

        {/* Profile Pill */}
        <Link
          to="/dashboard/profile"
          className="flex items-center gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-xl border border-studify-border bg-studify-bg/50 hover:bg-studify-bg transition-colors"
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "Avatar"}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-studify-border"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-studify-primary text-white flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
          )}

          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-studify-heading leading-tight truncate max-w-[120px]">
              {user?.displayName || "User"}
            </span>
            <span className="text-[10px] text-studify-muted capitalize font-medium">
              {role === "tutor" ? "Mentor" : role}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default DashboardTopbar;
