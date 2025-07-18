import React from "react";
import { Link, Outlet } from "react-router-dom";

const Student = () => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-purple-800">Student Dashboard</h2>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          to="create-note"
          className="px-4 py-2 text-white transition bg-purple-600 rounded hover:bg-purple-700"
        >
          Create Note
        </Link>
        <Link
          to="booked-session"
          className="px-4 py-2 text-white transition bg-purple-600 rounded hover:bg-purple-700"
        >
          Booked Session
        </Link>
        <Link
          to="view-materials"
          className="px-4 py-2 text-white transition bg-purple-600 rounded hover:bg-purple-700"
        >
          View Materials
        </Link>
        <Link
          to="view-notes"
          className="px-4 py-2 text-white transition bg-purple-600 rounded hover:bg-purple-700"
        >
          View Notes
        </Link>
        <Link
          to="view-sessions"
          className="px-4 py-2 text-white transition bg-purple-600 rounded hover:bg-purple-700"
        >
          View Sessions
        </Link>
        <Link
          to="study-materials"
          className="px-4 py-2 text-white transition bg-purple-600 rounded hover:bg-purple-700"
        >
          Study Materials
        </Link>
      </div>

      <div className="p-4 mt-8 bg-white border border-purple-300 rounded shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default Student;
