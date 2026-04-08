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

  // Component load hone par Progress Bar animate hoga
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(percent);
    }, 300);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <div className="mb-8 sm:mb-10 lg:mb-12 relative animate-fade-in-up">
      
      {/* 🌟 TOP LABELS: Goal & Supporters Badge */}
      <div className="flex justify-between items-end sm:items-center mb-4 sm:mb-5">
        <p className="text-[10px] sm:text-xs text-slate-400 flex items-center gap-1.5 sm:gap-2">
          <i className="fa-solid fa-bullseye text-teal-500 text-xs sm:text-sm"></i> 
          <span>Setup Goal</span>
        </p>
        
        {/* Premium Supporters Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-emerald-50 border border-emerald-100/80 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-sm">
          <i className="fa-solid fa-users text-emerald-500 text-[10px] sm:text-xs"></i>
          <span className="text-[10px] sm:text-xs lg:text-sm text-emerald-700">
            {donorCount} <span className="opacity-80">Supporters</span>
          </span>
        </div>
      </div>

      {/* 🌟 MAIN AMOUNTS (Responsive Text Sizes) */}
      <div className="flex justify-between items-end mb-4 sm:mb-5">
        <div className="flex flex-col">
          <span className="text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-400 drop-shadow-sm">
            ₹{safeRaised.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="text-right flex flex-col justify-end pb-1 sm:pb-2">
          <span className="text-[9px] sm:text-[10px] lg:text-xs text-slate-400 mb-0.5 sm:mb-1">
            Target
          </span>
          <span className="text-sm sm:text-base lg:text-lg text-slate-700">
            ₹{targetAmount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* 🌟 GLOWING & ANIMATED PROGRESS BAR 🌟 */}
      <div className="relative w-full bg-slate-100/80 border border-slate-200/60 rounded-full h-3 sm:h-4 lg:h-5 mb-3 sm:mb-4 overflow-hidden shadow-inner">
        
        {/* Background shine effect */}
        <div className="absolute inset-0 bg-white/30"></div>
        
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(20,184,166,0.6)]"
          style={{ width: `${animatedWidth}%` }}
        >
          {/* Moving Stripe Effect inside the bar */}
          <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] sm:bg-[length:1.25rem_1.25rem] animate-[stripe_1s_linear_infinite]"></div>
        </div>
      </div>

      {/* 🌟 PERCENTAGE TEXT */}
      <div className="flex justify-end">
        <p className="text-[10px] sm:text-xs lg:text-sm text-teal-700 bg-teal-50/80 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-md sm:rounded-lg shadow-sm border border-teal-100/50">
          {percent.toFixed(0)}% Funded
        </p>
      </div>

      {/* Tailwind Custom Animation for the stripe */}
      <style>{`
        @keyframes stripe {
          0% { background-position: 1.25rem 0; }
          100% { background-position: 0 0; }
        }
      `}</style>

    </div>
  );
}