import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function StorySection() {
  const [subjects, setSubjects] = useState([]);
  const [activeDef, setActiveDef] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "subjects"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. Hero Banner */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 rounded-2xl p-8 md:p-10 text-white shadow-xl overflow-hidden relative border border-teal-700/50">
        <div className="relative z-10 flex flex-col items-start">
          <span className="bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            An Intellectual & Educational Initiative
          </span>
          {/* 🌟 'notranslate' applied here 🌟 */}
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200 notranslate">
            Beyond The Verse
          </h2>
          <p className="text-teal-100 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
            An honest effort to understand reality by ending the artificial division between science and philosophy.
          </p>
        </div>
        <i className="fa-solid fa-atom absolute -bottom-10 -right-10 text-[180px] text-teal-600 opacity-20 rotate-12"></i>
      </div>

      {/* 2. Main Philosophy Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
        
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-eye-low-vision text-teal-600"></i> The Purpose Behind This Initiative
          </h3>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-slate-600 leading-relaxed space-y-3">
            <p>
              Today, <strong>Science</strong> has merely become a subject. People read it, score marks in exams, but it is not reflected in their lives, decisions, and perspectives. Similarly, <strong>Philosophy</strong> has also become an intellectual exercise—read but not understood; repeated but not lived.
            </p>
            <p>
              On one hand, there is a person who limits science only to external objects, and on the other, someone who rejects science in the name of spirituality or philosophy.
              <span className="block mt-2 font-semibold text-teal-700 bg-teal-50 p-2 rounded-lg border border-teal-100">
                {/* 🌟 'notranslate' applied here 🌟 */}
                <span className="notranslate font-bold">Beyond The Verse</span> aims to end this artificial division. If reality is one, then all attempts to understand it must be complementary, not contradictory.
              </span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-300 transition-colors shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-microscope text-teal-500 text-lg"></i> Scientific Vision
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              This platform does not limit science to formulas and laboratories, but sees it as a <strong>way of seeing</strong>. The true meaning of science is—observation, experimentation, and unprejudiced understanding.
            </p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-300 transition-colors shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-brain text-teal-500 text-lg"></i> Philosophy & Self-Observation
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Just as we observe the external world with a scientific view, we can similarly observe our inner selves—thoughts, emotions, and reactions. This is the true purpose of philosophy.
            </p>
          </div>
        </div>

        {/* 🌟 Dynamic Subjects Area 🌟 */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-6">
          <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider text-center flex justify-center items-center gap-2">
            <i className="fa-solid fa-globe text-teal-500"></i> Fields of Study
          </h4>
          <p className="text-xs text-center text-slate-500 mb-5 max-w-2xl mx-auto">
            Click on any subject to understand its meaning:
          </p>
          
          <div className="flex flex-wrap justify-center gap-2.5">
            {subjects.length === 0 ? (
               <p className="text-sm text-slate-400 italic">No subjects added yet.</p>
            ) : (
              subjects.map((sub) => (
                <div key={sub.id} className="relative group">
                  <button 
                    onClick={() => setActiveDef(activeDef === sub.id ? null : sub.id)}
                    className="bg-white hover:bg-teal-50 border border-slate-200 text-slate-700 hover:text-teal-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-2 outline-none"
                  >
                    {sub.name} <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${activeDef === sub.id ? 'rotate-180 text-teal-600' : ''}`}></i>
                  </button>

                  {/* Definition Tooltip Box */}
                  {activeDef === sub.id && (
                    <div className="absolute z-50 mt-2 w-72 bg-slate-800 text-slate-200 text-xs p-4 rounded-xl shadow-2xl border border-slate-700 left-1/2 -translate-x-1/2">
                      <p className="leading-relaxed">{sub.definition}</p>
                      
                      <button 
                        onClick={() => setActiveDef(null)}
                        className="mt-3 w-full bg-slate-700 hover:bg-slate-600 py-1.5 rounded text-slate-300 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 3. Rules & Ethics */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-center text-teal-400">
          Code of Conduct & Intellectual Vision
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <i className="fa-solid fa-scale-balanced text-teal-400 text-xl mt-1"></i>
            <div>
              <h5 className="font-bold text-slate-200">Objectivity</h5>
              <p className="text-xs text-slate-400 mt-1">Ideas will be tested based on logic and evidence, not on personal beliefs.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <i className="fa-solid fa-shield-halved text-teal-400 text-xl mt-1"></i>
            <div>
              <h5 className="font-bold text-slate-200">Intellectual Honesty</h5>
              <p className="text-xs text-slate-400 mt-1">No conclusion will be accepted without adequate investigation and observation.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <i className="fa-solid fa-comments text-teal-400 text-xl mt-1"></i>
            <div>
              <h5 className="font-bold text-slate-200">Purpose of Dialogue</h5>
              <p className="text-xs text-slate-400 mt-1">Our goal is to develop clarity and understanding—not to win arguments.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <i className="fa-solid fa-ban text-teal-400 text-xl mt-1"></i>
            <div>
              <h5 className="font-bold text-slate-200">No-Spam Policy</h5>
              <p className="text-xs text-slate-400 mt-1">Irrelevant messages, promotional content, and emotional reactions will not be encouraged.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Call to Action */}
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 text-center space-y-4">
        <p className="text-teal-800 font-medium italic">
          "This is an invitation—not just to gather information, but to join an honest process of seeing, testing, and understanding."
        </p>
        
        <div className="flex justify-center pt-2">
          <a 
            href="https://chat.whatsapp.com/EXTq8cGEOcwAcrZN8fr4qw?mode=gi_t_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold py-3 px-6 rounded-xl transition-transform transform hover:scale-105 shadow-lg shadow-green-500/30"
          >
            <i className="fa-brands fa-whatsapp text-2xl"></i>
            Join WhatsApp Group
          </a>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          This initiative is non-commercial. Your voluntary contribution is accepted through the form below.
        </p>
      </div>

    </div>
  );
            }
