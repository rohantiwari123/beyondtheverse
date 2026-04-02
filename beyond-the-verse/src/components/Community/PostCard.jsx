import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, deleteDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import CommentBox from './CommentBox'; 

export default function PostCard({ post, showToast }) {
  const { isAuthenticated, userId, userName, isAdmin } = useAuth();
  
  const [activeGate, setActiveGate] = useState(null);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New States for Features
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);

  const interactions = post.interactions || [];
  const bookmarks = post.bookmarks || [];
  
  const hasInteracted = interactions.some(i => i.userId === userId);
  const isBookmarked = bookmarks.includes(userId);
  const isOwner = post.userId === userId;

  const supportCount = interactions.filter(i => i.type === 'support').length;
  const counterCount = interactions.filter(i => i.type === 'counter').length;
  const doubtCount = interactions.filter(i => i.type === 'doubt').length;

  // 🛡️ Post Actions
  const handleEditSubmit = async () => {
    if (editText.trim().length < 10) return;
    try {
      await updateDoc(doc(db, "posts", post.id), { text: editText, isEdited: true });
      setIsEditing(false);
      setShowMenu(false);
      showToast("Post updated.");
    } catch (e) { showToast("Failed to update.", false); }
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "posts", post.id));
      showToast("Post Deleted.");
    } catch (e) { showToast("Failed to delete.", false); }
  };

  const handlePin = async () => {
    try {
      await updateDoc(doc(db, "posts", post.id), { isPinned: !post.isPinned });
      setShowMenu(false);
    } catch (e) { console.error(e); }
  };

  // 🌟 New Features
  const handleBookmark = async () => {
    if (!isAuthenticated) return showToast("Login to save posts.", false);
    try {
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, {
        bookmarks: isBookmarked ? arrayRemove(userId) : arrayUnion(userId)
      });
      showToast(isBookmarked ? "Removed from saved." : "Post saved!");
    } catch (e) { console.error(e); }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    showToast("Link copied to clipboard! 🔗");
  };

  const handleReport = () => {
    showToast("Report sent to admin. 🚩", true);
    setShowMenu(false);
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
      await updateDoc(doc(db, "posts", post.id), {
        interactions: arrayUnion({
          id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
          userId, userName: userName || "Explorer", type: activeGate, text: reason, timestamp: new Date().toISOString(),
          isPinned: false, replies: [], commentGates: { support: [], counter: [], doubt: [] }
        })
      });
      setActiveGate(null);
      setReason("");
    } catch (e) { showToast("Failed to record.", false); } 
    finally { setIsSubmitting(false); }
  };

  return (
    <div className={`bg-white border-b border-slate-200 pt-6 pb-4 md:pt-8 md:pb-6 px-4 md:px-6 transition-colors ${post.isPinned ? 'bg-slate-50/50' : ''}`}>
      
      {/* 🌟 Header with 3-Dot Menu */}
      <div className="flex items-start justify-between mb-4 relative">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center font-bold text-white text-sm relative">
            {post.userName?.charAt(0).toUpperCase()}
            {/* Expert Badge Example (Can be dynamic later) */}
            {(isAdmin || supportCount > 5) && (
              <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
                <i className="fa-solid fa-check text-[7px]"></i>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 text-sm tracking-tight">{post.userName}</h4>
              {post.isPinned && <i className="fa-solid fa-thumbtack text-teal-500 text-[10px]"></i>}
            </div>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide">
              {post.category} <span className="mx-1 opacity-50">•</span> Just now 
              {post.isEdited && <span className="ml-1 italic opacity-70">(Edited)</span>}
            </span>
          </div>
        </div>

        {/* 3 Dots Menu Button */}
        <button onClick={() => setShowMenu(!showMenu)} className="text-slate-400 hover:text-slate-900 p-2 -mr-2 transition-colors">
          <i className="fa-solid fa-ellipsis"></i>
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 top-10 bg-white border border-slate-100 shadow-xl rounded-xl w-32 py-1 z-20 animate-fade-in">
            {isAdmin && (
              <button onClick={handlePin} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                {post.isPinned ? 'Unpin Post' : 'Pin Post'}
              </button>
            )}
            {(isOwner || isAdmin) && (
              <>
                {isOwner && (
                  <button onClick={() => { setIsEditing(true); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    Edit Post
                  </button>
                )}
                <button onClick={confirmDelete} className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                  Delete
                </button>
              </>
            )}
            {!isOwner && (
              <button onClick={handleReport} className="w-full text-left px-4 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-50">
                Report
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Thought Text or Edit Mode */}
      <div className="mb-5 pl-1">
        {isEditing ? (
          <div className="animate-fade-in">
            <textarea 
              value={editText} onChange={(e) => setEditText(e.target.value)} 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg verse-thought-serif focus:ring-1 focus:ring-slate-300 resize-none" rows="3"
            />
            <div className="flex gap-2 mt-2 justify-end">
              <button onClick={() => setIsEditing(false)} className="text-xs font-bold text-slate-500 px-3 py-1.5 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleEditSubmit} className="text-xs font-bold text-white bg-slate-900 px-4 py-1.5 rounded-lg">Save</button>
            </div>
          </div>
        ) : (
          <p className="text-slate-900 text-xl md:text-[26px] verse-thought-serif leading-[1.85]">
            {post.text}
          </p>
        )}
      </div>

      {/* 🌟 Interaction Bar with Share & Bookmark */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        
        {/* Gates */}
        <div className={`flex items-center gap-6 ${hasInteracted ? 'opacity-40 pointer-events-none' : ''}`}>
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

        {/* Action Icons (Share & Bookmark) */}
        <div className="flex items-center gap-4 text-slate-400">
          <button onClick={handleShare} className="hover:text-slate-900 transition-colors">
            <i className="fa-solid fa-arrow-up-from-bracket text-sm"></i>
          </button>
          <button onClick={handleBookmark} className={`transition-colors ${isBookmarked ? 'text-slate-900' : 'hover:text-slate-900'}`}>
            <i className={`${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark text-sm`}></i>
          </button>
        </div>

      </div>

      {/* Input Area */}
      {activeGate && !hasInteracted && (
        <div className="mt-4 p-4 bg-slate-50 rounded-2xl animate-fade-in">
          <textarea 
            value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Add your logic..." 
            className="w-full bg-transparent border-none p-2 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-0 resize-none mb-2" rows="2" 
          />
          <div className="flex justify-between items-center px-2">
            <span className={`text-[10px] font-bold ${reason.length < 15 ? 'text-rose-400' : 'text-emerald-500'}`}>
               {reason.length < 15 ? `${15 - reason.length} chars needed` : "Ready to post"}
            </span>
            <button onClick={handleSubmitReason} disabled={reason.length < 15 || isSubmitting} className="bg-slate-900 text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-wide disabled:bg-slate-200 disabled:text-slate-400">
              {isSubmitting ? "Posting..." : "Reply"}
            </button>
          </div>
        </div>
      )}

      {/* Discussion List */}
      <CommentBox post={post} showToast={showToast} />

    </div>
  );
  }
