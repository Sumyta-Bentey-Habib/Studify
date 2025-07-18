import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import Swal from "sweetalert2";

const ViewMaterials = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get("/materials");
        setMaterials(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load materials.",
          background: "#F3E8FF",
          confirmButtonColor: "#7C3AED", // lavender-ish purple
          color: "#4C1D95",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [axios]);

  const handleSaveMaterial = async (material) => {
    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Not logged in",
        text: "You must be logged in to save materials.",
        background: "#F3E8FF",
        confirmButtonColor: "#7C3AED",
        color: "#4C1D95",
      });
      return;
    }
    try {
      const payload = {
        userEmail: user.email, // important to identify user
        materialId: material._id,
        subjectName: material.subjectName,
        imageUrl: material.imageUrl,
        driveLink: material.driveLink,
        otherLink: material.otherLink,
        savedAt: new Date(),
      };
      const res = await axios.post("/student-materials", payload);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: `Material "${material.subjectName}" saved successfully!`,
          background: "#F3E8FF",
          confirmButtonColor: "#7C3AED",
          color: "#4C1D95",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to save material.",
          background: "#F3E8FF",
          confirmButtonColor: "#7C3AED",
          color: "#4C1D95",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error saving material.",
        background: "#F3E8FF",
        confirmButtonColor: "#7C3AED",
        color: "#4C1D95",
      });
    }
  };

  if (loading) {
    return (
      <p
        className="p-4 text-center text-indigo-700"
        style={{ backgroundColor: "#F3E8FF" }}
      >
        Loading materials...
      </p>
    );
  }

  return (
    <div className="p-4" style={{ backgroundColor: "#F3E8FF" }}>
      <h2 className="mb-4 text-xl font-bold text-indigo-800">Available Study Materials</h2>

      {materials.length === 0 ? (
        <p className="text-indigo-700">No materials uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {materials.map((material) => (
            <div
              key={material._id}
              className="p-4 border border-indigo-300 rounded shadow"
              style={{ backgroundColor: "#E6E6FA" }}
            >
              <h3 className="mb-2 font-bold text-indigo-900">
                Subject: {material.subjectName}
              </h3>

              {material.imageUrl && (
                <div className="my-2">
                  <img
                    src={material.imageUrl}
                    alt="Material"
                    className="max-w-full rounded"
                  />
                  <a
                    href={material.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-1 text-indigo-700 underline"
                  >
                    View Image
                  </a>
                </div>
              )}

              {material.driveLink && (
                <p>
                  <a
                    href={material.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-700 underline"
                  >
                    Google Drive Link
                  </a>
                </p>
              )}

              {material.otherLink && (
                <p>
                  <a
                    href={material.otherLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-700 underline"
                  >
                    Other Link
                  </a>
                </p>
              )}

              <button
                onClick={() => handleSaveMaterial(material)}
                className="px-4 py-2 mt-3 text-white bg-purple-600 rounded hover:bg-purple-700"
              >
                Save Material
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMaterials;
