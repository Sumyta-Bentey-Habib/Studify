import React, { useState } from "react";
import { uploadImageToImgBB } from "../../utils/utils";
import useAxios from "../../hooks/useAxios";
import PageHeader from "../../components/ui/PageHeader";
import { CloudUpload, Upload, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";

const UploadMaterials = () => {
  const axios = useAxios();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [otherLink, setOtherLink] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
      setError("Please select an image file first.");
      return;
    }
    setUploading(true);
    setError("");
    setSuccessMsg("");
    try {
      const url = await uploadImageToImgBB(selectedImage);
      setImageUrl(url);
      setSuccessMsg("Cover image uploaded successfully!");
    } catch (err) {
      setError(err.message || "Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    setError("");
    setSuccessMsg("");

    if (!subjectName.trim()) {
      setError("Please specify a subject or course name.");
      return;
    }
    if (!imageUrl) {
      setError("Please upload a cover image or document preview before submitting.");
      return;
    }

    setSubmitting(true);
    const payload = {
      subjectName: subjectName.trim(),
      imageUrl,
      driveLink: driveLink.trim(),
      otherLink: otherLink.trim(),
      uploadedAt: new Date(),
    };

    try {
      const res = await axios.post("/materials", payload);
      if (res.data.insertedId || res.data.acknowledged) {
        setSuccessMsg("Study material published successfully!");
        setSelectedImage(null);
        setPreviewImage(null);
        setImageUrl("");
        setDriveLink("");
        setOtherLink("");
        setSubjectName("");
      } else {
        setError("Error: Material could not be saved.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit material. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-studify-border bg-studify-surface px-4 py-2.5 text-sm text-studify-heading focus:outline-none focus:ring-2 focus:ring-studify-primary/40 focus:border-studify-primary transition-all";
  const labelClass =
    "block text-xs font-semibold text-studify-muted uppercase tracking-wider mb-1.5";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Upload Study Materials"
        description="Share lecture slide decks, syllabus attachments, and cloud storage links with your learners."
      />

      {error && (
        <div className="p-4 rounded-2xl bg-studify-danger/10 border border-studify-danger/30 text-studify-danger text-sm font-medium flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-2xl bg-studify-success/10 border border-studify-success/30 text-studify-success text-sm font-medium flex items-center gap-2">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="bg-studify-surface border border-studify-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <label className={labelClass}>Subject / Course Name *</label>
          <input
            type="text"
            placeholder="e.g. Modern Physics — Quantum Electrodynamics"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Cover Image Upload */}
        <div className="pt-2 border-t border-studify-border/60">
          <label className={labelClass}>Cover Image / Document Snapshot *</label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleSelectImage(e.target.files[0])}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-studify-bg file:text-studify-heading hover:file:bg-studify-border text-xs text-studify-muted cursor-pointer"
            />
            {selectedImage && !imageUrl && (
              <button
                type="button"
                onClick={handleUploadImage}
                disabled={uploading}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-studify-bg hover:bg-studify-border text-studify-heading border border-studify-border transition-colors disabled:opacity-50"
              >
                <Upload size={14} />
                <span>{uploading ? "Uploading…" : "Upload Selected"}</span>
              </button>
            )}
          </div>

          {previewImage && (
            <div className="mt-3 p-3 bg-studify-bg/50 rounded-xl border border-studify-border flex items-center gap-4">
              <img
                src={previewImage}
                alt="Upload preview"
                className="w-16 h-16 object-cover rounded-lg border border-studify-border"
              />
              <div className="text-xs">
                {imageUrl ? (
                  <span className="text-studify-success font-semibold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>Uploaded to ImgBB</span>
                  </span>
                ) : (
                  <span className="text-studify-muted">
                    Click &ldquo;Upload Selected&rdquo; to process this file.
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drive and Other Link */}
        <div className="space-y-4 pt-2 border-t border-studify-border/60">
          <div>
            <label className={labelClass}>Google Drive Resource Link</label>
            <input
              type="url"
              placeholder="https://drive.google.com/..."
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Other Storage Link (e.g. Dropbox, GitHub)</label>
            <input
              type="url"
              placeholder="https://github.com/... or https://dropbox.com/..."
              value={otherLink}
              onChange={(e) => setOtherLink(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-studify-border flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={submitting || !imageUrl || !subjectName.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-studify-primary text-white text-sm font-bold hover:bg-studify-primary-dark transition-colors shadow-sm disabled:opacity-50"
          >
            <CloudUpload size={16} />
            <span>{submitting ? "Publishing Material…" : "Submit Material"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadMaterials;
