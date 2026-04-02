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
      // Default selection
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
      setWikiData({
        extract: data.extract || "Definition currently unavailable on Wikipedia.",
        url: data.content_urls?.desktop?.page || null
      });
    } catch (e) {
      setWikiData({ extract: "Failed to link with Wikipedia.", url: null });
    } finally {
      setIsLoadingWiki(false);
    }
  };

  const handleSubjectClick = (sub) => {
    if (activeSubject?.id === sub.id) return;
    setActiveSubject(sub);
    fetchWikipediaData(sub.name);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-10 px-4 md:px-0 overflow-hidden">
      
      {/* 🌟 MISSION HEADER */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Science for the <span className="text-teal-600">How</span>.<br />
          Philosophy for the <span className="text-indigo-600">Why</span>.
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 font-medium text-sm md:text-base leading-relaxed px-4 md:px-0">
          Hum science (Physics, Psychology, Sociology) ko philosophy ke saath jodte hain taaki gyaan sirf kitabon mein na rahe, balki aapki **Life** ko elevate kare.
        </p>
      </div>

      {/* 🌟 THE RESEARCH EXPLORER (Edge-to-Edge on Mobile, Split on Desktop) */}
      <div className="-mx-4 md:mx-0 bg-white md:border border-slate-200 md:rounded-[2rem] overflow-hidden shadow-sm flex flex-col md:flex-row h-[70vh] min-h-[500px] max-h-[800px]">
        
        {/* LEFT: Subjects List (Horizontal Tabs on Mobile, Vertical List on Desktop) */}
        <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0">
          <div className="hidden md:block p-6 border-b border-slate-200">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Research Topics</h3>
          </div>
          
          {/* Mobile swipeable list / Desktop scrollable list */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto p-3 gap-2 md:gap-1 no-scrollbar">
            {subjects.map((sub) => {
              const isActive = activeSubject?.id === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSubjectClick(sub)}
                  className={`shrink-0 md:w-full text-left px-5 py-3 md:py-4 rounded-xl transition-all flex items-center justify-between group whitespace-nowrap md:whitespace-normal border md:border-none ${
                    isActive 
                    ? 'bg-slate-900 text-white shadow-md border-slate-900' 
                    : 'bg-white md:bg-transparent text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold text-sm md:text-base">{sub.name}</span>
                  <i className={`hidden md:block fa-solid fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 ${isActive ? 'opacity-100' : ''}`}></i>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Wikipedia Content Display (Scrollable) */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-white relative scroll-smooth">
          {activeSubject ? (
            <div className="animate-fade-in max-w-2xl">
              
              {/* Subject Title & Category */}
              <div className="mb-8">
                <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-widest border border-teal-100 mb-4 inline-block">
                  {activeSubject.category || 'Core Subject'}
                </span>
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
                  {activeSubject.name}
                </h3>
              </div>

              {/* 📖 Wikipedia Definition Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 border-b border-slate-100 pb-3">
                   <i className="fa-brands fa-wikipedia-w text-slate-300 text-lg"></i> 
                   <span>Official Definition</span>
                </div>
                
                {isLoadingWiki ? (
                  <div className="flex items-center gap-3 text-slate-400 font-bold text-sm py-10">
                    <div className="h-5 w-5 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
                    Syncing Knowledge from Wikipedia...
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-slate-700 text-lg md:text-xl leading-[1.8] verse-thought-serif">
                      {wikiData?.extract}
                    </p>
                    
                    {wikiData?.url && (
                      <a 
                        href={wikiData.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 hover:underline mt-4"
                      >
                        Read full article on Wikipedia <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                      </a>
                    )}
                  </div>
                )}
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
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm mt-8">
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
