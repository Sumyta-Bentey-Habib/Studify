import React from "react";
import { NavLink } from "react-router-dom";
import {
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Logo from "../shared/Logo";

const Footer = () => {
  return (
    <footer className="px-6 py-10 text-purple-100 bg-purple-900 border-t">
      <div className="flex flex-col justify-between gap-10 mx-auto max-w-7xl md:flex-row">
        {/* Brand / Intro */}
        <div className="flex-1 md:max-w-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white rounded-full shadow-md">
              <Logo className="w-10 h-10" />
            </div>

          </div>
          <p className="text-sm leading-relaxed">
            Learn together. Grow together. Join a vibrant study community with live groups and collaborative courses.
          </p>
          <div className="flex gap-4 mt-4 text-white">
            <Twitter className="cursor-pointer hover:text-violet-400" />
            <Instagram className="cursor-pointer hover:text-violet-400" />
            <Linkedin className="cursor-pointer hover:text-violet-400" />
            <Youtube className="cursor-pointer hover:text-violet-400" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex-1 md:max-w-xs">
          <h3 className="mb-3 text-lg font-semibold text-violet-300">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={18} /> support@studify.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +8801700000000
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} /> 24 Knowledge Road, Khulna, Bangladesh
            </li>
          </ul>
        </div>

        {/* Explore Links */}
        <div className="flex-1 md:max-w-xs">
          <h3 className="mb-3 text-lg font-semibold text-violet-300">
            Explore
          </h3>
          <ul className="flex flex-col space-y-2 text-sm">
            <NavLink to="/" className="hover:text-violet-400">
              Home
            </NavLink>
            <NavLink to="/about" className="hover:text-violet-400">
              About Us
            </NavLink>
            <NavLink to="/contact" className="hover:text-violet-400">
              Contact Us
            </NavLink>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-sm text-center text-purple-400">
        © {new Date().getFullYear()} Studify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
