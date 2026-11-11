import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import PageHeader from "../../components/ui/PageHeader";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import EmptyState from "../../components/ui/EmptyState";
import StatusBadge from "../../components/ui/StatusBadge";
import { BookOpen, User, Calendar, Clock, DollarSign } from "lucide-react";

const ViewAllStudySessions = ({ limit }) => {
  const axios = useAxios();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSessions = async () => {
      try {
        const res = await axios.get("/sessions");
        if (isMounted) setSessions(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch study sessions:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSessions();

    return () => {
      isMounted = false;
    };
  }, [axios]);

  const displayedSessions = limit ? sessions.slice(0, limit) : sessions;

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Study Sessions"
        description="Comprehensive directory of all live, scheduled, and past study sessions across the platform."
      />

      {loading ? (
        <LoadingSkeleton count={6} type="card" />
      ) : displayedSessions.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No study sessions found"
          description="There are currently no active or scheduled study sessions registered on the platform."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedSessions.map((session) => (
            <div
              key={session._id}
              className="bg-studify-surface rounded-2xl border border-studify-border p-6 shadow-sm hover:border-studify-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-studify-heading leading-snug">
                    {session.title || "Untitled Session"}
                  </h3>
                  <StatusBadge status={session.status || "open"}>
                    {session.status || "Active"}
                  </StatusBadge>
                </div>

                <div className="flex items-center gap-2 text-xs text-studify-muted">
                  <User size={13} className="text-studify-primary" />
                  <span>
                    Mentor: <strong className="text-studify-heading">{session.tutorName || "Unknown"}</strong>
                  </span>
                </div>

                {session.description && (
                  <p className="text-xs text-studify-muted leading-relaxed line-clamp-2">
                    {session.description}
                  </p>
                )}

                <div className="space-y-1.5 text-xs text-studify-muted bg-studify-bg/50 p-3.5 rounded-xl border border-studify-border/60">
                  <div className="flex items-center justify-between">
                    <span>Registration Fee:</span>
                    <strong className="text-studify-primary">
                      {session.registrationFee === 0 || session.registrationFee === "0"
                        ? "Free"
                        : `$${session.registrationFee}`}
                    </strong>
                  </div>

                  {session.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-studify-primary" />
                      <span>Duration: {session.duration}</span>
                    </div>
                  )}

                  {session.classStartTime && (
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-studify-primary" />
                      <span>
                        Starts: {new Date(session.classStartTime).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-studify-border flex items-center justify-between text-xs text-studify-muted">
                <span>Created by:</span>
                <span className="font-mono text-[11px] truncate max-w-[180px]">
                  {session.creatorEmail || "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllStudySessions;
