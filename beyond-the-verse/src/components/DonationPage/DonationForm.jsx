 import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Path confirm kijiye (../../)

export default function DonationForm({ onInitiate }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const [amount, setAmount] = useState(500);
  const [minAmount, setMinAmount] = useState(200); 
  const [isScholarship, setIsScholarship] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🌟 NAYA: Custom Error State 🌟
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

  // 🌟 NAYA: Custom Validation Logic (No more browser alerts) 🌟
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
    
    // Agar object khali hai, toh true return karo (Matlab koi error nahi hai)
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Browser ka page reload roko
    
    // Sirf tabhi aage badho jab form theek ho
    if (validateForm()) {
      onInitiate({ name, phone, message, amount: Number(amount) });
    }
  };

  if (isLoading) {
    return <div className="text-center py-10 text-slate-400 font-bold animate-pulse">Verifying secure link...</div>;
  }

  return (
    // 🌟 NAYA: noValidate tag lagaya hai taaki browser default popups na de 🌟
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      
      {isScholarship && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm mb-6 animate-fade-in-up">
          <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
            <i className="fa-solid fa-gift text-emerald-600 text-lg"></i>
          </div>
          <div>
            <p className="font-bold text-sm">Special Link Applied!</p>
            <p className="text-xs text-emerald-600 font-medium mt-0.5">Your minimum contribution is set to ₹{minAmount}</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {/* Name Input */}
        <div>
          <div className="relative">
            <i className={`fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 ${errors.name ? 'text-rose-400' : 'text-slate-400'}`}></i>
            <input
              type="text"
              placeholder="Full Name *"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if(errors.name) setErrors({...errors, name: null}); // Type karte hi error hata do
              }}
              className={`w-full pl-11 pr-4 py-3.5 rounded-xl outline-none transition-all font-medium text-slate-700 border ${
                errors.name 
                  ? 'bg-rose-50/50 border-rose-300 focus:ring-2 focus:ring-rose-500/30' 
                  : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-teal-500/50'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] font-bold text-rose-500 mt-1 pl-2 flex items-center gap-1.5 animate-fade-in-up">
              <i className="fa-solid fa-circle-exclamation"></i> {errors.name}
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <div className="relative">
            <i className={`fa-brands fa-whatsapp absolute left-4 top-1/2 -translate-y-1/2 text-lg ${errors.phone ? 'text-rose-400' : 'text-slate-400'}`}></i>
            <input
              type="tel"
              placeholder="WhatsApp Number *"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                if(errors.phone) setErrors({...errors, phone: null});
              }}
              className={`w-full pl-11 pr-4 py-3.5 rounded-xl outline-none transition-all font-medium text-slate-700 border ${
                errors.phone 
                  ? 'bg-rose-50/50 border-rose-300 focus:ring-2 focus:ring-rose-500/30' 
                  : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-teal-500/50'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] font-bold text-rose-500 mt-1 pl-2 flex items-center gap-1.5 animate-fade-in-up">
              <i className="fa-solid fa-circle-exclamation"></i> {errors.phone}
            </p>
          )}
        </div>

        {/* Message Input (Optional, toh error state nahi hogi) */}
        <div className="relative">
          <i className="fa-solid fa-message absolute left-4 top-4 text-slate-400"></i>
          <textarea
            placeholder="Leave a message of support... (Optional)"
            rows="2"
            maxLength="100"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-medium text-slate-700 resize-none"
          ></textarea>
        </div>
      </div>

      {/* Amount Selection Area */}
      <div className="pt-2">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
          Select Amount (₹) *
        </label>
        
        <div className="flex gap-2 mb-3">
          {[isScholarship ? minAmount : 500, 1000, 2000].map((preset, index) => (
            <button
              type="button"
              key={index}
              onClick={() => {
                setAmount(preset);
                if(errors.amount) setErrors({...errors, amount: null});
              }}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                Number(amount) === preset
                  ? "bg-teal-600 text-white shadow-md shadow-teal-500/30 scale-[1.02]"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-teal-300"
              }`}
            >
              ₹{preset}
            </button>
          ))}
        </div>

        <div>
          <div className="relative">
            <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg ${errors.amount ? 'text-rose-400' : 'text-slate-400'}`}>₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if(errors.amount) setErrors({...errors, amount: null});
              }}
              className={`w-full pl-10 pr-4 py-4 rounded-xl outline-none transition-all font-black text-xl text-slate-800 border-2 ${
                errors.amount
                  ? 'bg-rose-50/50 border-rose-300 focus:border-rose-500'
                  : isScholarship 
                    ? 'bg-emerald-50/50 border-emerald-200 focus:border-emerald-500' 
                    : 'bg-teal-50/30 border-teal-100 focus:border-teal-500'
              }`}
            />
          </div>
          {errors.amount ? (
            <p className="text-[11px] font-bold text-rose-500 mt-2 pl-2 flex items-center gap-1.5 animate-fade-in-up">
              <i className="fa-solid fa-circle-exclamation"></i> {errors.amount}
            </p>
          ) : (
            <p className="text-[10px] text-slate-400 font-medium mt-2 pl-1 flex items-center gap-1">
              <i className="fa-solid fa-circle-info text-teal-500"></i> Minimum contribution is ₹{minAmount}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        Generate QR to Donate <i className="fa-solid fa-qrcode ml-1"></i>
      </button>
    </form>
  );
}
