import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import useAxios from "../../hooks/useAxios";
import {
  BookOpen,
  CalendarCheck,
  FileText,
  FolderOpen,
  PenLine,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Clock,
  User,
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import ActionCard from "../../components/ui/ActionCard";
import StatusBadge from "../../components/ui/StatusBadge";

const Student = () => {
  const location = useLocation();
  const { user } = useAuth();
  const axios = useAxios();

  const isRoot =
    location.pathname === "/dashboard/student" ||
    location.pathname === "/dashboard/student/";

  const [stats, setStats] = useState({
    bookedCount: 0,
    notesCount: 0,
    sessionsCount: 0,
    materialsCount: 0,
  });
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Determine greeting based on local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const firstName = user?.displayName
    ? user.displayName.split(" ")[0]
    : "Learner";

  useEffect(() => {
    if (!isRoot) return;

    let isMounted = true;
    const loadOverviewData = async () => {
      try {
        const [sessionsRes, bookedRes, materialsRes] = await Promise.allSettled([
          axios.get("/sessions"),
          axios.get("/booked-sessions"),
          axios.get("/materials"),
        ]);

        let notesCount = 0;
        if (user?.email) {
          try {
            const notesRes = await axios.get(
              `/notes?userEmail=${encodeURIComponent(user.email)}`
            );
            notesCount = Array.isArray(notesRes.data) ? notesRes.data.length : 0;
          } catch {
            notesCount = 0;
          }
        }

        if (!isMounted) return;

        const bookedData =
          bookedRes.status === "fulfilled" && Array.isArray(bookedRes.value.data)
            ? bookedRes.value.data
            : [];
        const sessionsData =
          sessionsRes.status === "fulfilled" && Array.isArray(sessionsRes.value.data)
            ? sessionsRes.value.data
            : [];
        const materialsData =
          materialsRes.status === "fulfilled" && Array.isArray(materialsRes.value.data)
            ? materialsRes.value.data
            : [];

        setStats({
          bookedCount: bookedData.length,
          notesCount,
          sessionsCount: sessionsData.length,
          materialsCount: materialsData.length,
        });

        // Show latest 3 upcoming bookings
        setUpcomingBookings(bookedData.slice(0, 3));
      } catch (err) {
        console.error("Failed to load student dashboard stats", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadOverviewData();

    return () => {
      isMounted = false;
    };
  }, [axios, isRoot, user?.email]);

  if (!isRoot) {
    return <Outlet />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── Welcome Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-studify-surface border border-studify-border p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-studify-primary/10 text-studify-primary text-xs font-semibold mb-3 border border-studify-primary/20">
            <Sparkles size={14} />
            <span>Student Learning Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-studify-heading tracking-tight leading-tight">
            {getGreeting()}, {firstName}!
          </h1>
          <p className="mt-2 text-sm sm:text-base text-studify-muted leading-relaxed">
            Your learning journey continues here. Discover upcoming sessions, manage your private notes, and access curated study materials.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="view-sessions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-studify-primary text-white text-sm font-semibold hover:bg-studify-primary-dark transition-colors shadow-sm"
            >
              <BookOpen size={16} />
              <span>Explore Sessions</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="create-note"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-studify-bg text-studify-heading text-sm font-semibold hover:bg-studify-border/60 border border-studify-border transition-colors"
            >
              <PenLine size={16} />
              <span>Create Note</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Learning Overview Stats ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-studify-heading">Learning Overview</h2>
          <span className="text-xs text-studify-muted">Real-time platform activity</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={CalendarCheck}
            label="Booked Sessions"
            value={loading ? "—" : stats.bookedCount}
            helperText="Active study bookings"
          />
          <StatCard
            icon={BookOpen}
            label="Available Sessions"
            value={loading ? "—" : stats.sessionsCount}
            helperText="Live & upcoming courses"
          />
          <StatCard
            icon={FolderOpen}
            label="Study Materials"
            value={loading ? "—" : stats.materialsCount}
            helperText="Curated resources"
          />
          <StatCard
            icon={FileText}
            label="My Notes"
            value={loading ? "—" : stats.notesCount}
            helperText="Personal saved notes"
          />
        </div>
      </div>

      {/* ── Upcoming Sessions & Quick Actions Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Upcoming Booked Sessions Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-studify-heading">
              Upcoming Booked Sessions
            </h2>
            <Link
              to="booked-session"
              className="text-xs font-semibold text-studify-primary hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {upcomingBookings.length === 0 ? (
            <div className="p-8 text-center bg-studify-surface rounded-2xl border border-studify-border">
              <CalendarCheck size={36} className="mx-auto text-studify-muted/40 mb-2" />
              <p className="text-sm font-semibold text-studify-heading">No booked sessions yet</p>
              <p className="text-xs text-studify-muted mt-1 max-w-sm mx-auto">
                Explore available sessions led by experienced mentors and reserve your spot.
              </p>
              <Link
                to="view-sessions"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-studify-primary text-white text-xs font-semibold hover:bg-studify-primary-dark transition-colors"
              >
                Browse Study Sessions
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((session) => (
                <div
                  key={session._id}
                  className="p-5 rounded-2xl bg-studify-surface border border-studify-border shadow-xs hover:border-studify-primary/40 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <StatusBadge status="approved">Booked</StatusBadge>
                      <span className="text-xs text-studify-muted truncate">
                        {session.duration ? `Duration: ${session.duration}` : "Session"}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-studify-heading truncate">
                      {session.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-studify-muted">
                      <span className="flex items-center gap-1">
                        <User size={12} className="text-studify-primary" />
                        <span>Tutor: {session.tutorName || "Instructor"}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-studify-primary" />
                        <span>
                          {session.classStartTime
                            ? new Date(session.classStartTime).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Scheduled"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <Link
                    to="booked-session"
                    className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-studify-bg hover:bg-studify-primary hover:text-white text-studify-heading text-xs font-semibold border border-studify-border transition-colors whitespace-nowrap"
                  >
                    Manage
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-studify-heading">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            <ActionCard
              icon={PenLine}
              title="Create Note"
              description="Draft thoughts or study notes"
              to="create-note"
              actionText="Write note"
            />
            <ActionCard
              icon={BookOpen}
              title="Browse Sessions"
              description="Discover new courses & live classes"
              to="view-sessions"
              actionText="Explore"
            />
            <ActionCard
              icon={FolderOpen}
              title="Study Materials"
              description="View shared drives and learning docs"
              to="view-materials"
              actionText="View"
            />
            <ActionCard
              icon={FileText}
              title="My Notes"
              description="Review and manage your saved notes"
              to="view-notes"
              actionText="Open notes"
            />
          </div>
        </div>
      </div>

      {/* ── Become a Mentor Promotional Card ── */}
      <div className="p-6 rounded-2xl bg-studify-surface border border-studify-border shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-studify-bg flex items-center justify-center text-studify-primary border border-studify-border flex-shrink-0">
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-studify-heading">
              Interested in teaching on StudyFy?
            </h3>
            <p className="text-xs text-studify-muted mt-1 max-w-lg leading-relaxed">
              Share your expertise with students worldwide. Submit a role upgrade request to become an authorized mentor.
            </p>
          </div>
        </div>
        <Link
          to="sent-request"
          className="self-start sm:self-center px-4 py-2 rounded-xl bg-studify-bg hover:bg-studify-primary hover:text-white text-studify-primary text-xs font-bold border border-studify-primary/30 transition-colors whitespace-nowrap"
        >
          Request Role Upgrade
        </Link>
      </div>
    </div>
  );
};

export default Student;
