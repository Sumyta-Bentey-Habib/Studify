import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import useAxios from "../../hooks/useAxios";
import {
  CalendarPlus,
  CloudUpload,
  CalendarCheck,
  Sparkles,
  ArrowRight,
  BookOpen,
  DollarSign,
  Tag,
  Clock,
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import ActionCard from "../../components/ui/ActionCard";
import StatusBadge from "../../components/ui/StatusBadge";

const Mentor = () => {
  const location = useLocation();
  const { user } = useAuth();
  const axios = useAxios();

  const isRoot =
    location.pathname === "/dashboard/mentor" ||
    location.pathname === "/dashboard/mentor/";

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isRoot) return;

    let isMounted = true;
    const fetchMentorData = async () => {
      try {
        const res = await axios.get("/sessions");
        if (!isMounted) return;
        const allSessions = Array.isArray(res.data) ? res.data : [];
        const mySessions = user?.email
          ? allSessions.filter((s) => s.creatorEmail === user.email)
          : allSessions;
        setSessions(mySessions);
      } catch (err) {
        console.error("Failed to load mentor sessions:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMentorData();

    return () => {
      isMounted = false;
    };
  }, [axios, isRoot, user?.email]);

  if (!isRoot) {
    return <Outlet />;
  }

  const totalSessions = sessions.length;
  const freeSessions = sessions.filter(
    (s) => s.registrationFee === 0 || s.registrationFee === "0"
  ).length;
  const paidSessions = totalSessions - freeSessions;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── Welcome Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-studify-surface border border-studify-border p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studify-primary/10 text-studify-primary text-xs font-semibold mb-3 border border-studify-primary/20">
            <Sparkles size={14} />
            <span>Mentor Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-studify-heading tracking-tight leading-tight">
            Your Teaching Space
          </h1>
          <p className="mt-2 text-sm sm:text-base text-studify-muted leading-relaxed">
            Create meaningful learning experiences for your students. Host live sessions, manage registrations, and publish curated academic resources.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="create-session"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-studify-primary text-white text-sm font-semibold hover:bg-studify-primary-dark transition-colors shadow-sm"
            >
              <CalendarPlus size={16} />
              <span>Create New Session</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="upload-materials"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-studify-bg text-studify-heading text-sm font-semibold hover:bg-studify-border/60 border border-studify-border transition-colors"
            >
              <CloudUpload size={16} />
              <span>Upload Materials</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Primary Actions ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-studify-heading">Teaching Actions</h2>
          <span className="text-xs text-studify-muted">Quick management operations</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ActionCard
            icon={CalendarPlus}
            title="Create Session"
            description="Publish a new study session with schedules, duration, and fees."
            to="create-session"
            actionText="Publish Session"
            highlight={true}
          />
          <ActionCard
            icon={CloudUpload}
            title="Upload Materials"
            description="Share useful documents, drive links, and study notes with students."
            to="upload-materials"
            actionText="Upload Resource"
          />
          <ActionCard
            icon={CalendarCheck}
            title="My Sessions"
            description="View, monitor, and manage your currently published courses."
            to="view-sessions"
            actionText="Manage Sessions"
          />
        </div>
      </div>

      {/* ── Teaching Overview Metrics ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-studify-heading">Teaching Overview</h2>
          <span className="text-xs text-studify-muted">Based on your published sessions</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={BookOpen}
            label="Total Sessions"
            value={loading ? "—" : totalSessions}
            helperText="Sessions created by you"
          />
          <StatCard
            icon={Tag}
            label="Free Sessions"
            value={loading ? "—" : freeSessions}
            helperText="Open access community courses"
          />
          <StatCard
            icon={DollarSign}
            label="Paid Sessions"
            value={loading ? "—" : paidSessions}
            helperText="Premium guided courses"
          />
        </div>
      </div>

      {/* ── Recent Published Sessions Preview ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-studify-heading">Published Sessions</h2>
          <Link
            to="view-sessions"
            className="text-xs font-semibold text-studify-primary hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {sessions.length === 0 ? (
          <div className="p-8 text-center bg-studify-surface rounded-2xl border border-studify-border">
            <BookOpen size={36} className="mx-auto text-studify-muted/40 mb-2" />
            <p className="text-sm font-semibold text-studify-heading">No sessions published yet</p>
            <p className="text-xs text-studify-muted mt-1 max-w-sm mx-auto">
              Get started by publishing your first academic session or lecture for learners.
            </p>
            <Link
              to="create-session"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-studify-primary text-white text-xs font-semibold hover:bg-studify-primary-dark transition-colors"
            >
              Create Your First Session
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.slice(0, 6).map((session) => (
              <div
                key={session._id}
                className="p-5 rounded-2xl bg-studify-surface border border-studify-border shadow-xs hover:border-studify-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className="text-base font-bold text-studify-heading leading-snug line-clamp-1"
                      title={session.title}
                    >
                      {session.title}
                    </h3>
                    <StatusBadge status={session.status || "open"}>
                      {session.status || "Active"}
                    </StatusBadge>
                  </div>
                  <p className="text-xs text-studify-muted line-clamp-2 mb-4 leading-relaxed">
                    {session.description || "No description provided."}
                  </p>
                </div>

                <div className="pt-3 border-t border-studify-border/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-studify-primary">
                    {session.registrationFee === 0 || session.registrationFee === "0"
                      ? "Free"
                      : `$${session.registrationFee}`}
                  </span>
                  <span className="text-studify-muted flex items-center gap-1">
                    <Clock size={12} />
                    <span>{session.duration || "N/A"}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentor;
