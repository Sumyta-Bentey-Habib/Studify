"use client";

import React from "react";
import { BookOpen, Notebook, Lock, UserPlus } from "lucide-react";
import { useEffect } from "react";

const About = () => {
  useEffect(()=>{
    document.title="About";
  },[]);

  return (
    <section className="relative flex items-center min-h-screen px-6 py-16 bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-4xl p-10 mx-auto border border-purple-200 shadow-xl bg-white/80 backdrop-blur-md rounded-3xl">
        
        {/* Heading */}
        <h1 className="mb-6 text-4xl font-extrabold text-center text-purple-800">
          About <span className="text-purple-600">Studify</span>
        </h1>

        {/* Intro */}
        <p className="mb-6 text-lg text-center text-purple-900">
          <strong>Studify</strong> is your all-in-one learning platform — designed for students to
          book sessions, save study materials, and manage notes in one secure space.
        </p>

        {/* Features */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-start gap-3 p-4 transition shadow-sm bg-purple-50 rounded-xl hover:shadow-md">
            <Lock className="text-purple-700" size={28} />
            <p className="text-purple-900">
              🔑 <strong>Book Sessions</strong>: Join sessions with your preferred tutor and manage your bookings seamlessly.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 transition shadow-sm bg-purple-50 rounded-xl hover:shadow-md">
            <BookOpen className="text-purple-700" size={28} />
            <p className="text-purple-900">
              📚 <strong>Save Materials</strong>: Access or save study resources and keep them neatly organized.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 transition shadow-sm bg-purple-50 rounded-xl hover:shadow-md">
            <Notebook className="text-purple-700" size={28} />
            <p className="text-purple-900">
              📝 <strong>Manage Notes</strong>: Create private notes only you can see, edit, or delete anytime.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 transition shadow-sm bg-purple-50 rounded-xl hover:shadow-md">
            <UserPlus className="text-purple-700" size={28} />
            <p className="text-purple-900">
              🤝 <strong>Become a Mentor</strong>: Request an upgrade and let our admin securely review it.
            </p>
          </div>
        </div>

        {/* Security Note */}
        <p className="mt-8 text-center text-purple-800">
          ✅ All your data — sessions, materials, and notes — are <strong>secure</strong> and visible only to you when logged in.
        </p>

        {/* Closing */}
        <p className="mt-6 text-lg font-semibold text-center text-purple-900">
          Studify helps you study smarter — <span className="text-purple-700">organized</span>, 
          <span className="text-purple-700"> secure</span>, and <span className="text-purple-700">simple</span>.
        </p>
      </div>
    </section>
  );
};

export default About;
