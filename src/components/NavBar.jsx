import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../shared/Logo";
import { AuthContext } from "../contexts/authcontext/AuthProvider";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-studify-primary font-bold"
        : "text-studify-heading hover:text-studify-primary"
    }`;

  const role = (user?.role || "student").toLowerCase().trim();
  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "tutor"
      ? "/dashboard/mentor"
      : "/dashboard/student";

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={dashboardPath} className={linkClass}>
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/contact" className={linkClass}>
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-studify-surface/90 backdrop-blur-md border-b border-studify-border shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <Logo />
        </NavLink>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
          {navItems}
        </ul>

        {/* CTA / User area */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {user.photoURL && (
                <img
                  alt="User"
                  src={user.photoURL}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-studify-border"
                />
              )}
              <button
                onClick={handleLogout}
                className="rounded-full border border-studify-border px-5 py-2 text-sm font-semibold text-studify-heading transition hover:border-studify-primary hover:text-studify-primary hover:bg-studify-bg/50"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hidden sm:inline-block rounded-full border border-studify-border px-5 py-2 text-sm font-semibold text-studify-heading transition hover:border-studify-primary hover:text-studify-primary hover:bg-studify-bg/50"
              >
                Log in
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-full bg-studify-primary px-5 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-studify-primary-dark"
              >
                Get Started
              </NavLink>
            </>
          )}

          {/* Mobile hamburger */}
          <div className="relative lg:hidden">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-sm mt-3 p-2 shadow-lg bg-studify-surface rounded-2xl w-52 z-50 border border-studify-border space-y-1"
              >
                {navItems}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
