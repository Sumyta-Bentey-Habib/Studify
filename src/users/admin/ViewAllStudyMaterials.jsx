import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const ViewAllStudyMaterials = () => {
  const axios = useAxios();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get("/materials");
        setMaterials(res.data);
        setMessage(res.data.length === 0 ? "No study materials available." : "");
      } catch (error) {
        console.error("Failed to fetch study materials:", error);
        setMessage("Failed to load study materials.");
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [axios]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this material?")) return;
    try {
      await axios.delete(`/materials/${id}`);
      setMaterials((prev) => prev.filter((m) => m._id !== id));
      setMessage("Material deleted successfully.");
    } catch (error) {
      console.error("Failed to delete material:", error);
      setMessage("Failed to delete material.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
      </div>
    );

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-5">All Study Materials</h2>

      {message && (
        <p className={`mb-5 text-sm ${message.includes("Failed") ? "text-red-600" : "text-emerald-600"}`}>
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {materials.map((material) => (
          <div key={material._id} className="bg-white rounded-2xl ring-1 ring-slate-100 shadow-sm overflow-hidden hover:shadow-md transition">
            {/* Accent bar */}
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-400" />
            {material.imageUrl && (
              <div className="px-4 pt-4">
                <img src={material.imageUrl} alt="Study Material" className="w-full h-36 object-cover rounded-xl" />
              </div>
            )}
            <div className="p-5">
              <h3 className="text-base font-bold text-slate-800 mb-3">
                {material.subjectName || "No Subject"}
              </h3>
              <div className="space-y-1.5 mb-4">
                {material.imageUrl ? (
                  <a href={material.imageUrl} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 hover:underline block">🖼 View Image</a>
                ) : <p className="text-xs text-slate-400 italic">No image.</p>}
                {material.driveLink ? (
                  <a href={material.driveLink} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 hover:underline block">📁 Google Drive</a>
                ) : <p className="text-xs text-slate-400 italic">No Drive link.</p>}
                {material.otherLink ? (
                  <a href={material.otherLink} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 hover:underline block">🔗 Other Link</a>
                ) : <p className="text-xs text-slate-400 italic">No other link.</p>}
              </div>
              <button
                onClick={() => handleDelete(material._id)}
                className="w-full rounded-xl bg-red-50 text-red-600 ring-1 ring-red-200 px-4 py-2 text-sm font-semibold hover:bg-red-600 hover:text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllStudyMaterials;
