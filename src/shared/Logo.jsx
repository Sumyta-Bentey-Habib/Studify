import React from 'react';
import logo from "../assets/logo/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="Studify Logo" className="w-8 h-8" />
      <h3 className="text-xl font-bold text-purple-700">StudiFy</h3>
    </div>
  );
};

export default Logo;
