import React from "react";
import { Link, Outlet } from "react-router-dom";

const Mentor = () => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-purple-800">Mentor Dashboard</h2>
      <ul className="flex flex-col gap-3">
        <li>
          <Link to="create-session" className="text-purple-600 hover:underline">
            Create Session
          </Link>
        </li>
        <li>
          <Link to="upload-materials" className="text-purple-600 hover:underline">
            Upload Materials
          </Link>
        </li>
        <li>
          <Link to="view-sessions" className="text-purple-600 hover:underline">
            View Sessions
          </Link>
        </li>
      </ul>

      <div className="p-4 mt-8 bg-white border border-purple-300 rounded shadow">
        <Outlet />
      </div>
    </div>
  );
};

export default Mentor;
