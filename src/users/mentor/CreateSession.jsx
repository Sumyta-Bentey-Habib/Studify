import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const CreateSession = () => {
  const axios = useAxios();

  const [form, setForm] = useState({
    title: "",
    tutorName: "",
    averageRating: "",
    description: "",
    registrationStartDate: "",
    registrationEndDate: "",
    classStartTime: "",
    classEndDate: "",
    duration: "",
    registrationFee: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

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
    };

    try {
      const res = await axios.post("/sessions", payload);
      Swal.fire({
        title: "Success!",
        text: "Session created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setForm({
        title: "",
        tutorName: "",
        averageRating: "",
        description: "",
        registrationStartDate: "",
        registrationEndDate: "",
        classStartTime: "",
        classEndDate: "",
        duration: "",
        registrationFee: "",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to create session. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-purple-800">Create Session</h2>
      <form onSubmit={handleCreate} className="space-y-5">
        <input
          name="title"
          placeholder="Session Title"
          value={form.title}
          onChange={handleChange}
          className="w-full input input-bordered"
          required
        />
        <input
          name="tutorName"
          placeholder="Tutor Name"
          value={form.tutorName}
          onChange={handleChange}
          className="w-full input input-bordered"
          required
        />
        <input
          name="averageRating"
          placeholder="Average Rating (0 to 5)"
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={form.averageRating}
          onChange={handleChange}
          className="w-full input input-bordered"
        />
        <textarea
          name="description"
          placeholder="Session Description"
          value={form.description}
          onChange={handleChange}
          className="w-full textarea textarea-bordered"
        ></textarea>

        <label className="block font-semibold">Registration Start Date:</label>
        <input
          name="registrationStartDate"
          type="date"
          value={form.registrationStartDate}
          onChange={handleChange}
          className="w-full input input-bordered"
          required
        />

        <label className="block font-semibold">Registration End Date:</label>
        <input
          name="registrationEndDate"
          type="date"
          value={form.registrationEndDate}
          onChange={handleChange}
          className="w-full input input-bordered"
          required
        />

        <label className="block font-semibold">Class Start Time:</label>
        <input
          name="classStartTime"
          type="datetime-local"
          value={form.classStartTime}
          onChange={handleChange}
          className="w-full input input-bordered"
          required
        />

        <label className="block font-semibold">Class End Date:</label>
        <input
          name="classEndDate"
          type="datetime-local"
          value={form.classEndDate}
          onChange={handleChange}
          className="w-full input input-bordered"
          required
        />

        <input
          name="duration"
          placeholder="Session Duration (e.g. 2 hours)"
          value={form.duration}
          onChange={handleChange}
          className="w-full input input-bordered"
        />

        <input
          name="registrationFee"
          placeholder="Registration Fee (type 'free' if free)"
          value={form.registrationFee}
          onChange={handleChange}
          className="w-full input input-bordered"
        />

        <button
          type="submit"
          className="w-full text-white bg-purple-700 btn hover:bg-purple-800"
        >
          Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSession;
