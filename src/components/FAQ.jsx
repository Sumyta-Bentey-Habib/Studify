import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book a session?",
    answer: "After logging in, browse available sessions and click 'Book'. Your booked sessions will appear under 'My Booked Sessions' in your student dashboard.",
  },
  {
    question: "Can I save study materials?",
    answer: "Yes! You can save any material you find useful by clicking 'Save to Mine'. These materials are saved to your personal library under 'Saved Materials'.",
  },
  {
    question: "Are my notes private?",
    answer: "Absolutely. Your notes are securely linked to your account and only you can view, edit, or delete them.",
  },
  {
    question: "How do I become a mentor?",
    answer: "You can submit an upgrade request from your student dashboard under 'Become a Mentor'. Our admin team will review and approve your application.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, all actions require authentication with Firebase JWT. Your data is accessible only when you are authorized and logged in.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-studify-surface">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-studify-primary/10 px-4 py-1.5 text-xs font-bold text-studify-primary border border-studify-primary/20 mb-3">
            Platform Help Center
          </span>
          <h2 className="text-3xl font-extrabold text-studify-heading sm:text-4xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-studify-muted max-w-md mx-auto">
            Everything you need to know about StudyFy. Have more questions? Reach out to our community support.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                openIndex === idx
                  ? "border-studify-primary/40 bg-studify-bg/40 shadow-xs"
                  : "border-studify-border bg-studify-surface hover:border-studify-primary/20"
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4.5 text-left"
                onClick={() => toggleIndex(idx)}
              >
                <span className="text-sm sm:text-base font-bold text-studify-heading">
                  {faq.question}
                </span>
                <span
                  className={`ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-transform duration-200 ${
                    openIndex === idx
                      ? "bg-studify-primary text-white rotate-180"
                      : "bg-studify-bg text-studify-muted"
                  }`}
                >
                  <ChevronDown size={14} />
                </span>
              </button>
              {openIndex === idx && (
                <p className="px-6 pb-5 text-xs sm:text-sm leading-relaxed text-studify-muted border-t border-studify-border/40 pt-3">
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
