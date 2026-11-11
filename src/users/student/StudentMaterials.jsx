import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import { BookmarkCheck, ExternalLink, Image as ImageIcon, Calendar } from "lucide-react";

const StudentMaterials = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [savedMaterials, setSavedMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchSavedMaterials = async () => {
      try {
        const res = await axios.get(
          `/student-materials?userEmail=${encodeURIComponent(user.email)}`
        );
        if (isMounted) setSavedMaterials(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch saved materials:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSavedMaterials();

    return () => {
      isMounted = false;
    };
  }, [axios, user]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Saved Materials"
        description="Quickly access academic resources and slide decks you bookmarked for later study."
      />

      {loading ? (
        <LoadingSkeleton count={3} type="card" />
      ) : savedMaterials.length === 0 ? (
        <EmptyState
          icon={BookmarkCheck}
          title="No saved materials yet"
          description="Browse available materials across the platform and save the ones you need for revision."
          actionLabel="Explore Study Materials"
          actionLink="/dashboard/student/view-materials"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedMaterials.map((material) => (
            <div
              key={material._id || material.materialId || Math.random()}
              className="bg-studify-surface rounded-2xl border border-studify-border overflow-hidden shadow-sm hover:border-studify-primary/40 transition-all flex flex-col justify-between"
            >
              <div>
                {material.imageUrl ? (
                  <div className="h-40 bg-studify-bg relative overflow-hidden border-b border-studify-border">
                    <img
                      src={material.imageUrl}
                      alt={material.subjectName || "Material"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-24 bg-studify-bg/60 border-b border-studify-border flex items-center justify-center text-studify-muted">
                    <BookmarkCheck size={28} strokeWidth={1.5} />
                  </div>
                )}

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-studify-heading leading-snug">
                    {material.subjectName || "Saved Resource"}
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
                        <span>View Attachment</span>
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
                          <span>External Link</span>
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {material.savedAt && (
                <div className="p-4 bg-studify-bg/40 border-t border-studify-border flex items-center justify-between text-xs text-studify-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>
                      Saved {new Date(material.savedAt).toLocaleDateString()}
                    </span>
                  </span>
                  <span className="text-studify-success font-semibold">Bookmarked</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMaterials;
