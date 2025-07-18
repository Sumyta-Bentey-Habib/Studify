import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-purple-800">Admin Dashboard</h2>
      <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
        {[
          { to: "view-study-materials", label: "View All Study Materials" },
          { to: "view-study-sessions", label: "View All Study Sessions" },
          { to: "view-users", label: "View All Users" },
          { to: "upgrade-the-user", label: "Upgrade the user request" },
        ].map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="inline-block px-5 py-3 text-purple-900 transition-shadow transition-transform duration-300 bg-purple-300 rounded hover:bg-purple-400 hover:scale-105 hover:shadow-lg"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-4 mt-8 bg-white border border-purple-300 rounded shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
