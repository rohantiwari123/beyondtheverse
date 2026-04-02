import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import CommentBox from './CommentBox'; 

export default function PostCard({ post, showToast }) {
  const { isAuthenticated, userId, userName, isAdmin } = useAuth();
  
  const [activeGate, setActiveGate] = useState(null);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const interactions = post.interactions || [];
  const hasInteracted = interactions.some(i => i.userId === userId);

  const supportCount = interactions.filter(i => i.type === 'support').length;
  const counterCount = interactions.filter(i => i.type === 'counter').length;
  const doubtCount = interactions.filter(i => i.type === 'doubt').length;

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "posts", post.id));
      showToast("Thought deleted! 🗑️");
    } catch (e) { 
      showToast("Delete failed.", false); 
    }
  };

  const handlePin = async () => {
    try {
      await updateDoc(doc(db, "posts", post.id), { isPinned: !post.isPinned });
      showToast(post.isPinned ? "Unpinned!" : "Pinned to top! 📌");
    } catch (e) { showToast("Pin failed.", false); }
  };

  const handleGateClick = (gateType) => {
    if (!isAuthenticated) return showToast("🔐 Please login to interact!", false);
    if (hasInteracted) return showToast("Aapne apna logic pehle hi de diya hai! 🛑", false);
    setActiveGate(activeGate === gateType ? null : gateType);
    setReason("");
  };

  const handleSubmitReason = async () => {
    if (reason.trim().length < 15 || hasInteracted) return;
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "posts", post.id), {
        interactions: arrayUnion({
          userId,
          userName: userName || "Explorer",
          type: activeGate,
          text: reason,
          timestamp: new Date().toISOString()
        })
      });
      showToast("Logic recorded successfully! 🔬");
      setActiveGate(null);
      setReason("");
    } catch (e) { showToast("Failed to record.", false); } 
    finally { setIsSubmitting(false); }
  };

  const gateColors = {
    support: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-sm shadow-emerald-100",
    counter: "text-rose-600 bg-rose-50 border-rose-100 shadow-sm shadow-rose-100",
    doubt: "text-amber-600 bg-amber-50 border-amber-100 shadow-sm shadow-amber-100"
  };

  return (
    <div className={`bg-white md:rounded-[2.5rem] p-5 md:p-8 border-b md:border border-slate-100 transition-all relative ${post.isPinned ? 'ring-2 ring-teal-500/20 bg-teal-50/5' : ''}`}>
      
      {/* 📌 Pinned Badge - Modern Floating Style */}
      {post.isPinned && (
        <div className="absolute top-0 right-6 md:right-10 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-[8px] font-black px-4 py-1.5 rounded-b-2xl uppercase tracking-[0.2em] shadow-lg shadow-teal-500/30 flex items-center gap-1.5 z-10">
          <i className="fa-solid fa-thumbtack rotate-12"></i> Pinned
        </div>
      )}

      {/* Header: User Profile & Admin Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-10 w-10 md:h-12 md:w-12 bg-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-white text-base md:text-lg shadow-xl shadow-slate-900/10">
            {post.userName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-xs md:text-sm tracking-tight">{post.userName}</h4>
            <div className="flex items-center gap-2 mt-0.5">
               <span className="text-[9px] md:text-[10px] bg-slate-100 text-slate-500 font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">{post.category}</span>
               <span className="text-[9px] md:text-[10px] text-slate-300 font-bold tracking-tight">Just Now</span>
            </div>
          </div>
        </div>

        {/* Admin Controls: Sleek Capsule UI */}
        {isAdmin && (
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-100">
            <button onClick={handlePin} className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all ${post.isPinned ? 'bg-teal-500 text-white shadow-md' : 'text-slate-400 hover:bg-white hover:text-teal-600'}`}>
              <i className="fa-solid fa-thumbtack text-[10px]"></i>
            </button>
            
            {showDeleteConfirm ? (
              <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white border border-rose-100 animate-fade-in shadow-sm">
                <button onClick={confirmDelete} className="h-6 w-6 text-emerald-500 hover:scale-110 transition-transform">
                  <i className="fa-solid fa-check text-[10px]"></i>
                </button>
                <div className="w-[1px] h-3 bg-slate-100"></div>
                <button onClick={() => setShowDeleteConfirm(false)} className="h-6 w-6 text-rose-500 hover:scale-110 transition-transform">
                  <i className="fa-solid fa-xmark text-[10px]"></i>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowDeleteConfirm(true)} 
                className="h-8 w-8 text-slate-400 hover:text-rose-500 hover:bg-white rounded-xl transition-all"
              >
                <i className="fa-solid fa-trash-can text-[10px]"></i>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Thought Text - SMART FONT APPLIED HERE */}
      {/* Main Thought Text */}
<div className="mb-8">
  <p className="text-slate-800 md:text-2xl text-lg verse-thought-serif">
  {post.text}
</p>
</div>

      {/* Interaction Pillars - Grid Style */}
      <div className={`grid grid-cols-3 gap-2 md:gap-4 pt-6 border-t border-slate-50 transition-all ${hasInteracted ? 'opacity-40 grayscale-[0.8] pointer-events-none' : ''}`}>
        <button onClick={() => handleGateClick('support')} className={`flex flex-col items-center justify-center py-3.5 rounded-2xl border-2 transition-all active:scale-90 ${activeGate === 'support' ? gateColors.support : 'bg-slate-50/50 border-transparent text-slate-400 hover:bg-white hover:border-slate-100'}`}>
          <i className={`fa-solid fa-check-double mb-1 text-base md:text-xl ${activeGate === 'support' ? 'animate-bounce' : ''}`}></i>
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter">Support • {supportCount}</span>
        </button>

        <button onClick={() => handleGateClick('counter')} className={`flex flex-col items-center justify-center py-3.5 rounded-2xl border-2 transition-all active:scale-90 ${activeGate === 'counter' ? gateColors.counter : 'bg-slate-50/50 border-transparent text-slate-400 hover:bg-white hover:border-slate-100'}`}>
          <i className={`fa-solid fa-bolt mb-1 text-base md:text-xl ${activeGate === 'counter' ? 'animate-pulse' : ''}`}></i>
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter">Counter • {counterCount}</span>
        </button>

        <button onClick={() => handleGateClick('doubt')} className={`flex flex-col items-center justify-center py-3.5 rounded-2xl border-2 transition-all active:scale-90 ${activeGate === 'doubt' ? gateColors.doubt : 'bg-slate-50/50 border-transparent text-slate-400 hover:bg-white hover:border-slate-100'}`}>
          <i className={`fa-solid fa-microscope mb-1 text-base md:text-xl ${activeGate === 'doubt' ? 'animate-spin-slow' : ''}`}></i>
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter">Doubt • {doubtCount}</span>
        </button>
      </div>

      {/* Interactive Form Area - Dark Space Theme */}
      {activeGate && !hasInteracted && (
        <div className="mt-5 p-5 md:p-7 bg-slate-900 rounded-[2rem] shadow-2xl animate-fade-in-up relative overflow-hidden group">
          {/* Background Decorative Icon */}
          <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
             <i className={`fa-solid ${activeGate === 'support' ? 'fa-check-double' : activeGate === 'counter' ? 'fa-bolt' : 'fa-microscope'} text-8xl text-white`}></i>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
             <div className="h-2 w-2 bg-teal-400 rounded-full animate-pulse"></div>
             <label className="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em]">
              {activeGate === 'support' && "Validating Logic"}
              {activeGate === 'counter' && "Logical Refutation"}
              {activeGate === 'doubt' && "Seek Clarification"}
            </label>
          </div>
          
          <textarea 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            placeholder="Structure your logic precisely..." 
            className="w-full bg-slate-800/50 border-none rounded-2xl p-4 text-sm md:text-base text-white placeholder:text-slate-600 focus:ring-1 focus:ring-teal-500/30 resize-none mb-4 transition-all" 
            rows="3" 
          />
          
          <div className="flex justify-between items-center relative z-10">
            <div className="flex flex-col">
              <span className={`text-[9px] font-black uppercase tracking-widest ${reason.length < 15 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {reason.length < 15 ? `Min 15 chars: ${15 - reason.length} left` : "Ready for the Verse"}
              </span>
            </div>
            <button 
              onClick={handleSubmitReason} 
              disabled={reason.length < 15 || isSubmitting} 
              className="bg-teal-500 hover:bg-teal-400 text-slate-900 px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] disabled:bg-slate-700 disabled:text-slate-500 transition-all active:scale-95 shadow-xl shadow-teal-500/20"
            >
              {isSubmitting ? "TRANSMITTING..." : "RECORD LOGIC"}
            </button>
          </div>
        </div>
      )}

      {/* Post Action Footer: Submission Status */}
      {hasInteracted && (
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-teal-50/50 px-6 py-2.5 rounded-full border border-teal-100 shadow-inner">
            <i className="fa-solid fa-shield-halved text-teal-500 text-xs"></i>
            <span className="text-[9px] md:text-[10px] font-black text-teal-800 uppercase tracking-[0.15em]">Your logic has been preserved in the Verse</span>
          </div>
        </div>
      )}

      {/* Discussion Thread */}
      <div className="mt-8 md:mt-10">
        <CommentBox interactions={interactions} />
      </div>

    </div>
  );
}