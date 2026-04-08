import React from 'react';

export default function AboutMission() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
      
      {/* The Problem Section */}
      <div className="space-y-5">
        <div className="w-12 h-1 bg-teal-500 rounded-full mb-6"></div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-800">
          The Great Divide in Human Knowledge
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          For centuries, humanity has split the search for truth into two isolated camps. Scientists look through telescopes and microscopes to understand the external world, while philosophers look inward to understand the self. 
        </p>
        <p className="text-slate-600 text-sm sm:text-base">
          This artificial division has left us with a half-understood reality—creating a world of advanced technology without deep wisdom, and profound philosophy lacking practical grounding.
        </p>
      </div>

      {/* The Solution Box */}
      <div className="bg-slate-50 p-8 sm:p-10 rounded-2xl border border-slate-200">
        <h3 className="text-xl sm:text-2xl text-slate-800 mb-4 flex items-center gap-3">
          <i className="fa-solid fa-bridge-water text-teal-600"></i> Our Solution
        </h3>
        <p className="text-slate-600 text-sm sm:text-base">
          We are building the bridge. We firmly believe that a truly scientific mind must also investigate its own biases, ego, and thoughts. By combining hard scientific facts with deep self-reflection, we aim to create an ecosystem of complete, holistic understanding.
        </p>
      </div>

    </div>
  );
}