import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-purple-800">Admin Dashboard</h2>
      <ul className="flex flex-col gap-3">
        <li>
          <Link
            to="view-study-materials"
            className="inline-block px-4 py-2 text-purple-900 transition bg-purple-300 rounded hover:bg-purple-400"
          >
            View All Study Materials
          </Link>
        </li>
        <li>
          <Link
            to="view-study-sessions"
            className="inline-block px-4 py-2 text-purple-900 transition bg-purple-300 rounded hover:bg-purple-400"
          >
            View All Study Sessions
          </Link>
        </li>
        <li>
          <Link
            to="view-users"
            className="inline-block px-4 py-2 text-purple-900 transition bg-purple-300 rounded hover:bg-purple-400"
          >
            View All Users
          </Link>
        </li>
      </ul>

      <div className="p-4 mt-8 bg-white border border-purple-300 rounded shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
