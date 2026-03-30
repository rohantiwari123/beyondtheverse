import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase"; // Path check kar lijiyega (../../)
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

    // 🌟 Custom Validation Logic 🌟
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto p-8 text-center relative border border-slate-100">
        
        {step === 1 && (
          <>
            <h3 className="text-2xl font-extrabold mb-1 text-slate-800">
              Scan & Support
            </h3>
            <p className="text-slate-500 mb-5 text-sm font-medium">
              Scan this QR to contribute{" "}
              <strong className="text-teal-600 text-lg bg-teal-50 px-2 py-0.5 rounded-lg ml-1">
                ₹{pendingDonation?.amount}
              </strong>
            </p>

            {/* QR Code Area - More Premium Look */}
            <div className="bg-white p-4 rounded-2xl border-2 border-teal-100/50 inline-block mb-4 shadow-lg shadow-teal-500/10 mx-auto relative group">
              {qrUrl ? (
                <img
                  src={qrUrl}
                  alt="UPI QR"
                  className="w-48 h-48 object-contain transition-transform group-hover:scale-105 duration-300"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-48 h-48 bg-slate-50 animate-pulse rounded-xl flex items-center justify-center text-slate-400">
                  <i className="fa-solid fa-qrcode text-3xl"></i>
                </div>
              )}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-5 flex justify-between items-center text-left hover:border-teal-300 transition-colors">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                  Or Pay via UPI ID
                </p>
                <p className="text-sm text-slate-800 font-mono font-extrabold select-all">
                  {UPI_ID}
                </p>
              </div>
              <button
                onClick={handleCopyUPI}
                className="text-teal-600 bg-teal-50 hover:bg-teal-100 h-10 w-10 flex items-center justify-center rounded-lg transition-colors active:scale-95"
                title="Copy UPI ID"
              >
                <i className="fa-regular fa-copy text-lg"></i>
              </button>
            </div>

            {/* 🌟 NAYA: Premium Input with Custom Error State 🌟 */}
            <div className="mb-6 text-left border-t border-slate-100 pt-5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                Enter 12-Digit UTR / Ref No. *
              </label>
              <input
                type="text"
                maxLength="12"
                value={utr}
                onChange={(e) => {
                  setUtr(e.target.value.replace(/\D/g, '')); // Sirf numbers allow karega
                  if(error) setError(""); // Type karte hi error hata do
                }}
                placeholder="e.g. 312345678901"
                className={`w-full px-4 py-3.5 border-2 rounded-xl outline-none font-mono text-center tracking-[0.2em] text-lg transition-all ${
                  error 
                    ? 'bg-rose-50/50 border-rose-300 focus:ring-2 focus:ring-rose-500/30' 
                    : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500'
                }`}
              />
              
              {/* Animated Error Text */}
              {error && (
                <p className="text-[11px] font-bold text-rose-500 mt-2 flex items-center justify-center gap-1.5 animate-fade-in-up">
                  <i className="fa-solid fa-circle-exclamation"></i> {error}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-colors active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-teal-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-500/30 hover:bg-teal-700 disabled:opacity-70 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Verifying <i className="fa-solid fa-circle-notch fa-spin"></i></>
                ) : (
                  <>Submit <i className="fa-solid fa-check"></i></>
                )}
              </button>
            </div>
          </>
        )}

        {/* 🌟 NAYA: Premium Success Screen 🌟 */}
        {step === 3 && (
          <div className="animate-fade-in-up py-4">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl shadow-inner border-4 border-white">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="text-3xl font-black mb-2 text-slate-800">
              Thank You!
            </h3>
            <p className="text-slate-500 mb-8 text-sm font-medium px-4">
              Your contribution has been verified and added to the Supporters List.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleShareWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-[#25D366]/20 flex justify-center items-center gap-2 transition-transform active:scale-95"
              >
                <i className="fa-brands fa-whatsapp text-2xl"></i> Share with Friends
              </button>
              <button
                onClick={onClose}
                className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold py-3.5 px-4 rounded-xl transition-colors active:scale-95"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
        }
