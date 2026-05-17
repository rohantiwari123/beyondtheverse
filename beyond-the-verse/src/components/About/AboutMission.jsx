import React from 'react';

export default function AboutMission() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start transition-colors">
      
      {/* The Problem Section */}
      <div className="space-y-5">
        <div className="w-12 h-1 bg-teal-500 rounded-full mb-6 shadow-sm shadow-teal-500/20"></div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-800 dark:text-white font-cabinet font-black tracking-tight">
          The Great Divide in Human Knowledge
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          For centuries, humanity has split the search for truth into two isolated camps. Scientists look through telescopes and microscopes to understand the external world, while philosophers look inward to understand the self. 
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          This artificial division has left us with a half-understood reality—creating a world of advanced technology without deep wisdom, and profound philosophy lacking practical grounding.
        </p>
      </div>

      {/* The Solution Box */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors">
        <h3 className="text-xl sm:text-2xl text-slate-800 dark:text-white mb-4 flex items-center gap-3 font-bold tracking-tight">
          <i className="fa-solid fa-bridge-water text-teal-600"></i> Our Solution
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          We are building the bridge. We firmly believe that a truly scientific mind must also investigate its own biases, ego, and thoughts. By combining hard scientific facts with deep self-reflection, we aim to create an ecosystem of complete, holistic understanding.
        </p>
      </div>

    </div>
  );
}