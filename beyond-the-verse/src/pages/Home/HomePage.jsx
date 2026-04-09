import { useAuth } from '../../context/AuthContext';
import StorySection from '../../components/Home/StorySection';

export default function HomePage({ onNavigateToDonate }) {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="w-full bg-white min-h-screen selection:bg-slate-900 selection:text-white font-inter">
      
      {/* 🌟 TERMINAL HEADER */}
      <section className="w-full pt-20 pb-10 px-4 text-center border-b border-slate-50">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-400 border border-slate-200 rounded-md text-[9px] font-bold uppercase tracking-[0.3em] mb-6">
          <i className="fa-solid fa-code-branch"></i> BTVerse Protocol v2.5
        </div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl text-slate-900 font-light tracking-tighter mb-4">
          Beyond the <span className="font-bold">Verse</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-[0.4em]">
          Cognitive Infrastructure & Logic
        </p>
      </section>

      {/* 🌟 THE COMPLETE STORY SECTION (Everything is here) */}
      <StorySection isAuthenticated={isAuthenticated} onDonate={onNavigateToDonate} />

      {/* 🌟 FINAL SYSTEM FOOTER */}
      <footer className="py-16 text-center bg-slate-50 border-t border-slate-200">
        <p className="text-slate-300 text-[9px] font-bold uppercase tracking-[0.5em]">
          End of Line — 2026
        </p>
      </footer>
    </div>
  );
}