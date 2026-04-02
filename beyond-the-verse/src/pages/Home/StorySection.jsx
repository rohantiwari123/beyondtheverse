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
  const [geminiData, setGeminiData] = useState("");
  const [isLoadingGemini, setIsLoadingGemini] = useState(false);

  // 1. Firebase Sync
  useEffect(() => {
    const q = query(collection(db, "subjects"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSubjects(docs);
      if (docs.length > 0 && !activeSubject) {
        handleSubjectClick(docs[0]);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. 🌟 SMART AI FETCH (Multi-Model Fallback)
  const fetchGeminiData = async (subjectName) => {
    setIsLoadingGemini(true);
    setGeminiData("");
    
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setGeminiData("🚨 Error: API Key not found in .env file.");
      setIsLoadingGemini(false);
      return;
    }

    const promptText = `Explain '${subjectName}' in two parts. 
    Part 1: Scientific and factual definition. 
    Part 2: Real-life philosophical application (how it elevates human life). 
    Keep it simple, avoid stars/markdown, around 150 words.`;

    // Try these models in order
    const models = ["gemini-1.5-flash", "gemini-pro"];
    let success = false;

    for (const model of models) {
      if (success) break;
      try {
        console.log(`Trying model: ${model}...`);
        // Using v1beta as it's more permissive for newer models
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        });

        const data = await response.json();

        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          setGeminiData(data.candidates[0].content.parts[0].text);
          success = true;
          console.log(`✅ Success with ${model}`);
        } else {
          console.warn(`❌ ${model} failed, trying next...`);
        }
      } catch (err) {
        console.error(`Network error with ${model}:`, err);
      }
    }

    if (!success) {
      setGeminiData("🚨 AI failed to respond. Please check your API key quota or internet connection.");
    }
    setIsLoadingGemini(false);
  };

  const handleSubjectClick = (sub) => {
    if (activeSubject?.id === sub.id) return;
    setActiveSubject(sub);
    fetchGeminiData(sub.name);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-10 px-4 md:px-0">
      
      {/* Mission Header */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Science for the <span className="text-teal-600">How</span>.<br />
          Philosophy for the <span className="text-indigo-600">Why</span>.
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 font-medium text-sm md:text-base leading-relaxed">
          Uniting Science and Philosophy to elevate daily life.
        </p>
      </div>

      {/* Main Explorer */}
      <div className="-mx-4 md:mx-0 bg-white md:border border-slate-200 md:rounded-[2rem] overflow-hidden shadow-sm flex flex-col md:flex-row h-[70vh] min-h-[550px] max-h-[850px]">
        
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0">
          <div className="hidden md:block p-6 border-b border-slate-200">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Research Topics</h3>
          </div>
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto p-3 gap-2 no-scrollbar">
            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => handleSubjectClick(sub)}
                className={`shrink-0 md:w-full text-left px-5 py-3 md:py-4 rounded-xl transition-all font-bold text-sm border md:border-none ${
                  activeSubject?.id === sub.id ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white md:bg-transparent text-slate-600 border-slate-200'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Display (Scrollable) */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-white scroll-smooth">
          {activeSubject ? (
            <div className="animate-fade-in max-w-2xl">
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-100 mb-4 inline-block">
                Core Topic
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8 uppercase">
                {activeSubject.name}
              </h3>

              <div className="space-y-4">
                {isLoadingGemini ? (
                  <div className="flex flex-col items-center justify-center text-slate-400 font-bold text-sm py-20 gap-4">
                    <div className="h-8 w-8 border-4 border-slate-100 border-t-teal-500 rounded-full animate-spin"></div>
                    <span className="animate-pulse">Synthesizing...</span>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {geminiData.startsWith("🚨") ? (
                      <div className="p-4 bg-rose-50 text-rose-700 rounded-xl border border-rose-100 text-xs font-mono">
                        {geminiData}
                      </div>
                    ) : (
                      geminiData.split('\n\n').map((paragraph, idx) => {
                        if (!paragraph.trim()) return null;
                        return (
                          <div key={idx} className={idx === 1 ? "bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner" : ""}>
                            {idx === 1 && (
                              <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-bolt"></i> Life Application
                              </h4>
                            )}
                            <p className="text-slate-800 text-lg leading-relaxed font-medium">
                              {paragraph}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-xs">
               Select a topic to begin
            </div>
          )}
        </div>
      </div>
    </div>
  );
  }
