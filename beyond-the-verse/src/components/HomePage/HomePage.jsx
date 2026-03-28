import React from 'react';

// Components
import StorySection from './StorySection';
import FAQ from './FAQ';

// 🌟 NAYA: Props me 'isAdmin' receive kar rahe hain 🌟
export default function HomePage({ onNavigateToDonate, isAdmin }) {
  return (
    <div className="space-y-12 md:space-y-16 max-w-5xl mx-auto animate-fade-in-up">
      
      {/* 👑 VIP ADMIN FEATURE (Sirf Admin ko dikhega) 👑 */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100/50 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden animate-fade-in">
          {/* Background decoration */}
          <i className="fa-solid fa-crown absolute -right-4 -top-4 text-6xl text-indigo-500/5 rotate-12 pointer-events-none"></i>
          
          <div className="flex items-center gap-4 z-10 w-full sm:w-auto">
            <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
              <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-indigo-900 font-extrabold text-sm md:text-base">Admin Control Center</h3>
                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Live</span>
              </div>
              <p className="text-indigo-700/80 text-xs md:text-sm font-medium mt-0.5">
                Welcome back! You have elevated access to monitor platform activity.
              </p>
            </div>
          </div>

          {/* Quick Stats/Action Buttons for Admin */}
          <div className="flex gap-2 w-full sm:w-auto z-10">
            <button className="flex-1 sm:flex-none bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2">
              <i className="fa-solid fa-chart-line"></i> View Reports
            </button>
          </div>
        </div>
      )}

      {/* 1. Hero & Philosophy */}
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
