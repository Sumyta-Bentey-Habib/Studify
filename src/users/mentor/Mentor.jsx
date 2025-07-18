import React from "react";
import { Link, Outlet } from "react-router-dom";

const Mentor = () => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-purple-800">Mentor Dashboard</h2>

      <div className="flex flex-wrap max-w-full gap-4">
        <Link
          to="create-session"
          className="btn btn-outline btn-purple"
        >
          Create Session
        </Link>
        <Link
          to="upload-materials"
          className="btn btn-outline btn-purple"
        >
          Upload Materials
        </Link>
        <Link
          to="view-sessions"
          className="btn btn-outline btn-purple"
        >
          View Sessions
        </Link>
      </div>

      <div className="max-w-4xl p-6 mt-8 bg-white border border-purple-300 rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default Mentor;
