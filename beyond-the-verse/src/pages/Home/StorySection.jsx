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
  const [wikiData, setWikiData] = useState(null);
  const [isLoadingWiki, setIsLoadingWiki] = useState(false);

  // 1. Live Fetch from Admin Dashboard (Firestore)
  useEffect(() => {
    const q = query(collection(db, "subjects"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSubjects(docs);
      // Default: Pehla subject select kar lo agar list empty nahi hai
      if (docs.length > 0 && !activeSubject) {
        handleSubjectClick(docs[0]);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Wikipedia API Integration
  const fetchWikipediaData = async (subjectName) => {
    setIsLoadingWiki(true);
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(subjectName)}`);
      const data = await res.json();
      setWikiData(data.extract || "Definition currently unavailable on Wikipedia.");
    } catch (e) {
      setWikiData("Failed to link with Wikipedia.");
    } finally {
      setIsLoadingWiki(false);
    }
  };

  const handleSubjectClick = (sub) => {
    setActiveSubject(sub);
    fetchWikipediaData(sub.name);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10 px-4 md:px-0">
      
      {/* 🌟 MISSION HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Science for the <span className="text-teal-600">How</span>.<br />
          Philosophy for the <span className="text-indigo-600">Why</span>.
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 font-medium text-sm md:text-base leading-relaxed">
          Hum science (Physics, Psychology, Sociology) ko philosophy ke saath jodte hain taaki gyaan sirf kitabon mein na rahe, balki aapki **Life** ko elevate kare.
        </p>
      </div>

      {/* 🌟 THE RESEARCH EXPLORER (Split Layout) */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[550px]">
        
        {/* LEFT: Subjects List (Admin Dashboard se synced) */}
        <div className="w-full md:w-80 bg-slate-50 border-r border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Research Topics</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1 no-scrollbar">
            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => handleSubjectClick(sub)}
                className={`w-full text-left px-5 py-4 rounded-2xl transition-all flex items-center justify-between group ${
                  activeSubject?.id === sub.id 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'hover:bg-white text-slate-600'
                }`}
              >
                <span className="font-bold text-sm md:text-base">{sub.name}</span>
                <i className={`fa-solid fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 ${activeSubject?.id === sub.id ? 'opacity-100' : ''}`}></i>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Content Display */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto">
          {activeSubject ? (
            <div className="animate-fade-in space-y-8">
              
              {/* Subject Title & Category */}
              <div>
                <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-widest border border-teal-100">
                  {activeSubject.category || 'Core Subject'}
                </span>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mt-3 tracking-tighter">
                  {activeSubject.name}
                </h3>
              </div>

              {/* 📖 Wikipedia Definition Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                   <i className="fa-brands fa-wikipedia-w"></i> Scientific Definition
                </h4>
                {isLoadingWiki ? (
                  <div className="h-20 flex items-center gap-2 text-slate-400 font-bold text-sm">
                    <div className="h-4 w-4 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
                    Syncing Knowledge...
                  </div>
                ) : (
                  <p className="text-slate-700 text-lg md:text-xl leading-relaxed verse-thought-serif">
                    {wikiData}
                  </p>
                )}
              </div>

              {/* ⚡ LIFE APPLICATION (Beyond The Verse Perspective) */}
              <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all"></div>
                <h4 className="text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-bolt"></i> Life Application
                </h4>
                <p className="text-slate-200 text-lg md:text-xl leading-relaxed verse-thought-serif">
                  {activeSubject.definition || "How this subject elevates your daily life is being processed by our researchers."}
                </p>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300">
               <i className="fa-solid fa-atom text-6xl mb-4 animate-pulse"></i>
               <p className="font-bold uppercase tracking-widest text-xs">Select a topic to explore</p>
            </div>
          )}
        </div>

      </div>

      {/* 🌟 FINAL CTA */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl border border-indigo-100">
            <i className="fa-solid fa-users"></i>
          </div>
          <div>
            <h4 className="text-slate-900 font-bold text-lg">Talk to the Thinkers</h4>
            <p className="text-slate-500 text-sm font-medium">Ye subjects aapki life mein kaise fit hote hain? Community mein discuss karein.</p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate(isAuthenticated ? '/community' : '/login')}
          className="w-full md:w-auto bg-slate-900 text-white font-black py-4 px-10 rounded-2xl text-xs uppercase tracking-widest hover:bg-teal-600 transition-all active:scale-95"
        >
          {isAuthenticated ? "Go to Community" : "Login to Join"}
        </button>
      </div>

    </div>
  );
        }
