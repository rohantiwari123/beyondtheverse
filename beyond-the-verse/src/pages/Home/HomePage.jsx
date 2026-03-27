import React, { useState } from 'react';

// Components
import Header from '../../components/Header';
import StorySection from '../../components/StorySection';
import FAQ from '../../components/FAQ';
import AdminModal from '../../components/AdminModal';

export default function HomePage() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-[Poppins] text-slate-800 antialiased overflow-hidden">
      
      {/* 🌟 PREMIUN BACKGROUND GLOW EFFECTS 🌟 */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <Header onAdminClick={() => setIsAdminModalOpen(true)} />

      {/* 🌟 MAIN HOMEPAGE CONTENT (Centered & Clean) 🌟 */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-16">
        
        {/* 1. Hero & Philosophy (Carousel iske andar hi hai) */}
        <StorySection />

        {/* 2. 🌟 NAYA: Beautiful Support CTA Banner (Form ki jagah) 🌟 */}
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
                onClick={() => alert("Bhai, is button par click karke hum user ko naye 'Donation Page' par bhejenge! (Next Step)")}
                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-extrabold py-4 px-8 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/30 flex items-center justify-center gap-3 mx-auto w-full sm:w-auto"
              >
                Donate & Support the Setup <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Frequently Asked Questions */}
        <FAQ />

      </main>

      {/* Modals */}
      {isAdminModalOpen && (
        <AdminModal onClose={() => setIsAdminModalOpen(false)} />
      )}
    </div>
  );
            }
