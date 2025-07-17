"use client";

import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const ViewSessions = () => {
  const axios = useAxios();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await axios.get("/sessions");
      setSessions(res.data);
    };
    fetchSessions();
  }, [axios]);

  const isRegistrationOpen = (registrationEndDate) => {
    const now = new Date();
    const endDate = new Date(registrationEndDate);
    return now <= endDate;
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {sessions.map((s) => (
        <div
          key={s._id}
          className="max-w-[350px] w-full space-y-6 rounded-lg border-b-2 border-l border-r-2 border-t
            border-b-purple-600 border-l-purple-800 border-r-purple-600 border-t-purple-800
            bg-purple-50 py-8 px-8 shadow-md dark:bg-purple-900"
        >
          {/* Header: Price & Label */}
          <div className="flex items-center justify-between">
            <h1 className="w-[35%] text-2xl font-bold tracking-wider text-purple-900 md:text-4xl dark:text-purple-300">
              <sup className="text-2xl font-black">$</sup>
              {s.registrationFee === 0 ? "Free" : s.registrationFee}
              <sub className="text-sm tracking-tight">/session</sub>
            </h1>
            <div className="w-[65%] rounded-bl-full rounded-tl-full bg-gradient-to-r from-purple-500 to-purple-700 px-4 py-4 md:px-10 md:py-5">
              <h3 className="font-semibold tracking-wider text-white uppercase md:text-xl">
                {s.title.length > 20 ? s.title.slice(0, 20) + "…" : s.title}
              </h3>
            </div>
          </div>

          {/* Tutor */}
          <p className="font-semibold text-purple-700 dark:text-purple-300">
            Tutor: {s.tutorName}
          </p>

          {/* Description with controlled height and overflow */}
          <p
            className="max-h-[5rem] overflow-hidden text-sm text-purple-800 dark:text-purple-300"
            title={s.description}
          >
            {s.description}
          </p>

          {/* Session info list */}
          <ul className="space-y-3 text-sm text-purple-900 dark:text-purple-300">
            <li>⭐ Average Rating: {s.averageRating ?? "N/A"}</li>
            <li>Duration: {s.duration || "N/A"}</li>
            <li>
              Registration Ends:{" "}
              {new Date(s.registrationEndDate).toLocaleDateString("en-US")}
            </li>
          </ul>

          {/* Button */}
          <div>
            {isRegistrationOpen(s.registrationEndDate) ? (
              <button className="w-full py-4 text-lg font-semibold tracking-wider text-white uppercase transition-colors rounded-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900">
                Book Now
              </button>
            ) : (
              <button
                disabled
                className="w-full py-4 text-lg font-semibold tracking-wider text-gray-700 uppercase bg-gray-400 rounded-full cursor-not-allowed"
              >
                Registration Closed
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewSessions;
