import React, { useEffect, useState, useContext } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../contexts/authcontext/AuthProvider";

const StudentDashboard = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);


  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    
    const fetchSessions = async () => {
      try {
        const res = await axios.get("/sessions");
        setSessions(res.data);
      } catch (err) {
        console.error(err);
      }
    };


    fetchSessions();
  }, [axios]);

  const isRegistrationOpen = (endDate) => {
    return new Date() <= new Date(endDate);
  };

  // ✅ Book a session with FULL details
  const handleBookSession = async (session) => {
    try {
      const booking = {
        sessionId: session._id,
        title: session.title,
        tutorName: session.tutorName,
        studentName: user?.displayName || user?.email || "Unknown",
        bookedAt: new Date(),
        classStartTime: session.classStartTime,
        duration: session.duration,
        registrationFee: session.registrationFee
      };

      const res = await axios.post("/booked-sessions", booking);
      if (res.data.insertedId) {
        alert("Session booked successfully!");
      }
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <div className="p-6 space-y-12">
      <section>
        <h2 className="mb-4 text-2xl font-bold text-purple-800">
          📅 Available Sessions
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sessions.length === 0 && <p>No sessions available right now.</p>}
          {sessions.map((s) => (
            <div
              key={s._id}
              className="p-6 border border-purple-300 rounded shadow bg-purple-50 dark:bg-purple-900"
            >
              <h3 className="mb-2 font-bold text-purple-700 dark:text-purple-300">
                {s.title}
              </h3>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Tutor: {s.tutorName}
              </p>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Registration Fee:{" "}
                {s.registrationFee === 0 ? "Free" : `$${s.registrationFee}`}
              </p>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Ends: {new Date(s.registrationEndDate).toLocaleDateString()}
              </p>
              <p className="mb-4 text-sm text-purple-800 dark:text-purple-200">
                {s.description?.slice(0, 80)}...
              </p>
              {isRegistrationOpen(s.registrationEndDate) ? (
                <button
                  onClick={() => handleBookSession(s)}
                  className="w-full py-2 text-sm font-semibold text-white uppercase rounded bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                >
                  Book Now
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-2 text-sm font-semibold text-gray-700 uppercase bg-gray-400 rounded cursor-not-allowed"
                >
                  Registration Closed
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
