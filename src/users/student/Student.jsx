import React from "react";
import { Link, Outlet } from "react-router-dom";

const Student = () => {
  const links = [
    { to: "create-note", label: "Create Note" },
    { to: "booked-session", label: "Booked Session" },
    { to: "view-materials", label: "View Materials" },
    { to: "view-notes", label: "View Notes" },
    { to: "view-sessions", label: "View Sessions" },
    { to: "study-materials", label: "Study Materials" },
    { to: "sent-request", label: "Sent Request To Be A Tutor" },
  ];

  return (
    <div className="px-4 sm:px-0">
      <h2 className="mb-6 text-2xl font-semibold text-purple-800">Student Dashboard</h2>

      <div className="flex flex-col max-w-full gap-4 mb-8 sm:flex-row sm:flex-wrap">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="inline-block w-full px-5 py-3 text-center text-white transition-shadow transition-transform duration-300 bg-purple-600 rounded sm:w-auto hover:bg-purple-700 hover:scale-105 hover:shadow-lg"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="p-4 mt-8 bg-white border border-purple-300 rounded shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default Student;
