import React, { useState } from "react";
import { uploadImageToImgBB } from "../../utils/utils";
import useAxios from "../../hooks/useAxios";

const UploadMaterials = () => {
  const axios = useAxios();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [otherLink, setOtherLink] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Preview selected image immediately
  const handleSelectImage = (file) => {
    setSelectedImage(file);
    setError("");
    setSuccessMsg("");
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }
    setUploading(true);
    setError("");
    setSuccessMsg("");
    try {
      const url = await uploadImageToImgBB(selectedImage);
      setImageUrl(url);
      setSuccessMsg("Image uploaded successfully!");
    } catch (err) {
      setError(err.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccessMsg("");

    if (!subjectName.trim()) {
      setError("Please enter a subject name.");
      return;
    }
    if (!imageUrl) {
      setError("Please upload an image before submitting.");
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
        setSuccessMsg("Material submitted successfully!");
        // reset form
        setSelectedImage(null);
        setPreviewImage(null);
        setImageUrl("");
        setDriveLink("");
        setOtherLink("");
        setSubjectName("");
      } else {
        setError("Error: Material not saved.");
      }
    } catch (err) {
      console.error(err);
      setError("Error submitting material.");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto space-y-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-purple-800">Upload Study Materials</h2>

      {error && <p className="font-semibold text-red-600">{error}</p>}
      {successMsg && <p className="font-semibold text-green-600">{successMsg}</p>}

      {/* Subject Name */}
      <div>
        <label className="block mb-2 font-semibold">Subject Name:</label>
        <input
          type="text"
          placeholder="e.g. Mathematics"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="w-full input input-bordered"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-2 font-semibold">Select Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleSelectImage(e.target.files[0])}
          className="w-full file-input file-input-bordered"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="object-contain w-full mt-4 rounded max-h-48"
          />
        )}

        <button
          onClick={handleUploadImage}
          disabled={uploading || !selectedImage}
          className="w-full mt-4 btn btn-primary"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {/* Google Drive Link */}
      <div>
        <label className="block mb-2 font-semibold">Google Drive Link:</label>
        <input
          type="url"
          placeholder="https://drive.google.com/..."
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          className="w-full input input-bordered"
        />
      </div>

      {/* Other Link */}
      <div>
        <label className="block mb-2 font-semibold">Other Link (e.g. Dropbox):</label>
        <input
          type="url"
          placeholder="https://example.com/..."
          value={otherLink}
          onChange={(e) => setOtherLink(e.target.value)}
          className="w-full input input-bordered"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!imageUrl || !subjectName.trim()}
        className="w-full btn btn-primary"
      >
        Submit Materials
      </button>
    </div>
  );
};

export default UploadMaterials;
