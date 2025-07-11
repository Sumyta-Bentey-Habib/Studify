import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import registrationAnimation from "../assets/lottie/registration.json";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../contexts/authcontext/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const RegistrationPage = () => {
  useEffect(() => {
    document.title = "Registration Page || GoAthlete";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;
    return hasUpper && hasLower && hasLength;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    if (!name || !email || !photoURL || !password) {
      Swal.fire("Error", "Please fill out all fields.", "error");
      return;
    }

    if (!validatePassword(password)) {
      Swal.fire(
        "Weak Password",
        "Password must be at least 6 characters and include both uppercase and lowercase letters.",
        "error"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        return updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => result.user);
      })
      .then((user) => {
        Swal.fire(
          "Success",
          `Registration completed! Welcome, ${user.displayName}`,
          "success"
        );
        setFormData({
          name: "",
          email: "",
          photoURL: "",
          password: "",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire("Registration Failed", error.message, "error");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome, ${result.user.displayName || "User"}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 md:flex-row bg-gray-50">
      {/* Animation section */}
      <div className="flex justify-center w-full mb-10 md:w-1/2 md:mb-0">
        <Lottie
          animationData={registrationAnimation}
          loop={true}
          className="w-full max-w-sm md:max-w-md"
        />
      </div>

      {/* Form section */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl md:w-1/2 rounded-2xl">
        <h1 className="text-3xl font-bold text-center text-black">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm text-black">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-black">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div>
            <label htmlFor="photoURL" className="block text-sm text-black">
              Profile Picture URL
            </label>
            <input
              type="text"
              name="photoURL"
              id="photoURL"
              placeholder="Photo URL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-black">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
            />
            <p className="mt-1 text-xs text-black">
              Must be at least 6 characters, with uppercase and lowercase
              letters.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white rounded-lg bg-violet-500 hover:bg-violet-600"
          >
            Register
          </button>
        </form>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-sm text-gray-500">Or register with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGoogleLogin}
            aria-label="Register with Google"
            className="flex items-center gap-2 px-4 py-2 text-gray-800 bg-gray-100 rounded-lg shadow hover:bg-gray-200"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="text-sm text-center text-black">
          Already have an account?
          <NavLink to="/login" className="ml-1 text-violet-600 hover:underline">
            Login
          </NavLink>
          <br />
          <NavLink to="/" className="ml-1 text-violet-600 hover:underline">
            Return Home
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;