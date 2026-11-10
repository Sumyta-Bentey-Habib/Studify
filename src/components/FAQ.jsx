"use client";

import React, { useState } from "react";
import { FAQ_BG_COLOR } from "../utils/utils";

const faqs = [
  {
    question: "How do I book a session?",
    answer: "After logging in, browse available sessions and click 'Book'. Your booked sessions will appear under 'My Booked Sessions'.",
  },
  {
    question: "Can I save study materials?",
    answer: "Yes! You can save any material you find useful by clicking the 'Save Material' button. These materials are saved only for your account.",
  },
  {
    question: "Are my notes private?",
    answer: "Absolutely. Your notes are linked to your account and only you can view, edit, or delete them.",
  },
  {
    question: "How do I become a mentor?",
    answer: "You can submit an upgrade request from your profile. Our admin team will review and approve or reject your request.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, all actions require authentication with Firebase JWT. Your data is accessible only when you are logged in.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100 mb-4">
            💡 Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-slate-500">
            Everything you need to know about Studify. Can't find the answer? Reach out to us.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === idx
                  ? "border-indigo-200 bg-indigo-50 shadow-sm"
                  : "border-slate-100 bg-white hover:border-indigo-100"
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => toggleIndex(idx)}
              >
                <span className={`text-base font-semibold transition-colors ${openIndex === idx ? "text-indigo-700" : "text-slate-800"}`}>
                  {faq.question}
                </span>
                <span
                  className={`ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                    openIndex === idx
                      ? "bg-indigo-600 text-white rotate-45"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === idx && (
                <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
