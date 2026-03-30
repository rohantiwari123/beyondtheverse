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
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 py-4">
      
      {/* 🌟 NAYA: Clean Minimalist Typography Intro (No Dark Box) 🌟 */}
      <div className="text-center max-w-4xl mx-auto px-2">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-800 tracking-tighter leading-[1.1]">
          Science explains the <span className="text-teal-500">mechanics</span>.<br className="hidden sm:block" /> Philosophy asks the <span className="text-indigo-500">purpose</span>.
        </h2>
        <p className="mt-6 text-slate-500 text-sm sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
          Welcome to a platform where we destroy the artificial boundaries between exploring the universe and exploring the self. 
        </p>
      </div>

      {/* 🌟 NAYA: Trendy "Bento Box" Grid Layout 🌟 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Big Block (Science) */}
        <div className="md:col-span-2 bg-slate-900 text-white p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/30 transition-all duration-700"></div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <i className="fa-solid fa-microscope text-4xl sm:text-5xl text-teal-400"></i>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black mb-3">The Outer World</h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium max-w-md">
                Observation, facts, and rigorous experimentation. We don't believe in blind faith. Science is not just equations; it's a profound way of seeing reality exactly as it is.
              </p>
            </div>
          </div>
        </div>

        {/* Tall Block (Philosophy) */}
        <div className="md:col-span-1 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] border border-indigo-100/50 shadow-sm flex flex-col justify-between gap-8 group">
          <i className="fa-solid fa-brain text-4xl sm:text-5xl text-indigo-500"></i>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-3">The Inner Observer</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              If you observe the stars but ignore the mind observing them, your knowledge is incomplete. Philosophy is the science of the self.
            </p>
          </div>
        </div>
      </div>

      {/* 🌟 NAYA: Minimalist Subjects Carousel (Borderless Cards) 🌟 */}
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-2">
          <div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">Active Research</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Swipe to explore topics.</p>
          </div>
        </div>
        
        <style>{`
          .minimal-carousel::-webkit-scrollbar { display: none; }
          .minimal-carousel { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-8 pb-4 minimal-carousel px-2">
          {subjects.length === 0 ? (
             <p className="text-sm text-slate-400 italic w-full py-10">No subjects currently published.</p>
          ) : (
            subjects.map((sub) => (
              <div key={sub.id} className="snap-center shrink-0 w-[280px] sm:w-[360px] group cursor-pointer">
                {/* Image without harsh borders, softer radius */}
                <div className="h-48 sm:h-56 w-full rounded-[2rem] overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-500">
                  <img 
                    src={`https://picsum.photos/seed/${encodeURIComponent(sub.name)}/600/400`} 
                    alt={sub.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-black text-lg sm:text-xl text-slate-800 mb-2 notranslate group-hover:text-teal-600 transition-colors">{sub.name}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">{sub.definition}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🌟 NAYA: Elegant List Layout for Rules (Instead of Cards Grid) 🌟 */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight mb-8 sm:mb-12 text-center">Rules of Engagement</h3>
        <div className="border-t border-slate-200">
          {[
            { num: "01", title: "Radical Objectivity", desc: "Leave your biases at the door. We test ideas on logic and evidence, never on personal beliefs." },
            { num: "02", title: "Intellectual Honesty", desc: "Admit what you don't know. No conclusion is accepted without adequate, unprejudiced investigation." },
            { num: "03", title: "Constructive Dialogue", desc: "Our ultimate goal is to develop clarity and understanding—not to win cheap internet arguments." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-8 py-6 sm:py-8 border-b border-slate-200 group">
              <div className="text-4xl sm:text-5xl font-black text-slate-200 group-hover:text-teal-500 transition-colors duration-500">
                {item.num}
              </div>
              <div>
                <h5 className="font-extrabold text-slate-800 text-lg sm:text-xl mb-2">{item.title}</h5>
                <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 NAYA: Inline Sleek CTA Bar (Instead of giant box) 🌟 */}
      <div className="bg-slate-900 rounded-2xl sm:rounded-full p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-4 pl-2 sm:pl-6 text-center sm:text-left">
          <div className="h-10 w-10 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400 shrink-0 mx-auto sm:mx-0">
            <i className="fa-brands fa-whatsapp text-xl"></i>
          </div>
          <p className="text-white font-bold text-sm sm:text-base">
            Ready to join the discussion?
          </p>
        </div>
        
        <div className="w-full sm:w-auto">
          {isAuthenticated ? (
            <a 
              href="https://chat.whatsapp.com/EXTq8cGEOcwAcrZN8fr4qw?mode=gi_t_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-teal-500 hover:bg-teal-400 text-slate-900 font-black py-3 px-6 sm:px-8 rounded-xl sm:rounded-full transition-all active:scale-95 text-sm"
            >
              Enter Community
            </a>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-black py-3 px-6 sm:px-8 rounded-xl sm:rounded-full transition-all active:scale-95 text-sm"
            >
              <i className="fa-solid fa-lock text-slate-400"></i> Login to Unlock
            </button>
          )}
        </div>
      </div>

    </div>
  );
        }
