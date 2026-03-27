import React from 'react';

// Components (Kyunki ab ye same folder me hain, isliye './' use hoga)
import StorySection from './StorySection';
import FAQ from './FAQ';

// 🌟 NAYA: Props me 'onNavigateToDonate' receive kar rahe hain 🌟
export default function HomePage({ onNavigateToDonate }) {
  return (
    <div className="space-y-16 max-w-5xl mx-auto animate-fade-in-up">
      
      {/* 1. Hero & Philosophy (Carousel iske andar hi hai) */}
      <StorySection />

      {/* 2. Beautiful Support CTA Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden border border-slate-700">
        <i className="fa-solid fa-hand-holding-heart absolute -bottom-10 -right-10 text-[150px] text-white/5 -rotate-12"></i>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <span className="bg-teal-500/20 text-teal-300 border border-teal-400/20 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Join The Movement
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200">
            Support Our Vision
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            Beyond The Verse is a non-profit, independent initiative. If you believe in breaking the boundaries between science and philosophy, your small contribution can help us sustain and grow this platform.
          </p>
          
          <div className="pt-4">
            {/* 🌟 NAYA: Button click par App.jsx ko signal bhejenge page change karne ka 🌟 */}
            <button 
              onClick={onNavigateToDonate}
              className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-extrabold py-4 px-8 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/30 flex items-center justify-center gap-3 mx-auto w-full sm:w-auto outline-none"
            >
              Donate & Support the Setup <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Frequently Asked Questions */}
      <FAQ />

    </div>
  );
      }
