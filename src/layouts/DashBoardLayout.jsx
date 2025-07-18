import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/authcontext/AuthProvider";
import Logo from "../shared/Logo";
import { Home, UserCheck, User, BookOpen } from "lucide-react";

const DashboardLayout = () => {
  const { user } = useAuth();

  const role = (user?.role || "student").toLowerCase().trim();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-purple-700 rounded px-3 py-2 flex items-center gap-2"
      : "hover:bg-purple-800 rounded px-3 py-2 flex items-center gap-2";

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex flex-col min-h-screen bg-purple-50">
      {/* Top Section: Logo, Profile & Nav */}
      <header className="p-4 text-white bg-purple-900 shadow sm:p-6">
        <div className="max-w-5xl px-2 mx-auto sm:px-0">
          {/* Logo */}
          <div className="flex items-center gap-3 p-2 mb-6 bg-white rounded-full shadow-md w-max">
            <Logo className="w-10 h-10" />
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-start max-w-md gap-4 p-3 mb-6 bg-purple-800 rounded-md shadow sm:flex-row sm:items-center">
            <div className="flex items-center justify-center w-12 h-12 text-xl font-semibold text-white bg-purple-600 rounded-full">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold truncate">{user?.displayName || "User"}</p>
              <p
                className="max-w-xs text-sm text-purple-300 truncate"
                title={user?.email}
              >
                {user?.email}
              </p>
              <NavLink
                to="/dashboard/profile"
                className="text-xs text-purple-300 underline hover:text-white"
              >
                View Profile
              </NavLink>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap max-w-md gap-4">
            {role === "admin" && (
              <NavLink to="/dashboard/admin" className={navLinkClass}>
                <UserCheck className="w-5 h-5" />
                Admin Dashboard
              </NavLink>
            )}
            {role === "tutor" && (
              <NavLink to="/dashboard/mentor" className={navLinkClass}>
                <User className="w-5 h-5" />
                Tutor Dashboard
              </NavLink>
            )}
            {role === "student" && (
              <NavLink to="/dashboard/student" className={navLinkClass}>
                <BookOpen className="w-5 h-5" />
                Student Dashboard
              </NavLink>
            )}
          </nav>

          {/* Return Home Link */}
          <div className="mt-6">
            <NavLink
              to="/"
              className="inline-flex items-center gap-2 text-purple-300 hover:text-white"
            >
              <Home className="w-5 h-5" />
              Return Home
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main content below */}
      <main className="flex-1 w-full max-w-5xl p-6 mx-auto text-gray-900 sm:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
