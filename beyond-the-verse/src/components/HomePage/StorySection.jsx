import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function StorySection({ isAuthenticated }) {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "subjects"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-8 sm:space-y-16 lg:space-y-20">
      
      {/* 🌟 Refined Scrollbar Styles 🌟 */}
      <style>{`
        .carousel-container::-webkit-scrollbar { height: 6px; }
        .carousel-container::-webkit-scrollbar-track { background: transparent; }
        .carousel-container::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .carousel-container::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        .card-text-scroll::-webkit-scrollbar { width: 3px; }
        .card-text-scroll::-webkit-scrollbar-track { background: transparent; }
        .card-text-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>

      {/* 1. IMMERSIVE HERO BANNER (Edge-to-Edge feel on mobile) */}
      <div className="bg-slate-900 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-10 lg:p-14 text-white shadow-2xl overflow-hidden relative border border-slate-800">
        {/* Dynamic Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-900/40 via-slate-900 to-slate-900 z-0"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] z-0 pointer-events-none"></div>
        
        <div className="relative z-10 grid lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-6">
            <span className="bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[10px] sm:text-xs font-black px-3 py-1 sm:px-4 sm:py-1.5 rounded-full uppercase tracking-[0.2em] backdrop-blur-sm">
              An Intellectual Awakening
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight notranslate">
              Beyond The <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-200">Verse</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-lg lg:text-xl font-medium max-w-xl leading-relaxed">
              We are ending the artificial divide between science and philosophy. Reality is one, and so must be our approach to understanding it.
            </p>
          </div>
          <div className="lg:col-span-5 hidden lg:flex justify-end">
            <i className="fa-solid fa-atom text-[200px] text-teal-500/10 rotate-12 drop-shadow-2xl"></i>
          </div>
        </div>
      </div>

      {/* 2. THE CORE VISION (Split Editorial Layout) */}
      <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 items-stretch">
        {/* Left Side: Context */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800 mb-3 sm:mb-5 tracking-tight">
            The Illusion of Separation
          </h3>
          <div className="space-y-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            <p>
              Today, <strong className="text-slate-800">Science</strong> has been reduced to a subject for exams, disconnected from daily life and decisions. Meanwhile, <strong className="text-slate-800">Philosophy</strong> has become mere intellectual entertainment—read, but never truly lived.
            </p>
            <div className="bg-teal-50/50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-teal-100/50 text-teal-800 font-bold italic">
              "If reality is one, then all genuine attempts to understand it must complement each other, not contradict."
            </div>
          </div>
        </div>

        {/* Right Side: The Two Pillars */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-sm hover:border-teal-200 hover:shadow-lg transition-all group">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-lg sm:text-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-microscope"></i>
            </div>
            <h4 className="font-extrabold text-slate-800 text-lg sm:text-xl mb-2">The Scientific Eye</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
              We don't limit science to formulas. It is a <strong className="text-slate-700">way of seeing</strong>—based on observation, unprejudiced experimentation, and facts.
            </p>
          </div>
          
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-lg transition-all group">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-lg sm:text-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-brain"></i>
            </div>
            <h4 className="font-extrabold text-slate-800 text-lg sm:text-xl mb-2">The Inner Observer</h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
              Just as we observe the universe, we must observe our own thoughts, ego, and reactions. That is the true essence of philosophy.
            </p>
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC CAROUSEL (Sleek UI with proper spacing) */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl sm:rounded-[2rem] pt-6 sm:pt-8 pb-3 overflow-hidden shadow-sm">
        <div className="px-5 sm:px-8 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">Fields of Study</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Explore our current research areas.</p>
          </div>
          <div className="hidden sm:flex text-slate-400 text-xs font-bold items-center gap-2">
            SWIPE <i className="fa-solid fa-arrow-right-long"></i>
          </div>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 px-5 sm:px-8 pb-6 carousel-container">
          {subjects.length === 0 ? (
             <p className="text-sm text-slate-400 italic w-full text-center py-12 font-medium">No subjects published yet. Check back soon!</p>
          ) : (
            subjects.map((sub) => (
              <div key={sub.id} className="snap-center shrink-0 w-[260px] sm:w-[320px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group">
                <div className="h-32 sm:h-40 bg-slate-900 relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${encodeURIComponent(sub.name)}/400/200`} 
                    alt={sub.name} 
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
                    onError={(e) => { e.target.src = 'https://picsum.photos/400/200?blur=2'; }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                  <h4 className="absolute bottom-4 left-4 right-4 text-white font-black text-lg sm:text-xl leading-tight notranslate drop-shadow-md">
                    {sub.name}
                  </h4>
                </div>
                <div className="p-4 sm:p-5 flex-1 flex flex-col bg-white">
                  <div className="max-h-28 sm:max-h-32 overflow-y-auto pr-2 card-text-scroll">
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{sub.definition}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. CODE OF CONDUCT (Modern Grid) */}
      <div className="bg-white rounded-2xl sm:rounded-[2rem] border border-slate-100 p-5 sm:p-8 lg:p-10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">Code of Conduct</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">The intellectual framework that keeps our community pure.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: "fa-scale-balanced", title: "Objectivity", desc: "Ideas are tested on logic and evidence, not personal beliefs." },
            { icon: "fa-shield-halved", title: "Honesty", desc: "No conclusion is accepted without adequate investigation." },
            { icon: "fa-comments", title: "Dialogue", desc: "Our goal is to develop clarity, not to win arguments." },
            { icon: "fa-ban", title: "No Spam", desc: "Irrelevant content or emotional reactions are discouraged." }
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-100 hover:bg-white hover:border-teal-100 hover:shadow-md transition-all text-center sm:text-left">
              <div className="h-10 w-10 bg-white shadow-sm border border-slate-100 text-teal-600 rounded-xl flex items-center justify-center text-lg mx-auto sm:mx-0 mb-3 sm:mb-4">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h5 className="font-extrabold text-slate-800 text-sm sm:text-base">{item.title}</h5>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. COMMUNITY CTA (Secured) */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100/50 rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 text-center shadow-sm relative overflow-hidden">
        <i className="fa-brands fa-whatsapp absolute -top-10 -right-10 text-[150px] text-teal-500/5 rotate-12"></i>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-5 sm:space-y-6">
          <p className="text-teal-900 font-bold italic text-sm sm:text-lg leading-relaxed">
            "This is an invitation—not just to gather information, but to join an honest process of seeing, testing, and understanding."
          </p>
          
          <div className="flex justify-center pt-2">
            {isAuthenticated ? (
              <a 
                href="https://chat.whatsapp.com/EXTq8cGEOcwAcrZN8fr4qw?mode=gi_t_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1EBE57] text-white font-black py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/25 text-sm sm:text-base"
              >
                <i className="fa-brands fa-whatsapp text-xl sm:text-2xl"></i>
                Join WhatsApp Group
              </a>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-900 text-white font-black py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all shadow-lg shadow-slate-900/20 active:scale-95 text-sm sm:text-base"
              >
                <i className="fa-solid fa-lock text-lg text-teal-400"></i>
                Login to Unlock Community
              </button>
            )}
          </div>
          
          <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">
            {isAuthenticated ? "Thank you for being part of the Verse." : "Free account required for community access."}
          </p>
        </div>
      </div>

    </div>
  );
        }
