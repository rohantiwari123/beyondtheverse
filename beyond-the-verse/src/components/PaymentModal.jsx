import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import confetti from "canvas-confetti";

const UPI_ID = "BHARATPE.8E0D1Z2J6Z43763@fbpe";
const PAYEE_NAME = "Rohan Tiwari";

export default function PaymentModal({ pendingDonation, onClose, showToast }) {
  const [step, setStep] = useState(1);
  const [utr, setUtr] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (pendingDonation) {
      const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
        PAYEE_NAME
      )}&am=${pendingDonation.amount}&cu=INR`;
      setQrUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
          upiUrl
        )}`
      );
    }
  }, [pendingDonation]);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    showToast("UPI ID Copied!", true);
  };

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        zIndex: 200,
      });
    }, 250);
  };

  const handleSubmit = async () => {
    const utrVal = utr.trim();

    if (utrVal.length !== 12 || isNaN(utrVal)) {
      return setError("Please enter a valid 12-digit number.");
    }
    const isAllSame = /^(.)\1{11}$/.test(utrVal);
    const isSequential = utrVal === "123456789012" || utrVal === "012345678901";
    if (isAllSame || isSequential) {
      return setError("This UTR looks invalid. Please enter the real UTR.");
    }

    setError("");
    setIsSubmitting(true);

    try {
      const q = query(collection(db, "donations"), where("utr", "==", utrVal));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setIsSubmitting(false);
        return setError("This Transaction ID has already been used!");
      }

      await addDoc(collection(db, "donations"), {
        ...pendingDonation,
        utr: utrVal,
        timestamp: Date.now(),
      });

      setStep(3);
      fireConfetti();
    } catch (err) {
      setError("Failed to verify. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareWhatsApp = () => {
    const currentUrl = window.location.href;
    const text = `Hey! I just supported Rohan's "Beyond The Verse" initiative. Join me in helping him upgrade his teaching setup! 🚀\n\nSupport here: ${currentUrl}`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto p-8 text-center relative">
        {step === 1 && (
          <>
            <h3 className="text-2xl font-bold mb-1 text-slate-800">
              Scan & Donate
            </h3>
            <p className="text-slate-600 mb-4 text-sm">
              Scan this QR to donate{" "}
              <strong className="text-teal-700 text-lg">
                ₹{pendingDonation?.amount}
              </strong>
            </p>

            <div className="bg-white p-3 rounded-xl border-2 border-teal-100 inline-block mb-3 shadow-sm mx-auto">
              {qrUrl && (
                <img
                  src={qrUrl}
                  alt="UPI QR"
                  className="w-48 h-48"
                  crossOrigin="anonymous"
                />
              )}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 flex justify-between items-center text-left">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                  Or Pay to UPI ID
                </p>
                <p className="text-xs text-slate-800 font-mono font-bold">
                  {UPI_ID}
                </p>
              </div>
              <button
                onClick={handleCopyUPI}
                className="text-teal-600 hover:bg-teal-50 p-2 rounded-lg transition"
              >
                <i className="fa-regular fa-copy"></i>
              </button>
            </div>

            <div className="mb-4 text-left border-t border-slate-100 pt-5">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Enter 12-Digit UTR / Ref No.{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength="12"
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
                placeholder="e.g. 312345678901"
                className="w-full px-3 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-mono text-center tracking-widest text-lg bg-slate-50"
              />
              {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-green-700 disabled:opacity-70 transition"
              >
                {isSubmitting ? "Verifying..." : "Submit"}{" "}
                <i className="fa-solid fa-check ml-1"></i>
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              <i className="fa-solid fa-check-double"></i>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">
              Thank You!
            </h3>
            <p className="text-slate-600 mb-6 text-sm">
              Your payment detail has been submitted successfully.
            </p>
            <button
              onClick={handleShareWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-3 px-4 rounded-xl shadow-lg mb-3 flex justify-center items-center gap-2 transition"
            >
              <i className="fa-brands fa-whatsapp text-xl"></i> Share with
              Friends
            </button>
            <button
              onClick={onClose}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 px-4 rounded-xl transition"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
