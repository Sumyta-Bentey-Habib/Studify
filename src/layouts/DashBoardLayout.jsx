import React from "react";
import { Outlet, NavLink } from "react-router-dom";


import Logo from "../shared/Logo";


import { Home, UserCheck, User, BookOpen } from "lucide-react";

const DashboardLayout = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-purple-700 rounded px-3 py-2 flex items-center gap-2"
      : "hover:bg-purple-800 rounded px-3 py-2 flex items-center gap-2";

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 p-6 text-white bg-purple-900">
        <div className="flex items-center gap-3 mb-10 bg-white rounded-full shadow-md">
          <Logo className="w-10 h-10 " />
         
        </div>

        <nav className="flex flex-col gap-4">
          <NavLink to="admin" className={navLinkClass}>
            <UserCheck className="w-5 h-5" />
            Admin Dashboard
          </NavLink>
          <NavLink to="mentor" className={navLinkClass}>
            <User className="w-5 h-5" />
            Mentor Dashboard
          </NavLink>
          <NavLink to="student" className={navLinkClass}>
            <BookOpen className="w-5 h-5" />
            Student Dashboard
          </NavLink>
        </nav>

        <div className="pt-10 mt-auto">
          <NavLink to="/" className="flex items-center gap-2 text-purple-300 hover:text-white">
            <Home className="w-5 h-5" />
            Return Home
          </NavLink>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 text-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
