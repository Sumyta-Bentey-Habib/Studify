import React, { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/authcontext/AuthProvider";
import Logo from "../shared/Logo";
import { Home, UserCheck, User, BookOpen, ChevronRight } from "lucide-react";

const roleConfig = {
  admin: {
    label: "Admin",
    icon: <UserCheck size={16} />,
    path: "/dashboard/admin",
    color: "text-rose-500",
    bg: "bg-rose-50",
    ring: "ring-rose-200",
  },
  tutor: {
    label: "Mentor",
    icon: <User size={16} />,
    path: "/dashboard/mentor",
    color: "text-amber-500",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
  },
  student: {
    label: "Student",
    icon: <BookOpen size={16} />,
    path: "/dashboard/student",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    ring: "ring-indigo-200",
  },
};

const DashboardLayout = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const { user } = useAuth();
  const role = (user?.role || "student").toLowerCase().trim();
  const config = roleConfig[role] || roleConfig.student;

  const initials = user?.displayName
    ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* ── Top gradient bar ── */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400" />

      {/* ── Header / Sidebar-style top nav ── */}
      <header className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Left: Logo + user card */}
            <div className="flex items-center gap-4">
              {/* Logo */}
              <NavLink to="/" className="flex-shrink-0">
                <Logo />
              </NavLink>

              <div className="w-px h-10 bg-slate-100 hidden sm:block" />

              {/* User pill */}
              <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl ring-1 ${config.bg} ${config.ring}`}>
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
                  />
                ) : (
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-bold`}>
                    {initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate max-w-[140px]">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-slate-500 truncate max-w-[140px]">{user?.email}</p>
                </div>
                {/* Role badge */}
                <span className={`hidden sm:flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${config.bg} ${config.color} ring-1 ${config.ring}`}>
                  {config.icon} {config.label}
                </span>
              </div>
            </div>

            {/* Right: nav links */}
            <nav className="flex flex-wrap items-center gap-2">
              {role === "admin" && (
                <NavLink to="/dashboard/admin" className={navLinkClass}>
                  <UserCheck size={16} /> Admin
                </NavLink>
              )}
              {role === "tutor" && (
                <NavLink to="/dashboard/mentor" className={navLinkClass}>
                  <User size={16} /> Mentor
                </NavLink>
              )}
              {role === "student" && (
                <NavLink to="/dashboard/student" className={navLinkClass}>
                  <BookOpen size={16} /> Student
                </NavLink>
              )}

              <div className="w-px h-5 bg-slate-200" />

              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                Profile
              </NavLink>

              <NavLink
                to="/"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 transition-all"
              >
                <Home size={15} /> Home
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* ── Breadcrumb ── */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-1.5 text-xs text-slate-400">
          <span>Dashboard</span>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium capitalize">{config.label}</span>
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
