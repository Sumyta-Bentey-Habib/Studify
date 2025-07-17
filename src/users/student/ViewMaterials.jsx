import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const ViewMaterials = () => {
  const axios = useAxios();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get("/materials");
        setMaterials(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMaterials();
  }, [axios]);

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Available Study Materials</h2>
      <div className="space-y-4">
        {materials.length === 0 && <p>No materials uploaded yet.</p>}
        {materials.map((material) => (
          <div
            key={material._id}
            className="p-4 border rounded shadow bg-purple-50 dark:bg-purple-900"
          >
            <h3 className="font-bold text-purple-700 dark:text-purple-300">
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
                  className="block mt-1 text-blue-600 underline"
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
                  className="text-blue-600 underline"
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
                  className="text-blue-600 underline"
                >
                  Other Link
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMaterials;
