import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 md:py-16 space-y-12 sm:space-y-16 lg:space-y-20 animate-fade-in-up">
      
      {/* 🌟 Premium Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="group flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-sm transition-all outline-none bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:border-teal-200 hover:shadow-md w-max"
      >
        <div className="bg-slate-100 group-hover:bg-teal-50 w-7 h-7 rounded-full flex items-center justify-center transition-colors">
          <i className="fa-solid fa-arrow-left text-xs"></i>
        </div>
        Back to Home
      </button>

      {/* 1. HERO SECTION (Dark & Deep) */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden border border-teal-800/30">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.15),transparent_50%)] pointer-events-none"></div>
        <i className="fa-solid fa-infinity absolute -bottom-10 -right-10 text-[150px] sm:text-[250px] text-teal-500/10 -rotate-12 pointer-events-none"></i>
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="bg-teal-500/20 text-teal-300 border border-teal-400/20 text-[10px] sm:text-xs font-black px-3 py-1 sm:px-4 sm:py-1.5 rounded-full uppercase tracking-[0.2em] backdrop-blur-sm">
            Our Story
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-100 to-teal-300 tracking-tight leading-tight">
            The Quest for Ultimate Reality
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed font-medium">
            Beyond The Verse was born out of a profound realization: the universe outside us and the consciousness within us are not two separate things. We exist to explore where science ends and true philosophy begins.
          </p>
        </div>
      </div>

      {/* 2. THE PROBLEM & THE SOLUTION (Split Layout) */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-10">
        {/* The Problem */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-rose-100 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -z-10 group-hover:bg-rose-100 transition-colors"></div>
          <div className="h-12 w-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center text-xl mb-6 border border-rose-100">
            <i className="fa-solid fa-chain-broken"></i>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">The Great Divide</h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            For centuries, humanity has split the search for truth into two isolated camps. Scientists look through telescopes to understand the outside world, while philosophers look inward. This artificial division has left us with a half-understood reality—technology without wisdom, and philosophy without practical grounding.
          </p>
        </div>

        {/* The Solution */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-teal-100 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl -z-10 group-hover:bg-teal-100 transition-colors"></div>
          <div className="h-12 w-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-xl mb-6 border border-teal-100">
            <i className="fa-solid fa-link"></i>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">Bridging the Gap</h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Beyond The Verse acts as the bridge. We believe that a truly scientific mind must also investigate its own biases, ego, and thoughts. By combining rigorous scientific observation with deep self-inquiry, we aim to create an ecosystem of complete understanding.
          </p>
        </div>
      </div>

      {/* 3. CORE PRINCIPLES (Modern Cards) */}
      <div className="space-y-6 sm:space-y-10">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">Our Core Principles</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 font-medium">The foundational pillars that guide our research, discussions, and community.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: "fa-eye", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100", title: "Unprejudiced Observation", text: "Seeing things exactly as they are, without the filter of past beliefs, conditioning, or societal dogmas." },
            { icon: "fa-atom", color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-100", title: "Scientific Rigor", text: "Every idea, no matter how profound, must stand the test of logic, evidence, and rational inquiry." },
            { icon: "fa-hands-holding-circle", color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-100", title: "Collective Evolution", text: "Truth is not a competition. We learn, debate, and evolve together as a community of seekers." }
          ].map((item, index) => (
            <div key={index} className="bg-slate-50 p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-slate-100 hover:bg-white transition-colors shadow-sm text-center sm:text-left">
              <div className={`h-12 w-12 ${item.bg} ${item.color} ${item.border} border rounded-xl flex items-center justify-center text-xl mx-auto sm:mx-0 mb-5`}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h4 className="font-extrabold text-slate-800 text-lg mb-2">{item.title}</h4>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 4. NAYA: UNIQUE ENDING (No more repetitive buttons) 🌟 */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-[2rem] p-8 sm:p-12 text-center shadow-sm relative overflow-hidden flex flex-col items-center justify-center">
        {/* Subtle decorative quote marks */}
        <i className="fa-solid fa-quote-left absolute top-8 left-8 text-6xl text-slate-50 opacity-50"></i>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full mb-6"></div>
          
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-relaxed italic">
            "The journey of a thousand miles into the universe begins with a single step into your own mind."
          </h2>
          
          <p className="text-slate-500 text-sm sm:text-base font-medium pb-4">
            You know our story. Now it's time to explore the subjects we are decoding.
          </p>
          
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-black py-3.5 px-8 rounded-xl transition-all shadow-xl shadow-slate-900/20 active:scale-95"
          >
            <i className="fa-solid fa-layer-group text-teal-400"></i> Explore Research Topics
          </button>
        </div>
      </div>

    </div>
  );
        }
