import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../shared/Logo";

const NavBar = () => {
  const navItems = (
    <>
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>Parent</a>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </>
  );
  return (
    <div className="shadow-sm navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52"
          >
            {navItems}
          </ul>
        </div>
        <a className="text-xl btn btn-ghost">
            <Logo></Logo>
        </a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">{navItems}</ul>
      </div>
      <div className="flex items-center gap-4 navbar-end">
          <NavLink to="/login" className="btn btn-sm">Log in</NavLink>
          <NavLink to="/register" className="btn btn-sm">Register</NavLink> 
      </div>
    </div>
  );
};

export default NavBar;
