import LibrarySection from '../../components/Library/LibrarySection';

export default function LibraryPage() {
  return (
    // 🌟 Minimal selection color & Edge-to-edge layout
    <div className="relative flex flex-col min-h-screen w-full bg-white font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden">
      
      
      {/* 🌟 Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        <LibrarySection />
      </main>

      {/* 🌟 Ultra-Minimal Flat Footer */}
      <footer className="w-full py-8 sm:py-10 border-t border-slate-100 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
          <div className="h-px w-6 sm:w-8 bg-slate-200"></div>
          
          <p className="text-slate-400 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em]">
            BTVerse Library <span className="text-slate-300 mx-2">&bull;</span> 2026
          </p>
        </div>
      </footer>
      
    </div>
  );
}