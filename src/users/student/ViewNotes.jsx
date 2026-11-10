import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import Swal from "sweetalert2";
import { FileText } from "lucide-react";

const ViewNotes = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user?.email) { setMessage("You must be logged in."); setLoading(false); return; }
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`/notes?userEmail=${encodeURIComponent(user.email)}`);
        setNotes(res.data);
        if (res.data.length === 0) setMessage("No notes found.");
        else setMessage("");
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setMessage("Failed to load notes.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [axios, user]);

  const handleDelete = async (noteId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This note will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`/notes/${noteId}`);
        setNotes((prev) => prev.filter((n) => (n._id || n.insertedId) !== noteId));
        Swal.fire({ icon: "success", title: "Deleted!", text: "Your note has been deleted.", confirmButtonColor: "#4f46e5" });
      } catch (error) {
        console.error("Failed to delete note:", error);
        Swal.fire({ icon: "error", title: "Error", text: "Failed to delete note.", confirmButtonColor: "#4f46e5" });
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
      </div>
    );

  if (!user?.email)
    return <p className="text-red-600 text-center py-10">Please log in to view your notes.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-5">My Notes</h2>
      {message && !notes.length && (
        <div className="text-center py-16 text-slate-400">
          <FileText size={40} className="mx-auto mb-3 opacity-30" />
          <p>{message}</p>
        </div>
      )}
      {notes.length > 0 && (
        <ul className="space-y-4 max-w-2xl">
          {notes.map((note) => {
            const noteId = note._id || note.insertedId;
            return (
              <li key={noteId} className="bg-white rounded-2xl ring-1 ring-slate-100 shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-400" />
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-800 mb-2">{note.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap mb-4">{note.content}</p>
                  <div className="flex items-center justify-between">
                    <small className="text-xs text-slate-400">
                      {new Date(note.createdAt).toLocaleString()}
                    </small>
                    <button
                      onClick={() => handleDelete(noteId)}
                      className="rounded-xl bg-red-50 text-red-600 ring-1 ring-red-200 px-4 py-1.5 text-sm font-semibold hover:bg-red-600 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ViewNotes;
