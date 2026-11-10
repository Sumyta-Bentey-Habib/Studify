import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { PenLine, Calendar, FolderOpen, FileText, BookOpen, GraduationCap, Send } from "lucide-react";

const studentLinks = [
  { to: "create-note",    label: "Create Note",        icon: <PenLine size={18} />,      color: "text-indigo-600",  bg: "bg-indigo-50",   ring: "ring-indigo-200",  desc: "Write a private note" },
  { to: "booked-session", label: "Booked Sessions",    icon: <Calendar size={18} />,     color: "text-violet-600",  bg: "bg-violet-50",   ring: "ring-violet-200",  desc: "View your bookings" },
  { to: "view-materials", label: "View Materials",     icon: <FolderOpen size={18} />,   color: "text-emerald-600", bg: "bg-emerald-50",  ring: "ring-emerald-200", desc: "Browse saved resources" },
  { to: "view-notes",     label: "My Notes",           icon: <FileText size={18} />,     color: "text-sky-600",     bg: "bg-sky-50",      ring: "ring-sky-200",     desc: "View & delete notes" },
  { to: "view-sessions",  label: "Browse Sessions",    icon: <BookOpen size={18} />,     color: "text-teal-600",    bg: "bg-teal-50",     ring: "ring-teal-200",    desc: "Explore all sessions" },
  { to: "study-materials",label: "Study Materials",    icon: <GraduationCap size={18} />,color: "text-orange-600",  bg: "bg-orange-50",   ring: "ring-orange-200",  desc: "Your saved materials" },
  { to: "sent-request",   label: "Become a Tutor",     icon: <Send size={18} />,         color: "text-rose-600",    bg: "bg-rose-50",     ring: "ring-rose-200",    desc: "Request a role upgrade" },
];

const Student = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/dashboard/student" || location.pathname === "/dashboard/student/";

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900">Student Dashboard</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your sessions, notes, and learning materials.</p>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        {studentLinks.map(({ to, label, icon, color, bg, ring, desc }) => (
          <Link
            key={to}
            to={to}
            className={`group flex flex-col gap-3 p-5 bg-white rounded-2xl ring-1 ${ring} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
          >
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg} ${color} ring-1 ${ring} transition-transform group-hover:scale-110`}>
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

export default Student;
