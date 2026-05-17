import React from 'react';

export default function AboutCTA({ onNavigate }) {
  return (
    <div className="bg-teal-50 dark:bg-slate-900 border border-teal-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 lg:p-16 text-center transition-colors">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-teal-950 dark:text-white mb-4 font-cabinet font-black tracking-tight transition-colors">
        Ready to question everything?
      </h2>
      
      <p className="text-teal-800 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-medium transition-colors">
        The journey of a thousand miles into the universe begins with a single step into your own mind. Join us in exploring the unmapped territories of science and thought.
      </p>
      
      <button 
        onClick={onNavigate}
        className="bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-600 text-white py-3.5 sm:py-4 px-8 sm:px-10 rounded-xl transition-all shadow-lg shadow-teal-500/20 active:scale-95 text-sm sm:text-base font-bold uppercase tracking-widest"
      >
        Explore Research Topics
      </button>
    </div>
  );
}