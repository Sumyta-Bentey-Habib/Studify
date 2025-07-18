import React from "react";
import { Link, Outlet } from "react-router-dom";

const Mentor = () => {
  return (
    <div className="px-4 sm:px-0">
      <h2 className="mb-6 text-2xl font-semibold text-purple-800">Mentor Dashboard</h2>

      <div className="flex flex-col max-w-full gap-6 sm:flex-row sm:flex-wrap">
        {[
          { to: "create-session", label: "Create Session" },
          { to: "upload-materials", label: "Upload Materials" },
          { to: "view-sessions", label: "View Sessions" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="inline-block w-full px-6 py-3 text-center text-purple-900 transition-shadow transition-transform duration-300 bg-purple-300 rounded sm:w-auto hover:bg-purple-400 hover:scale-105 hover:shadow-lg"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="max-w-4xl p-6 mt-8 bg-white border border-purple-300 rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default Mentor;
