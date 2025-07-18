import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authcontext/AuthProvider";
import useAxios from "../../hooks/useAxios";

const BeTutorRequest = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSendRequest = async () => {
    if (!user || !user.email) {
      setError("You must be logged in to send a request.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/upgrade-request", {
        userEmail: user.email,
        message: message.trim() || "I want to become a tutor.",
      });
      setSuccess(true);
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-4 text-green-700 bg-green-100 border border-green-400 rounded">
        Your request to become a tutor has been sent. The admin will review it soon.
      </div>
    );
  }

  return (
    <div className="max-w-md p-4 bg-white border border-purple-300 rounded shadow">
      <h3 className="mb-4 text-lg font-semibold text-purple-800">Be a Tutor</h3>
      <textarea
        className="w-full p-2 mb-3 border border-purple-400 rounded resize-none"
        rows={4}
        placeholder="Write a message to the admin (optional)..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
      <button
        disabled={loading}
        onClick={handleSendRequest}
        className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Request"}
      </button>
    </div>
  );
};

export default BeTutorRequest;
