import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const statusColor = (status) => {
  if (!status) return "bg-slate-100 text-slate-500";
  const s = status.toLowerCase();
  if (s === "approved" || s === "ongoing") return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  if (s === "pending") return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  if (s === "rejected" || s === "closed") return "bg-red-50 text-red-700 ring-1 ring-red-200";
  return "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200";
};

const ViewAllStudySessions = ({ limit }) => {
  const axios = useAxios();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("/sessions");
        setSessions(res.data);
        setMessage(res.data.length === 0 ? "No study sessions available." : "");
      } catch (error) {
        console.error("Failed to fetch study sessions:", error);
        setMessage("Failed to load study sessions.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [axios]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-24">
        <div className="h-10 w-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
      </div>
    );

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100 mb-4">
            📖 Browse &amp; Book
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            All{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Study Sessions
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-md mx-auto">
            Explore live and upcoming sessions led by experienced mentors.
          </p>
        </div>

        {message && (
          <p className={`mb-8 text-center ${message.includes("Failed") ? "text-red-600" : "text-slate-500"}`}>
            {message}
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(limit ? sessions.slice(0, limit) : sessions).map((session) => (
            <div
              key={session._id}
              className="group flex flex-col rounded-2xl bg-white ring-1 ring-slate-100 shadow-sm hover:shadow-md hover:ring-indigo-200 transition-all duration-300 overflow-hidden"
            >
              {/* Card top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-violet-400" />

              <div className="flex flex-col flex-1 p-6 gap-3">
                {/* Title + status */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-slate-800 leading-snug">
                    {session.title || "Untitled Session"}
                  </h3>
                  <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor(session.status)}`}>
                    {session.status || "N/A"}
                  </span>
                </div>

                {/* Tutor */}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-base">🧑‍🏫</span>
                  <span>{session.tutorName || "Unknown Tutor"}</span>
                </div>

                {/* Description */}
                {session.description && (
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {session.description}
                  </p>
                )}

                {/* Meta pills */}
                <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-slate-50">
                  {session.duration && (
                    <span className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-100">
                      ⏱ {session.duration}
                    </span>
                  )}
                  {session.averageRating !== undefined && (
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700 ring-1 ring-amber-100">
                      ★ {session.averageRating || "New"}
                    </span>
                  )}
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700 ring-1 ring-indigo-100">
                    {session.registrationFee === 0 ? "Free" : `$${session.registrationFee}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewAllStudySessions;
