import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../shared/Logo";
import { AuthContext } from "../contexts/authcontext/AuthProvider";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
    }`;

  const navItems = (
    <>
      <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
      <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
      {user && (
        <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>
      )}
      <li><NavLink to="/contact" className={linkClass}>Contact Us</NavLink></li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
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
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-100"
                />
              )}
              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hidden sm:inline-block rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
              >
                Log in
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Get Started
              </NavLink>
            </>
          )}

          {/* Mobile hamburger */}
          <div className="relative lg:hidden">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu menu-sm mt-3 p-2 shadow bg-white rounded-box w-52 z-50 ring-1 ring-slate-100 space-y-1">
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
