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
        form.registrationFee.toLowerCase() === "free"
          ? 0
          : parseFloat(form.registrationFee || 0),
      reviews: [],
      status: "open",
    };
    try {
      const res = await axios.post("/sessions", payload);
      console.log(res.data);
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
    <div className="p-4">
      <h2 className="mb-2 text-xl font-bold">Create Session</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <input
          name="title"
          placeholder="Session Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <input
          name="tutorName"
          placeholder="Tutor Name"
          value={form.tutorName}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <input
          name="averageRating"
          placeholder="Average Rating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={form.averageRating}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <textarea
          name="description"
          placeholder="Session Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border"
        ></textarea>
        <label>Registration Start Date:</label>
        <input
          name="registrationStartDate"
          type="date"
          value={form.registrationStartDate}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <label>Registration End Date:</label>
        <input
          name="registrationEndDate"
          type="date"
          value={form.registrationEndDate}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <label>Class Start Time:</label>
        <input
          name="classStartTime"
          type="datetime-local"
          value={form.classStartTime}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <label>Class End Date:</label>
        <input
          name="classEndDate"
          type="datetime-local"
          value={form.classEndDate}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />
        <input
          name="duration"
          placeholder="Session Duration (e.g. 2 hours)"
          value={form.duration}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="registrationFee"
          placeholder="Registration Fee (type 'free' if free)"
          value={form.registrationFee}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <button type="submit" className="px-4 py-2 text-white bg-purple-700">
          Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSession;
