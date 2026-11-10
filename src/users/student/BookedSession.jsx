import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { Calendar, Clock, User } from "lucide-react";

const BookedSession = () => {
  const axios = useAxios();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedSessions = async () => {
      try {
        const res = await axios.get("/booked-sessions");
        setSessions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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
      Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Session cancelled", showConfirmButton: false, timer: 2000 });
    } catch (err) {
      console.error(err);
      Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Failed to cancel", showConfirmButton: false, timer: 2000 });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
      </div>
    );

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-5">My Booked Sessions</h2>
      {sessions.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Calendar size={40} className="mx-auto mb-3 opacity-30" />
          <p>No sessions booked yet.</p>
        </div>
      ) : (
        <div className="space-y-4 max-w-2xl">
          {sessions.map((session) => (
            <div key={session._id} className="bg-white rounded-2xl ring-1 ring-slate-100 shadow-sm hover:shadow-md transition overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-400" />
              <div className="p-5">
                <h3 className="text-base font-bold text-slate-800 mb-3">{session.title}</h3>
                <div className="space-y-1.5 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-indigo-400" />
                    <span>Tutor: <strong>{session.tutorName}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-slate-400" />
                    <span>Student: {session.studentName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-indigo-400" />
                    <span>{session.classStartTime ? new Date(session.classStartTime).toLocaleString("en-US") : "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-slate-400" />
                    <span>Duration: {session.duration || "N/A"}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(session._id)}
                  className="mt-4 rounded-xl bg-red-50 text-red-600 ring-1 ring-red-200 px-4 py-2 text-sm font-semibold hover:bg-red-600 hover:text-white transition"
                >
                  Cancel Session
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedSession;
