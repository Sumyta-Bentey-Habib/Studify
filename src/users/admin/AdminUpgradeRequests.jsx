import React, { useEffect, useState, useCallback } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { SWAL_THEME } from "../../utils/utils";
import PageHeader from "../../components/ui/PageHeader";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import EmptyState from "../../components/ui/EmptyState";
import StatusBadge from "../../components/ui/StatusBadge";
import { ArrowUpCircle, Check, X, User, Clock, AlertCircle } from "lucide-react";

const AdminUpgradeRequests = () => {
  const axios = useAxios();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/admin/upgrade-requests");
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Error fetching upgrade requests"
      );
    } finally {
      setLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const approveRequest = async (id) => {
    setProcessingId(id);
    try {
      const res = await axios.post(`/admin/upgrade-requests/${id}/approve`);
      if (res.status === 200 || res.data?.success) {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: "approved" } : r))
        );
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Upgrade request approved",
          showConfirmButton: false,
          timer: 2000,
          background: SWAL_THEME.background,
          color: SWAL_THEME.color,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: err.response?.data?.message || err.message,
        background: SWAL_THEME.background,
        color: SWAL_THEME.color,
      });
    } finally {
      setProcessingId(null);
    }
  };

  const rejectRequest = async (id) => {
    setProcessingId(id);
    try {
      const res = await axios.post(`/admin/upgrade-requests/${id}/reject`);
      if (res.status === 200 || res.data?.success) {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: "rejected" } : r))
        );
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: "Upgrade request rejected",
          showConfirmButton: false,
          timer: 2000,
          background: SWAL_THEME.background,
          color: SWAL_THEME.color,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: err.response?.data?.message || err.message,
        background: SWAL_THEME.background,
        color: SWAL_THEME.color,
      });
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Role Upgrade Requests"
        description="Review student applications requesting promotion to verified Tutor / Mentor status."
      />

      {error && (
        <div className="p-4 rounded-2xl bg-studify-danger/10 border border-studify-danger/20 text-studify-danger text-sm flex items-center gap-2 font-medium">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <LoadingSkeleton count={4} type="card" />
      ) : requests.length === 0 ? (
        <EmptyState
          icon={ArrowUpCircle}
          title="No upgrade requests found"
          description="There are currently no role upgrade requests pending review."
        />
      ) : (
        <div className="space-y-4">
          {requests.map(({ _id, userId, message, status, createdAt }) => {
            const isPending = status === "pending";
            const isProcessing = processingId === _id;

            return (
              <div
                key={_id}
                className="bg-studify-surface rounded-2xl border border-studify-border p-6 shadow-sm hover:border-studify-primary/40 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={status || "pending"} />
                    <span className="text-xs text-studify-muted flex items-center gap-1 font-mono">
                      <User size={13} className="text-studify-primary" />
                      <span>User ID:</span>
                      <strong className="text-studify-heading">{userId || "N/A"}</strong>
                    </span>
                  </div>

                  <p className="text-sm font-medium text-studify-heading leading-relaxed">
                    &ldquo;{message || "I want to become a tutor."}&rdquo;
                  </p>

                  <div className="flex items-center gap-2 text-xs text-studify-muted">
                    <Clock size={12} />
                    <span>
                      Requested:{" "}
                      {createdAt
                        ? new Date(createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {isPending && (
                  <div className="flex items-center gap-2.5 self-start sm:self-center">
                    <button
                      onClick={() => approveRequest(_id)}
                      disabled={isProcessing}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-studify-primary text-white text-xs font-bold hover:bg-studify-primary-dark transition-colors shadow-xs disabled:opacity-50"
                    >
                      <Check size={14} />
                      <span>{isProcessing ? "Processing…" : "Approve Tutor"}</span>
                    </button>
                    <button
                      onClick={() => rejectRequest(_id)}
                      disabled={isProcessing}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-studify-danger/10 text-studify-danger text-xs font-semibold hover:bg-studify-danger hover:text-white border border-studify-danger/20 transition-colors disabled:opacity-50"
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
  );
};

export default AdminUpgradeRequests;
