import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { PlusCircle, Upload, Eye } from "lucide-react";

const mentorLinks = [
  { to: "create-session",   label: "Create Session",    icon: <PlusCircle size={18} />, color: "text-indigo-600", bg: "bg-indigo-50",  ring: "ring-indigo-200",  desc: "Publish a new study session" },
  { to: "upload-materials", label: "Upload Materials",  icon: <Upload size={18} />,     color: "text-violet-600", bg: "bg-violet-50",  ring: "ring-violet-200",  desc: "Share resources with students" },
  { to: "view-sessions",    label: "My Sessions",       icon: <Eye size={18} />,        color: "text-emerald-600",bg: "bg-emerald-50", ring: "ring-emerald-200", desc: "View and manage your sessions" },
];

const Mentor = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/dashboard/mentor" || location.pathname === "/dashboard/mentor/";

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900">Mentor Dashboard</h2>
        <p className="text-sm text-slate-500 mt-1">Create and manage your sessions and uploaded materials.</p>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        {mentorLinks.map(({ to, label, icon, color, bg, ring, desc }) => (
          <Link
            key={to}
            to={to}
            className={`group flex flex-col gap-3 p-6 bg-white rounded-2xl ring-1 ${ring} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
          >
            <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${color} ring-1 ${ring} transition-transform group-hover:scale-110`}>
              {icon}
            </span>
            <div>
              <p className="text-sm font-bold text-slate-800">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
            </div>
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

export default Mentor;
