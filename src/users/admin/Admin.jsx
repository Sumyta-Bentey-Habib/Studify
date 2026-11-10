import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Users, BookOpen, FileText, ArrowUpCircle } from "lucide-react";

const adminLinks = [
  { to: "view-study-materials", label: "Study Materials", icon: <FileText size={18} />, color: "text-violet-600", bg: "bg-violet-50", ring: "ring-violet-200" },
  { to: "view-study-sessions",  label: "Study Sessions",  icon: <BookOpen size={18} />, color: "text-indigo-600", bg: "bg-indigo-50",  ring: "ring-indigo-200" },
  { to: "view-users",           label: "All Users",       icon: <Users size={18} />,    color: "text-emerald-600", bg: "bg-emerald-50", ring: "ring-emerald-200" },
  { to: "upgrade-the-user",     label: "Upgrade Requests",icon: <ArrowUpCircle size={18} />, color: "text-amber-600", bg: "bg-amber-50", ring: "ring-amber-200" },
];

const Admin = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/dashboard/admin" || location.pathname === "/dashboard/admin/";

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900">Admin Dashboard</h2>
        <p className="text-sm text-slate-500 mt-1">Manage users, sessions, materials, and upgrade requests.</p>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {adminLinks.map(({ to, label, icon, color, bg, ring }) => (
          <Link
            key={to}
            to={to}
            className={`group flex flex-col gap-3 p-5 bg-white rounded-2xl ring-1 ${ring} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
          >
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg} ${color} ring-1 ${ring} transition-transform group-hover:scale-110`}>
              {icon}
            </span>
            <span className="text-sm font-semibold text-slate-700">{label}</span>
            <span className="text-xs text-slate-400">View & manage →</span>
          </Link>
        ))}
      </div>

      {/* Outlet panel */}
      <div className="bg-white rounded-2xl ring-1 ring-slate-100 shadow-sm p-6">
        {isRoot ? (
          <p className="text-slate-400 text-sm text-center py-8">Select an option above to get started.</p>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Admin;
