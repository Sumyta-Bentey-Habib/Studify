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

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id) => {
    setProcessingId(id);
    try {
      const res = await axios.post(`/admin/upgrade-requests/${id}/approve`);
      if (res.status === 200) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
      }
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
      if (res.status === 200) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (requests.length === 0) return <p>No upgrade requests found.</p>;

  return (
    <div className="max-w-3xl p-4 bg-white border border-purple-300 rounded shadow">
      <h3 className="mb-4 text-lg font-semibold text-purple-800">Upgrade Requests</h3>
      <ul>
        {requests.map(({ _id, userId, message, status, createdAt }) => (
          <li key={_id} className="flex flex-col p-3 mb-3 border border-purple-200 rounded">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">User ID:</span> {userId}
              <span
                className={`px-2 py-1 rounded text-sm ${
                  status === "approved"
                    ? "bg-green-200 text-green-800"
                    : status === "rejected"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {status}
              </span>
            </div>
            <p className="mb-1 whitespace-pre-wrap">
              <strong>Message:</strong> {message || "(No message)"}
            </p>
            <p className="text-xs text-gray-500">
              Requested on: {new Date(createdAt).toLocaleString()}
            </p>
            {status === "pending" && (
              <div className="flex mt-2 space-x-2">
                <button
                  onClick={() => approveRequest(_id)}
                  disabled={processingId === _id}
                  className="px-3 py-1 text-white bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
                >
                  {processingId === _id ? "Processing..." : "Approve"}
                </button>
                <button
                  onClick={() => rejectRequest(_id)}
                  disabled={processingId === _id}
                  className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {processingId === _id ? "Processing..." : "Reject"}
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
