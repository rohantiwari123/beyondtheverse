import React from 'react';

// Components
import StorySection from './StorySection';
import FAQ from './FAQ';

export default function HomePage({ onNavigateToDonate, isAdmin, isAuthenticated, userName }) {
  return (
    {/* 🌟 NAYA: Container me smart padding (px-4 sm:px-6 lg:px-8) aur responsive gap add kiya hai */}
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 space-y-16 sm:space-y-20 lg:space-y-24 animate-fade-in-up">
      
      {/* 👑 1. VIP ADMIN DASHBOARD (Premium Dark Layout) 👑 */}
      {isAdmin && (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-2xl shadow-indigo-500/10 relative overflow-hidden animate-fade-in border border-indigo-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -z-0"></div>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
                <i className="fa-solid fa-wand-magic-sparkles text-2xl sm:text-3xl"></i>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-black text-lg sm:text-xl lg:text-2xl tracking-tight">System Command</h3>
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">Live</span>
                </div>
                <p className="text-indigo-200/80 text-sm sm:text-base font-medium max-w-md">
                  Master control activated. Monitor network activity and platform analytics.
                </p>
              </div>
            </div>

            <button className="w-full lg:w-auto bg-white hover:bg-indigo-50 text-indigo-900 px-6 py-3.5 rounded-xl text-sm sm:text-base font-black transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 active:scale-95">
              <i className="fa-solid fa-chart-pie"></i> Open Analytics
            </button>
          </div>
        </div>
      )}

      {/* 🌟 2. EXCLUSIVE MEMBER ZONE (Modern Glass & Clean Look) 🌟 */}
      {isAuthenticated && !isAdmin && (
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-xl shadow-teal-900/5 relative overflow-hidden animate-fade-in border border-slate-100">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black border border-teal-100/50">
                <i className="fa-solid fa-user-astronaut"></i>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">
                  Welcome, <span className="text-teal-600">{userName || 'Explorer'}</span>!
                </h3>
                <p className="text-sm sm:text-base font-medium text-slate-500 mt-0.5">Your personal verse dashboard.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <button className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal-200 transition-all group text-left shadow-sm hover:shadow-md">
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform shrink-0 border border-slate-50">
                <i className="fa-solid fa-book-journal-whills text-xl sm:text-2xl"></i>
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">Premium Archives</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2">Access deep-dive philosophy papers and exclusive research.</p>
              </div>
            </button>

            <button className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal-200 transition-all group text-left shadow-sm hover:shadow-md">
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform shrink-0 border border-slate-50">
                <i className="fa-solid fa-comments text-xl sm:text-2xl"></i>
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">Verse Community</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2">Engage in high-level discussions with other curious minds.</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 3. Hero & Philosophy (Ye component apne aap responsive hai) */}
      <StorySection isAuthenticated={isAuthenticated} />

      {/* 4. Beautiful Support CTA Banner (Fully Responsive & Immersive) */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-center text-white shadow-2xl relative overflow-hidden border border-teal-800/30">
        {/* Background glow & icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(20,184,166,0.15)_0%,transparent_60%)] pointer-events-none"></div>
        <i className="fa-solid fa-hand-holding-heart absolute -bottom-10 -right-10 text-[120px] sm:text-[180px] lg:text-[220px] text-teal-500/10 -rotate-12 pointer-events-none"></i>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <div className="inline-block">
            <span className="bg-teal-500/20 text-teal-300 border border-teal-400/20 text-xs sm:text-sm font-black px-4 sm:px-5 py-1.5 sm:py-2 rounded-full uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm">
              Fuel The Mission
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-100 to-teal-300 tracking-tight leading-tight">
            Support Our Vision
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            Beyond The Verse is a non-profit, independent initiative. If you believe in breaking the boundaries between science and philosophy, your contribution helps us sustain and expand this platform.
          </p>
          
          <div className="pt-4 sm:pt-6">
            <button 
              onClick={onNavigateToDonate}
              className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-900 font-black py-4 sm:py-5 px-8 sm:px-10 rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/25 flex items-center justify-center gap-3 mx-auto text-base sm:text-lg"
            >
              Donate & Support <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Frequently Asked Questions */}
      <FAQ />

    </div>
  );
        }
