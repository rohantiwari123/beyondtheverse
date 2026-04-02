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
      showToast("Deleted! 🗑️");
    } catch (e) { showToast("Failed.", false); }
  };

  const handlePin = async () => {
    try {
      await updateDoc(doc(db, "posts", post.id), { isPinned: !post.isPinned });
    } catch (e) { console.error(e); }
  };

  const handleGateClick = (gateType) => {
    if (!isAuthenticated) return showToast("🔐 Please login!", false);
    if (hasInteracted) return; 
    setActiveGate(activeGate === gateType ? null : gateType);
    setReason("");
  };

  const handleSubmitReason = async () => {
    if (reason.trim().length < 15 || hasInteracted) return;
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "posts", post.id), {
        interactions: arrayUnion({
          userId, userName: userName || "Explorer", type: activeGate, text: reason, timestamp: new Date().toISOString()
        })
      });
      setActiveGate(null);
      setReason("");
    } catch (e) { showToast("Failed.", false); } 
    finally { setIsSubmitting(false); }
  };

  return (
    <div className={`bg-white border-b border-slate-100 p-4 md:p-6 transition-all relative ${post.isPinned ? 'bg-slate-50/50' : ''}`}>
      
      {/* Header: Compact User Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-slate-900 rounded-lg flex items-center justify-center font-black text-white text-xs">
            {post.userName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-xs tracking-tight">{post.userName}</h4>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{post.category}</span>
          </div>
        </div>

        {/* Admin Controls: Simple & Flat */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            <button onClick={handlePin} className={`text-[10px] ${post.isPinned ? 'text-teal-600' : 'text-slate-300'}`}>
              <i className="fa-solid fa-thumbtack"></i>
            </button>
            {showDeleteConfirm ? (
              <div className="flex items-center gap-2 text-[10px] font-black uppercase">
                <button onClick={confirmDelete} className="text-emerald-500">Confirm</button>
                <button onClick={() => setShowDeleteConfirm(false)} className="text-rose-500">X</button>
              </div>
            ) : (
              <button onClick={() => setShowDeleteConfirm(true)} className="text-slate-200 hover:text-rose-500">
                <i className="fa-solid fa-trash-can"></i>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Thought Text - English Poppins / Hindi Tiro Serif */}
      <div className="mb-4">
        <p className="text-slate-800 text-lg md:text-2xl verse-thought-serif leading-[1.8]">
          {post.text}
        </p>
      </div>

      {/* Interaction Bar: Facebook Style (Icons Only) */}
      <div className={`flex items-center gap-6 py-1 ${hasInteracted ? 'opacity-50 pointer-events-none' : ''}`}>
        <button 
          onClick={() => handleGateClick('support')} 
          className={`flex items-center gap-1.5 transition-colors ${activeGate === 'support' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'}`}
        >
          <i className="fa-solid fa-check-double text-base"></i>
          <span className="text-xs font-bold">{supportCount}</span>
        </button>

        <button 
          onClick={() => handleGateClick('counter')} 
          className={`flex items-center gap-1.5 transition-colors ${activeGate === 'counter' ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'}`}
        >
          <i className="fa-solid fa-bolt text-base"></i>
          <span className="text-xs font-bold">{counterCount}</span>
        </button>

        <button 
          onClick={() => handleGateClick('doubt')} 
          className={`flex items-center gap-1.5 transition-colors ${activeGate === 'doubt' ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'}`}
        >
          <i className="fa-solid fa-microscope text-base"></i>
          <span className="text-xs font-bold">{doubtCount}</span>
        </button>
      </div>

      {/* Simple Flat Input Area */}
      {activeGate && !hasInteracted && (
        <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-fade-in">
          <textarea 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            placeholder="Add your logic..." 
            className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-0 focus:border-slate-300 resize-none mb-3" 
            rows="2" 
          />
          <div className="flex justify-between items-center">
            <span className={`text-[9px] font-black uppercase ${reason.length < 15 ? 'text-rose-400' : 'text-emerald-500'}`}>
               {reason.length < 15 ? `${15 - reason.length} chars needed` : "Ready"}
            </span>
            <button 
              onClick={handleSubmitReason} 
              disabled={reason.length < 15 || isSubmitting} 
              className="bg-slate-900 text-white px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider disabled:bg-slate-200"
            >
              {isSubmitting ? "..." : "Submit"}
            </button>
          </div>
        </div>
      )}

      {/* Discussion List: Automatically follows after the interaction bar */}
      <CommentBox interactions={interactions} />

    </div>
  );
    }
