import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

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

  if (loading) return <p>Loading study sessions...</p>;

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h2 className="mb-6 text-5xl font-bold text-center text-purple-800">All Study Sessions</h2>

      {message && (
        <p
          className={`mb-4 ${
            message.includes("Failed") ? "text-red-600" : "text-green-700"
          }`}
        >
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(limit ? sessions.slice(0, limit) : sessions).map((session) => (
          <div
            key={session._id}
            className="border border-purple-200 shadow-md card bg-purple-50"
          >
            <div className="card-body">
              <h3 className="text-purple-700 card-title">
                {session.title || "No Title"}
              </h3>
              <p>
                <span className="font-semibold">Tutor:</span>{" "}
                {session.tutorName || "Unknown"}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {session.description || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {session.duration || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Average Rating:</span>{" "}
                {session.averageRating || 0}
              </p>
              <p>
                <span className="font-semibold">Registration Period:</span>{" "}
                {session.registrationStartDate} to {session.registrationEndDate}
              </p>
              <p>
                <span className="font-semibold">Class Time:</span>{" "}
                {session.classStartTime} to {session.classEndDate}
              </p>
              <p>
                <span className="font-semibold">Registration Fee:</span>{" "}
                {session.registrationFee === 0
                  ? "Free"
                  : `$${session.registrationFee}`}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {session.status || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllStudySessions;
