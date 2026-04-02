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

  const fetchGeminiData = async (subjectName) => {
    setIsLoadingGemini(true);
    setGeminiData("");
    
    try {
      // 🌟 Vite check: import.meta.env.VITE_... use karein
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      console.log("Checking API Key availability...", apiKey ? "Key Found ✅" : "Key Missing ❌");

      if (!apiKey) {
        setGeminiData("🚨 Error: VITE_GEMINI_API_KEY is not defined in .env file.");
        setIsLoadingGemini(false);
        return;
      }

      const promptText = `Explain the subject '${subjectName}' in two distinct parts. 
      Part 1: A precise scientific and factual definition. 
      Part 2: How this knowledge practically applies to human life and philosophy. 
      Keep it simple, clear, and around 150 words total. No markdown stars.`;

      // 🚀 Standard v1beta Endpoint for Gemini 1.5 Flash
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });

      const data = await response.json();
      console.log("Full API Response:", data); // Isse Console me pura error dikhega

      if (!response.ok) {
        setGeminiData(`🚨 Error ${response.status}: ${data.error?.message || "Something went wrong"}`);
        return;
      }

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setGeminiData(data.candidates[0].content.parts[0].text);
      } else {
        setGeminiData("🚨 Received an empty response from Gemini.");
      }

    } catch (e) {
      console.error("Catch Block Error:", e);
      setGeminiData("🚨 Connection failed. Check Console (F12) for details.");
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
    <div className="max-w-5xl mx-auto space-y-10 py-10 px-4 md:px-0">
      
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Science for the <span className="text-teal-600">How</span>.<br />
          Philosophy for the <span className="text-indigo-600">Why</span>.
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 font-medium text-sm md:text-base leading-relaxed">
          Uniting Science and Philosophy to elevate daily life.
        </p>
      </div>

      <div className="-mx-4 md:mx-0 bg-white md:border border-slate-200 md:rounded-[2rem] overflow-hidden shadow-sm flex flex-col md:flex-row h-[70vh] min-h-[500px]">
        
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0">
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto p-3 gap-2 no-scrollbar">
            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => handleSubjectClick(sub)}
                className={`shrink-0 md:w-full text-left px-5 py-3 md:py-4 rounded-xl transition-all font-bold text-sm ${
                  activeSubject?.id === sub.id ? 'bg-slate-900 text-white shadow-md' : 'bg-white md:bg-transparent text-slate-600'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-white relative">
          {activeSubject ? (
            <div className="animate-fade-in max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8">
                {activeSubject.name}
              </h3>

              <div className="space-y-4">
                {isLoadingGemini ? (
                  <div className="flex items-center gap-3 text-slate-400 font-bold text-sm py-10">
                    <div className="h-5 w-5 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
                    Synthesizing...
                  </div>
                ) : (
                  <div className="space-y-6">
                    {geminiData.startsWith("🚨") ? (
                       <div className="p-4 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 text-sm font-bold">
                         {geminiData}
                       </div>
                    ) : (
                      geminiData.split('\n\n').map((paragraph, idx) => (
                        <div key={idx} className={idx === 1 ? "bg-slate-50 p-6 rounded-2xl border border-slate-200" : ""}>
                          {idx === 1 && <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-3">Life Application</h4>}
                          <p className="text-slate-700 text-lg leading-relaxed font-medium">
                            {paragraph}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-xs">
               Select a topic
            </div>
          )}
        </div>
      </div>
    </div>
  );
      }
