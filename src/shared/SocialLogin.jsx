import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/authcontext/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const SocialLogin = ({ action = "login" }) => {
  const [loading, setLoading] = useState(false);
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    setLoading(true);
    googleLogin()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: `${action === "login" ? "Login" : "Registration"} Successful`,
          text: `Welcome, ${result.user.displayName || "User"}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: `${action === "login" ? "Login" : "Registration"} Failed`,
          text: error.message,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-gray-300"></div>
        <p className="text-sm text-gray-500">
          Or {action === "login" ? "login" : "register"} with
        </p>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGoogleLogin}
          aria-label={`${action === "login" ? "Login" : "Register"} with Google`}
          className="flex items-center gap-2 px-4 py-2 text-gray-800 bg-gray-100 rounded-md shadow hover:bg-gray-200 disabled:opacity-70"
          disabled={loading}
        >
          <FcGoogle className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

SocialLogin.propTypes = {
  action: PropTypes.oneOf(["login", "register"]),
};

export default SocialLogin;
