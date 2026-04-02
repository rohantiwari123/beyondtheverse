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
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 py-8 md:py-12">
      
      {/* 🌟 1. HERO SECTION: Clean & Floating */}
      <div className="text-center max-w-4xl mx-auto px-4 relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-gradient-to-r from-teal-500/10 to-indigo-500/10 blur-3xl -z-10 rounded-full"></div>
        
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.15]">
          Science explains the <span className="text-teal-600">mechanics</span>.<br className="hidden sm:block" /> 
          Philosophy asks the <span className="text-indigo-600">purpose</span>.
        </h2>
        <p className="mt-6 text-slate-500 text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          Welcome to a platform where we destroy the artificial boundaries between exploring the universe and exploring the self. 
        </p>
      </div>

      {/* 🌟 2. BENTO BOX: Premium Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-4 md:px-0">
        
        {/* Science Block (Dark Mode Style) */}
        <div className="md:col-span-2 bg-slate-900 text-white p-8 sm:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000 ease-out"></div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-10">
            <div className="h-14 w-14 rounded-2xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
              <i className="fa-solid fa-microscope text-3xl text-teal-400"></i>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">The Outer World</h3>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-medium max-w-lg">
                Observation, facts, and rigorous experimentation. We don't believe in blind faith. Science is not just equations; it's a profound way of seeing reality exactly as it is.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Block (Glass/Light Style) */}
        <div className="md:col-span-1 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 sm:p-12 rounded-[2rem] border border-indigo-100/50 shadow-lg flex flex-col justify-between gap-10 group relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 text-indigo-500/5 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
            <i className="fa-solid fa-brain text-[150px]"></i>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 relative z-10">
            <i className="fa-solid fa-brain text-3xl text-indigo-600"></i>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight">The Inner Observer</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              If you observe the stars but ignore the mind observing them, your knowledge is incomplete. Philosophy is the science of the self.
            </p>
          </div>
        </div>
      </div>

      {/* 🌟 3. SUBJECTS CAROUSEL: Edge-to-Edge on Mobile */}
      <div className="relative">
        <div className="px-4 md:px-0 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Active Research</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Swipe to explore published topics.</p>
          </div>
        </div>
        
        {/* CSS for hiding scrollbar but keeping functionality */}
        <style>{`
          .edge-carousel::-webkit-scrollbar { display: none; }
          .edge-carousel { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* The Magic Breakout Container for Mobile Edge-to-Edge */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 md:w-full md:left-0 md:translate-x-0">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 px-4 md:px-0 pb-8 pt-2 edge-carousel">
            {subjects.length === 0 ? (
               <div className="w-full flex justify-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200 mx-4 md:mx-0">
                 <p className="text-sm text-slate-400 font-medium">No subjects currently published.</p>
               </div>
            ) : (
              subjects.map((sub) => (
                <div key={sub.id} className="snap-center shrink-0 w-[260px] sm:w-[320px] h-[340px] sm:h-[400px] group cursor-pointer relative rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                  
                  {/* Background Image */}
                  <img 
                    src={`https://picsum.photos/seed/${encodeURIComponent(sub.name)}/600/800`} 
                    alt={sub.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                  />
                  
                  {/* Dark Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Text Content inside the Card */}
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col justify-end h-full">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="font-black text-2xl text-white mb-2 notranslate">{sub.name}</h4>
                      <p className="text-sm text-slate-300 font-medium leading-relaxed line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {sub.definition}
                      </p>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 🌟 4. RULES OF ENGAGEMENT: Minimalist Timeline List */}
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8 sm:mb-12 text-center">Rules of Engagement</h3>
        <div className="border-t border-slate-200/60">
          {[
            { num: "01", title: "Radical Objectivity", desc: "Leave your biases at the door. We test ideas on logic and evidence, never on personal beliefs." },
            { num: "02", title: "Intellectual Honesty", desc: "Admit what you don't know. No conclusion is accepted without adequate, unprejudiced investigation." },
            { num: "03", title: "Constructive Dialogue", desc: "Our ultimate goal is to develop clarity and understanding—not to win cheap internet arguments." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10 py-6 sm:py-8 border-b border-slate-200/60 group">
              <div className="text-5xl sm:text-6xl font-black text-slate-100 group-hover:text-teal-100 group-hover:scale-110 transition-all duration-500 select-none">
                {item.num}
              </div>
              <div className="flex-1">
                <h5 className="font-extrabold text-slate-900 text-xl sm:text-2xl mb-2 group-hover:text-teal-600 transition-colors">{item.title}</h5>
                <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 5. CALL TO ACTION: Premium Floating Pill */}
      <div className="px-4 md:px-0 pb-8">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-full bg-teal-500/10 skew-x-12 translate-x-20"></div>
          
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left relative z-10">
            <div className="h-14 w-14 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 shrink-0 border border-teal-500/30">
              <i className="fa-brands fa-whatsapp text-2xl"></i>
            </div>
            <div>
              <h4 className="text-white font-black text-lg sm:text-xl mb-1">Join the inner circle</h4>
              <p className="text-slate-400 text-sm font-medium">Debate, discuss, and evolve with us on WhatsApp.</p>
            </div>
          </div>
          
          <div className="w-full md:w-auto relative z-10">
            {isAuthenticated ? (
              <a 
                href="https://chat.whatsapp.com/EXTq8cGEOcwAcrZN8fr4qw?mode=gi_t_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black py-3.5 px-8 rounded-full transition-transform active:scale-95 text-sm shadow-[0_0_20px_rgba(20,184,166,0.3)]"
              >
                Enter Community <i className="fa-solid fa-arrow-right"></i>
              </a>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-black py-3.5 px-8 rounded-full transition-transform active:scale-95 text-sm shadow-xl"
              >
                <i className="fa-solid fa-lock text-slate-400"></i> Login to Unlock
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
        }
