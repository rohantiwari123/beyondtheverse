import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../../firebase';

export default function StorySection() {
  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);
  const [geminiData, setGeminiData] = useState("");
  const [isLoadingGemini, setIsLoadingGemini] = useState(false);

  // 1. Firebase Live Sync
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

  // 2. 🧠 THE GEMINI 2.5 FLASH CALL
  const fetchGeminiData = async (subjectName) => {
    setIsLoadingGemini(true);
    setGeminiData("");
    
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setGeminiData("🚨 Error: API Key is missing. GitHub Secrets check karein.");
      setIsLoadingGemini(false);
      return;
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: `Explain '${subjectName}' for a life-philosophy platform. 
              Part 1: Scientific and factual definition. 
              Part 2: How this helps in practical daily life and philosophy. 
              Give me around 150 words. Plain text only, no stars, no markdown.` 
            }] 
          }]
        })
      });

      const data = await response.json();

      if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
        setGeminiData(data.candidates[0].content.parts[0].text);
      } else {
        const errorMsg = data.error?.message || "Model mismatch or API restricted.";
        setGeminiData(`🚨 Error: ${errorMsg}`);
      }
    } catch (err) {
      setGeminiData("🚨 Connection Error: API unreachable.");
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
    <div className="w-full max-w-5xl mx-auto py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      
      {/* 🌟 1. ELEGANT HEADER */}
      <div className="text-center mb-8 sm:mb-12">
        <span className="text-teal-600 text-[10px] sm:text-xs mb-3 block">
          The Verse Explorer
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-4">
          Decode The <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400">Universe</span>
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 text-sm sm:text-base lg:text-lg px-2">
          Select a concept below to uncover its scientific reality and philosophical depth.
        </p>
      </div>

      {/* 🌟 2. MODERN HORIZONTAL PILLS (TABS) */}
      <div className="flex overflow-x-auto justify-start gap-3 sm:gap-4 p-4 mb-8 sm:mb-12 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
        {subjects.map((sub) => {
          const isActive = activeSubject?.id === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => handleSubjectClick(sub)}
              className={`shrink-0 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm lg:text-base transition-all duration-300 ${
                isActive 
                ? 'bg-slate-900 text-white scale-105' 
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {sub.name}
            </button>
          );
        })}
      </div>

      {/* 🌟 3. THE SPOTLIGHT CARD (Main Content Area) */}
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 lg:p-16 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden min-h-[400px] lg:min-h-[500px] flex flex-col justify-center transition-all duration-500">
        
        {/* Background Decorative Blob */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-teal-50 to-indigo-50 rounded-full blur-[80px] opacity-70 z-0 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          {activeSubject ? (
            <div className="animate-fade-in-up">
              
              {/* Subject Title inside Card */}
              <div className="flex items-center gap-3 mb-8 sm:mb-10">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-slate-900 text-white rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-md">
                  <i className="fa-solid fa-atom"></i>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl text-slate-800">
                  {activeSubject.name}
                </h3>
              </div>

              {isLoadingGemini ? (
                // 🌟 Premium Loading Skeleton
                <div className="space-y-6 py-4">
                  <div className="h-4 sm:h-5 bg-slate-100 rounded-md w-full animate-pulse"></div>
                  <div className="h-4 sm:h-5 bg-slate-100 rounded-md w-5/6 animate-pulse"></div>
                  <div className="h-4 sm:h-5 bg-slate-100 rounded-md w-4/6 animate-pulse"></div>
                  
                  <div className="mt-10 h-32 sm:h-40 bg-teal-50/50 rounded-2xl sm:rounded-3xl border border-teal-100/50 animate-pulse"></div>
                </div>
              ) : (
                <div className="space-y-8 sm:space-y-12">
                  {geminiData.startsWith("🚨") ? (
                    <div className="p-5 sm:p-6 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 text-xs sm:text-sm">
                      {geminiData}
                    </div>
                  ) : (
                    geminiData.split('\n\n').map((paragraph, idx) => {
                      if (!paragraph.trim()) return null;
                      
                      return (
                        <div key={idx} className={idx === 1 ? "bg-gradient-to-br from-teal-50/60 to-emerald-50/30 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-teal-100/60 shadow-sm relative overflow-hidden" : ""}>
                          
                          {/* Part 2: Philosophy Decoration */}
                          {idx === 1 && (
                            <>
                              <div className="absolute -right-6 -bottom-6 text-teal-500/10 text-8xl z-0 pointer-events-none">
                                <i className="fa-solid fa-quote-right"></i>
                              </div>
                              <h4 className="text-[10px] sm:text-xs text-teal-600 mb-3 sm:mb-4 flex items-center gap-2 relative z-10">
                                <i className="fa-solid fa-bolt text-teal-500"></i> The Philosophical Purpose
                              </h4>
                            </>
                          )}
                          
                          {/* Part 1: Scientific Text */}
                          {idx === 0 && (
                            <h4 className="text-[10px] sm:text-xs text-slate-400 mb-3 sm:mb-4 flex items-center gap-2">
                              <i className="fa-solid fa-microscope"></i> The Scientific Lens
                            </h4>
                          )}

                          <p className={`relative z-10 ${idx === 1 ? 'text-teal-900 text-base sm:text-lg md:text-xl' : 'text-slate-700 text-lg sm:text-xl md:text-2xl'}`}>
                            {paragraph}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12 sm:py-20">
              <div className="h-16 w-16 sm:h-20 sm:w-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-inner">
                <i className="fa-solid fa-wand-magic-sparkles text-2xl sm:text-3xl text-slate-300"></i>
              </div>
              <p className="text-[10px] sm:text-xs text-center">
                 Select a concept from above to begin your journey
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}