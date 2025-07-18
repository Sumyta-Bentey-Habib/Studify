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

  if (loading) return <p>Loading study materials...</p>;

  return (
    <div className="max-w-5xl p-4 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-purple-800">All Study Materials</h2>

      {message && (
        <p className={`mb-4 ${message.includes("Failed") ? "text-red-600" : "text-green-700"}`}>
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {materials.map((material) => (
          <div
            key={material._id}
            className="border border-purple-200 shadow-md card bg-purple-50"
          >
            {material.imageUrl && (
              <figure className="px-4 pt-4">
                <img
                  src={material.imageUrl}
                  alt="Study Material"
                  className="rounded-xl"
                />
              </figure>
            )}

            <div className="card-body">
              <h3 className="text-purple-700 card-title">
                {material.subjectName || "No Subject"}
              </h3>

              <div className="space-y-1">
                {material.imageUrl ? (
                  <a
                    href={material.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary"
                  >
                    View Image
                  </a>
                ) : (
                  <p className="italic text-gray-500">No image available.</p>
                )}

                {material.driveLink ? (
                  <a
                    href={material.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary"
                  >
                    Google Drive Link
                  </a>
                ) : (
                  <p className="italic text-gray-500">No Google Drive link.</p>
                )}

                {material.otherLink ? (
                  <a
                    href={material.otherLink}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary"
                  >
                    Other Link
                  </a>
                ) : (
                  <p className="italic text-gray-500">No other link.</p>
                )}
              </div>

              <button
                onClick={() => handleDelete(material._id)}
                className="mt-4 btn btn-sm btn-error"
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
