import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import Swal from "sweetalert2";
import { SWAL_THEME } from "../../utils/utils";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import { FileText, Calendar, Trash2, PenLine, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ViewNotes = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `/notes?userEmail=${encodeURIComponent(user.email)}`
        );
        if (isMounted) setNotes(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, [axios, user]);

  const handleDelete = async (noteId) => {
    const result = await Swal.fire({
      title: "Delete this note?",
      text: "This note will be permanently removed from your collection.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: SWAL_THEME.cancelButtonColor,
      cancelButtonColor: SWAL_THEME.confirmButtonColor,
      confirmButtonText: "Yes, delete note",
      cancelButtonText: "Cancel",
      background: SWAL_THEME.background,
      color: SWAL_THEME.color,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/notes/${noteId}`);
        setNotes((prev) =>
          prev.filter((n) => (n._id || n.insertedId) !== noteId)
        );
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Note deleted successfully",
          showConfirmButton: false,
          timer: 2000,
          background: SWAL_THEME.background,
          color: SWAL_THEME.color,
        });
      } catch (error) {
        console.error("Failed to delete note:", error);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Failed to delete note",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Notes"
        description="Review, search, and manage your private revision notes and formula sheets."
      >
        <Link
          to="/dashboard/student/create-note"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-studify-primary text-white text-xs font-semibold hover:bg-studify-primary-dark transition-colors shadow-xs"
        >
          <PenLine size={14} />
          <span>New Note</span>
        </Link>
      </PageHeader>

      {loading ? (
        <LoadingSkeleton count={3} type="card" />
      ) : notes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No notes created yet"
          description="Start organizing your study materials by creating your first private note."
          actionLabel="Create First Note"
          actionLink="/dashboard/student/create-note"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {notes.map((note) => {
            const noteId = note._id || note.insertedId;
            return (
              <div
                key={noteId}
                className="bg-studify-surface rounded-2xl border border-studify-border p-6 shadow-sm hover:border-studify-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-bold text-studify-heading leading-snug">
                      {note.title}
                    </h3>
                  </div>

                  <p className="text-sm text-studify-muted leading-relaxed whitespace-pre-wrap mb-4">
                    {note.content}
                  </p>

                  {note.imageUrl && (
                    <div className="mb-4">
                      <a
                        href={note.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-studify-primary hover:underline font-semibold bg-studify-bg px-2.5 py-1 rounded-lg border border-studify-border"
                      >
                        <ImageIcon size={13} />
                        <span>View Attached Image</span>
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-studify-border flex items-center justify-between text-xs">
                  <span className="text-studify-muted flex items-center gap-1">
                    <Calendar size={12} />
                    <span>
                      {note.createdAt
                        ? new Date(note.createdAt).toLocaleDateString("en-US", {
                            dateStyle: "medium",
                          })
                        : "Recent"}
                    </span>
                  </span>

                  <button
                    onClick={() => handleDelete(noteId)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-studify-danger/10 text-studify-danger text-xs font-semibold hover:bg-studify-danger hover:text-white border border-studify-danger/20 transition-colors"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewNotes;
