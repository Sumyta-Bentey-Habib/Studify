"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import Swal from "sweetalert2";

const ViewSessions = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // ✅ Fetch sessions
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axios.get("/sessions");
      return res.data;
    },
  });

  // ✅ Delete session mutation
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
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteMutation.mutateAsync(id);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Session deleted",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      console.error("Failed to delete session:", err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to delete",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  // ✅ Filter sessions by current user
  const filteredSessions = user?.email
    ? sessions.filter((s) => s.creatorEmail === user.email)
    : [];

  if (isLoading) {
    return (
      <div
        className="flex justify-center p-10 text-indigo-700"
        style={{ backgroundColor: "#F3E8FF" }}
      >
        Loading sessions...
      </div>
    );
  }

  if (filteredSessions.length === 0) {
    return (
      <p
        className="p-10 text-center text-indigo-700"
        style={{ backgroundColor: "#F3E8FF" }}
      >
        No sessions available.
      </p>
    );
  }

  return (
    <div
      className="flex flex-wrap justify-center gap-6 p-6"
      style={{ backgroundColor: "#F3E8FF" }}
    >
      {filteredSessions.map((s) => (
        <div
          key={s._id}
          className="flex flex-col justify-between p-6 transition-shadow rounded-lg shadow-md card w-80"
          style={{ backgroundColor: "white" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                className="text-lg font-semibold text-indigo-900"
                title={s.title}
              >
                {s.title.length > 25 ? s.title.slice(0, 25) + "…" : s.title}
              </h3>
              <p className="mt-1 text-sm text-indigo-600">
                Tutor: <span className="font-medium">{s.tutorName}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-indigo-700">
                {s.registrationFee === 0 ? (
                  <span>Free</span>
                ) : (
                  <>
                    <sup className="text-sm">$</sup>
                    {s.registrationFee}
                    <sub className="text-xs">/session</sub>
                  </>
                )}
              </p>
            </div>
          </div>

          <p
            className="mb-4 text-sm text-indigo-700 line-clamp-3"
            title={s.description}
          >
            {s.description || "No description available."}
          </p>

          <ul className="mb-6 space-y-1 text-xs text-indigo-600">
            <li>⭐ Average Rating: {s.averageRating ?? "N/A"}</li>
            <li>Duration: {s.duration || "N/A"}</li>
            <li>
              Registration Ends:{" "}
              <time dateTime={s.registrationEndDate}>
                {new Date(s.registrationEndDate).toLocaleDateString()}
              </time>
            </li>
          </ul>

          <button
            onClick={() => handleDelete(s._id)}
            className="px-3 py-2 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-700"
          >
            Delete Session
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewSessions;
