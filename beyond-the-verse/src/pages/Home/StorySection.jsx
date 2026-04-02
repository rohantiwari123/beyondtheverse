import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

// 🌟 Helper: Generate a consistent, beautiful color theme based on Subject Name
const getTheme = (name = "") => {
  const themes = [
    { bg: 'bg-teal-50', text: 'text-teal-600' },
    { bg: 'bg-indigo-50', text: 'text-indigo-600' },
    { bg: 'bg-rose-50', text: 'text-rose-600' },
    { bg: 'bg-amber-50', text: 'text-amber-600' },
    { bg: 'bg-sky-50', text: 'text-sky-600' },
    { bg: 'bg-purple-50', text: 'text-purple-600' },
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return themes[Math.abs(hash) % themes.length];
};

export default function StorySection({ showToast }) {
  const { isAuthenticated, userId } = useAuth();
  const navigate = useNavigate();
  
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [processingId, setProcessingId] = useState(null); 
  const [expandedId, setExpandedId] = useState(null); // 🌟 NAYA: Track which topic is expanded

  // Fetch Subjects
  useEffect(() => {
    const q = query(collection(db, "subjects"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Follow / Unfollow Logic
  const handleFollowToggle = async (subjectId, currentFollowers = []) => {
    if (!isAuthenticated) {
      if(showToast) showToast("Please login to follow topics.", false);
      navigate('/login');
      return;
    }
    
    if (processingId) return;
    setProcessingId(subjectId);

    const isFollowing = currentFollowers.includes(userId);
    const subjectRef = doc(db, "subjects", subjectId);

    try {
      await updateDoc(subjectRef, {
        followers: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
      });
      if(showToast) showToast(isFollowing ? "Unfollowed topic." : "Following topic!");
    } catch (error) {
      if(showToast) showToast("Failed to update status.", false);
    } finally {
      setProcessingId(null);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id); // Close if already open, else open
  };

  const filteredSubjects = subjects.filter(sub => 
    sub.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sub.definition?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto space-y-12 md:space-y-16 py-8 md:py-12 px-4 md:px-0">
      
      {/* 🌟 1. HERO SECTION */}
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
          Science for the <span className="text-teal-600">mechanics</span>.<br className="hidden md:block" />
          Philosophy for the <span className="text-indigo-600">purpose</span>.
        </h2>
        <p className="mt-4 text-slate-500 text-sm md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          We destroy the artificial boundaries between exploring the universe and exploring the self. Join the research.
        </p>
      </div>

      {/* 🌟 2. BENTO BOX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
          <div className="h-12 w-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
            <i className="fa-solid fa-microscope text-xl"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">The Outer World</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Observation, facts, and rigorous experimentation. Science is a profound way of seeing reality exactly as it is, without blind faith.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
          <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <i className="fa-solid fa-brain text-xl"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">The Inner Observer</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              If you observe the stars but ignore the mind observing them, your knowledge is incomplete. Philosophy is the science of the self.
            </p>
          </div>
        </div>
      </div>

      {/* 🌟 3. ACTIVE RESEARCH (NEW ACCORDION LIST SYSTEM) */}
      <div className="pt-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Research Topics</h3>
            <p className="text-sm text-slate-500 font-medium">Click on a topic to read its definition.</p>
          </div>
          
          <div className="relative w-full sm:w-64 shrink-0">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input 
              type="text" 
              placeholder="Search topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-sm"
            />
          </div>
        </div>

        {/* The List Container */}
        <div className="space-y-3">
          {filteredSubjects.length === 0 ? (
             <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-sm font-medium">
               No topics found matching your search.
             </div>
          ) : (
            filteredSubjects.map((sub) => {
              const followers = sub.followers || [];
              const isFollowing = isAuthenticated && followers.includes(userId);
              const theme = getTheme(sub.name);
              const isExpanded = expandedId === sub.id;

              return (
                <div key={sub.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                  
                  {/* List Header (Always Visible, Click to Expand) */}
                  <div 
                    onClick={() => toggleExpand(sub.id)}
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 select-none transition-colors"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`h-10 w-10 ${theme.bg} ${theme.text} rounded-xl flex items-center justify-center shrink-0`}>
                        <i className="fa-solid fa-book-open text-sm"></i>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base md:text-lg">{sub.name}</h4>
                    </div>
                    
                    <div className="flex items-center gap-3 md:gap-5">
                      <span className="hidden md:inline-block text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {followers.length} Following
                      </span>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'bg-slate-900 text-white rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>

                  {/* Body (Expanded Content) */}
                  {isExpanded && (
                    <div className="p-5 md:p-6 bg-slate-50 border-t border-slate-100 animate-fade-in">
                      <p className="text-slate-700 text-[15px] leading-relaxed font-medium mb-6">
                        {sub.definition}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="md:hidden text-[11px] font-bold text-slate-500 bg-slate-200/50 px-2.5 py-1 rounded-md">
                          {followers.length} Following
                        </span>
                        
                        <button 
                          onClick={() => handleFollowToggle(sub.id, followers)}
                          disabled={processingId === sub.id}
                          className={`ml-auto px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-colors border shadow-sm ${
                            isFollowing 
                            ? 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100' 
                            : 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700'
                          }`}
                        >
                          {processingId === sub.id ? "Wait..." : isFollowing ? "Following" : "Follow Topic"}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )
            })
          )}
        </div>
      </div>

      {/* 🌟 4. RULES OF ENGAGEMENT */}
      <div className="pt-4">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4 text-center md:text-left">Rules of Engagement</h3>
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          {[
            { num: "01", title: "Radical Objectivity", desc: "Leave your biases at the door. Test ideas on logic and evidence." },
            { num: "02", title: "Intellectual Honesty", desc: "Admit what you don't know. Investigate without prejudice." },
            { num: "03", title: "Constructive Dialogue", desc: "Our goal is to develop clarity, not to win cheap internet arguments." }
          ].map((item, i) => (
            <div key={i} className="flex gap-5 items-start pb-6 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="text-sm font-black text-teal-600 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-lg mt-0.5">
                {item.num}
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h5>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 5. CTA */}
      <div className="pb-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="h-14 w-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 shrink-0 border border-slate-100 shadow-sm">
              <i className="fa-brands fa-whatsapp text-2xl"></i>
            </div>
            <div>
              <h4 className="text-slate-900 font-black text-lg mb-1 tracking-tight">Join the inner circle</h4>
              <p className="text-slate-500 text-sm font-medium">Debate, discuss, and evolve with us on WhatsApp.</p>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            {isAuthenticated ? (
              <a 
                href="https://chat.whatsapp.com/EXTq8cGEOcwAcrZN8fr4qw?mode=gi_t_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition-colors text-sm shadow-sm"
              >
                Enter Community
              </a>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-full transition-colors text-sm shadow-sm"
              >
                <i className="fa-solid fa-lock text-slate-400"></i> Login to Unlock
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
                  }
