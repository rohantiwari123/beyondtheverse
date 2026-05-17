import React from 'react';

// 🌟 REUSABLE STYLES DICTIONARY (Dark Mode Mapping)
const styles = {
  // Base & Gradients
  wrapper: "absolute inset-0 overflow-hidden pointer-events-none z-0 bg-white dark:bg-slate-950 transition-colors duration-500",
  gradientBase: "absolute inset-0 bg-gradient-to-tr transition-colors duration-500 from-slate-50 via-white to-teal-50/50 dark:from-slate-950 dark:via-slate-950 dark:to-teal-900/10",
  
  // Neural Grid (currentColor trick used here via text color)
  neuralGrid: "absolute inset-0 opacity-[0.15] dark:opacity-[0.05] animate-breathe transition-opacity duration-500 text-teal-600 dark:text-teal-400",
  
  // Glowing Orbs
  orb1: "absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] rounded-full blur-[100px] animate-float-slow transition-colors duration-500 bg-teal-200/20 dark:bg-teal-900/20",
  orb2: "absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] rounded-full blur-[120px] animate-float-delayed transition-colors duration-500 bg-emerald-100/30 dark:bg-emerald-900/10",
  
  // Floating Particles
  particle1: "absolute bottom-0 left-[15%] w-1 h-1 rounded-full animate-drift transition-colors bg-teal-400 dark:bg-teal-600",
  particle2: "absolute bottom-0 left-[45%] w-1.5 h-1.5 rounded-full animate-drift transition-colors bg-emerald-400 dark:bg-emerald-600",
  particle3: "absolute bottom-0 left-[75%] w-1 h-1 rounded-full animate-drift transition-colors bg-teal-300 dark:bg-teal-700",

  // SVG Logic Hub (currentColor trick)
  svgHub: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] opacity-[0.08] dark:opacity-[0.04] animate-rotate-slow transition-opacity duration-500 text-teal-600 dark:text-teal-400"
};

export default function HeroBackground() {
  return (
    <div className={styles.wrapper}>
      
      <style>{`
        /* 1. Breathing Animation for the whole background */
        .animate-breathe {
          animation: breathe 15s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }

        /* 2. Slow Rotation for Science Orbits */
        .animate-rotate-slow {
          animation: rotate 60s linear infinite;
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* 3. Floating Particles (Thoughts/Life) */
        .animate-drift {
          animation: drift 20s linear infinite;
        }
        @keyframes drift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 0.3; }
          80% { opacity: 0.3; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
      `}</style>

      {/* 🌟 Background Gradient Base (Philosophy: The Void/Infinite) */}
      <div className={styles.gradientBase}></div>

      {/* 🌟 Science Layer: Geometric Neural Grid (Colors via currentColor) */}
      <div className={styles.neuralGrid} 
           style={{ 
             backgroundImage: `radial-gradient(currentColor 0.5px, transparent 0.5px), linear-gradient(to right, currentColor 0.5px, transparent 0.5px), linear-gradient(to bottom, currentColor 0.5px, transparent 0.5px)`,
             backgroundSize: '80px 80px, 40px 40px, 40px 40px',
             maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
             WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)'
           }}>
      </div>

      {/* 🌟 Philosophy Layer: Soft Glowing Orbs (Consciousness) */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      {/* 🌟 Science & Life: Floating Logic Points (Rising up) */}
      <div className={styles.particle1} style={{ animationDelay: '0s' }}></div>
      <div className={styles.particle2} style={{ animationDelay: '4s', animationDuration: '25s' }}></div>
      <div className={styles.particle3} style={{ animationDelay: '8s', animationDuration: '18s' }}></div>

      {/* 🌟 The Central Logic Hub (SVG Orbits - Colors via currentColor) */}
      <div className={styles.svgHub}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.1" />
          <path d="M50 2 L50 98 M2 50 L98 50 M15 15 L85 85 M85 15 L15 85" stroke="currentColor" strokeWidth="0.05" />
          <circle cx="50" cy="50" r="1.5" fill="currentColor" />
        </svg>
      </div>

    </div>
  );
}