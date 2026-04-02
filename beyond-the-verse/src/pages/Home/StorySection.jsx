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

  // 2. 🚀 THE FINAL STABLE GEMINI CALL (v1 Version)
  const fetchGeminiData = async (subjectName) => {
    setIsLoadingGemini(true);
    setGeminiData("");
    
    // GitHub Actions se inject hui key yahan se uthayega
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    try {
      // 🌟 STABLE ENDPOINT: Switching to 'v1' instead of 'v1beta'
      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: `Explain '${subjectName}' for a life-philosophy platform. 
              Paragraph 1: Precise scientific definition. 
              Paragraph 2: Practical life application (How it elevates human life). 
              Keep it simple, strictly text, no markdown/stars.` 
            }] 
          }]
        })
      });

      const data = await response.json();

      if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
        setGeminiData(data.candidates[0].content.parts[0].text);
      } else {
        // Asli Error yahan screen par dikhega agar abhi bhi fail hua
        const errorMsg = data.error?.message || "AI response failed. Check API dashboard.";
        setGeminiData(`🚨 Error: ${errorMsg}`);
        console.error("Gemini Failure Detail:", data);
      }
    } catch (err) {
      setGeminiData("🚨 Connection failed. Please check internet.");
      console.error("Fetch Error:", err);
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
      
      {/* Header Section */}
      <div className="text-center space-y-4 mb-8 px-4">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Science for the <span className="text-teal-600">How</span>.<br />
          Philosophy for the <span className="text-indigo-600">Why</span>.
        </h2>
        <p className="max-w-2xl mx-auto text-slate-500 font-medium text-sm md:text-base leading-relaxed">
          Beyond the Verse: Uniting scientific mechanics with philosophical purpose.
        </p>
      </div>

      {/* Explorer Container (Edge-to-Edge on Mobile) */}
      <div className="-mx-4 md:mx-0 bg-white md:border border-slate-200 md:rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col md:flex-row h-[75vh] min-h-[550px]">
        
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0">
          <div className="hidden md:block p-6 border-b border-slate-200">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-[10px]">Research Library</h3>
          </div>
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto p-3 gap-2 no-scrollbar">
            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => handleSubjectClick(sub)}
                className={`shrink-0 md:w-full text-left px-5 py-3 md:py-4 rounded-xl transition-all font-bold text-sm border md:border-none ${
                  activeSubject?.id === sub.id ? 'bg-slate-900 text-white shadow-md border-slate-900' : 'bg-white md:bg-transparent text-slate-600 border-slate-200'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>

        {/* AI Content Area (Scrollable) */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-white scroll-smooth">
          {activeSubject ? (
            <div className="animate-fade-in max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8 uppercase italic">
                {activeSubject.name}
              </h3>

              <div className="space-y-4">
                {isLoadingGemini ? (
                  <div className="py-20 flex flex-col items-center gap-4 text-slate-400 font-bold text-sm">
                    <div className="h-8 w-8 border-4 border-slate-100 border-t-teal-500 rounded-full animate-spin"></div>
                    <span className="animate-pulse">Accessing consciousness...</span>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {geminiData.startsWith("🚨") ? (
                      <div className="p-5 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 text-xs font-mono">
                        {geminiData}
                      </div>
                    ) : (
                      geminiData.split('\n\n').map((paragraph, idx) => (
                        <div key={idx} className={idx === 1 ? "bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner" : ""}>
                          {idx === 1 && <h4 className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-3 flex items-center gap-2"><i className="fa-solid fa-bolt"></i> Life Application</h4>}
                          <p className="text-slate-800 text-lg leading-[1.8] font-medium">{paragraph}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">Select a Topic to Explore</div>
          )}
        </div>
      </div>
    </div>
  );
        }
