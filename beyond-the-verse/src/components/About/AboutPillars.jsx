import React from 'react';

export default function AboutPillars() {
  const pillars = [
    { 
      icon: "fa-eye", 
      color: "text-blue-600", 
      bg: "bg-blue-50", 
      border: "border-blue-100", 
      title: "Unbiased Observation", 
      text: "Seeing reality exactly as it is, stripped of societal dogmas, past beliefs, and conditioned thinking." 
    },
    { 
      icon: "fa-flask", 
      color: "text-teal-600", 
      bg: "bg-teal-50", 
      border: "border-teal-100", 
      title: "Absolute Logic", 
      text: "Every profound idea must stand the rigorous tests of logic, rationality, and factual evidence." 
    },
    { 
      icon: "fa-users-rays", 
      color: "text-indigo-600", 
      bg: "bg-indigo-50", 
      border: "border-indigo-100", 
      title: "Collective Growth", 
      text: "Truth is a shared journey, not a competition. We explore, debate, and evolve as one community." 
    }
  ];

  return (
    <div className="space-y-10 lg:space-y-12 pt-8 sm:pt-12 border-t border-slate-100">
      
      <div className="text-center max-w-2xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-800">
          Our Guiding Pillars
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
        {pillars.map((item, index) => (
          <div 
            key={index} 
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <div className={`h-12 w-12 sm:h-14 sm:w-14 ${item.bg} ${item.color} ${item.border} border rounded-xl flex items-center justify-center text-xl sm:text-2xl mb-5 sm:mb-6`}>
              <i className={`fa-solid ${item.icon}`}></i>
            </div>
            <h4 className="text-slate-800 text-lg sm:text-xl mb-3">{item.title}</h4>
            <p className="text-xs sm:text-sm text-slate-500">{item.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
}