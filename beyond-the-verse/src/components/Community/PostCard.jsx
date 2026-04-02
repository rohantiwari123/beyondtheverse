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
      showToast("Post Deleted.");
    } catch (e) { showToast("Failed to delete.", false); }
  };

  const handlePin = async () => {
    try {
      await updateDoc(doc(db, "posts", post.id), { isPinned: !post.isPinned });
    } catch (e) { console.error(e); }
  };

  const handleGateClick = (gateType) => {
    if (!isAuthenticated) return showToast("Please login first.", false);
    if (hasInteracted) return; 
    setActiveGate(activeGate === gateType ? null : gateType);
    setReason("");
  };

  const handleSubmitReason = async () => {
    if (reason.trim().length < 15 || hasInteracted) return;
    setIsSubmitting(true);
    try {
      // 🌟 MAGIC HERE: Added id, replies array, and commentGates
      await updateDoc(doc(db, "posts", post.id), {
        interactions: arrayUnion({
          id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5), // Unique ID
          userId, 
          userName: userName || "Explorer", 
          type: activeGate, 
          text: reason, 
          timestamp: new Date().toISOString(),
          isPinned: false,
          replies: [],
          commentGates: { support: [], counter: [], doubt: [] }
        })
      });
      setActiveGate(null);
      setReason("");
      showToast("Logic recorded!");
    } catch (e) { showToast("Failed to record.", false); } 
    finally { setIsSubmitting(false); }
  };

  return (
    <div className={`bg-white border-b border-slate-200 pt-6 pb-4 md:pt-8 md:pb-6 px-4 md:px-6 transition-colors ${post.isPinned ? 'bg-slate-50/50' : ''}`}>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center font-bold text-white text-sm">
            {post.userName?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 text-sm tracking-tight">{post.userName}</h4>
              {post.isPinned && <i className="fa-solid fa-thumbtack text-teal-500 text-[10px]"></i>}
            </div>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide">
              {post.category} <span className="mx-1 opacity-50">•</span> Just now
            </span>
          </div>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex items-center gap-3">
            <button onClick={handlePin} className={`text-xs transition-colors ${post.isPinned ? 'text-teal-600' : 'text-slate-400 hover:text-slate-900'}`}>
              {post.isPinned ? 'Unpin' : 'Pin'}
            </button>
            {showDeleteConfirm ? (
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
                <button onClick={confirmDelete} className="text-rose-600">Del</button>
                <button onClick={() => setShowDeleteConfirm(false)} className="text-slate-400">Cancel</button>
              </div>
            ) : (
              <button onClick={() => setShowDeleteConfirm(true)} className="text-xs text-slate-400 hover:text-rose-600 transition-colors">
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Thought Text */}
      <div className="mb-5 pl-1">
        <p className="text-slate-900 text-xl md:text-[26px] verse-thought-serif leading-[1.85]">
          {post.text}
        </p>
      </div>

      {/* Interaction Bar */}
      <div className={`flex items-center gap-8 pt-2 ${hasInteracted ? 'opacity-40 pointer-events-none' : ''}`}>
        <button onClick={() => handleGateClick('support')} className={`flex items-center gap-2 transition-colors ${activeGate === 'support' ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-600'}`}>
          <i className="fa-regular fa-circle-check text-lg"></i>
          <span className="text-sm font-semibold">{supportCount > 0 ? supportCount : ''}</span>
        </button>

        <button onClick={() => handleGateClick('counter')} className={`flex items-center gap-2 transition-colors ${activeGate === 'counter' ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600'}`}>
          <i className="fa-solid fa-bolt text-lg"></i>
          <span className="text-sm font-semibold">{counterCount > 0 ? counterCount : ''}</span>
        </button>

        <button onClick={() => handleGateClick('doubt')} className={`flex items-center gap-2 transition-colors ${activeGate === 'doubt' ? 'text-amber-600' : 'text-slate-500 hover:text-amber-600'}`}>
          <i className="fa-solid fa-magnifying-glass text-lg"></i>
          <span className="text-sm font-semibold">{doubtCount > 0 ? doubtCount : ''}</span>
        </button>
      </div>

      {/* Input Area */}
      {activeGate && !hasInteracted && (
        <div className="mt-4 p-4 bg-slate-50 rounded-2xl animate-fade-in">
          <textarea 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            placeholder="Add your logic..." 
            className="w-full bg-transparent border-none p-2 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-0 resize-none mb-2" 
            rows="2" 
          />
          <div className="flex justify-between items-center px-2">
            <span className={`text-[10px] font-bold ${reason.length < 15 ? 'text-rose-400' : 'text-emerald-500'}`}>
               {reason.length < 15 ? `${15 - reason.length} chars needed` : "Ready to post"}
            </span>
            <button 
              onClick={handleSubmitReason} 
              disabled={reason.length < 15 || isSubmitting} 
              className="bg-slate-900 text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-wide disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
            >
              {isSubmitting ? "Posting..." : "Reply"}
            </button>
          </div>
        </div>
      )}

      {/* 🌟 PASSING THE FULL POST OBJECT TO COMMENT BOX */}
      <CommentBox post={post} showToast={showToast} />

    </div>
  );
                }
