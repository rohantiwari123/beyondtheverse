import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function DonationForm({ onInitiate }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const [amount, setAmount] = useState(500);
  const [minAmount, setMinAmount] = useState(200); 
  const [isScholarship, setIsScholarship] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Custom Error State
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const checkSpecialLink = async () => {
      try {
        const fullUrl = window.location.href;
        let scholarshipId = null;

        if (fullUrl.includes("?scholarship=")) {
          scholarshipId = fullUrl.split("?scholarship=")[1].split("&")[0];
        }

        if (scholarshipId) {
          const docRef = doc(db, "special_links", scholarshipId);
          const snap = await getDoc(docRef);
          
          if (snap.exists() && snap.data().active) {
            const specialLimit = snap.data().amount;
            setMinAmount(specialLimit);
            setAmount(specialLimit); 
            setIsScholarship(true);
          }
        }
      } catch (error) {
        console.error("Firebase Read Error:", error);
      } finally {
        setIsLoading(false); 
      }
    };
    checkSpecialLink();
  }, []);

  // Custom Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name.";
    }
    
    if (!phone || phone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit number.";
    }

    if (!amount || Number(amount) < minAmount) {
      newErrors.amount = `Minimum contribution is ₹${minAmount}.`;
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (validateForm()) {
      onInitiate({ name, phone, message, amount: Number(amount) });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-3">
        <div className="h-8 w-8 border-4 border-slate-100 border-t-teal-500 rounded-full animate-spin"></div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest animate-pulse">Verifying Secure Link...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 lg:space-y-6 w-full max-w-lg mx-auto">
      
      {/* 🌟 PREMIUM SCHOLARSHIP BADGE */}
      {isScholarship && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 p-4 sm:p-5 rounded-2xl flex items-center gap-3 sm:gap-4 shadow-sm mb-6 sm:mb-8 animate-fade-in-up relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl -z-0"></div>
          <div className="h-10 w-10 sm:h-12 sm:w-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-emerald-100 z-10">
            <i className="fa-solid fa-gift text-emerald-500 text-lg sm:text-xl"></i>
          </div>
          <div className="relative z-10">
            <p className="font-black text-emerald-900 text-sm sm:text-base tracking-tight">Special Link Applied!</p>
            <p className="text-[10px] sm:text-xs text-emerald-700 font-bold mt-0.5 uppercase tracking-widest">Min. contribution: ₹{minAmount}</p>
          </div>
        </div>
      )}

      {/* 🌟 INPUT FIELDS SECTION */}
      <div className="space-y-4 sm:space-y-5">
        
        {/* Name Input */}
        <div className="relative group">
          <i className={`fa-solid fa-user absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-rose-400' : 'text-slate-400 group-focus-within:text-teal-600'}`}></i>
          <input
            type="text"
            placeholder="Full Name *"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if(errors.name) setErrors({...errors, name: null});
            }}
            className={`w-full pl-11 sm:pl-12 pr-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl outline-none transition-all font-bold text-sm sm:text-base text-slate-800 placeholder:text-slate-400 placeholder:font-medium border-2 ${
              errors.name 
                ? 'bg-rose-50/50 border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10' 
                : 'bg-slate-50 border-slate-100 hover:border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 shadow-inner'
            }`}
          />
          {errors.name && (
            <p className="absolute -bottom-5 left-2 text-[9px] sm:text-[10px] font-black text-rose-500 flex items-center gap-1 animate-fade-in-up">
              <i className="fa-solid fa-circle-exclamation"></i> {errors.name}
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div className="relative group mt-6 sm:mt-8">
          <i className={`fa-brands fa-whatsapp absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-lg transition-colors ${errors.phone ? 'text-rose-400' : 'text-slate-400 group-focus-within:text-teal-600'}`}></i>
          <input
            type="tel"
            placeholder="WhatsApp Number *"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
              if(errors.phone) setErrors({...errors, phone: null});
            }}
            className={`w-full pl-11 sm:pl-12 pr-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl outline-none transition-all font-bold text-sm sm:text-base text-slate-800 placeholder:text-slate-400 placeholder:font-medium border-2 ${
              errors.phone 
                ? 'bg-rose-50/50 border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10' 
                : 'bg-slate-50 border-slate-100 hover:border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 shadow-inner'
            }`}
          />
          {errors.phone && (
            <p className="absolute -bottom-5 left-2 text-[9px] sm:text-[10px] font-black text-rose-500 flex items-center gap-1 animate-fade-in-up">
              <i className="fa-solid fa-circle-exclamation"></i> {errors.phone}
            </p>
          )}
        </div>

        {/* Message Textarea */}
        <div className="relative group mt-6 sm:mt-8">
          <i className="fa-solid fa-message absolute left-4 sm:left-5 top-4 sm:top-5 text-slate-400 transition-colors group-focus-within:text-teal-600"></i>
          <textarea
            placeholder="Leave a message of support... (Optional)"
            rows="2"
            maxLength="100"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-11 sm:pl-12 pr-4 py-3.5 sm:py-4 bg-slate-50 border-2 border-slate-100 hover:border-slate-200 rounded-xl sm:rounded-2xl outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-medium text-sm sm:text-base text-slate-800 placeholder:text-slate-400 resize-none shadow-inner"
          ></textarea>
        </div>
      </div>

      {/* 🌟 AMOUNT SELECTION AREA */}
      <div className="pt-4 sm:pt-6 border-t border-slate-100 mt-6 sm:mt-8">
        <label className="block text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest mb-3 ml-2">
          Select Amount (₹) *
        </label>
        
        {/* Preset Buttons */}
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-5">
          {[isScholarship ? minAmount : 500, 1000, 2000].map((preset, index) => (
            <button
              type="button"
              key={index}
              onClick={() => {
                setAmount(preset);
                if(errors.amount) setErrors({...errors, amount: null});
              }}
              className={`flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base transition-all active:scale-95 ${
                Number(amount) === preset
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-500/30 scale-[1.02] border-2 border-teal-600"
                  : "bg-white text-slate-600 border-2 border-slate-100 hover:bg-slate-50 hover:border-teal-300"
              }`}
            >
              ₹{preset}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div className="relative group">
          <span className={`absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 font-black text-lg sm:text-xl transition-colors ${errors.amount ? 'text-rose-500' : 'text-slate-400 group-focus-within:text-teal-600'}`}>₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if(errors.amount) setErrors({...errors, amount: null});
            }}
            className={`w-full pl-9 sm:pl-11 pr-4 py-4 sm:py-5 rounded-xl sm:rounded-2xl outline-none transition-all font-black text-xl sm:text-2xl lg:text-3xl text-slate-800 border-2 shadow-inner ${
              errors.amount
                ? 'bg-rose-50/50 border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10'
                : isScholarship 
                  ? 'bg-emerald-50/50 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10' 
                  : 'bg-teal-50/30 border-teal-100 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 focus:bg-white'
            }`}
          />
          
          {/* Dynamic Error or Info Text */}
          {errors.amount ? (
            <p className="absolute -bottom-6 left-2 text-[9px] sm:text-[10px] font-black text-rose-500 flex items-center gap-1.5 animate-fade-in-up">
              <i className="fa-solid fa-circle-exclamation"></i> {errors.amount}
            </p>
          ) : (
            <p className="absolute -bottom-6 left-2 text-[9px] sm:text-[10px] text-slate-400 font-bold tracking-wide flex items-center gap-1.5 opacity-80">
              <i className="fa-solid fa-shield-halved text-teal-500"></i> Minimum limit: ₹{minAmount}
            </p>
          )}
        </div>
      </div>

      {/* 🌟 SUBMIT BUTTON */}
      <div className="pt-6 sm:pt-8">
        <button
          type="submit"
          className="w-full bg-slate-900 text-white font-black text-sm sm:text-base py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-black transition-all hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-3"
        >
          Generate QR to Donate <i className="fa-solid fa-qrcode text-lg sm:text-xl"></i>
        </button>
      </div>

    </form>
  );
}