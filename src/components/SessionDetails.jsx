import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const SessionDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`/sessions/${id}`);
        setSession(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load session details.",
          background: "#E6E6FA",
          color: "#4B0082",
        });
        navigate("/sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [axios, id, navigate]);

  if (loading) {
    return (
      <div className="p-6 text-center text-indigo-700" style={{ backgroundColor: "#F3E8FF" }}>
        Loading session details...
      </div>
    );
  }

  if (!session) {
    return null; // or fallback UI
  }

  return (
    <div className="max-w-3xl p-6 mx-auto" style={{ backgroundColor: "#F3E8FF" }}>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-4 text-indigo-800 bg-indigo-100 rounded hover:bg-indigo-200"
      >
        ← Back to Sessions
      </button>

      <h2 className="mb-4 text-3xl font-bold text-indigo-900">{session.title}</h2>

      <p className="mb-2 text-indigo-700">
        <strong>Tutor:</strong> {session.tutorName || "N/A"}
      </p>

      <p className="mb-2 text-indigo-700">
        <strong>Average Rating:</strong> {session.averageRating ?? "N/A"}
      </p>

      <p className="mb-2 text-indigo-700">
        <strong>Description:</strong> {session.description || "N/A"}
      </p>

      <p className="mb-2 text-indigo-700">
        <strong>Registration Period:</strong> {session.registrationStartDate} to {session.registrationEndDate}
      </p>

      <p className="mb-2 text-indigo-700">
        <strong>Class Time:</strong> {session.classStartTime} to {session.classEndDate}
      </p>

      <p className="mb-2 text-indigo-700">
        <strong>Duration:</strong> {session.duration || "N/A"}
      </p>

      <p className="mb-2 text-indigo-700">
        <strong>Registration Fee:</strong> {session.registrationFee === 0 ? "Free" : `$${session.registrationFee}`}
      </p>

      <p className="mb-2 text-indigo-700">
        <strong>Status:</strong> {session.status || "N/A"}
      </p>

      <p className="mt-6 text-sm text-indigo-500">
        Created at: {new Date(session.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default SessionDetails;
