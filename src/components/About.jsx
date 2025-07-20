"use client";

import React from "react";

const About = () => {
  return (
    <section
      className="max-w-4xl px-6 py-12 mx-auto bg-white rounded-lg shadow"
      style={{ backgroundColor: "#F3E8FF" }}
    >
      <h1 className="mb-4 text-3xl font-extrabold text-purple-800">About Studify</h1>

      <p className="mb-4 text-purple-900">
        <strong>Studify</strong> is an all-in-one learning platform designed for students to easily book sessions, save study materials, and manage notes — all in one secure place.
      </p>

      <p className="mb-4 text-purple-900">
        Every student account is protected by secure login. After logging in, you can:
      </p>

      <ul className="mb-6 space-y-2 text-purple-800 list-disc list-inside">
        <li>🔑 <strong>Book Sessions</strong>: Join sessions with your preferred tutor and manage your bookings.</li>
        <li>📚 <strong>Save Materials</strong>: Access or save study materials and keep them organized under your account.</li>
        <li>📝 <strong>Manage Notes</strong>: Create personal study notes only you can see, update or delete anytime.</li>
      </ul>

      <p className="mb-4 text-purple-900">
        Our backend ensures that all your data — booked sessions, saved materials, and personal notes — are visible only to you when you’re logged in.
      </p>

      <p className="mb-4 text-purple-900">
        Want to become a mentor? You can submit an upgrade request and our admin team will review it securely.
      </p>

      <p className="text-purple-900">
        Studify is built to help you study smarter — organized, secure, and simple.
      </p>
    </section>
  );
};

export default About;
