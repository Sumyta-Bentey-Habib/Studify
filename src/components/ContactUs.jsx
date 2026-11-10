import React, { useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact";
  }, []);

  return (
    <section className="relative min-h-screen px-6 py-16 lg:px-20 bg-gradient-to-br from-indigo-50 via-white to-slate-50 overflow-hidden">
      {/* Background blobs */}
      <div
        className="pointer-events-none absolute -top-28 -left-28 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #818cf8, #c7d2fe)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #34d399, #6ee7b7)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100 mb-4">
            📬 Get In Touch
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Contact{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Us
            </span>
          </h1>
          <p className="mt-3 text-slate-500 max-w-md mx-auto">
            Have questions or need support? Get in touch with us — we'd love to hear from you!
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact info */}
          <div className="flex flex-col gap-6 justify-center">
            {[
              { icon: <Mail size={20} />, label: "support@studify.com" },
              { icon: <Phone size={20} />, label: "+8801700000000" },
              { icon: <MapPin size={20} />, label: "24 Knowledge Road, Khulna, Bangladesh" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  {item.icon}
                </div>
                <span className="text-slate-700 text-sm">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <form className="p-8 space-y-5 bg-white shadow-xl rounded-3xl border border-slate-100">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-none"
                placeholder="Write your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition shadow-sm shadow-indigo-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
