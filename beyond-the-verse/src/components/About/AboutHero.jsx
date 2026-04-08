import React from 'react';

export default function AboutHero() {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 border border-slate-800">
      <div className="flex-1 space-y-6 text-center lg:text-left">
        <span className="inline-block bg-slate-800 text-teal-400 px-4 py-1.5 rounded-md text-xs sm:text-sm">
          About The Initiative
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white">
          Where Logic Meets <span className="text-teal-400">Consciousness</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0">
          Beyond The Verse is not just a platform; it's a movement. We exist to explore the ultimate reality by breaking down the walls between rigorous scientific logic and deep philosophical inquiry.
        </p>
      </div>
      <div className="hidden lg:flex shrink-0 w-64 h-64 bg-slate-800 rounded-full items-center justify-center border-8 border-slate-900 shadow-[0_0_0_2px_rgba(20,184,166,0.2)]">
        <i className="fa-solid fa-atom text-7xl text-teal-500"></i>
      </div>
    </div>
  );
}