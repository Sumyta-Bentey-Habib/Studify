import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../contexts/authcontext/AuthProvider";
import { useNavigate } from "react-router-dom";
import { SWAL_THEME } from "../../utils/utils";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import { BookOpen, User, Calendar, Clock, DollarSign, ArrowRight } from "lucide-react";

const StudySessionsView = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchSessions = async () => {
      try {
        const res = await axios.get("/sessions");
        if (isMounted) setSessions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops…",
          text: "Failed to fetch study sessions. Please try again later.",
          background: SWAL_THEME.background,
          color: SWAL_THEME.color,
          confirmButtonColor: SWAL_THEME.confirmButtonColor,
        });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSessions();

    return () => {
      isMounted = false;
    };
  }, [axios]);

  const isRegistrationOpen = (endDate) => {
    if (!endDate) return true;
    return new Date() <= new Date(endDate);
  };

  const handleBookSession = async (session) => {
    setBookingId(session._id);
    try {
      const booking = {
        sessionId: session._id,
        title: session.title,
        tutorName: session.tutorName,
        studentName: user?.displayName || user?.email || "Unknown Student",
        studentEmail: user?.email,
        bookedAt: new Date(),
        classStartTime: session.classStartTime,
        duration: session.duration,
        registrationFee: session.registrationFee,
      };

      const res = await axios.post("/booked-sessions", booking);
      if (res.data.insertedId) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Booked: ${session.title}`,
          showConfirmButton: false,
          timer: 2000,
          background: SWAL_THEME.background,
          color: SWAL_THEME.color,
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Booking failed. Please try again.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Booking failed:", error);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Booking failed. Please try again.",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setBookingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Available Study Sessions"
        description="Explore live lectures, revision bootcamps, and interactive tutoring sessions led by verified mentors."
      />

      {loading ? (
        <LoadingSkeleton count={3} type="card" />
      ) : sessions.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No sessions available right now"
          description="Check back later for newly scheduled study sessions and interactive courses."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sessions.map((s) => {
            const open = isRegistrationOpen(s.registrationEndDate);
            const isBooking = bookingId === s._id;

            return (
              <div
                key={s._id}
                className="bg-studify-surface rounded-2xl border border-studify-border p-6 shadow-sm hover:border-studify-primary/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-studify-heading leading-snug">
                      {s.title}
                    </h3>
                    <StatusBadge status={open ? "open" : "closed"}>
                      {open ? "Registration Open" : "Closed"}
                    </StatusBadge>
                  </div>

                  <p className="text-xs text-studify-muted leading-relaxed line-clamp-2">
                    {s.description || "No description provided."}
                  </p>

                  <div className="space-y-2 text-xs text-studify-muted bg-studify-bg/50 p-3.5 rounded-xl border border-studify-border/60">
                    <div className="flex items-center gap-2">
                      <User size={13} className="text-studify-primary" />
                      <span>
                        Tutor: <strong className="text-studify-heading">{s.tutorName || "Instructor"}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign size={13} className="text-studify-primary" />
                      <span>
                        Fee:{" "}
                        <strong className="text-studify-primary">
                          {s.registrationFee === 0 || s.registrationFee === "0"
                            ? "Free"
                            : `$${s.registrationFee}`}
                        </strong>
                      </span>
                    </div>

                    {s.duration && (
                      <div className="flex items-center gap-2">
                        <Clock size={13} className="text-studify-primary" />
                        <span>Duration: {s.duration}</span>
                      </div>
                    )}

                    {s.registrationEndDate && (
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-studify-primary" />
                        <span>
                          Closes: {new Date(s.registrationEndDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-studify-border flex flex-col gap-2">
                  {open && (
                    <button
                      onClick={() => handleBookSession(s)}
                      disabled={isBooking}
                      className="w-full py-2.5 px-4 text-xs font-bold text-white uppercase rounded-xl bg-studify-primary hover:bg-studify-primary-dark transition-colors shadow-xs disabled:opacity-50"
                    >
                      {isBooking ? "Booking Slot…" : "Book Now"}
                    </button>
                  )}

                  <button
                    onClick={() => navigate(`${s._id}`)}
                    className="w-full py-2 px-4 text-xs font-semibold text-studify-primary hover:bg-studify-primary/10 rounded-xl border border-studify-primary/30 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Details</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudySessionsView;
