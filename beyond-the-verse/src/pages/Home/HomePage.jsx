import React from 'react';
import { useAuth } from '../../context/AuthContext';

// Components
import StorySection from '../../components/Home/StorySection';
import FAQ from '../../components/Home/FAQ';

export default function HomePage({ onNavigateToDonate }) {
  const { isAuthenticated, isAdmin, userName } = useAuth();

  return (
    // 🌟 MAIN CONTAINER: Scaled max-width and fluid vertical spacing
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32 animate-fade-in-up">
      
      {/* 👑 1. VIP ADMIN DASHBOARD */}
      {isAdmin && (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl sm:rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl shadow-indigo-500/10 relative overflow-hidden animate-fade-in border border-indigo-500/20">
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-indigo-500/10 rounded-full blur-[80px] lg:blur-[120px] -z-0"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 lg:gap-10 relative z-10">
            <div className="flex items-center gap-4 sm:gap-5 lg:gap-8">
              {/* Admin Icon */}
              <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl sm:rounded-2xl lg:rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0 transition-transform hover:scale-105">
                <i className="fa-solid fa-wand-magic-sparkles text-2xl sm:text-3xl lg:text-4xl"></i>
              </div>
              <div>
                <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 lg:mb-2">
                  <h3 className="text-white font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight leading-none">System Command</h3>
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-[0.2em] shadow-sm">Live</span>
                </div>
                <p className="text-indigo-200/80 text-xs sm:text-sm md:text-base lg:text-lg font-medium max-w-sm lg:max-w-md leading-relaxed">
                  Master control activated. Monitor network activity and platform analytics seamlessly.
                </p>
              </div>
            </div>

            <button className="w-full md:w-auto bg-white hover:bg-indigo-50 text-indigo-900 px-6 py-3.5 sm:px-8 sm:py-4 lg:px-10 lg:py-4.5 rounded-xl lg:rounded-2xl text-sm sm:text-base lg:text-lg font-black transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2.5 active:scale-95 shrink-0">
              <i className="fa-solid fa-chart-pie text-indigo-500"></i> Open Analytics
            </button>
          </div>
        </div>
      )}

      {/* 🌟 2. EXCLUSIVE MEMBER ZONE */}
      {isAuthenticated && !isAdmin && (
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl shadow-teal-900/5 relative overflow-hidden animate-fade-in border border-slate-100">
          <div className="absolute -top-20 -right-20 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-full blur-3xl lg:blur-[100px] -z-10"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center gap-4 sm:gap-5 lg:gap-6">
              {/* Member Icon */}
              <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 bg-teal-50 text-teal-600 rounded-xl sm:rounded-2xl lg:rounded-[1.5rem] flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl font-black border border-teal-100/50 shadow-inner">
                <i className="fa-solid fa-user-astronaut"></i>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                  Welcome, <span className="text-teal-600">{userName || 'Explorer'}</span>!
                </h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-slate-500 mt-1">Your personal verse dashboard.</p>
              </div>
            </div>
          </div>

          {/* Cards Grid: 1 col on mobile, 2 on medium screens and up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <button className="flex flex-row items-center gap-4 sm:gap-5 lg:gap-6 p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal-200 transition-all group text-left shadow-sm hover:shadow-md">
              <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-white rounded-xl lg:rounded-2xl shadow-sm flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform shrink-0 border border-slate-50">
                <i className="fa-solid fa-book-journal-whills text-xl sm:text-2xl lg:text-3xl"></i>
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-base sm:text-lg lg:text-xl">Premium Archives</h4>
                <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-1 sm:mt-1.5 leading-relaxed line-clamp-2">Access deep-dive philosophy papers and exclusive research.</p>
              </div>
            </button>

            <button className="flex flex-row items-center gap-4 sm:gap-5 lg:gap-6 p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-teal-200 transition-all group text-left shadow-sm hover:shadow-md">
              <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-white rounded-xl lg:rounded-2xl shadow-sm flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform shrink-0 border border-slate-50">
                <i className="fa-solid fa-comments text-xl sm:text-2xl lg:text-3xl"></i>
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-base sm:text-lg lg:text-xl">Verse Community</h4>
                <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-1 sm:mt-1.5 leading-relaxed line-clamp-2">Engage in high-level discussions with other curious minds.</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 3. Hero & Philosophy */}
      <StorySection isAuthenticated={isAuthenticated} />

      {/* 🌟 4. BEAUTIFUL SUPPORT CTA BANNER */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl sm:rounded-[3rem] lg:rounded-[4rem] p-8 sm:p-12 md:p-16 lg:p-24 text-center text-white shadow-2xl relative overflow-hidden border border-teal-800/30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(20,184,166,0.15)_0%,transparent_60%)] pointer-events-none"></div>
        <i className="fa-solid fa-hand-holding-heart absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 md:-bottom-16 md:-right-16 lg:-bottom-24 lg:-right-24 text-[120px] sm:text-[180px] md:text-[240px] lg:text-[320px] text-teal-500/10 -rotate-12 pointer-events-none"></i>
        
        <div className="relative z-10 max-w-[90%] md:max-w-3xl lg:max-w-4xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
          <div className="inline-block">
            <span className="bg-teal-500/20 text-teal-300 border border-teal-400/20 text-[10px] sm:text-xs md:text-sm lg:text-base font-black px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 rounded-full uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm">
              Fuel The Mission
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-100 to-teal-300 tracking-tight leading-tight px-2">
            Support Our Vision
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed sm:leading-loose font-medium mx-auto">
            Beyond The Verse is a non-profit, independent initiative. If you believe in breaking the boundaries between science and philosophy, your contribution helps us sustain and expand this platform.
          </p>
          
          <div className="pt-4 sm:pt-6 md:pt-8">
            <button 
              onClick={onNavigateToDonate}
              className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-900 font-black py-4 sm:py-5 lg:py-6 px-8 sm:px-10 lg:px-14 rounded-xl sm:rounded-2xl lg:rounded-3xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/25 flex items-center justify-center gap-3 lg:gap-4 mx-auto text-sm sm:text-base lg:text-xl tracking-wide"
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