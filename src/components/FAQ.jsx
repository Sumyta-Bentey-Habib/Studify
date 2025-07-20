"use client";

import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a session?",
      answer:
        "After logging in, browse available sessions and click 'Book'. Your booked sessions will appear under 'My Booked Sessions'.",
    },
    {
      question: "Can I save study materials?",
      answer:
        "Yes! You can save any material you find useful by clicking the 'Save Material' button. These materials are saved only for your account.",
    },
    {
      question: "Are my notes private?",
      answer:
        "Absolutely. Your notes are linked to your account and only you can view, edit, or delete them.",
    },
    {
      question: "How do I become a mentor?",
      answer:
        "You can submit an upgrade request from your profile. Our admin team will review and approve or reject your request.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, all actions require authentication with Firebase JWT. Your data is accessible only when you are logged in.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="max-w-4xl px-6 py-12 mx-auto rounded-lg shadow"
      style={{ backgroundColor: "#F3E8FF" }}
    >
      <h2 className="mb-6 text-3xl font-extrabold text-purple-800">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-4 bg-white border border-purple-300 rounded-lg cursor-pointer"
            onClick={() => toggleIndex(idx)}
          >
            <h3 className="flex items-center justify-between text-lg font-semibold text-purple-900">
              {faq.question}
              <span className="ml-4 text-xl select-none">
                {openIndex === idx ? "−" : "+"}
              </span>
            </h3>
            {openIndex === idx && (
              <p className="mt-2 text-purple-800">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
