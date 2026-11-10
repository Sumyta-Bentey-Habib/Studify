import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/authcontext/AuthProvider";

const CreateSession = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "", tutorName: "", averageRating: "", description: "",
    registrationStartDate: "", registrationEndDate: "",
    classStartTime: "", classEndDate: "", duration: "", registrationFee: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      Swal.fire({ title: "Error", text: "You must be logged in.", icon: "error" });
      return;
    }
    const payload = {
      ...form,
      averageRating: parseFloat(form.averageRating || 0),
      registrationFee: form.registrationFee.trim().toLowerCase() === "free" ? 0 : parseFloat(form.registrationFee) || 0,
      reviews: [], status: "open", createdAt: new Date(), creatorEmail: user.email,
    };
    try {
      await axios.post("/sessions", payload);
      Swal.fire({ title: "Success!", text: "Session created successfully.", icon: "success" });
      setForm({ title: "", tutorName: "", averageRating: "", description: "", registrationStartDate: "", registrationEndDate: "", classStartTime: "", classEndDate: "", duration: "", registrationFee: "" });
    } catch (err) {
      console.error(err);
      Swal.fire({ title: "Error", text: "Failed to create session.", icon: "error" });
    }
  };

  const inputClass = "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition";
  const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5";

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Create Session</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className={labelClass}>Session Title</label>
          <input name="title" placeholder="e.g. Advanced Calculus" value={form.title} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Tutor Name</label>
          <input name="tutorName" placeholder="Your name" value={form.tutorName} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Average Rating (0–5)</label>
          <input name="averageRating" placeholder="0.0" type="number" step="0.1" min="0" max="5" value={form.averageRating} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" placeholder="What will students learn?" value={form.description} onChange={handleChange} className={`${inputClass} resize-none`} rows={3} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Registration Start</label>
            <input name="registrationStartDate" type="date" value={form.registrationStartDate} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Registration End</label>
            <input name="registrationEndDate" type="date" value={form.registrationEndDate} onChange={handleChange} className={inputClass} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Class Start</label>
            <input name="classStartTime" type="datetime-local" value={form.classStartTime} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Class End</label>
            <input name="classEndDate" type="datetime-local" value={form.classEndDate} onChange={handleChange} className={inputClass} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Duration</label>
            <input name="duration" placeholder="e.g. 2 hours" value={form.duration} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Registration Fee</label>
            <input name="registrationFee" placeholder="Amount or 'free'" value={form.registrationFee} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <button type="submit" className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition mt-2">
          Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSession;
