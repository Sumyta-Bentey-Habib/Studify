import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../contexts/authcontext/AuthProvider";
import { uploadImageToImgBB } from "../../utils/utils";
import PageHeader from "../../components/ui/PageHeader";
import { PenLine, Upload, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";

const CreateNote = () => {
  const axios = useAxios();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setMessage("");
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      setMessage("Please select an image to upload.");
      setIsSuccess(false);
      return;
    }

    setUploading(true);
    setMessage("");
    try {
      const url = await uploadImageToImgBB(selectedImage);
      setImageUrl(url);
      setMessage("Image uploaded successfully!");
      setIsSuccess(true);
    } catch (error) {
      console.error("Image upload failed:", error);
      setMessage("Failed to upload image. Please try again.");
      setIsSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      setMessage("You must be logged in to create a note.");
      setIsSuccess(false);
      return;
    }

    if (!title.trim() || !content.trim()) {
      setMessage("Title and content are required.");
      setIsSuccess(false);
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const payload = {
        userEmail: user.email,
        title: title.trim(),
        content: content.trim(),
        imageUrl,
        createdAt: new Date(),
      };

      const response = await axios.post("/notes", payload);

      if (response.data.insertedId) {
        setMessage("Note created successfully!");
        setIsSuccess(true);
        setTitle("");
        setContent("");
        setSelectedImage(null);
        setImageUrl("");
      } else {
        setMessage("Failed to create note.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error creating note:", error);
      setMessage("Error creating note. Please try again.");
      setIsSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Create Study Note"
        description="Draft personal notes, ideas, and revision points with optional attachments."
      />

      {message && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-medium ${
            isSuccess
              ? "bg-studify-success/10 border-studify-success/30 text-studify-success"
              : "bg-studify-danger/10 border-studify-danger/30 text-studify-danger"
          }`}
        >
          {isSuccess ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{message}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-studify-surface border border-studify-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-5"
      >
        <div>
          <label htmlFor="title" className="block text-xs font-semibold text-studify-muted uppercase tracking-wider mb-2">
            Note Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-studify-border bg-studify-surface text-studify-heading text-sm focus:outline-none focus:ring-2 focus:ring-studify-primary/40 focus:border-studify-primary transition-all"
            placeholder="e.g. Organic Chemistry — Reaction Mechanisms"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-xs font-semibold text-studify-muted uppercase tracking-wider mb-2">
            Note Content *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-studify-border bg-studify-surface text-studify-heading text-sm focus:outline-none focus:ring-2 focus:ring-studify-primary/40 focus:border-studify-primary transition-all resize-none leading-relaxed"
            rows={6}
            placeholder="Write your study notes, reminders, or formulas here..."
            required
          />
        </div>

        {/* Image Attachment */}
        <div className="pt-2 border-t border-studify-border/60">
          <label className="block text-xs font-semibold text-studify-muted uppercase tracking-wider mb-2">
            Attach Reference Image (optional)
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-studify-bg file:text-studify-heading hover:file:bg-studify-border text-xs text-studify-muted cursor-pointer"
            />
            {selectedImage && !imageUrl && (
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={uploading}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-studify-bg hover:bg-studify-border text-studify-heading border border-studify-border transition-colors disabled:opacity-50"
              >
                <Upload size={14} />
                <span>{uploading ? "Uploading…" : "Upload Selected"}</span>
              </button>
            )}
          </div>

          {imageUrl && (
            <div className="mt-3 p-3 rounded-xl bg-studify-bg/60 border border-studify-border flex items-center gap-3">
              <ImageIcon size={20} className="text-studify-primary flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-studify-success block">
                  Image attached successfully
                </span>
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-studify-primary hover:underline truncate block"
                >
                  {imageUrl}
                </a>
              </div>
              <img
                src={imageUrl}
                alt="Note preview"
                className="w-12 h-12 object-cover rounded-lg border border-studify-border"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-studify-border/60 flex items-center justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-studify-primary hover:bg-studify-primary-dark rounded-xl shadow-sm transition-colors disabled:opacity-50"
          >
            <PenLine size={16} />
            <span>{submitting ? "Saving Note…" : "Save Note"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
