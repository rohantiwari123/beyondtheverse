import React from 'react';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#ffffff]">
      
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
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-white to-teal-50/50"></div>

      {/* 🌟 Science Layer: Geometric Neural Grid */}
      <div className="absolute inset-0 opacity-[0.15] animate-breathe" 
           style={{ 
             backgroundImage: `radial-gradient(#0d9488 0.5px, transparent 0.5px), linear-gradient(to right, #0d9488 0.5px, transparent 0.5px), linear-gradient(to bottom, #0d9488 0.5px, transparent 0.5px)`,
             backgroundSize: '80px 80px, 40px 40px, 40px 40px',
             maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)'
           }}>
      </div>

      {/* 🌟 Philosophy Layer: Soft Glowing Orbs (Consciousness) */}
      <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-teal-200/20 blur-[100px] animate-float-slow"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-emerald-100/30 blur-[120px] animate-float-delayed"></div>

      {/* 🌟 Science & Life: Floating Logic Points (Rising up) */}
      <div className="absolute bottom-0 left-[15%] w-1 h-1 bg-teal-400 rounded-full animate-drift" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-0 left-[45%] w-1.5 h-1.5 bg-emerald-400 rounded-full animate-drift" style={{ animationDelay: '4s', animationDuration: '25s' }}></div>
      <div className="absolute bottom-0 left-[75%] w-1 h-1 bg-teal-300 rounded-full animate-drift" style={{ animationDelay: '8s', animationDuration: '18s' }}></div>

      {/* 🌟 The Central Logic Hub (SVG Orbits - Atom/Geometry feel) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] opacity-[0.08] animate-rotate-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#0d9488" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#0d9488" strokeWidth="0.1" />
          <path d="M50 2 L50 98 M2 50 L98 50 M15 15 L85 85 M85 15 L15 85" stroke="#0d9488" strokeWidth="0.05" />
          <circle cx="50" cy="50" r="1.5" fill="#0d9488" />
        </svg>
      </div>

    </div>
  );
}