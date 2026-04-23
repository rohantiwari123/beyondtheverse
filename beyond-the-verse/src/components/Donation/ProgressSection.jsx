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
    <div className="relative animate-fade-in-up">
      
      {/* 🌟 TOP LABELS: Goal & Supporters Badge */}
      <div className="flex justify-between items-end sm:items-center mb-4 sm:mb-5">
        <p className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1.5 sm:gap-2">
          <i className="fa-solid fa-bullseye text-zinc-400 text-xs sm:text-sm"></i> 
          <span>Setup Goal</span>
        </p>
        
        {/* Premium Supporters Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-100 border border-zinc-200 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-600">
          <i className="fa-solid fa-users text-zinc-400"></i>
          <span>
            {donorCount} <span className="opacity-80">Supporters</span>
          </span>
        </div>
      </div>

      {/* 🌟 MAIN AMOUNTS (Responsive Text Sizes) */}
      <div className="flex justify-between items-end mb-4 sm:mb-5">
        <div className="flex flex-col">
          <span className="text-4xl sm:text-5xl lg:text-6xl text-zinc-900 font-bold tracking-tight">
            ₹{safeRaised.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="text-right flex flex-col justify-end pb-1 sm:pb-2">
          <span className="text-[9px] sm:text-[10px] lg:text-xs text-zinc-500 font-bold uppercase tracking-widest mb-0.5 sm:mb-1">
            Target
          </span>
          <span className="text-sm sm:text-base lg:text-lg text-zinc-700 font-bold">
            ₹{targetAmount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* 🌟 GLOWING & ANIMATED PROGRESS BAR 🌟 */}
      <div className="relative w-full bg-zinc-100 border border-zinc-200 rounded-full h-3 sm:h-4 lg:h-5 mb-3 sm:mb-4 overflow-hidden">
        <div
          className="relative h-full rounded-full bg-zinc-900 transition-all duration-1000 ease-out"
          style={{ width: `${animatedWidth}%` }}
        >
        </div>
      </div>

      {/* 🌟 PERCENTAGE TEXT */}
      <div className="flex justify-end">
        <p className="text-[10px] sm:text-xs lg:text-sm text-zinc-700 font-bold bg-zinc-100 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-md sm:rounded-lg border border-zinc-200">
          {percent.toFixed(0)}% Funded
        </p>
      </div>

    </div>
  );
}