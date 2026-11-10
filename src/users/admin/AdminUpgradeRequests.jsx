import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const AdminUpgradeRequests = () => {
  const axios = useAxios();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/admin/upgrade-requests");
      setRequests(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error fetching requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const approveRequest = async (id) => {
    setProcessingId(id);
    try {
      const res = await axios.post(`/admin/upgrade-requests/${id}/approve`);
      if (res.status === 200) setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setProcessingId(null);
    }
  };

  const rejectRequest = async (id) => {
    setProcessingId(id);
    try {
      const res = await axios.post(`/admin/upgrade-requests/${id}/reject`);
      if (res.status === 200) setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setProcessingId(null);
    }
  };

  const statusBadge = (status) => {
    if (status === "approved") return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
    if (status === "rejected") return "bg-red-50 text-red-700 ring-1 ring-red-200";
    return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  };

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
      </div>
    );
  if (error) return <p className="text-red-600 p-4">Error: {error}</p>;
  if (requests.length === 0)
    return <p className="text-slate-500 text-center py-10">No upgrade requests found.</p>;

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-5">Upgrade Requests</h3>
      <ul className="space-y-4">
        {requests.map(({ _id, userId, message, status, createdAt }) => (
          <li key={_id} className="bg-slate-50 rounded-2xl ring-1 ring-slate-100 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">User ID</p>
                <p className="text-sm text-slate-700 font-mono">{userId}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusBadge(status)}`}>
                {status}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-1">
              <span className="font-semibold">Message:</span> {message || "(No message)"}
            </p>
            <p className="text-xs text-slate-400 mb-4">
              Requested: {new Date(createdAt).toLocaleString()}
            </p>
            {status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => approveRequest(_id)}
                  disabled={processingId === _id}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition"
                >
                  {processingId === _id ? "Processing…" : "Approve"}
                </button>
                <button
                  onClick={() => rejectRequest(_id)}
                  disabled={processingId === _id}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition"
                >
                  {processingId === _id ? "Processing…" : "Reject"}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUpgradeRequests;
