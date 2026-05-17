import LibrarySection from '../../components/Library/LibrarySection';

export default function LibraryPage() {
  return (
    // 🌟 Minimal selection color & Edge-to-edge layout
    <div className="relative flex flex-col min-h-screen w-full bg-white font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden transition-colors duration-300">
      
      
      {/* 🌟 Main Content Area */}
      <main className="flex-1 w-full flex flex-col pt-4 sm:pt-10">
        <LibrarySection />
      </main>
      
    </div>
  );
}