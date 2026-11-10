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
    <footer className="bg-slate-900 text-slate-300">
      {/* Top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400" />

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">

          {/* Brand */}
          <div className="flex-1 md:max-w-xs">
            <div className="mb-4 p-2 bg-white rounded-xl inline-block shadow">
              <Logo />
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Learn together. Grow together. Join a vibrant study community with live groups and collaborative courses.
            </p>
            <div className="mt-5 flex gap-4">
              <Twitter size={18} className="cursor-pointer text-slate-400 hover:text-indigo-400 transition" />
              <Instagram size={18} className="cursor-pointer text-slate-400 hover:text-indigo-400 transition" />
              <Linkedin size={18} className="cursor-pointer text-slate-400 hover:text-indigo-400 transition" />
              <Youtube size={18} className="cursor-pointer text-slate-400 hover:text-indigo-400 transition" />
            </div>
          </div>

          {/* Contact */}
          <div className="flex-1 md:max-w-xs">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-200">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2 hover:text-indigo-400 transition">
                <Mail size={16} /> support@studify.com
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400 transition">
                <Phone size={16} /> +8801700000000
              </li>
              <li className="flex items-center gap-2 hover:text-indigo-400 transition">
                <MapPin size={16} /> 24 Knowledge Road, Khulna, Bangladesh
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div className="flex-1 md:max-w-xs">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-200">
              Explore
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <NavLink to="/" className="hover:text-indigo-400 transition">Home</NavLink>
              <NavLink to="/about" className="hover:text-indigo-400 transition">About Us</NavLink>
              <NavLink to="/contact" className="hover:text-indigo-400 transition">Contact Us</NavLink>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Studify. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">Made with ❤️ for learners everywhere</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
