import React from 'react';

// Components
import StorySection from './StorySection';
import FAQ from './FAQ';

// 🌟 NAYA: Props me 'isAuthenticated' aur 'userName' bhi receive kar rahe hain
export default function HomePage({ onNavigateToDonate, isAdmin, isAuthenticated, userName }) {
  return (
    <div className="space-y-12 md:space-y-16 max-w-5xl mx-auto animate-fade-in-up">
      
      {/* 👑 1. VIP ADMIN FEATURE (Sirf Admin ko dikhega) 👑 */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100/50 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden animate-fade-in">
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

          <div className="flex gap-2 w-full sm:w-auto z-10">
            <button className="flex-1 sm:flex-none bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2">
              <i className="fa-solid fa-chart-line"></i> View Reports
            </button>
          </div>
        </div>
      )}

      {/* 🌟 2. EXCLUSIVE MEMBER ZONE (Sirf Logged-in Clients/Users ko dikhega) 🌟 */}
      {isAuthenticated && !isAdmin && (
        <div className="bg-white border border-teal-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-teal-500/5 relative overflow-hidden animate-fade-in">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl -z-10 opacity-60"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-bold">
              <i className="fa-solid fa-user-astronaut"></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">Welcome back, {userName || 'Explorer'}!</h3>
              <p className="text-sm font-medium text-slate-500">Your exclusive member dashboard.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal-200 transition-all group text-left">
              <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-book-journal-whills text-lg"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Premium Articles</h4>
                <p className="text-xs text-slate-500 mt-0.5">Read deep-dive philosophy papers.</p>
              </div>
            </button>

            <button className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal-200 transition-all group text-left">
              <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-comments text-lg"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Community Forum</h4>
                <p className="text-xs text-slate-500 mt-0.5">Discuss with other verse explorers.</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 3. Hero & Philosophy (Ye sabko dikhega) */}
      <StorySection />

      {/* 4. Beautiful Support CTA Banner (Ye sabko dikhega) */}
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

      {/* 5. Frequently Asked Questions (Ye sabko dikhega) */}
      <FAQ />

    </div>
  );
              }
