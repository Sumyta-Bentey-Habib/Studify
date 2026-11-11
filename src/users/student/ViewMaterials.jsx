import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import Swal from "sweetalert2";
import { SWAL_THEME } from "../../utils/utils";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import { FolderOpen, ExternalLink, BookmarkPlus, Trash2, Image as ImageIcon } from "lucide-react";

const ViewMaterials = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMaterials = async () => {
      try {
        const res = await axios.get("/materials");
        if (isMounted) setMaterials(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load study materials.",
          background: SWAL_THEME.background,
          color: SWAL_THEME.color,
          confirmButtonColor: SWAL_THEME.confirmButtonColor,
        });
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchMaterials();

    return () => {
      isMounted = false;
    };
  }, [axios]);

  const handleSaveMaterial = async (material) => {
    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Sign in required",
        text: "You must be logged in to save study materials.",
        background: SWAL_THEME.background,
        color: SWAL_THEME.color,
        confirmButtonColor: SWAL_THEME.confirmButtonColor,
      });
      return;
    }

    setSavingId(material._id);
    try {
      const payload = {
        userEmail: user.email,
        materialId: material._id,
        subjectName: material.subjectName,
        imageUrl: material.imageUrl,
        driveLink: material.driveLink,
        otherLink: material.otherLink,
        savedAt: new Date(),
      };
      const res = await axios.post("/student-materials", payload);

      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `"${material.subjectName}" saved to your materials!`,
          showConfirmButton: false,
          timer: 2000,
          background: SWAL_THEME.background,
          color: SWAL_THEME.color,
        });
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: "Material is already saved or verified",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Could not save material",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteMaterial = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this material?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: SWAL_THEME.cancelButtonColor,
      cancelButtonColor: SWAL_THEME.confirmButtonColor,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: SWAL_THEME.background,
      color: SWAL_THEME.color,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`/materials/${id}`);
      setMaterials((prev) => prev.filter((m) => m._id !== id));
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Material deleted successfully",
        showConfirmButton: false,
        timer: 2000,
        background: SWAL_THEME.background,
        color: SWAL_THEME.color,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to delete material",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Explore Study Materials"
        description="Browse academic resources, shared slide decks, and external study drives."
      />

      {loading ? (
        <LoadingSkeleton count={3} type="card" />
      ) : materials.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No materials uploaded yet"
          description="Mentors haven't uploaded any study resources yet. Check back soon!"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((material) => (
            <div
              key={material._id}
              className="bg-studify-surface rounded-2xl border border-studify-border overflow-hidden shadow-sm hover:border-studify-primary/40 transition-all flex flex-col justify-between"
            >
              <div>
                {material.imageUrl ? (
                  <div className="h-44 bg-studify-bg relative overflow-hidden border-b border-studify-border">
                    <img
                      src={material.imageUrl}
                      alt={material.subjectName || "Resource"}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-28 bg-studify-bg/60 border-b border-studify-border flex items-center justify-center text-studify-muted">
                    <FolderOpen size={32} strokeWidth={1.5} />
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-studify-heading leading-snug">
                    {material.subjectName || "Untitled Resource"}
                  </h3>

                  <div className="space-y-1.5 text-xs">
                    {material.imageUrl && (
                      <a
                        href={material.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-studify-primary hover:underline font-medium"
                      >
                        <ImageIcon size={13} />
                        <span>View Full Image</span>
                      </a>
                    )}

                    {material.driveLink && (
                      <p>
                        <a
                          href={material.driveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-studify-primary hover:underline font-medium"
                        >
                          <ExternalLink size={13} />
                          <span>Google Drive Folder</span>
                        </a>
                      </p>
                    )}

                    {material.otherLink && (
                      <p>
                        <a
                          href={material.otherLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-studify-primary hover:underline font-medium"
                        >
                          <ExternalLink size={13} />
                          <span>External Resource</span>
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-studify-bg/40 border-t border-studify-border flex items-center justify-between gap-2">
                <button
                  onClick={() => handleSaveMaterial(material)}
                  disabled={savingId === material._id}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-studify-primary text-white text-xs font-semibold hover:bg-studify-primary-dark transition-colors shadow-xs disabled:opacity-50"
                >
                  <BookmarkPlus size={14} />
                  <span>{savingId === material._id ? "Saving…" : "Save to Mine"}</span>
                </button>

                <button
                  onClick={() => handleDeleteMaterial(material._id)}
                  className="p-1.5 rounded-xl text-studify-muted hover:text-studify-danger hover:bg-studify-danger/10 transition-colors"
                  title="Delete resource"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMaterials;
