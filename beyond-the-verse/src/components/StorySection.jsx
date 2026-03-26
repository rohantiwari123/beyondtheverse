import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function StorySection() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "subjects"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* 🌟 Custom Scrollbar Styles for Cards 🌟 */}
      <style>{`
        .carousel-container::-webkit-scrollbar { height: 8px; }
        .carousel-container::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .carousel-container::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .carousel-container::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        .card-text-scroll::-webkit-scrollbar { width: 4px; }
        .card-text-scroll::-webkit-scrollbar-track { background: transparent; }
        .card-text-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .card-text-scroll::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>

      {/* 1. Hero Banner */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 rounded-2xl p-8 md:p-10 text-white shadow-xl overflow-hidden relative border border-teal-700/50">
        <div className="relative z-10 flex flex-col items-start">
          <span className="bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            An Intellectual & Educational Initiative
          </span>
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

        {/* 🌟 NAYA: DYNAMIC CAROUSEL SECTION (100% Working Images) 🌟 */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl pt-6 pb-2 overflow-hidden">
          <div className="px-6 mb-4">
            <h4 className="font-bold text-slate-800 mb-1 text-sm uppercase tracking-wider flex items-center gap-2">
              <i className="fa-solid fa-layer-group text-teal-500"></i> Fields of Study
            </h4>
            <p className="text-xs text-slate-500">
              Swipe left to explore and read the full definitions.
            </p>
          </div>
          
          {/* Carousel Wrapper */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 px-6 pb-6 carousel-container">
            {subjects.length === 0 ? (
               <p className="text-sm text-slate-400 italic w-full text-center py-10">No subjects added yet.</p>
            ) : (
              subjects.map((sub) => (
                <div 
                  key={sub.id} 
                  className="snap-center shrink-0 w-72 sm:w-80 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group"
                >
                  {/* Super Fast Seed Image Engine */}
                  <div className="h-36 bg-slate-800 relative overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${encodeURIComponent(sub.name)}/400/200`} 
                      alt={sub.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = 'https://picsum.photos/400/200?blur=2'; }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h4 className="text-white font-extrabold text-lg leading-tight shadow-sm notranslate">
                        {sub.name}
                      </h4>
                    </div>
                  </div>

                  {/* Scrollable Text Body (Full Text) */}
                  <div className="p-5 flex-1 flex flex-col bg-white">
                    <div className="max-h-36 overflow-y-auto pr-3 card-text-scroll">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {sub.definition}
                      </p>
                    </div>
                  </div>
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
