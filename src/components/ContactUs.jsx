import React, { useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  useEffect(()=>{
    document.title="Contact ";
  },[]);

  return (
    <section className="min-h-screen px-6 py-16 lg:px-20 bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-purple-900">Contact Us</h1>
          <p className="mt-3 text-gray-600">
            Have questions or need support? Get in touch with us—we’d love to hear from you!
          </p>
        </div>

        {/* Contact Info & Form */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="text-purple-700" />
              <span className="text-gray-700">support@studify.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-purple-700" />
              <span className="text-gray-700">+8801700000000</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-purple-700" />
              <span className="text-gray-700">
                24 Knowledge Road, Khulna, Bangladesh
              </span>
            </div>
          </div>

          {/* Form */}
          <form className="p-6 space-y-5 bg-white shadow-lg rounded-2xl">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white transition bg-purple-700 rounded-lg hover:bg-purple-800"
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
