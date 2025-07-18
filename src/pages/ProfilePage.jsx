import React from "react";
import { useAuth } from "../contexts/authcontext/AuthProvider";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  // Get user initials for avatar fallback
  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="
          max-w-md rounded-xl bg-lavender-50 p-8 shadow-lg text-center
          text-gray-800 dark:bg-[#4B3B57] dark:text-gray-200
        "
      >
        {/* Avatar */}
        <div className="relative flex items-center justify-center mx-auto mb-6 text-4xl font-bold text-white bg-purple-300 rounded-full shadow-lg w-28 h-28">
          {initials}
          <span className="absolute block w-5 h-5 bg-green-400 border-2 border-white rounded-full bottom-2 right-2 animate-pulse" />
        </div>

        {/* User Info */}
        <h1 className="mb-2 text-3xl font-semibold">{user?.displayName || "User"}</h1>
        <p className="mb-1 text-sm font-medium text-purple-700 dark:text-purple-300">
          {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Student"}
        </p>
        <p
          className="mb-6 text-sm text-gray-600 truncate dark:text-gray-300"
          title={user?.email}
        >
          {user?.email || "No email provided"}
        </p>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full px-6 py-3 font-semibold text-white transition duration-300 bg-purple-600 rounded-full shadow hover:bg-purple-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
