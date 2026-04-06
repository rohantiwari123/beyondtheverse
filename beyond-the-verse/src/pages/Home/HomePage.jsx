import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Components
import StorySection from '../../components/Home/StorySection';
import FAQ from '../../components/Home/FAQ';

export default function HomePage({ onNavigateToDonate }) {
  const { isAuthenticated, isAdmin, userName } = useAuth();
  const navigate = useNavigate();

  return (
    // 🌟 MAIN CONTAINER: Edge-to-edge on mobile, padded on desktop
    <div className="w-full max-w-7xl mx-auto sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-28 animate-fade-in-up font-sans">
      
      {/* 👑 1. VIP ADMIN DASHBOARD (Flat SaaS Style) */}
      {isAdmin && (
        <div className="bg-slate-900 sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border-y sm:border border-slate-800 transition-colors animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 lg:gap-10">
            <div className="flex items-center gap-4 sm:gap-5 lg:gap-6">
              {/* Admin Icon */}
              <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-slate-800 text-teal-400 rounded-xl flex items-center justify-center border border-slate-700 shrink-0">
                <i className="fa-solid fa-wand-magic-sparkles text-xl sm:text-2xl lg:text-3xl"></i>
              </div>
              <div>
                <div className="flex items-center gap-2.5 sm:gap-3 mb-1 lg:mb-1.5">
                  <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight leading-none">System Command</h3>
                  <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[9px] sm:text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-widest">Live</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm md:text-base font-medium max-w-sm lg:max-w-md leading-relaxed mt-1.5">
                  Master control activated. Monitor network activity and platform analytics seamlessly.
                </p>
              </div>
            </div>

            <button 
              onClick={() => navigate('/admin')}
              className="w-full md:w-auto bg-white hover:bg-slate-100 text-slate-900 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-bold transition-colors flex items-center justify-center gap-2.5 shrink-0"
            >
              <i className="fa-solid fa-chart-pie text-slate-500"></i> Open Workspace
            </button>
          </div>
        </div>
      )}

      {/* 🌟 2. EXCLUSIVE MEMBER ZONE (Flat Design) */}
      {isAuthenticated && !isAdmin && (
        <div className="bg-white sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border-y sm:border border-slate-200 animate-fade-in transition-colors">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center gap-4 sm:gap-5 lg:gap-6">
              {/* Member Icon */}
              <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl lg:text-3xl font-bold border border-teal-100 shrink-0">
                <i className="fa-solid fa-user-astronaut"></i>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight leading-tight">
                  Welcome, <span className="text-teal-600">{userName || 'Explorer'}</span>!
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-medium text-slate-500 mt-1">Your personal verse dashboard.</p>
              </div>
            </div>
          </div>

          {/* Cards Grid: Edge-to-edge friendly on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <button 
              onClick={() => navigate('/exam')}
              className="flex flex-row items-center gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-400 transition-colors group text-left"
            >
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-white rounded-xl flex items-center justify-center text-teal-600 shrink-0 border border-slate-200">
                <i className="fa-solid fa-file-signature text-lg sm:text-xl lg:text-2xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-[15px] sm:text-base lg:text-lg">Assessments</h4>
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2">Test your understanding of logic and track your progress.</p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/community')}
              className="flex flex-row items-center gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-400 transition-colors group text-left"
            >
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-white rounded-xl flex items-center justify-center text-indigo-600 shrink-0 border border-slate-200">
                <i className="fa-solid fa-users text-lg sm:text-xl lg:text-2xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-[15px] sm:text-base lg:text-lg">Verse Community</h4>
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2">Engage in high-level discussions with other curious minds.</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 3. Hero & Philosophy (Assuming these handle their own padding/edge-to-edge) */}
      <div className="px-4 sm:px-0">
        <StorySection isAuthenticated={isAuthenticated} />
      </div>

      {/* 🌟 4. LIGHT & FRESH SUPPORT CTA BANNER */}
      <div className="bg-teal-50 sm:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-24 text-center relative overflow-hidden border-y sm:border border-teal-100 transition-colors">
        {/* Subtle Watermark Icon */}
        <i className="fa-solid fa-hand-holding-heart absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 text-[120px] sm:text-[180px] md:text-[240px] text-teal-600/10 -rotate-12 pointer-events-none"></i>
        
        <div className="relative z-10 max-w-[90%] md:max-w-3xl lg:max-w-4xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
          <div className="inline-block">
            <span className="bg-white text-teal-600 border border-teal-200 text-[10px] sm:text-xs md:text-sm font-bold px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg uppercase tracking-widest">
              Fuel The Mission
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-tight px-2">
            Support Our <span className="text-teal-600">Vision</span>
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-loose font-medium mx-auto max-w-2xl">
            Beyond The Verse is a non-profit, independent initiative. If you believe in breaking the boundaries between science and philosophy, your contribution helps us sustain and expand this platform.
          </p>
          
          <div className="pt-4 sm:pt-6">
            <button 
              onClick={onNavigateToDonate}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 sm:py-4 lg:py-5 px-8 sm:px-10 lg:px-12 rounded-xl transition-colors flex items-center justify-center gap-3 lg:gap-4 mx-auto text-sm sm:text-base lg:text-lg tracking-wide"
            >
              Donate & Support <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Frequently Asked Questions */}
      <div className="px-4 sm:px-0">
        <FAQ />
      </div>

    </div>
  );
}