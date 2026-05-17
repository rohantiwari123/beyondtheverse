import React from 'react';
import { useAuth } from '../../context/AuthContext';
import StorySection from '../../components/Home/StorySection';
import HeroBackground from './HeroBackground'; 

// 🌟 REUSABLE STYLES DICTIONARY (Dark Mode Integrated)
const styles = {
  // 🌟 Main Layout (Snap Scroll Logic)
  pageWrapper: "w-full h-screen overflow-y-auto snap-y snap-proximity scroll-smooth bg-white text-slate-900 selection:bg-teal-900 selection:text-white font-inter no-scrollbar transition-colors duration-300",
  
  // 🌟 Section 1: Hero
  heroSection: "relative w-full h-screen flex flex-col justify-center items-center px-4 sm:px-8 z-10 snap-start shrink-0",
  heroContent: "max-w-4xl mx-auto text-center flex flex-col items-center justify-center",
  
  // Welcome Badge
  welcomeBadge: "animate-fade-up px-6 py-2 backdrop-blur-md border rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-8 shadow-sm relative z-20 transition-colors bg-white/60 border-slate-200/80 text-teal-700",
  
  // Typography Logo
  logoContainer: "animate-fade-up delay-100 flex flex-col items-center justify-center gap-1 sm:gap-2 select-none relative z-20",
  logoFirst: "text-6xl sm:text-8xl lg:text-[8rem] font-cabinet font-black tracking-tighter leading-[0.9] transition-colors text-slate-900",
  logoMiddle: "text-4xl sm:text-6xl lg:text-[5rem] lowercase font-serif italic font-bold tracking-tight leading-[0.9] transition-colors text-slate-400",
  logoLast: "text-6xl sm:text-8xl lg:text-[8rem] font-cabinet font-black tracking-tighter leading-[0.9] transition-colors text-teal-600",
  
  // Subtitle
  subtitle: "animate-fade-up delay-200 mt-10 text-[10px] sm:text-[12px] uppercase tracking-[0.4em] font-semibold relative z-20 transition-colors text-slate-500",
  subtitleDot: "mx-2 sm:mx-3 text-slate-300",

  // Action Button
  exploreBtn: "animate-fade-up delay-300 mt-12 px-8 py-3.5 rounded-full text-[11px] sm:text-xs font-semibold active:scale-95 transition-all duration-300 flex items-center gap-3 relative z-30 shadow-lg shadow-teal-500/10 bg-slate-950 text-white hover:bg-teal-600",

  // 🌟 Section 2: Story
  storySection: "relative z-10 snap-start min-h-screen transition-colors duration-300 bg-white",
};

export default function HomePage({ onNavigateToDonate }) {
  const { isAuthenticated } = useAuth();

  return (
    /* 🌟 PARENT: 'snap-proximity' ही वो "ढीला" carousel फील देगा */
    <div className={styles.pageWrapper}>

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
      <section className={styles.heroSection}>

        <HeroBackground />

        <div className={styles.heroContent}>
          {/* Welcome Text */}
          <div className={styles.welcomeBadge}>
            Welcome to BTVerse
          </div>

          {/* Logo Structure */}
          <h1 className={styles.logoContainer}>
            <span className={styles.logoFirst}>Beyond</span>
            <span className={styles.logoMiddle}>The</span>
            <span className={styles.logoLast}>Verse</span>
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            Science <span className={styles.subtitleDot}>•</span> Philosophy <span className={styles.subtitleDot}>•</span> Life
          </p>

          {/* Button */}
          <button 
            onClick={() => {
              const nextSection = document.getElementById('content-section');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={styles.exploreBtn}
          >
            Explore Protocol <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>
      </section>

      {/* 🌟 SECTION 2: STORY SECTION */}
      <div id="content-section" className={styles.storySection}>
        <StorySection isAuthenticated={isAuthenticated} onDonate={onNavigateToDonate} />
      </div>
      
    </div>
  );
}