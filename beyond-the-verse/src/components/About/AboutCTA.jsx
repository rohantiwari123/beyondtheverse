import React from 'react';

export default function AboutCTA({ onNavigate }) {
  return (
    <div className="bg-teal-50 border border-teal-100 rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-teal-950 mb-4">
        Ready to question everything?
      </h2>
      
      <p className="text-teal-800 text-sm sm:text-base font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
        The journey of a thousand miles into the universe begins with a single step into your own mind. Join us in exploring the unmapped territories of science and thought.
      </p>
      
      <button 
        onClick={onNavigate}
        className="bg-teal-600 hover:bg-teal-700 text-white font-black py-3.5 sm:py-4 px-8 sm:px-10 rounded-xl transition-colors shadow-sm active:scale-95 text-sm sm:text-base"
      >
        Explore Research Topics
      </button>
    </div>
  );
}