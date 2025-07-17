import React, { useState } from "react";
import { uploadImageToImgBB } from "../../utils/utils"; 
import useAxios from "../../hooks/useAxios";

const UploadMaterials = () => {
  const axios = useAxios();

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [otherLink, setOtherLink] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [error, setError] = useState("");

  // Upload to ImgBB utility
  const handleUploadImage = async () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const url = await uploadImageToImgBB(selectedImage);
      setImageUrl(url);
      alert("Image uploaded successfully!");
    } catch (err) {
      setError(err.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Submit all data to your backend
  const handleSubmit = async () => {
    if (!subjectName) {
      alert("Please enter a subject name.");
      return;
    }

    const payload = {
      subjectName,
      imageUrl,
      driveLink,
      otherLink,
    };

    try {
      const res = await axios.post("/materials", payload);
      if (res.data.insertedId || res.data.acknowledged) {
        alert("Material submitted successfully!");
        // reset form
        setSelectedImage(null);
        setImageUrl("");
        setDriveLink("");
        setOtherLink("");
        setSubjectName("");
      } else {
        alert("Error: Material not saved.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting material.");
    }
  };

  return (
    <div className="max-w-md p-4 mx-auto space-y-4">
      <h2 className="text-xl font-bold">Upload Study Materials</h2>

      {/* Subject Name */}
      <div>
        <label className="block mb-1 font-semibold">Subject Name:</label>
        <input
          type="text"
          placeholder="e.g. Mathematics"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-1 font-semibold">Upload Image:</label>
        <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
        <button
          onClick={handleUploadImage}
          disabled={uploading}
          className="px-4 py-2 mt-2 text-white bg-purple-700 rounded disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
        {error && <p className="mt-1 text-red-600">{error}</p>}
        {imageUrl && (
          <div className="mt-2">
            <p className="text-green-600">Uploaded Image URL:</p>
            <a href={imageUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all">
              {imageUrl}
            </a>
            <img src={imageUrl} alt="Uploaded" className="h-auto max-w-full mt-2 rounded" />
          </div>
        )}
      </div>

      {/* Google Drive link */}
      <div>
        <label className="block mb-1 font-semibold">Google Drive Link:</label>
        <input
          type="url"
          placeholder="https://drive.google.com/..."
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Other link */}
      <div>
        <label className="block mb-1 font-semibold">Other Link (e.g. Dropbox):</label>
        <input
          type="url"
          placeholder="https://example.com/..."
          value={otherLink}
          onChange={(e) => setOtherLink(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Submit */}
      <div>
        <button
          onClick={handleSubmit}
          className="w-full py-3 text-white bg-purple-700 rounded hover:bg-purple-800"
        >
          Submit Materials
        </button>
      </div>
    </div>
  );
};

export default UploadMaterials;
