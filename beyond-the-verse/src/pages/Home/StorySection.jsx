import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

export default function StorySection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);

  // Firestore से डेटा लाना
  useEffect(() => {
    const q = query(collection(db, "subjects"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 🌟 Auto-Categorization Logic (Science vs Philosophy)
  const scienceKeywords = ['science', 'quantum', 'mechanics', 'biology', 'neuro', 'astro', 'physics', 'tech'];
  const scienceSubjects = subjects.filter(sub =>
    scienceKeywords.some(kw => sub.name?.toLowerCase().includes(kw) || sub.category?.toLowerCase().includes(kw))
  );
  const philosophySubjects = subjects.filter(sub => !scienceSubjects.includes(sub));

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-8 px-4 md:px-0">
      
      {/* 🌟 1. HERO SECTION */}
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Science explains the <span className="text-blue-600">Mechanics</span>.<br />
          Philosophy asks the <span className="text-purple-600">Purpose</span>.
        </h2>
        <p className="text-slate-500 text-sm md:text-base font-medium max-w-xl mx-auto">
          Welcome to a platform where we destroy the artificial boundaries between exploring the universe and exploring the self.
        </p>
      </div>

      {/* 🌟 2. THE VISUALIZER LAYOUT (Exactly like your screenshot) */}
      <div className="bg-[#fafcff] border border-slate-200/80 rounded-[2rem] p-6 md:p-10 shadow-sm">
        
        {/* Top Status Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 mb-8 gap-6">
          <div className="flex-1 min-h-[60px]">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Content Scalability Explorer</h3>
            <p className="text-sm text-slate-600 transition-all">
              {activeSubject ? (
                <span className="animate-fade-in">
                  <strong className="text-slate-900">{activeSubject.name}:</strong> {activeSubject.definition}
                </span>
              ) : (
                <span className="italic text-slate-400">Select a subject below to view its definition.</span>
              )}
            </p>
          </div>
          
          <div className="flex gap-6 md:gap-10 text-right shrink-0">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Subjects</p>
              <p className="text-lg font-black text-slate-800">{subjects.length}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Layout Mode</p>
              <p className="text-lg font-black text-slate-800">Split View</p>
            </div>
          </div>
        </div>

        {/* Two Columns Grid */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative">
          
          {/* Middle Divider Line (Desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2"></div>

          {/* 🔵 SCIENCE COLUMN */}
          <div className="flex-1 space-y-4">
            <h4 className="text-center font-black text-blue-600 tracking-[0.2em] uppercase mb-6">Science</h4>
            
            {scienceSubjects.length === 0 ? <p className="text-center text-xs text-slate-400">Loading...</p> : null}
            
            {scienceSubjects.map(sub => (
              <div 
                key={sub.id}
                onClick={() => setActiveSubject(sub)}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                  activeSubject?.id === sub.id 
                  ? 'bg-blue-50/80 border-blue-400 shadow-sm ring-1 ring-blue-400' 
                  : 'bg-blue-50/30 border-transparent hover:bg-blue-50 hover:border-blue-200'
                }`}
              >
                <div className={`h-10 w-10 shrink-0 flex items-center justify-center text-lg transition-colors ${activeSubject?.id === sub.id ? 'text-blue-600' : 'text-blue-400'}`}>
                  <i className="fa-solid fa-microscope"></i>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-[15px]">{sub.name}</h5>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Science</p>
                </div>
              </div>
            ))}
          </div>

          {/* 🟣 PHILOSOPHY COLUMN */}
          <div className="flex-1 space-y-4">
            <h4 className="text-center font-black text-purple-700 tracking-[0.2em] uppercase mb-6">Philosophy</h4>
            
            {philosophySubjects.length === 0 ? <p className="text-center text-xs text-slate-400">Loading...</p> : null}

            {philosophySubjects.map(sub => (
              <div 
                key={sub.id}
                onClick={() => setActiveSubject(sub)}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                  activeSubject?.id === sub.id 
                  ? 'bg-purple-50/80 border-purple-400 shadow-sm ring-1 ring-purple-400' 
                  : 'bg-purple-50/30 border-transparent hover:bg-purple-50 hover:border-purple-200'
                }`}
              >
                <div className={`h-10 w-10 shrink-0 flex items-center justify-center text-lg transition-colors ${activeSubject?.id === sub.id ? 'text-purple-600' : 'text-purple-400'}`}>
                  <i className="fa-solid fa-brain"></i>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-[15px]">{sub.name}</h5>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Philosophy</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Select any card</p>
          <button 
            onClick={() => setActiveSubject(null)}
            disabled={!activeSubject}
            className="w-full sm:w-auto bg-slate-200/70 hover:bg-slate-300 text-slate-600 disabled:opacity-40 px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all"
          >
            Clear Selection
          </button>
        </div>
      </div>

      {/* 🌟 3. CTA (Join WhatsApp) */}
      <div className="bg-slate-900 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl mt-12">
        <div className="flex items-center gap-5 text-center md:text-left">
          <div className="h-14 w-14 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400 border border-teal-500/20">
            <i className="fa-brands fa-whatsapp text-2xl"></i>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">Join the Inner Circle</h4>
            <p className="text-slate-400 text-sm font-medium">Debate, discuss, and evolve with us on WhatsApp.</p>
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          {isAuthenticated ? (
            <a 
              href="https://chat.whatsapp.com/EXTq8cGEOcwAcrZN8fr4qw" 
              target="_blank" 
              rel="noreferrer"
              className="block text-center w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-black py-3 px-8 rounded-full text-sm transition-all"
            >
              Enter Community
            </a>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-black py-3 px-8 rounded-full text-sm transition-all"
            >
              Login to Unlock
            </button>
          )}
        </div>
      </div>

    </div>
  );
          }
