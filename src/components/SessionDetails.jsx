import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../contexts/authcontext/AuthProvider"; 

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const SessionDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`/sessions/${id}`);
        setSession(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load session details.",
        });
        navigate("/sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [axios, id, navigate]);

  const openPaymentModal = () => setIsPaymentOpen(true);
  const closePaymentModal = () => setIsPaymentOpen(false);

  const handleStripeCheckout = async () => {
    try {
      if (!session || !user?.email) return;

      
      const bookingRes = await axios.post("/booked-sessions", {
        sessionId: session._id,
        studentEmail: user.email,
      });

      const bookedSessionId = bookingRes.data.insertedId;

      
      const stripe = await stripePromise;

      const response = await axios.post("/create-checkout-session", {
        sessionId: session._id,
        title: session.title,
        amount: session.registrationFee * 100,
        bookedSessionId,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Something went wrong with Stripe checkout.",
      });
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading session details...</div>;
  }

  if (!session) return null;

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-4 text-indigo-800 bg-indigo-100 rounded"
      >
        ← Back to Sessions
      </button>

      <h2 className="mb-4 text-3xl font-bold text-indigo-900">{session.title}</h2>

      <p><strong>Tutor:</strong> {session.tutorName || "N/A"}</p>
      <p><strong>Description:</strong> {session.description || "N/A"}</p>
      <p><strong>Fee:</strong> ${session.registrationFee}</p>

      {session.registrationFee > 0 && (
        <button
          onClick={openPaymentModal}
          className="px-4 py-2 mt-6 text-white bg-indigo-700 rounded hover:bg-indigo-800"
        >
          Pay & Confirm
        </button>
      )}

      <Dialog open={isPaymentOpen} as="div" className="relative z-10" onClose={closePaymentModal}>
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md p-6 bg-white rounded shadow">
            <DialogTitle className="text-lg font-bold">Confirm Payment</DialogTitle>
            <p className="mt-2">You are paying for <strong>{session.title}</strong></p>
            <p>Total: <strong>${session.registrationFee}</strong></p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closePaymentModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleStripeCheckout}
                className="px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-800"
              >
                Pay with Stripe
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default SessionDetails;
