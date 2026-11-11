import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { SWAL_THEME } from "../../utils/utils";
import PageHeader from "../../components/ui/PageHeader";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import EmptyState from "../../components/ui/EmptyState";
import { FolderOpen, ExternalLink, Image as ImageIcon, Trash2 } from "lucide-react";

const ViewAllStudyMaterials = () => {
  const axios = useAxios();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchMaterials = async () => {
      try {
        const res = await axios.get("/materials");
        if (isMounted) setMaterials(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to fetch study materials:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchMaterials();

    return () => {
      isMounted = false;
    };
  }, [axios]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this study material?",
      text: "This file will be permanently removed from all student libraries.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: SWAL_THEME.cancelButtonColor,
      cancelButtonColor: SWAL_THEME.confirmButtonColor,
      confirmButtonText: "Yes, delete resource",
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
    } catch (error) {
      console.error("Failed to delete material:", error);
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
        title="All Study Materials"
        description="Inspect, verify, and moderate all academic slide decks, notes, and uploaded resources."
      />

      {loading ? (
        <LoadingSkeleton count={6} type="card" />
      ) : materials.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No study materials available"
          description="There are currently no uploaded study materials to display."
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
                      alt={material.subjectName || "Material"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-28 bg-studify-bg/60 border-b border-studify-border flex items-center justify-center text-studify-muted">
                    <FolderOpen size={32} strokeWidth={1.5} />
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-studify-heading leading-snug">
                    {material.subjectName || "Untitled Subject"}
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
                        <span>View Original File</span>
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
                          <span>External Cloud Link</span>
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-studify-bg/40 border-t border-studify-border flex items-center justify-end">
                <button
                  onClick={() => handleDelete(material._id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-studify-danger/10 text-studify-danger text-xs font-semibold hover:bg-studify-danger hover:text-white border border-studify-danger/20 transition-colors"
                >
                  <Trash2 size={13} />
                  <span>Delete Resource</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllStudyMaterials;
