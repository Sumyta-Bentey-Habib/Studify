import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import { SWAL_THEME } from "../../utils/utils";
import PageHeader from "../../components/ui/PageHeader";
import { CalendarPlus, Sparkles } from "lucide-react";

const CreateSession = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    tutorName: user?.displayName || "",
    averageRating: "5.0",
    description: "",
    registrationStartDate: "",
    registrationEndDate: "",
    classStartTime: "",
    classEndDate: "",
    duration: "",
    registrationFee: "0",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      Swal.fire({
        title: "Authentication Required",
        text: "You must be logged in as a mentor to create a session.",
        icon: "error",
        background: SWAL_THEME.background,
        color: SWAL_THEME.color,
        confirmButtonColor: SWAL_THEME.confirmButtonColor,
      });
      return;
    }

    setSubmitting(true);
    const payload = {
      ...form,
      averageRating: parseFloat(form.averageRating || 0),
      registrationFee:
        form.registrationFee.trim().toLowerCase() === "free"
          ? 0
          : parseFloat(form.registrationFee) || 0,
      reviews: [],
      status: "open",
      createdAt: new Date(),
      creatorEmail: user.email,
    };

    try {
      await axios.post("/sessions", payload);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Session published successfully!",
        showConfirmButton: false,
        timer: 2500,
        background: SWAL_THEME.background,
        color: SWAL_THEME.color,
      });
      setForm({
        title: "",
        tutorName: user?.displayName || "",
        averageRating: "5.0",
        description: "",
        registrationStartDate: "",
        registrationEndDate: "",
        classStartTime: "",
        classEndDate: "",
        duration: "",
        registrationFee: "0",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to publish study session. Please verify all inputs.",
        background: SWAL_THEME.background,
        color: SWAL_THEME.color,
        confirmButtonColor: SWAL_THEME.confirmButtonColor,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-studify-border bg-studify-surface px-4 py-2.5 text-sm text-studify-heading focus:outline-none focus:ring-2 focus:ring-studify-primary/40 focus:border-studify-primary transition-all";
  const labelClass =
    "block text-xs font-semibold text-studify-muted uppercase tracking-wider mb-1.5";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="Create Study Session"
        description="Publish a new lecture, tutoring cohort, or revision bootcamp with full schedule details."
      />

      <form
        onSubmit={handleCreate}
        className="bg-studify-surface border border-studify-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Session Title *</label>
            <input
              name="title"
              placeholder="e.g. Advanced Calculus & Differential Equations"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Instructor / Tutor Name *</label>
            <input
              name="tutorName"
              placeholder="Your full name"
              value={form.tutorName}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Initial Rating (0.0 – 5.0)</label>
            <input
              name="averageRating"
              placeholder="5.0"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.averageRating}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Session Description *</label>
          <textarea
            name="description"
            placeholder="Outline syllabus highlights, learning goals, prerequisites, and session deliverables..."
            value={form.description}
            onChange={handleChange}
            className={`${inputClass} resize-none leading-relaxed`}
            rows={4}
            required
          />
        </div>

        <div className="p-4 rounded-xl bg-studify-bg/50 border border-studify-border/70 space-y-4">
          <span className="text-xs font-bold text-studify-heading uppercase tracking-wider block">
            Registration & Class Schedule
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Registration Opens *</label>
              <input
                name="registrationStartDate"
                type="date"
                value={form.registrationStartDate}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Registration Deadline *</label>
              <input
                name="registrationEndDate"
                type="date"
                value={form.registrationEndDate}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Class Start Time *</label>
              <input
                name="classStartTime"
                type="datetime-local"
                value={form.classStartTime}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Class End Time *</label>
              <input
                name="classEndDate"
                type="datetime-local"
                value={form.classEndDate}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Duration</label>
            <input
              name="duration"
              placeholder="e.g. 2 hours / 4 weeks"
              value={form.duration}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Registration Fee (USD)</label>
            <input
              name="registrationFee"
              placeholder="0 (or 'free') for free courses"
              value={form.registrationFee}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-studify-border flex items-center justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-studify-primary text-white text-sm font-bold hover:bg-studify-primary-dark transition-colors shadow-sm disabled:opacity-50"
          >
            <CalendarPlus size={16} />
            <span>{submitting ? "Publishing Session…" : "Publish Session"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSession;
