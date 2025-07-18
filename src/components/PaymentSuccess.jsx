import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axios = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(`/verify-payment-session?sessionId=${sessionId}`);
        if (res.data.paid) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Thank you! Your session is booked.",
          }).then(() => navigate("/sessions"));
        } else {
          throw new Error("Not paid");
        }
      } catch {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: "Could not verify payment.",
        }).then(() => navigate("/sessions"));
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) verifyPayment();
    else setLoading(false);
  }, [sessionId, axios, navigate]);

  if (loading) return <div className="p-6 text-center">Verifying payment...</div>;

  return <div className="p-6 text-center">Verification done.</div>;
};

export default PaymentSuccess;
