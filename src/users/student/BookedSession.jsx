import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const BookedSession = () => {
  const axios = useAxios();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchBookedSessions = async () => {
      try {
        const res = await axios.get("/booked-sessions");
        setSessions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookedSessions();
  }, [axios]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel this session?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`/booked-sessions/${id}`);
      setSessions((prev) => prev.filter((s) => s._id !== id));
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Session cancelled",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to cancel session",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-purple-50">
      <h2 className="mb-6 text-2xl font-bold text-purple-800">My Booked Sessions</h2>

      {sessions.length === 0 ? (
        <p className="text-center text-purple-700">No sessions booked yet.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="p-6 bg-white border border-purple-200 rounded-lg shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold text-purple-900">
                {session.title}
              </h3>
              <p className="text-sm text-purple-700">
                <span className="font-medium">Tutor:</span> {session.tutorName}
              </p>
              <p className="text-sm text-purple-700">
                <span className="font-medium">Student:</span> {session.studentName}
              </p>
              <p className="text-sm text-purple-700">
                <span className="font-medium">Class Time:</span>{" "}
                {session.classStartTime
                  ? new Date(session.classStartTime).toLocaleString("en-US")
                  : "N/A"}
              </p>
              <p className="text-sm text-purple-700">
                <span className="font-medium">Duration:</span>{" "}
                {session.duration || "N/A"}
              </p>

              {/* Cancel button */}
              <button
                onClick={() => handleDelete(session._id)}
                className="px-3 py-2 mt-4 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-700"
              >
                Cancel Session
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedSession;
