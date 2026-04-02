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
  const [availableModels, setAvailableModels] = useState([]); // 🌟 Models list store karne ke liye

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

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

  // 🌟 2. DEBUG: ListModels Call (Isse pata chalega kaunsa model chalega)
  const listModels = async () => {
    setGeminiData("🔍 Fetching available models list...");
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      const data = await response.json();
      if (data.models) {
        const modelNames = data.models.map(m => m.name.replace("models/", ""));
        setAvailableModels(modelNames);
        setGeminiData(`✅ Available Models: ${modelNames.join(", ")}`);
        console.log("Allowed Models:", data.models);
      } else {
        setGeminiData(`🚨 Error listing models: ${data.error?.message || "Unknown error"}`);
      }
    } catch (err) {
      setGeminiData("🚨 Failed to reach Google for model listing.");
    }
  };

  // 3. Main AI Fetch
  const fetchGeminiData = async (subjectName) => {
    setIsLoadingGemini(true);
    setGeminiData("");
    
    if (!apiKey) {
      setGeminiData("🚨 VITE_GEMINI_API_KEY is missing!");
      setIsLoadingGemini(false);
      return;
    }

    try {
      // ⚠️ We use 'gemini-1.5-flash' here. If it fails, use the ListModels button below.
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Explain '${subjectName}' in simple terms: 1. Science 2. Life Application.` }] }]
        })
      });

      const data = await response.json();

      if (response.ok && data.candidates) {
        setGeminiData(data.candidates[0].content.parts[0].text);
      } else {
        setGeminiData(`🚨 Error: ${data.error?.message || "Response failed"}`);
      }
    } catch (err) {
      setGeminiData("🚨 Connection failed.");
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
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase italic">
          Science & <span className="text-teal-600">Philosophy</span>
        </h2>
      </div>

      <div className="-mx-4 md:mx-0 bg-white md:border border-slate-200 md:rounded-[2.5rem] shadow-sm flex flex-col md:flex-row h-[70vh] min-h-[550px]">
        
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

        {/* Content */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-white scroll-smooth relative">
          {activeSubject ? (
            <div className="animate-fade-in max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8 uppercase italic leading-none">
                {activeSubject.name}
              </h3>

              <div className="space-y-4">
                {isLoadingGemini ? (
                  <div className="py-20 flex flex-col items-center gap-4 text-slate-400 font-bold text-sm">
                    <div className="h-8 w-8 border-4 border-slate-100 border-t-teal-500 rounded-full animate-spin"></div>
                    <span className="animate-pulse">Loading...</span>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {geminiData.split('\n\n').map((paragraph, idx) => (
                      <div key={idx} className={idx === 1 ? "bg-slate-50 p-6 rounded-2xl border border-slate-200" : ""}>
                        {idx === 1 && <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-3">Life Application</h4>}
                        <p className="text-slate-800 text-lg leading-[1.8] font-medium">{paragraph}</p>
                      </div>
                    ))}
                    
                    {/* 🌟 DEBUG BUTTON: Jab error aaye toh ise click karein */}
                    {geminiData.includes("🚨") && (
                      <div className="mt-10 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
                        <p className="text-xs font-bold text-amber-700 mb-4">Google isn't finding the Flash model. Let's find out what's allowed:</p>
                        <button 
                          onClick={listModels}
                          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                          Check Available Models
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">Select a Topic</div>
          )}
        </div>
      </div>
    </div>
  );
    }
