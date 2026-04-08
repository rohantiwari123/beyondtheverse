import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase"; 
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
    // 🌟 FULLY RESPONSIVE BACKGROUND OVERLAY (Bottom-sheet for mobile, center for desktop)
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      
      {/* 🌟 MAIN MODAL CONTAINER */}
      <div className="bg-white rounded-t-[2rem] sm:rounded-[2.5rem] w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-center relative border border-slate-100 transform transition-transform translate-y-0 animate-slide-up sm:animate-fade-in-up">
        
        {/* Decorative Drag Handle (Mobile only) */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 sm:hidden"></div>

        {/* Close Button (Top Right) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 sm:top-6 right-4 sm:right-6 h-8 w-8 sm:h-10 sm:w-10 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 flex items-center justify-center rounded-full transition-colors active:scale-95"
        >
          <i className="fa-solid fa-xmark sm:text-lg"></i>
        </button>

        {step === 1 && (
          <>
            <div className="mb-6 sm:mb-8 mt-2 sm:mt-0">
              <span className="text-[10px] sm:text-xs text-slate-400 block mb-2">
                Total Payable Amount
              </span>
              <h3 className="text-4xl sm:text-5xl text-teal-600 flex items-center justify-center gap-1">
                <span className="text-2xl sm:text-3xl opacity-70">₹</span>{pendingDonation?.amount}
              </h3>
            </div>

            {/* 🌟 PREMIUM QR CODE AREA */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-5 rounded-3xl border-2 border-teal-100/50 inline-block mb-6 shadow-xl shadow-teal-900/5 mx-auto relative group">
              {/* Corner Accents for Scanner Look */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-teal-500 rounded-tl-lg"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-teal-500 rounded-tr-lg"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-teal-500 rounded-bl-lg"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-teal-500 rounded-br-lg"></div>

              {qrUrl ? (
                <div className="bg-white p-2 rounded-2xl">
                  <img
                    src={qrUrl}
                    alt="UPI QR"
                    className="w-40 h-40 sm:w-48 sm:h-48 object-contain transition-transform group-hover:scale-105 duration-500"
                    crossOrigin="anonymous"
                  />
                </div>
              ) : (
                <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white animate-pulse rounded-2xl flex items-center justify-center text-slate-300">
                  <i className="fa-solid fa-qrcode text-4xl sm:text-5xl"></i>
                </div>
              )}
            </div>

            <p className="text-slate-500 mb-4 text-xs sm:text-sm">
              Scan the QR using any UPI app
            </p>

            {/* UPI ID Copy Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 mb-6 flex justify-between items-center text-left hover:border-teal-300 transition-colors shadow-inner">
              <div className="overflow-hidden pr-2">
                <p className="text-[9px] sm:text-[10px] text-slate-400 mb-1">
                  Or Pay via UPI ID
                </p>
                <p className="text-xs sm:text-sm text-slate-800 font-mono truncate select-all">
                  {UPI_ID}
                </p>
              </div>
              <button
                onClick={handleCopyUPI}
                className="text-teal-600 bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-200 h-10 w-10 sm:h-12 sm:w-12 shrink-0 flex items-center justify-center rounded-xl transition-all active:scale-95 shadow-sm"
                title="Copy UPI ID"
              >
                <i className="fa-regular fa-copy text-base sm:text-lg"></i>
              </button>
            </div>

            {/* 🌟 PREMIUM UTR INPUT 🌟 */}
            <div className="mb-6 sm:mb-8 text-left border-t border-slate-100 pt-6">
              <label className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-500 mb-3 ml-1">
                <i className="fa-solid fa-receipt text-slate-400"></i> Enter 12-Digit UTR / Ref No.
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  maxLength="12"
                  value={utr}
                  onChange={(e) => {
                    setUtr(e.target.value.replace(/\D/g, '')); 
                    if(error) setError(""); 
                  }}
                  placeholder="e.g. 312345678901"
                  className={`w-full px-4 sm:px-5 py-3.5 sm:py-4 border-2 rounded-2xl outline-none font-mono text-center text-base sm:text-lg transition-all shadow-inner placeholder:text-slate-300 ${
                    error 
                      ? 'bg-rose-50/50 border-rose-300 focus:ring-2 focus:ring-rose-500/30 text-rose-700' 
                      : 'bg-slate-50 border-slate-200 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white text-slate-800'
                  }`}
                />
              </div>
              
              {/* Animated Error Text */}
              {error && (
                <p className="text-[10px] sm:text-xs text-rose-500 mt-2.5 flex items-center justify-center gap-1.5 animate-fade-in-up bg-rose-50 py-1.5 rounded-lg">
                  <i className="fa-solid fa-circle-exclamation"></i> {error}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 sm:gap-4 mt-auto">
              <button
                onClick={onClose}
                className="flex-1 bg-white border-2 border-slate-100 text-slate-600 text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-colors active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || utr.length !== 12}
                className="flex-1 bg-slate-900 text-white text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg shadow-slate-900/20 hover:bg-black disabled:opacity-50 disabled:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Verifying <i className="fa-solid fa-circle-notch fa-spin"></i></>
                ) : (
                  <>Verify Payment <i className="fa-solid fa-arrow-right"></i></>
                )}
              </button>
            </div>
          </>
        )}

        {/* 🌟 PREMIUM SUCCESS SCREEN 🌟 */}
        {step === 3 && (
          <div className="animate-fade-in-up py-6 sm:py-10 flex flex-col items-center">
            
            <div className="relative mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-full flex items-center justify-center text-4xl sm:text-5xl shadow-xl shadow-emerald-500/30 border-4 border-white relative z-10">
                <i className="fa-solid fa-check"></i>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl mb-3 text-slate-800">
              Payment Verified!
            </h3>
            
            <p className="text-slate-500 mb-8 sm:mb-10 text-sm sm:text-base px-2">
              Thank you for your generous contribution of <strong className="text-emerald-600 font-normal">₹{pendingDonation?.amount}</strong>. You are now officially on the Supporters Wall!
            </p>
            
            <div className="w-full space-y-3 sm:space-y-4 mt-auto">
              <button
                onClick={handleShareWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white text-sm sm:text-base py-4 sm:py-4.5 px-4 rounded-xl sm:rounded-2xl shadow-lg shadow-[#25D366]/30 flex justify-center items-center gap-2.5 transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95"
              >
                <i className="fa-brands fa-whatsapp text-xl sm:text-2xl"></i> Share the Mission
              </button>
              
              <button
                onClick={onClose}
                className="w-full bg-white border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-600 text-sm sm:text-base py-3.5 sm:py-4 px-4 rounded-xl sm:rounded-2xl transition-colors active:scale-95"
              >
                Return to Wall
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}