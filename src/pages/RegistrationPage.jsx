import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import registrationAnimation from "../assets/lottie/registration.json";
import { AuthContext } from "../contexts/authcontext/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import SocialLogin from "../shared/SocialLogin";
import axios from "axios";

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

  const { createUser } = useContext(AuthContext);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    if (!name || !email || !photoURL || !password) {
      Swal.fire("Error", "Please fill out all fields.", "error");
      return;
    }

    // Disallow name = "N/A" or empty/whitespace-only name
    if (name.trim().toUpperCase() === "N/A" || name.trim().length === 0) {
      Swal.fire("Error", "Please enter a valid name.", "error");
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

    try {
      // Create user in Firebase Auth
      const result = await createUser(email, password);

      // Update Firebase profile with displayName and photoURL
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });

      // Save user info to backend database
      await axios.post("http://localhost:3000/users", {
        name,
        email,
        photoURL,
        role: "student",
      });

      Swal.fire(
        "Success",
        `Registration completed! Welcome, ${name}!`,
        "success"
      );

      setFormData({
        name: "",
        email: "",
        photoURL: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire("Registration Failed", error.message || "Error occurred", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 md:flex-row bg-gray-50">
      <div className="flex justify-center w-full mb-10 md:w-1/2 md:mb-0">
        <Lottie
          animationData={registrationAnimation}
          loop={true}
          className="w-full max-w-sm md:max-w-md"
        />
      </div>

      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl md:w-1/2 rounded-2xl">
        <h1 className="text-3xl font-bold text-center text-black">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm text-black">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-black">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
              required
            />
          </div>

          <div>
            <label htmlFor="photoURL" className="block text-sm text-black">Profile Picture URL</label>
            <input
              type="text"
              name="photoURL"
              id="photoURL"
              placeholder="Photo URL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-black">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400"
              required
            />
            <p className="mt-1 text-xs text-black">
              Must be at least 6 characters, with uppercase and lowercase letters.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white rounded-lg bg-violet-500 hover:bg-violet-600"
          >
            Register
          </button>
        </form>

        <SocialLogin action="register" />

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
