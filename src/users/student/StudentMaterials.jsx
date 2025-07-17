import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/authcontext/AuthProvider";

const StudentMaterials = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [savedMaterials, setSavedMaterials] = useState([]);
  const [message, setMessage] = useState("Loading saved materials...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setMessage("You must be logged in to see your saved materials.");
      setLoading(false);
      return;
    }

    const fetchSavedMaterials = async () => {
      try {
        const res = await axios.get(`/student-materials?userEmail=${encodeURIComponent(user.email)}`);
        setSavedMaterials(res.data);
        setMessage(res.data.length === 0 ? "You have no saved materials yet." : "");
      } catch (err) {
        console.error("Failed to fetch saved materials:", err);
        setMessage("Failed to load saved materials.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedMaterials();
  }, [axios, user]);

  if (loading) return <p>Loading...</p>;

  if (!user?.email)
    return (
      <div>
        <p className="text-red-600">You must be logged in to see your saved materials.</p>
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">My Saved Materials</h2>

      {message && <p className={`mb-4 ${message.includes("Failed") ? "text-red-600" : "text-gray-700"}`}>{message}</p>}

      {savedMaterials.length > 0 && (
        <div className="space-y-4">
          {savedMaterials.map((material) => (
            <div
              key={material._id || material.materialId || Math.random()}
              className="p-4 border rounded shadow bg-purple-50 dark:bg-purple-900"
            >
              <h3 className="font-bold text-purple-700 dark:text-purple-300">
                Subject: {material.subjectName || "No Subject Name"}
              </h3>

              {material.imageUrl ? (
                <div className="my-2">
                  <img src={material.imageUrl} alt="Material" className="max-w-full rounded" />
                  <a href={material.imageUrl} target="_blank" rel="noreferrer" className="block mt-1 text-blue-600 underline">
                    View Image
                  </a>
                </div>
              ) : (
                <p className="italic text-gray-500">No image available.</p>
              )}

              {material.driveLink ? (
                <p>
                  <a href={material.driveLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    Google Drive Link
                  </a>
                </p>
              ) : (
                <p className="italic text-gray-500">No Google Drive link.</p>
              )}

              {material.otherLink ? (
                <p>
                  <a href={material.otherLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    Other Link
                  </a>
                </p>
              ) : (
                <p className="italic text-gray-500">No other link.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMaterials;
