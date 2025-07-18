import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../contexts/authcontext/AuthProvider";

const StudySessionsView = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get("/sessions");
        setSessions(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to fetch sessions. Please try again later.",
          background: "#E6E6FA", 
          color: "#4B0082", 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [axios]);

  const isRegistrationOpen = (endDate) => new Date() <= new Date(endDate);

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
        registrationFee: session.registrationFee,
      };

      const res = await axios.post("/booked-sessions", booking);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Booked!",
          text: `Successfully booked session: ${session.title}`,
          background: "#E6E6FA",
          color: "#4B0082",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "Please try again.",
          background: "#E6E6FA",
          color: "#4B0082",
        });
      }
    } catch (error) {
      console.error("Booking failed:", error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Please try again.",
        background: "#E6E6FA",
        color: "#4B0082",
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-indigo-700" style={{ backgroundColor: "#F3E8FF" }}>
        Loading sessions...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-12" style={{ backgroundColor: "#F3E8FF" }}>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">📅 Available Sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-indigo-700">No sessions available right now.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((s) => (
              <div
                key={s._id}
                className="p-6 border border-indigo-300 rounded shadow"
                style={{ backgroundColor: "#E6E6FA" }} // lavender bg
              >
                <h3 className="mb-2 font-bold text-indigo-900">{s.title}</h3>
                <p className="text-sm text-indigo-700">Tutor: {s.tutorName}</p>
                <p className="text-sm text-indigo-700">
                  Registration Fee: {s.registrationFee === 0 ? "Free" : `$${s.registrationFee}`}
                </p>
                <p className="text-sm text-indigo-700">
                  Ends: {new Date(s.registrationEndDate).toLocaleDateString()}
                </p>
                <p className="mb-4 text-sm text-indigo-700">{s.description?.slice(0, 80)}...</p>

                {isRegistrationOpen(s.registrationEndDate) ? (
                  <button
                    onClick={() => handleBookSession(s)}
                    className="w-full py-2 text-sm font-semibold text-white uppercase rounded bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900"
                  >
                    Book Now
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-2 text-sm font-semibold text-gray-700 uppercase bg-gray-300 rounded cursor-not-allowed"
                  >
                    Registration Closed
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StudySessionsView;
