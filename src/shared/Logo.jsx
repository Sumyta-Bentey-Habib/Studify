import React from 'react';
import logo from "../assets/logo/logo.png";

const Logo = ({ light = false }) => {
  return (
    <div className="flex items-center gap-2.5">
      <img src={logo} alt="StudyFy Logo" className="w-8 h-8 rounded-lg object-contain" />
      <span className={`text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-studify-primary'}`}>
        Study<span className={light ? 'text-studify-accent' : 'text-studify-heading'}>Fy</span>
      </span>
    </div>
  );
};

export default Logo;
