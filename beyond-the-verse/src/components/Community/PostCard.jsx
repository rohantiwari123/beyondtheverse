import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import CommentBox from './CommentBox'; // 🌟 CommentBox import kiya

export default function PostCard({ post, showToast }) {
  const { isAuthenticated, userId, userName, isAdmin } = useAuth();
  
  const [activeGate, setActiveGate] = useState(null);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interactions = post.interactions || [];
  
  // 🌟 NAYA LOGIC: Check karo ki kya is user ne pehle se interact kiya hai
  const hasInteracted = interactions.some(i => i.userId === userId);

  const supportCount = interactions.filter(i => i.type === 'support').length;
  const counterCount = interactions.filter(i => i.type === 'counter').length;
  const doubtCount = interactions.filter(i => i.type === 'doubt').length;

  // 🛡️ ADMIN: Delete Function
  const handleDelete = async () => {
    if (!window.confirm("Admin: Delete this thought?")) return;
    try {
      await deleteDoc(doc(db, "posts", post.id));
      showToast("Thought deleted! 🗑️");
    } catch (e) { showToast("Delete failed.", false); }
  };

  // 🛡️ ADMIN: Pin Function
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
    support: "text-emerald-500 bg-emerald-50 border-emerald-200",
    counter: "text-rose-500 bg-rose-50 border-rose-200",
    doubt: "text-amber-500 bg-amber-50 border-amber-200"
  };

  return (
    <div className={`bg-white sm:rounded-[2rem] p-6 border-y sm:border border-slate-100 shadow-sm relative overflow-hidden group ${post.isPinned ? 'ring-2 ring-teal-500/50 bg-teal-50/10' : ''}`}>
      
      {/* 📌 Pinned Badge */}
      {post.isPinned && (
        <div className="absolute top-0 right-10 bg-teal-600 text-white text-[9px] font-black px-3 py-1 rounded-b-xl uppercase tracking-widest">
          Pinned
        </div>
      )}

      {/* Header Info & Admin Controls */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center font-black text-white shadow-md">
            {post.userName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm leading-tight">{post.userName}</h4>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.category}</span>
          </div>
        </div>

        {/* 🛡️ Admin Buttons */}
        {isAdmin && (
          <div className="flex gap-2">
            <button onClick={handlePin} className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${post.isPinned ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400 hover:text-teal-600'}`}>
              <i className="fa-solid fa-thumbtack text-xs"></i>
            </button>
            <button onClick={handleDelete} className="h-8 w-8 bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
              <i className="fa-solid fa-trash-can text-xs"></i>
            </button>
          </div>
        )}
      </div>

      <p className="text-slate-700 font-medium leading-relaxed italic text-lg mb-6">"{post.text}"</p>

      {/* 🚀 THE 3 PILLARS */}
      <div className={`flex flex-wrap gap-3 pt-4 border-t border-slate-50 ${hasInteracted ? 'opacity-70' : ''}`}>
        <button onClick={() => handleGateClick('support')} disabled={hasInteracted} className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl border transition-all ${activeGate === 'support' ? gateColors.support : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100'} ${hasInteracted ? 'cursor-not-allowed' : ''}`}>
          <i className="fa-solid fa-check-double mb-1 text-lg"></i>
          <span className="text-[10px] font-black uppercase">Support ({supportCount})</span>
        </button>

        <button onClick={() => handleGateClick('counter')} disabled={hasInteracted} className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl border transition-all ${activeGate === 'counter' ? gateColors.counter : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100'} ${hasInteracted ? 'cursor-not-allowed' : ''}`}>
          <i className="fa-solid fa-bolt mb-1 text-lg"></i>
          <span className="text-[10px] font-black uppercase">Counter ({counterCount})</span>
        </button>

        <button onClick={() => handleGateClick('doubt')} disabled={hasInteracted} className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl border transition-all ${activeGate === 'doubt' ? gateColors.doubt : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100'} ${hasInteracted ? 'cursor-not-allowed' : ''}`}>
          <i className="fa-solid fa-microscope mb-1 text-lg"></i>
          <span className="text-[10px] font-black uppercase">Doubt ({doubtCount})</span>
        </button>
      </div>

      {/* 🔒 Message if user has already interacted */}
      {hasInteracted && (
        <div className="mt-3 text-center">
          <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-widest">
            <i className="fa-solid fa-lock mr-1"></i> Response Locked
          </span>
        </div>
      )}

      {/* Input Box (Only opens if not interacted) */}
      {activeGate && !hasInteracted && (
        <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 animate-fade-in">
          <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-2">
            {activeGate === 'support' && "Provide supporting evidence/logic:"}
            {activeGate === 'counter' && "State the logical flaw or exception:"}
            {activeGate === 'doubt' && "What exactly is unclear to you?"}
          </label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Minimum 15 characters required..." className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:ring-2 focus:ring-slate-300 resize-none mb-3" rows="2" />
          <div className="flex justify-between items-center">
            <span className={`text-[10px] font-bold ${reason.length < 15 ? 'text-rose-400' : 'text-emerald-500'}`}>{reason.length}/15 chars</span>
            <button onClick={handleSubmitReason} disabled={reason.length < 15 || isSubmitting} className="bg-slate-900 text-white px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider disabled:opacity-30">
              {isSubmitting ? "Submitting..." : "Submit Logic"}
            </button>
          </div>
        </div>
      )}

      {/* 🌟 DISCUSSIONS SHOWCASE (Naya Comment Box) */}
      <CommentBox interactions={interactions} />

    </div>
  );
        }
