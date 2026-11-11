import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../contexts/authcontext/AuthProvider";
import { SWAL_THEME } from "../utils/utils";
import PageHeader from "./ui/PageHeader";
import StatusBadge from "./ui/StatusBadge";
import LoadingSkeleton from "./ui/LoadingSkeleton";
import { ArrowLeft, User, Calendar, Clock, DollarSign, CreditCard, ShieldCheck } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

const SessionDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchSession = async () => {
      try {
        const res = await axios.get(`/sessions/${id}`);
        if (isMounted) setSession(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Session Not Found",
          text: "Failed to load session details.",
          background: SWAL_THEME.background,
          color: SWAL_THEME.color,
          confirmButtonColor: SWAL_THEME.confirmButtonColor,
        });
        navigate("/dashboard/student/view-sessions");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, [axios, id, navigate]);

  const openPaymentModal = () => setIsPaymentOpen(true);
  const closePaymentModal = () => setIsPaymentOpen(false);

  const handleStripeCheckout = async () => {
    if (!session || !user?.email) return;

    setCheckoutLoading(true);
    try {
      const bookingRes = await axios.post("/booked-sessions", {
        sessionId: session._id,
        studentEmail: user.email,
        title: session.title,
        tutorName: session.tutorName,
        studentName: user.displayName || user.email,
        bookedAt: new Date(),
        registrationFee: session.registrationFee,
      });

      const bookedSessionId = bookingRes.data.insertedId;

      // Ensure Stripe is initialized
      await stripePromise;

      const response = await axios.post("/create-checkout-session", {
        sessionId: session._id,
        title: session.title,
        amount: session.registrationFee * 100,
        bookedSessionId,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Something went wrong initiating the Stripe checkout session.",
        background: SWAL_THEME.background,
        color: SWAL_THEME.color,
        confirmButtonColor: SWAL_THEME.confirmButtonColor,
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <LoadingSkeleton count={1} type="spinner" />
      </div>
    );
  }

  if (!session) return null;

  const isFree = !session.registrationFee || session.registrationFee === 0 || session.registrationFee === "0";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-studify-surface border border-studify-border text-xs font-semibold text-studify-heading hover:bg-studify-bg transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to Sessions</span>
      </button>

      <div className="bg-studify-surface border border-studify-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-6 border-b border-studify-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 mb-1">
              <StatusBadge status={session.status || "open"}>
                {session.status || "Active Session"}
              </StatusBadge>
              <span className="text-xs text-studify-muted">
                Created by {session.creatorEmail || "Mentor"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-studify-heading leading-tight">
              {session.title}
            </h1>
          </div>

          <div className="text-left sm:text-right bg-studify-bg sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none">
            <span className="text-xs uppercase tracking-wider font-semibold text-studify-muted block">
              Registration Fee
            </span>
            <span className="text-2xl font-extrabold text-studify-primary">
              {isFree ? "Free" : `$${session.registrationFee}`}
            </span>
          </div>
        </div>

        {/* Overview metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-studify-bg/60 border border-studify-border flex items-center gap-3">
            <User size={18} className="text-studify-primary" />
            <div>
              <span className="text-[11px] uppercase tracking-wide text-studify-muted block">
                Instructor
              </span>
              <span className="text-xs font-bold text-studify-heading">
                {session.tutorName || "Unknown Tutor"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-studify-bg/60 border border-studify-border flex items-center gap-3">
            <Clock size={18} className="text-studify-primary" />
            <div>
              <span className="text-[11px] uppercase tracking-wide text-studify-muted block">
                Session Duration
              </span>
              <span className="text-xs font-bold text-studify-heading">
                {session.duration || "N/A"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-studify-bg/60 border border-studify-border flex items-center gap-3">
            <Calendar size={18} className="text-studify-primary" />
            <div>
              <span className="text-[11px] uppercase tracking-wide text-studify-muted block">
                Class Schedule
              </span>
              <span className="text-xs font-bold text-studify-heading">
                {session.classStartTime
                  ? new Date(session.classStartTime).toLocaleDateString()
                  : "TBD"}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-bold text-studify-heading uppercase tracking-wide mb-2">
            Session Description
          </h3>
          <p className="text-sm text-studify-muted leading-relaxed whitespace-pre-wrap bg-studify-bg/30 p-4 rounded-xl border border-studify-border/60">
            {session.description || "No detailed description provided for this session."}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-studify-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-studify-muted">
            <ShieldCheck size={16} className="text-studify-success" />
            <span>Encrypted checkout powered by Stripe</span>
          </div>

          {!isFree && (
            <button
              onClick={openPaymentModal}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-studify-primary text-white text-sm font-bold hover:bg-studify-primary-dark transition-colors shadow-sm"
            >
              <CreditCard size={16} />
              <span>Pay & Confirm (${session.registrationFee})</span>
            </button>
          )}
        </div>
      </div>

      {/* Stripe Payment Confirmation Modal */}
      <Dialog
        open={isPaymentOpen}
        as="div"
        className="relative z-50"
        onClose={closePaymentModal}
      >
        <div className="fixed inset-0 bg-studify-heading/40 backdrop-blur-xs transition-opacity" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-studify-surface p-6 text-left align-middle shadow-xl border border-studify-border transition-all space-y-4">
            <DialogTitle className="text-lg font-bold text-studify-heading flex items-center gap-2">
              <CreditCard size={20} className="text-studify-primary" />
              <span>Confirm Enrollment Payment</span>
            </DialogTitle>

            <div className="p-4 rounded-xl bg-studify-bg/60 border border-studify-border space-y-2 text-xs text-studify-muted">
              <div className="flex justify-between">
                <span>Course:</span>
                <strong className="text-studify-heading">{session.title}</strong>
              </div>
              <div className="flex justify-between">
                <span>Instructor:</span>
                <span className="text-studify-heading">{session.tutorName}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-studify-border text-sm">
                <span className="font-bold text-studify-heading">Total Due:</span>
                <span className="font-extrabold text-studify-primary">
                  ${session.registrationFee}
                </span>
              </div>
            </div>

            <p className="text-xs text-studify-muted leading-relaxed">
              You will be redirected to the secure Stripe Checkout gateway to finalize your payment.
            </p>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-studify-border">
              <button
                type="button"
                onClick={closePaymentModal}
                disabled={checkoutLoading}
                className="px-4 py-2 text-xs font-semibold text-studify-heading hover:bg-studify-bg rounded-xl border border-studify-border transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStripeCheckout}
                disabled={checkoutLoading}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-studify-primary hover:bg-studify-primary-dark rounded-xl transition-colors shadow-xs disabled:opacity-50"
              >
                <span>{checkoutLoading ? "Redirecting…" : "Pay with Stripe"}</span>
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default SessionDetails;
