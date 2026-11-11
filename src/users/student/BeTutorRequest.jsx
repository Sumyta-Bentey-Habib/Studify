import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authcontext/AuthProvider";
import useAxios from "../../hooks/useAxios";
import PageHeader from "../../components/ui/PageHeader";
import { GraduationCap, Send, CheckCircle2, AlertCircle } from "lucide-react";

const BeTutorRequest = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSendRequest = async () => {
    if (!user || !user.email) {
      setError("You must be logged in to send a request.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await axios.post("/upgrade-request", {
        userEmail: user.email,
        message: message.trim() || "I want to become a tutor.",
      });
      setSuccess(true);
      setMessage("");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to send upgrade request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <PageHeader
        title="Become a Mentor"
        description="Apply for instructor privileges to host study sessions, tutor peers, and share academic content."
      />

      {success ? (
        <div className="p-6 rounded-2xl bg-studify-surface border border-studify-success/30 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-studify-success/10 text-studify-success flex items-center justify-center mx-auto">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="text-base font-bold text-studify-heading">
            Application Submitted
          </h3>
          <p className="text-xs text-studify-muted max-w-md mx-auto leading-relaxed">
            Your request to become a mentor has been received. Our platform administrators will review your application shortly.
          </p>
        </div>
      ) : (
        <div className="p-6 sm:p-8 bg-studify-surface border border-studify-border rounded-2xl shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-studify-border">
            <div className="w-10 h-10 rounded-xl bg-studify-bg flex items-center justify-center text-studify-primary border border-studify-border">
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-studify-heading">
                Role Upgrade Application
              </h3>
              <p className="text-xs text-studify-muted">
                Applying as: <span className="font-semibold text-studify-heading">{user?.email || "Student"}</span>
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-studify-muted uppercase tracking-wider mb-2">
              Statement of Interest / Experience
            </label>
            <textarea
              className="w-full p-3.5 text-sm rounded-xl border border-studify-border bg-studify-surface text-studify-heading focus:outline-none focus:ring-2 focus:ring-studify-primary/40 focus:border-studify-primary transition-all resize-none leading-relaxed"
              rows={4}
              placeholder="Tell the admin about your teaching subjects, experience, or academic background..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <p className="text-[11px] text-studify-muted mt-1.5">
              Include your subject expertise and how you plan to help students.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-studify-danger/10 border border-studify-danger/20 text-studify-danger text-xs font-medium flex items-center gap-2">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-3 border-t border-studify-border flex justify-end">
            <button
              disabled={loading}
              onClick={handleSendRequest}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-studify-primary text-white text-xs font-bold hover:bg-studify-primary-dark transition-colors shadow-xs disabled:opacity-50"
            >
              <Send size={14} />
              <span>{loading ? "Sending Application…" : "Submit Application"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeTutorRequest;
