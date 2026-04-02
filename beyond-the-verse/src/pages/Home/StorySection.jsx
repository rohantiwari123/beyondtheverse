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
  
  // Gemini States
  const [geminiData, setGeminiData] = useState("");
  const [isLoadingGemini, setIsLoadingGemini] = useState(false);

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

  // 2. 🌟 GEMINI API INTEGRATION 🌟
  const fetchGeminiData = async (subjectName) => {
    setIsLoadingGemini(true);
    setGeminiData("");
    try {
      // API Key fetch (Vite ya CRA dono ke liye support)
      const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
      
      if (!apiKey) {
        setGeminiData("API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
        setIsLoadingGemini(false);
        return;
      }

      // 🧠 The Magic Prompt: Asking Gemini to mix Science & Philosophy
      const promptText = `You are an expert who bridges science and philosophy. Explain the subject '${subjectName}'. 
      First paragraph: Provide a concise, factual, and scientific definition. 
      Second paragraph: Explain its 'Life Application'—how understanding this concept can elevate human consciousness and daily life. 
      Return strictly these two paragraphs separated by a double newline. Do not use any markdown formatting like bolding or asterisks.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        const generatedText = data.candidates[0].content.parts[0].text;
        setGeminiData(generatedText);
      } else {
        setGeminiData("Could not generate knowledge at this time.");
      }
    } catch (e) {
      console.error(e);
      setGeminiData("Failed to connect with Gemini AI. Please check your connection or API key.");
    } finally {
      setIsLoadingGemini(false);
    }
  };

  const handleSubjectClick = (sub) => {
    if (activeSubject?.id === sub.id) return;
    setActiveSubject(sub);
    fetchGeminiData(sub.name);
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
        
        {/* LEFT: Subjects List */}
        <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0">
          <div className="hidden md:block p-6 border-b border-slate-200">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Research Topics</h3>
          </div>
          
          {/* Mobile swipeable / Desktop scrollable */}
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

        {/* RIGHT: Gemini Content Display (Scrollable) */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-white relative scroll-smooth">
          {activeSubject ? (
            <div className="animate-fade-in max-w-2xl">
              
              {/* Subject Title & Category */}
              <div className="mb-8">
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-100 mb-4 inline-block">
                  {activeSubject.category || 'Core Subject'}
                </span>
                <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
                  {activeSubject.name}
                </h3>
              </div>

              {/* ✨ AI Definition Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 border-b border-slate-100 pb-3">
                   <i className="fa-solid fa-sparkles text-amber-400 text-lg"></i> 
                   <span>AI Synthesized Knowledge</span>
                </div>
                
                {isLoadingGemini ? (
                  <div className="flex flex-col items-center justify-center text-slate-400 font-bold text-sm py-16 gap-4">
                    <div className="relative flex justify-center items-center">
                      <div className="absolute animate-ping inline-flex h-12 w-12 rounded-full bg-indigo-400 opacity-20"></div>
                      <div className="relative inline-flex rounded-full h-8 w-8 bg-indigo-500 items-center justify-center text-white">
                        <i className="fa-solid fa-sparkles text-xs"></i>
                      </div>
                    </div>
                    <span>Synthesizing science and philosophy...</span>
                  </div>
                ) : (
                  <div className="space-y-6 mt-4">
                    {/* Render paragraphs returned by Gemini */}
                    {geminiData.split('\n\n').map((paragraph, idx) => {
                      if (!paragraph.trim()) return null;
                      // Making the second paragraph (Philosophy) visually distinct
                      if (idx === 1) {
                        return (
                          <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-8">
                            <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                              <i className="fa-solid fa-bolt"></i> Life Application
                            </h4>
                            <p className="text-slate-700 text-lg leading-[1.8] font-medium">
                              {paragraph}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <p key={idx} className="text-slate-800 text-lg md:text-xl leading-[1.8] verse-thought-serif">
                          {paragraph}
                        </p>
                      );
                    })}
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
