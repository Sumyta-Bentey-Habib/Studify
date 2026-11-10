"use client";

import React from "react";
import { BookOpen, Notebook, Lock, UserPlus } from "lucide-react";
import { useEffect } from "react";

const features = [
  {
    icon: <Lock size={24} />,
    emoji: "🔑",
    title: "Book Sessions",
    description: "Join sessions with your preferred tutor and manage your bookings seamlessly.",
  },
  {
    icon: <BookOpen size={24} />,
    emoji: "📚",
    title: "Save Materials",
    description: "Access or save study resources and keep them neatly organized.",
  },
  {
    icon: <Notebook size={24} />,
    emoji: "📝",
    title: "Manage Notes",
    description: "Create private notes only you can see, edit, or delete anytime.",
  },
  {
    icon: <UserPlus size={24} />,
    emoji: "🤝",
    title: "Become a Mentor",
    description: "Request an upgrade and let our admin securely review it.",
  },
];

const About = () => {
  useEffect(() => {
    document.title = "About";
  }, []);

  return (
    <section className="relative flex items-center min-h-screen px-6 py-16 bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      {/* Background blobs */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #818cf8, #c7d2fe)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #34d399, #6ee7b7)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-indigo-100 shadow-xl p-10">

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100">
              🎓 About Studify
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-extrabold text-center text-slate-900">
            About{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Studify
            </span>
          </h1>

          {/* Intro */}
          <p className="mb-10 text-lg text-center text-slate-600 max-w-2xl mx-auto">
            <strong className="text-slate-800">Studify</strong> is your all-in-one learning platform — designed for
            students to book sessions, save study materials, and manage notes in one secure space.
          </p>

          {/* Features grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 bg-indigo-50/60 rounded-2xl border border-indigo-100 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{f.emoji} {f.title}</h3>
                  <p className="text-sm text-slate-600">{f.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Security note */}
          <p className="mt-10 text-center text-sm text-slate-600 bg-emerald-50 rounded-xl px-6 py-4 border border-emerald-100">
            ✅ All your data — sessions, materials, and notes — are{" "}
            <strong className="text-emerald-700">secure</strong> and visible only to you when logged in.
          </p>

          {/* Closing */}
          <p className="mt-6 text-base font-semibold text-center text-slate-700">
            Studify helps you study smarter —{" "}
            <span className="text-indigo-600">organized</span>,{" "}
            <span className="text-indigo-600">secure</span>, and{" "}
            <span className="text-indigo-600">simple</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
