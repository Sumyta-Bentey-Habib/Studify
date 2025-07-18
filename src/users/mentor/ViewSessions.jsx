"use client";

import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const ViewSessions = () => {
  const axios = useAxios();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("/sessions");
        setSessions(res.data);
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [axios]);

  if (loading) {
    return (
      <div className="flex justify-center p-10 text-indigo-700" style={{ backgroundColor: "#F3E8FF" }}>
        Loading sessions...
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <p className="p-10 text-center text-indigo-700" style={{ backgroundColor: "#F3E8FF" }}>
        No sessions available.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6" style={{ backgroundColor: "#F3E8FF" }}>
      {sessions.map((s) => (
        <div
          key={s._id}
          className="flex flex-col justify-between p-6 transition-shadow rounded-lg shadow-md card w-80"
          style={{ backgroundColor: "white" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                className="text-lg font-semibold text-indigo-900"
                title={s.title}
              >
                {s.title.length > 25 ? s.title.slice(0, 25) + "…" : s.title}
              </h3>
              <p className="mt-1 text-sm text-indigo-600">
                Tutor: <span className="font-medium">{s.tutorName}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-indigo-700">
                {s.registrationFee === 0 ? (
                  <span>Free</span>
                ) : (
                  <>
                    <sup className="text-sm">$</sup>
                    {s.registrationFee}
                    <sub className="text-xs">/session</sub>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Description */}
          <p
            className="mb-4 text-sm text-indigo-700 line-clamp-3"
            title={s.description}
          >
            {s.description || "No description available."}
          </p>

          {/* Info */}
          <ul className="mb-6 space-y-1 text-xs text-indigo-600">
            <li>⭐ Average Rating: {s.averageRating ?? "N/A"}</li>
            <li>Duration: {s.duration || "N/A"}</li>
            <li>
              Registration Ends:{" "}
              <time dateTime={s.registrationEndDate}>
                {new Date(s.registrationEndDate).toLocaleDateString()}
              </time>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ViewSessions;
