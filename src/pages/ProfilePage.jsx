import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authcontext/AuthProvider";
import { User, LogOut, ArrowLeft, Mail, Shield, UserCheck, GraduationCap } from "lucide-react";
import StatusBadge from "../components/ui/StatusBadge";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const role = (user?.role || "student").toLowerCase().trim();
  const roleName = role === "tutor" ? "Mentor" : role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="min-h-screen bg-studify-bg flex items-center justify-center p-4 sm:p-6 antialiased">
      <div className="w-full max-w-md bg-studify-surface rounded-3xl border border-studify-border p-6 sm:p-8 shadow-sm text-center space-y-6">
        {/* Top return link */}
        <div className="flex items-center justify-between text-xs text-studify-muted">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 hover:text-studify-primary transition-colors font-medium"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
          <span className="font-semibold text-studify-heading">Account Profile</span>
        </div>

        {/* Avatar */}
        <div className="relative mx-auto w-24 h-24">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-studify-bg border border-studify-border shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-studify-sidebar text-white text-3xl font-extrabold flex items-center justify-center ring-4 ring-studify-bg border border-studify-border shadow-sm">
              {initials}
            </div>
          )}
          <span
            className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-studify-success border-2 border-white ring-1 ring-studify-border"
            title="Active"
          />
        </div>

        {/* User Info */}
        <div className="space-y-1.5">
          <h1 className="text-2xl font-extrabold text-studify-heading tracking-tight">
            {user?.displayName || "User"}
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studify-bg border border-studify-border text-xs font-semibold text-studify-primary">
            {role === "admin" && <Shield size={12} />}
            {role === "tutor" && <GraduationCap size={12} />}
            {role === "student" && <User size={12} />}
            <span>{roleName}</span>
          </div>
          <p className="text-xs text-studify-muted truncate font-mono pt-1">
            {user?.email || "No email provided"}
          </p>
        </div>

        {/* Account Details Box */}
        <div className="bg-studify-bg/60 rounded-2xl border border-studify-border/70 p-4 text-left space-y-2.5 text-xs text-studify-muted">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Mail size={13} className="text-studify-primary" />
              <span>Registered Email</span>
            </span>
            <span className="font-medium text-studify-heading truncate max-w-[170px]">
              {user?.email}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <UserCheck size={13} className="text-studify-primary" />
              <span>Account Status</span>
            </span>
            <StatusBadge status="approved">Active</StatusBadge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Link
            to={
              role === "admin"
                ? "/dashboard/admin"
                : role === "tutor"
                ? "/dashboard/mentor"
                : "/dashboard/student"
            }
            className="w-full py-2.5 px-4 rounded-xl bg-studify-primary text-white text-xs font-bold hover:bg-studify-primary-dark transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Go to Dashboard</span>
          </Link>

          <Link
            to="/"
            className="w-full py-2.5 px-4 rounded-xl bg-studify-bg text-studify-heading text-xs font-semibold hover:bg-studify-border border border-studify-border transition-colors block"
          >
            Return to Homepage
          </Link>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 rounded-xl bg-studify-danger/10 text-studify-danger text-xs font-semibold hover:bg-studify-danger hover:text-white border border-studify-danger/20 transition-colors flex items-center justify-center gap-1.5"
          >
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
