import React, { useState, useEffect } from "react";

export default function ProgressSection({
  totalRaised,
  targetAmount,
  donorCount,
}) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  const safeRaised = totalRaised || 0;
  let percent = (safeRaised / targetAmount) * 100;
  if (isNaN(percent)) percent = 0;
  if (percent > 100) percent = 100;

  // 🌟 NAYA: Component load hone par Progress Bar animate hoga 🌟
  useEffect(() => {
    // Thoda delay taaki page load hone ke baad animation feel ho
    const timer = setTimeout(() => {
      setAnimatedWidth(percent);
    }, 300);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <div className="mb-8 relative animate-fade-in-up">
      
      {/* Top Labels */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <i className="fa-solid fa-bullseye text-teal-500"></i> Setup Goal
        </p>
        
        {/* Premium Supporters Badge */}
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg shadow-sm">
          <i className="fa-solid fa-users text-emerald-500 text-[10px]"></i>
          <span className="text-xs text-emerald-700 font-bold">
            {donorCount} <span className="font-medium">Supporters</span>
          </span>
        </div>
      </div>

      {/* Main Amounts */}
      <div className="flex justify-between items-end mb-3">
        <div className="flex flex-col">
          <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 tracking-tight">
            ₹{safeRaised.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="text-right flex flex-col justify-end pb-1">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Target</span>
          <span className="font-bold text-slate-700">
            ₹{targetAmount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* 🌟 NAYA: Glowing & Animated Progress Bar 🌟 */}
      <div className="relative w-full bg-slate-100 rounded-full h-3.5 mb-2 overflow-hidden shadow-inner">
        {/* Background shine effect */}
        <div className="absolute inset-0 bg-white/20"></div>
        
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(20,184,166,0.6)]"
          style={{ width: `${animatedWidth}%` }}
        >
          {/* Moving Stripe Effect inside the bar */}
          <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[stripe_1s_linear_infinite]"></div>
        </div>
      </div>

      {/* Percentage Text */}
      <div className="flex justify-end">
        <p className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded shadow-sm border border-teal-100/50">
          {percent.toFixed(0)}% Funded
        </p>
      </div>

      {/* Tailwind Custom Animation for the stripe (Add this to your index.css if not working, but usually Tailwind handles it via inline classes or you can just enjoy the smooth width animation) */}
      <style>{`
        @keyframes stripe {
          0% { background-position: 1rem 0; }
          100% { background-position: 0 0; }
        }
      `}</style>

    </div>
  );
          }
