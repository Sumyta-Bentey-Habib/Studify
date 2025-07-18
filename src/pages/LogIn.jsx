import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../assets/lottie/login.json";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/authcontext/AuthProvider";
import SocialLogin from "../shared/SocialLogin";

const LogIn = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      Swal.fire("Error", "Please enter email and password.", "error");
      return;
    }

    setLoading(true);
    try {
      await signInUser(email, password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome, ${email}!`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 ">
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white shadow-lg rounded-xl md:flex-row">
        {/* Lottie Animation */}
        <div className="flex items-center justify-center w-full p-6 bg-gray-200 md:w-1/2">
          <Lottie
            animationData={loginAnimation}
            loop={true}
            className="w-full h-80"
          />
        </div>

        <div className="w-full p-8 space-y-6 md:w-1/2">
          <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-800 bg-white border border-gray-300 rounded-md focus:ring focus:ring-violet-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-800 bg-white border border-gray-300 rounded-md focus:ring focus:ring-violet-300"
                disabled={loading}
              />
              <div className="flex justify-end mt-1 text-xs text-gray-500">
                <a href="#" className="hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-center text-white rounded-md bg-violet-500 hover:bg-violet-600 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>

          {/* social login */}
          <SocialLogin action="login" />

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?
            <NavLink
              to="/register"
              className="ml-1 text-violet-600 hover:underline"
            >
              Sign up
            </NavLink>
            <br />
            <br />
            <NavLink to="/" className="ml-1 text-violet-600 hover:underline">
              Go Home
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
