import React from 'react';
import { useAuth } from '../../context/AuthContext';
import StorySection from '../../components/Home/StorySection';
import HeroBackground from './HeroBackground'; 

export default function HomePage({ onNavigateToDonate }) {
  const { isAuthenticated } = useAuth();

  return (
    /* 🌟 PARENT: 'snap-proximity' ही वो "ढीला" carousel फील देगा */
    /* 'scroll-smooth' बटन क्लिक के लिए है */
    <div className="w-full h-screen overflow-y-auto snap-y snap-proximity scroll-smooth bg-white dark:bg-slate-950 selection:bg-teal-900 selection:text-white font-inter no-scrollbar transition-colors duration-300">

      <style>{`
        .animate-fade-up {
          opacity: 0;
          animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.3s; }
        .delay-300 { animation-delay: 0.5s; }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Scrollbar hide करने के लिए */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 🌟 SECTION 1: HERO */}
      {/* 'h-screen' और 'snap-start' से यह carousel की तरह काम करेगा */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center px-4 sm:px-8 z-10 snap-start shrink-0">

        <HeroBackground />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
          {/* Welcome Text */}
          <div className="animate-fade-up px-6 py-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-full text-[10px] sm:text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-[0.3em] mb-8 shadow-sm relative z-20 transition-colors">
            Welcome to BTVerse
          </div>

          {/* Logo Structure */}
          <h1 className="animate-fade-up delay-100 flex flex-col items-center justify-center gap-1 sm:gap-2 select-none relative z-20">
            <span className="text-6xl sm:text-8xl lg:text-[8rem] text-slate-900 dark:text-white font-cabinet font-black tracking-tighter leading-[0.9] transition-colors">
              Beyond
            </span>
            <span className="text-4xl sm:text-6xl lg:text-[5rem] lowercase text-slate-400 dark:text-slate-500 font-serif italic font-bold tracking-tight leading-[0.9] transition-colors">
              The
            </span>
            <span className="text-6xl sm:text-8xl lg:text-[8rem] text-teal-600 dark:text-teal-400 font-cabinet font-black tracking-tighter leading-[0.9] transition-colors">
              Verse
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up delay-200 mt-10 text-slate-500 dark:text-slate-400 text-[10px] sm:text-[12px] uppercase tracking-[0.4em] font-semibold relative z-20 transition-colors">
            Science <span className="mx-2 sm:mx-3 text-slate-300 dark:text-slate-700">•</span> Philosophy <span className="mx-2 sm:mx-3 text-slate-300 dark:text-slate-700">•</span> Life
          </p>

          {/* Button */}
          <button 
            onClick={() => {
              const nextSection = document.getElementById('content-section');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="animate-fade-up delay-300 mt-12 px-8 py-3.5 bg-slate-950 dark:bg-teal-600 text-white rounded-full text-[11px] sm:text-xs font-semibold hover:bg-teal-600 dark:hover:bg-teal-700 active:scale-95 transition-all duration-300 flex items-center gap-3 relative z-30 shadow-lg shadow-teal-500/10"
          >
            Explore Protocol <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>
      </section>

      {/* 🌟 SECTION 2: STORY SECTION */}
      {/* यहाँ भी 'snap-start' है ताकि स्क्रॉल करते ही यह ऊपर चिपक जाए */}
      <div id="content-section" className="relative z-10 bg-white dark:bg-slate-950 snap-start min-h-screen transition-colors duration-300">
        <StorySection isAuthenticated={isAuthenticated} onDonate={onNavigateToDonate} />
      </div>
      
    </div>
  );
}