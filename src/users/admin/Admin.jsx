import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import {
  Users,
  BookOpen,
  FolderOpen,
  ArrowUpCircle,
  ShieldAlert,
  ArrowRight,
  Check,
  X,
  User,
  Clock,
  Sparkles,
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import ActionCard from "../../components/ui/ActionCard";
import StatusBadge from "../../components/ui/StatusBadge";
import Swal from "sweetalert2";
import { SWAL_THEME } from "../../utils/utils";

const Admin = () => {
  const location = useLocation();
  const axios = useAxios();

  const isRoot =
    location.pathname === "/dashboard/admin" ||
    location.pathname === "/dashboard/admin/";

  const [counts, setCounts] = useState({
    users: 0,
    sessions: 0,
    materials: 0,
    requests: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    if (!isRoot) return;

    let isMounted = true;
    const fetchAdminOverview = async () => {
      try {
        const [usersRes, sessionsRes, materialsRes, requestsRes] =
          await Promise.allSettled([
            axios.get("/users"),
            axios.get("/sessions"),
            axios.get("/materials"),
            axios.get("/admin/upgrade-requests"),
          ]);

        if (!isMounted) return;

        const usersData =
          usersRes.status === "fulfilled" && Array.isArray(usersRes.value.data)
            ? usersRes.value.data
            : [];
        const sessionsData =
          sessionsRes.status === "fulfilled" && Array.isArray(sessionsRes.value.data)
            ? sessionsRes.value.data
            : [];
        const materialsData =
          materialsRes.status === "fulfilled" && Array.isArray(materialsRes.value.data)
            ? materialsRes.value.data
            : [];
        const requestsData =
          requestsRes.status === "fulfilled" && Array.isArray(requestsRes.value.data)
            ? requestsRes.value.data
            : [];

        setCounts({
          users: usersData.length,
          sessions: sessionsData.length,
          materials: materialsData.length,
          requests: requestsData.length,
        });

        // Show recent requests (pending prioritized, then others)
        const sorted = [...requestsData].sort((a, b) => {
          if (a.status === "pending" && b.status !== "pending") return -1;
          if (a.status !== "pending" && b.status === "pending") return 1;
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
        setRecentRequests(sorted.slice(0, 5));
      } catch (err) {
        console.error("Failed to load admin overview:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAdminOverview();

    return () => {
      isMounted = false;
    };
  }, [axios, isRoot]);

  const handleApprove = async (id) => {
    setActionLoadingId(id);
    try {
      const res = await axios.post(`/admin/upgrade-requests/${id}/approve`);
      if (res.status === 200 || res.data?.success) {
        setRecentRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: "approved" } : r))
        );
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Request approved successfully",
          showConfirmButton: false,
          timer: 2000,
          background: SWAL_THEME.background,
          color: SWAL_THEME.color,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to approve request",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoadingId(id);
    try {
      const res = await axios.post(`/admin/upgrade-requests/${id}/reject`);
      if (res.status === 200 || res.data?.success) {
        setRecentRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: "rejected" } : r))
        );
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: "Request rejected",
          showConfirmButton: false,
          timer: 2000,
          background: SWAL_THEME.background,
          color: SWAL_THEME.color,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to reject request",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setActionLoadingId(null);
    }
  };

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
            <span>Platform Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-studify-heading tracking-tight leading-tight">
            Platform Administration
          </h1>
          <p className="mt-2 text-sm sm:text-base text-studify-muted leading-relaxed">
            Manage student & mentor accounts, oversee live study sessions, review uploaded learning resources, and process role upgrade applications.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="view-users"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-studify-primary text-white text-sm font-semibold hover:bg-studify-primary-dark transition-colors shadow-sm"
            >
              <Users size={16} />
              <span>Manage Users</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="upgrade-the-user"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-studify-bg text-studify-heading text-sm font-semibold hover:bg-studify-border/60 border border-studify-border transition-colors"
            >
              <ArrowUpCircle size={16} />
              <span>Review Requests</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Management Overview Stats ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-studify-heading">Management Overview</h2>
          <span className="text-xs text-studify-muted">Live system database records</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="All Users"
            value={loading ? "—" : counts.users}
            helperText="Students, mentors & admins"
          />
          <StatCard
            icon={BookOpen}
            label="Study Sessions"
            value={loading ? "—" : counts.sessions}
            helperText="Published platform courses"
          />
          <StatCard
            icon={FolderOpen}
            label="Study Materials"
            value={loading ? "—" : counts.materials}
            helperText="Uploaded academic files"
          />
          <StatCard
            icon={ArrowUpCircle}
            label="Upgrade Requests"
            value={loading ? "—" : counts.requests}
            helperText="Role promotion applications"
          />
        </div>
      </div>

      {/* ── Management Action Cards ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-studify-heading">Management Portals</h2>
          <span className="text-xs text-studify-muted">Direct operational panels</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard
            icon={Users}
            title="All Users"
            description="Manage roles, review accounts, and control system access."
            to="view-users"
            actionText="View Users"
          />
          <ActionCard
            icon={BookOpen}
            title="Study Sessions"
            description="Monitor live sessions, tutor allocations, and enrollments."
            to="view-study-sessions"
            actionText="View Sessions"
          />
          <ActionCard
            icon={FolderOpen}
            title="Study Materials"
            description="Inspect shared files, drive links, and content guidelines."
            to="view-study-materials"
            actionText="View Resources"
          />
          <ActionCard
            icon={ArrowUpCircle}
            title="Upgrade Requests"
            description="Evaluate tutor applications with one-click approval workflows."
            to="upgrade-the-user"
            actionText="Review Requests"
            highlight={true}
          />
        </div>
      </div>

      {/* ── Recent Upgrade Requests ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-studify-heading">
              Recent Upgrade Requests
            </h2>
            <p className="text-xs text-studify-muted mt-0.5">
              Review and act on student applications requesting mentor privileges
            </p>
          </div>
          <Link
            to="upgrade-the-user"
            className="text-xs font-semibold text-studify-primary hover:underline flex items-center gap-1"
          >
            <span>View All Requests</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <div className="p-8 text-center bg-studify-surface rounded-2xl border border-studify-border">
            <ShieldAlert size={36} className="mx-auto text-studify-muted/40 mb-2" />
            <p className="text-sm font-semibold text-studify-heading">
              No upgrade requests currently pending
            </p>
            <p className="text-xs text-studify-muted mt-1 max-w-sm mx-auto">
              When students submit a request to become a mentor, they will appear here for review.
            </p>
          </div>
        ) : (
          <div className="bg-studify-surface border border-studify-border rounded-2xl divide-y divide-studify-border/60 overflow-hidden shadow-xs">
            {recentRequests.map((req) => {
              const isPending = req.status === "pending";
              const isProcessing = actionLoadingId === req._id;

              return (
                <div
                  key={req._id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-studify-bg/30 transition-colors"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                      <StatusBadge status={req.status || "pending"} />
                      <span className="text-xs font-semibold text-studify-heading flex items-center gap-1">
                        <User size={13} className="text-studify-primary" />
                        <span>User ID:</span>
                        <code className="text-[11px] bg-studify-bg px-1.5 py-0.5 rounded text-studify-heading font-mono">
                          {req.userId || "N/A"}
                        </code>
                      </span>
                    </div>

                    <p className="text-sm text-studify-heading font-medium">
                      &ldquo;{req.message || "I want to become a tutor."}&rdquo;
                    </p>

                    <div className="flex items-center gap-2 text-xs text-studify-muted">
                      <Clock size={12} />
                      <span>
                        Submitted:{" "}
                        {req.createdAt
                          ? new Date(req.createdAt).toLocaleString("en-US", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })
                          : "Recently"}
                      </span>
                    </div>
                  </div>

                  {isPending && (
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <button
                        onClick={() => handleApprove(req._id)}
                        disabled={isProcessing}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-studify-primary text-white text-xs font-semibold hover:bg-studify-primary-dark transition-colors shadow-xs disabled:opacity-50"
                      >
                        <Check size={14} />
                        <span>{isProcessing ? "Saving…" : "Approve"}</span>
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        disabled={isProcessing}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-studify-danger/10 text-studify-danger text-xs font-semibold hover:bg-studify-danger hover:text-white border border-studify-danger/20 transition-colors disabled:opacity-50"
                      >
                        <X size={14} />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
