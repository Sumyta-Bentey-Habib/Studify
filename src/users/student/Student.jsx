import React from "react";
import { Link, Outlet } from "react-router-dom";

const Student = () => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-purple-800">Student Dashboard</h2>
      <ul className="flex flex-col gap-3">
        <li>
          <Link to="create-note" className="text-purple-600 hover:underline">
            Create Note
          </Link>
        </li>
        <li>
          <Link to="booked-session" className="text-purple-600 hover:underline">
            Booked Session
          </Link>
        </li>
        <li>
          <Link to="view-materials" className="text-purple-600 hover:underline">
            View Materials
          </Link>
        </li>
        <li>
          <Link to="manage-notes" className="text-purple-600 hover:underline">
            Manage Notes
          </Link>
        </li>
        <li>
          <Link to="view-notes" className="text-purple-600 hover:underline">
            View Notes
          </Link>
        </li>
      </ul>

      <div className="p-4 mt-8 bg-white border border-purple-300 rounded shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default Student;
