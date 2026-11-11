import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import Swal from "sweetalert2";
import { SWAL_THEME } from "../../utils/utils";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import StatusBadge from "../../components/ui/StatusBadge";
import { CalendarCheck, CalendarPlus, Clock, Star, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const ViewSessions = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all sessions
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axios.get("/sessions");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Delete session mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/sessions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this session?",
      text: "This action will permanently delete the session and cancel related enrollments.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: SWAL_THEME.cancelButtonColor,
      cancelButtonColor: SWAL_THEME.confirmButtonColor,
      confirmButtonText: "Yes, delete session",
      cancelButtonText: "Cancel",
      background: SWAL_THEME.background,
      color: SWAL_THEME.color,
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteMutation.mutateAsync(id);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Session deleted successfully",
        showConfirmButton: false,
        timer: 2000,
        background: SWAL_THEME.background,
        color: SWAL_THEME.color,
      });
    } catch (err) {
      console.error("Failed to delete session:", err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to delete session",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // Filter sessions by current mentor's email
  const filteredSessions = user?.email
    ? sessions.filter((s) => s.creatorEmail === user.email)
    : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Published Sessions"
        description="Monitor, manage, and curate the study courses you have published on StudyFy."
      >
        <Link
          to="/dashboard/mentor/create-session"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-studify-primary text-white text-xs font-semibold hover:bg-studify-primary-dark transition-colors shadow-xs"
        >
          <CalendarPlus size={14} />
          <span>New Session</span>
        </Link>
      </PageHeader>

      {isLoading ? (
        <LoadingSkeleton count={3} type="card" />
      ) : filteredSessions.length === 0 ? (
        <EmptyState
          icon={CalendarCheck}
          title="No sessions created yet"
          description="You haven't published any study sessions. Start sharing your knowledge by hosting your first session."
          actionLabel="Create Your First Session"
          actionLink="/dashboard/mentor/create-session"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSessions.map((s) => (
            <div
              key={s._id}
              className="bg-studify-surface rounded-2xl border border-studify-border p-6 shadow-sm hover:border-studify-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3
                    className="text-base font-bold text-studify-heading leading-snug line-clamp-1"
                    title={s.title}
                  >
                    {s.title}
                  </h3>
                  <StatusBadge status={s.status || "open"}>
                    {s.status || "Open"}
                  </StatusBadge>
                </div>

                <p className="text-xs text-studify-muted leading-relaxed line-clamp-2">
                  {s.description || "No description provided."}
                </p>

                <div className="space-y-1.5 text-xs text-studify-muted bg-studify-bg/50 p-3.5 rounded-xl border border-studify-border/60">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Star size={13} className="text-studify-accent fill-studify-accent" />
                      <span>Rating: {s.averageRating ?? "5.0"}</span>
                    </span>
                    <span className="font-bold text-studify-primary">
                      {s.registrationFee === 0 || s.registrationFee === "0"
                        ? "Free"
                        : `$${s.registrationFee}`}
                    </span>
                  </div>

                  {s.duration && (
                    <div className="flex items-center gap-1 text-[11px]">
                      <Clock size={12} className="text-studify-primary" />
                      <span>Duration: {s.duration}</span>
                    </div>
                  )}

                  {s.registrationEndDate && (
                    <div className="text-[11px] text-studify-muted pt-1 border-t border-studify-border/40">
                      Registration ends:{" "}
                      {new Date(s.registrationEndDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-studify-border flex items-center justify-between">
                <span className="text-xs text-studify-muted">
                  Tutor: {s.tutorName}
                </span>

                <button
                  onClick={() => handleDelete(s._id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-studify-danger/10 text-studify-danger text-xs font-semibold hover:bg-studify-danger hover:text-white border border-studify-danger/20 transition-colors"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewSessions;
