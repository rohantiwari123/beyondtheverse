import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function DonationForm({ onInitiate }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // Smart State Variables
  const [amount, setAmount] = useState(500);
  const [minAmount, setMinAmount] = useState(200); // Default 200
  const [isScholarship, setIsScholarship] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Link check hone tak form chhipane ke liye

  // URL check karne ka logic
  // 🌟 NAYA: Bulletproof URL Checker 🌟
  useEffect(() => {
    const checkSpecialLink = async () => {
      try {
        // 1. Har tarah ke URL format ko pakadne ka jugaad
        const fullUrl = window.location.href;
        let scholarshipId = null;

        // Agar URL mein '?scholarship=' likha hai, toh uske aage ka hissa nikal lo
        if (fullUrl.includes("?scholarship=")) {
          scholarshipId = fullUrl.split("?scholarship=")[1].split("&")[0];
        }

        console.log("1. URL se ID nikali:", scholarshipId); // Debugging ke liye

        if (scholarshipId) {
          const docRef = doc(db, "special_links", scholarshipId);
          const snap = await getDoc(docRef);
          
          console.log("2. Kya DB mein ID mili?", snap.exists()); // Debugging ke liye

          if (snap.exists()) {
            console.log("3. Data kya hai:", snap.data()); // Debugging ke liye
            
            if (snap.data().active) {
              const specialLimit = snap.data().amount;
              setMinAmount(specialLimit);
              setAmount(specialLimit); 
              setIsScholarship(true);
            } else {
              console.log("Link inactive (band) ho chuka hai.");
            }
          } else {
            console.log("Yeh ID database mein hai hi nahi! (Shayad purana link hai)");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount < minAmount) return alert(`Minimum donation is ₹${minAmount}`);
    if (phone.length < 10) return alert("Please enter a valid 10-digit phone number.");
    onInitiate({ name, phone, message, amount: Number(amount) });
  };

  if (isLoading) {
    return <div className="text-center py-10 text-slate-400 font-bold animate-pulse">Verifying secure link...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* 🌟 PREMIUM SCHOLARSHIP BANNER 🌟 */}
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

      {/* Input Fields with Modern Icons */}
      <div className="space-y-3">
        <div className="relative">
          <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            required
            placeholder="Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-medium text-slate-700"
          />
        </div>

        <div className="relative">
          <i className="fa-brands fa-whatsapp absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
          <input
            type="tel"
            required
            placeholder="WhatsApp Number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-medium text-slate-700"
          />
        </div>

        <div className="relative">
          <i className="fa-solid fa-message absolute left-4 top-4 text-slate-400"></i>
          <textarea
            placeholder="Leave a message of support... (Optional)"
            rows="2"
            maxLength="100"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all font-medium text-slate-700 resize-none"
          ></textarea>
        </div>
      </div>

      {/* Amount Selection Area */}
      <div className="pt-2">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
          Select Amount (₹) *
        </label>
        
        {/* Preset Buttons */}
        <div className="flex gap-2 mb-3">
          {[isScholarship ? minAmount : 500, 1000, 2000].map((preset, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setAmount(preset)}
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

        {/* Custom Amount Input */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-lg">₹</span>
          <input
            type="number"
            min={minAmount} 
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full pl-10 pr-4 py-4 rounded-xl outline-none transition-all font-black text-xl text-slate-800 border-2 ${isScholarship ? 'bg-emerald-50/50 border-emerald-200 focus:border-emerald-500' : 'bg-teal-50/30 border-teal-100 focus:border-teal-500'}`}
          />
        </div>
        <p className="text-[10px] text-slate-400 font-medium mt-2 pl-1 flex items-center gap-1">
          <i className="fa-solid fa-circle-info text-teal-500"></i> Minimum contribution is ₹{minAmount}
        </p>
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
