import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { SWAL_THEME } from "../../utils/utils";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import { Calendar, Clock, User, Trash2 } from "lucide-react";

const BookedSession = () => {
  const axios = useAxios();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchBookedSessions = async () => {
      try {
        const res = await axios.get("/booked-sessions");
        if (isMounted) setSessions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load booked sessions:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchBookedSessions();
    return () => {
      isMounted = false;
    };
  }, [axios]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel this session?",
      text: "This booking will be cancelled and removed from your schedule.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: SWAL_THEME.cancelButtonColor,
      cancelButtonColor: SWAL_THEME.confirmButtonColor,
      confirmButtonText: "Yes, cancel booking",
      cancelButtonText: "Keep booking",
      background: SWAL_THEME.background,
      color: SWAL_THEME.color,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`/booked-sessions/${id}`);
      setSessions((prev) => prev.filter((s) => s._id !== id));
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Booking cancelled successfully",
        showConfirmButton: false,
        timer: 2000,
        background: SWAL_THEME.background,
        color: SWAL_THEME.color,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to cancel booking",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Booked Sessions"
        description="View your reserved slots, upcoming class schedules, and mentor details."
      />

      {loading ? (
        <LoadingSkeleton count={3} type="card" />
      ) : sessions.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No sessions booked yet"
          description="Browse the list of available study sessions and reserve your seat to attend live classes."
          actionLabel="Browse Available Sessions"
          actionLink="/dashboard/student/view-sessions"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-studify-surface rounded-2xl border border-studify-border p-6 shadow-sm hover:border-studify-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-studify-heading leading-snug">
                    {session.title}
                  </h3>
                  <StatusBadge status="approved">Confirmed</StatusBadge>
                </div>

                <div className="space-y-2 text-xs text-studify-muted bg-studify-bg/50 p-3.5 rounded-xl border border-studify-border/60">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-studify-primary" />
                    <span>
                      Mentor: <strong className="text-studify-heading">{session.tutorName || "Instructor"}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-studify-primary" />
                    <span>
                      {session.classStartTime
                        ? new Date(session.classStartTime).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Schedule pending"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-studify-primary" />
                    <span>Duration: {session.duration || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-studify-border flex items-center justify-between">
                <span className="text-xs font-semibold text-studify-muted">
                  {session.registrationFee ? `$${session.registrationFee}` : "Free session"}
                </span>

                <button
                  onClick={() => handleDelete(session._id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-studify-danger/10 text-studify-danger text-xs font-semibold hover:bg-studify-danger hover:text-white border border-studify-danger/20 transition-colors"
                >
                  <Trash2 size={13} />
                  <span>Cancel Booking</span>
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
