import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, deleteDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import CommentBox from './CommentBox'; 

// 🌟 EXACT TIME FORMATTER
export const formatDateTime = (timestamp) => {
  if (!timestamp) return "";
  
  let date;
  if (typeof timestamp.toDate === 'function') {
    date = timestamp.toDate(); 
  } else {
    date = new Date(timestamp); 
  }

  const dateString = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeString = date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();

  return `${dateString} • ${timeString}`;
};

export default function PostCard({ post, showToast }) {
  const { isAuthenticated, userId, userName, isAdmin } = useAuth();
  
  const [activeGate, setActiveGate] = useState(null);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  
  const [showComments, setShowComments] = useState(false);

  const interactions = post.interactions || [];
  const bookmarks = post.bookmarks || [];
  
  const topLevelInteractions = interactions.filter(i => !i.parentId);
  
  const userInteraction = topLevelInteractions.find(i => i.userId === userId);
  const hasInteracted = !!userInteraction;
  const userInteractionType = userInteraction ? userInteraction.type : null; 
  
  const isBookmarked = bookmarks.includes(userId);
  const isOwner = post.userId === userId;

  // 🌟 NEW: Check if the post was created by an admin
  // This assumes you might store a flag like `isAdminPost` in DB, or you check the user ID. 
  // For now, let's pretend we pass or store `role: 'admin'` in the post document when it's created.
  // If you don't have it in DB, you can check: post.userName === "AdminName" or similar.
  // Assuming 'post.isAdminPost' is saved during creation, OR we check the post's author ID if known.
  // For demo, let's simulate that if 'post.userName' contains specific admin logic, or we rely on a db flag.
  // Let's use a fallback check if you haven't added `isAdminPost` to DB yet.
  const isAdminPost = post.isAdminPost === true || post.role === 'admin'; 

  const supportCount = topLevelInteractions.filter(i => i.type === 'support').length;
  const counterCount = topLevelInteractions.filter(i => i.type === 'counter').length;
  const doubtCount = topLevelInteractions.filter(i => i.type === 'doubt').length;

  const getTextSizeClass = (text) => {
    const len = text.length;
    if (len < 80) return "text-3xl md:text-4xl font-medium leading-[1.4]"; 
    if (len < 250) return "text-xl md:text-2xl leading-[1.7]"; 
    return "text-lg md:text-xl leading-[1.85]"; 
  };

  const handleEditSubmit = async () => {
    if (!editText.trim()) return; 
    setIsSavingEdit(true);
    try {
      await updateDoc(doc(db, "posts", post.id), { text: editText.trim(), isEdited: true });
      setIsEditing(false);
      setShowMenu(false);
      showToast("Post updated successfully! ✏️");
    } catch (e) { 
      showToast("Failed to update.", false); 
    } finally {
      setIsSavingEdit(false);
    }
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
    if (!reason.trim() || hasInteracted) return; 
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "posts", post.id), {
        interactions: arrayUnion({
          id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
          userId, userName: userName || "Explorer", type: activeGate, text: reason.trim(), timestamp: new Date().toISOString(),
          isPinned: false, replies: [], commentGates: { support: [], counter: [], doubt: [] }
        })
      });
      setActiveGate(null);
      setReason("");
      setShowComments(true); 
    } catch (e) { showToast("Failed to record.", false); } 
    finally { setIsSubmitting(false); }
  };

  // 🌟 ADMIN POST STYLING LOGIC
  const bgClass = isAdminPost ? "bg-amber-50/40 border-amber-200 shadow-sm" : "bg-white border-slate-200";
  const avatarClass = isAdminPost ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md shadow-amber-500/20" : "bg-slate-900 text-white";
  const nameColorClass = isAdminPost ? "text-amber-900" : "text-slate-900";
  const textColorClass = isAdminPost ? "text-slate-900" : "text-slate-900";
  const borderSepClass = isAdminPost ? "border-amber-100" : "border-slate-50";

  return (
    <div className={`border-b md:border pt-6 pb-4 md:pt-8 md:pb-6 px-4 md:px-6 transition-colors ${bgClass} ${post.isPinned ? 'ring-2 ring-teal-500/20' : ''}`}>
      
      {/* 🌟 Header with 3-Dot Menu */}
      <div className="flex items-start justify-between mb-4 relative">
        <div className="flex items-center gap-3">
          
          {/* Avatar */}
          <div className={`h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center font-bold text-sm relative ${avatarClass}`}>
            {post.userName?.charAt(0).toUpperCase()}
            {(isAdmin || supportCount > 5) && !isAdminPost && (
              <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
                <i className="fa-solid fa-check text-[7px]"></i>
              </div>
            )}
            {/* Admin Crown Icon (Optional extra flair for admin avatar) */}
            {isAdminPost && (
              <div className="absolute -top-1 -right-1 text-amber-500 bg-white rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                <i className="fa-solid fa-crown text-[8px]"></i>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className={`font-bold text-sm tracking-tight ${nameColorClass}`}>{post.userName}</h4>
              
              {/* 🌟 ADMIN BADGE */}
              {isAdminPost && (
                <span className="bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded flex items-center gap-1 border border-amber-200">
                  <i className="fa-solid fa-shield-halved"></i> Admin
                </span>
              )}
              
              {post.isPinned && <i className="fa-solid fa-thumbtack text-teal-500 text-[10px]"></i>}
            </div>
            
            <span className="text-[11px] text-slate-500 font-medium tracking-wide">
              {post.category} <span className="mx-1 opacity-50">•</span> 
              {formatDateTime(post.createdAt)} 
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

      {/* 🌟 Main Thought Text or Edit Mode */}
      <div className="mb-5 pl-1">
        {isEditing ? (
          <div className="animate-fade-in">
            <textarea 
              value={editText} 
              onChange={(e) => setEditText(e.target.value)} 
              className="w-full bg-white border border-slate-200 rounded-xl p-4 text-base md:text-lg verse-thought-serif focus:outline-none focus:ring-1 focus:ring-slate-300 resize-none h-40 md:h-56 overflow-y-auto shadow-sm" 
              placeholder="Edit your thought..."
            />
            <div className="flex justify-end items-center mt-3 px-1">
              <div className="flex gap-2">
                <button onClick={() => { setIsEditing(false); setEditText(post.text); }} className="text-xs font-bold text-slate-500 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={handleEditSubmit} disabled={!editText.trim() || isSavingEdit} className="text-xs font-bold text-white bg-slate-900 px-6 py-2 rounded-lg disabled:opacity-40 transition-colors shadow-md">
                  {isSavingEdit ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className={`${textColorClass} verse-thought-serif whitespace-pre-wrap text-justify break-words transition-all ${getTextSizeClass(post.text)}`}>
            {post.text}
          </p>
        )}
      </div>

      {/* 🌟 Interaction Bar with Share & Bookmark */}
      <div className={`flex items-center justify-between pt-2 border-t ${borderSepClass}`}>
        
        {/* Gates */}
        <div className={`flex items-center gap-6 ${hasInteracted ? 'pointer-events-none' : ''}`}>
          <button onClick={() => handleGateClick('support')} className={`flex items-center gap-2 transition-all ${
            hasInteracted 
              ? (userInteractionType === 'support' ? 'text-emerald-600 drop-shadow-md' : 'text-slate-300 opacity-40') 
              : (activeGate === 'support' ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-600')
          }`}>
            <i className={`${hasInteracted && userInteractionType === 'support' ? 'fa-solid' : 'fa-regular'} fa-circle-check text-lg`}></i>
            <span className="text-sm font-semibold">{supportCount > 0 ? supportCount : ''}</span>
          </button>

          <button onClick={() => handleGateClick('counter')} className={`flex items-center gap-2 transition-all ${
            hasInteracted 
              ? (userInteractionType === 'counter' ? 'text-rose-600 drop-shadow-md' : 'text-slate-300 opacity-40') 
              : (activeGate === 'counter' ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600')
          }`}>
            <i className="fa-solid fa-bolt text-lg"></i>
            <span className="text-sm font-semibold">{counterCount > 0 ? counterCount : ''}</span>
          </button>

          <button onClick={() => handleGateClick('doubt')} className={`flex items-center gap-2 transition-all ${
            hasInteracted 
              ? (userInteractionType === 'doubt' ? 'text-amber-600 drop-shadow-md' : 'text-slate-300 opacity-40') 
              : (activeGate === 'doubt' ? 'text-amber-600' : 'text-slate-500 hover:text-amber-600')
          }`}>
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

      {/* 🌟 POST REPLY BOX */}
      {activeGate && !hasInteracted && (
        <div className="mt-5 p-4 md:p-5 bg-white rounded-2xl animate-fade-in border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3 px-1">
             <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
               activeGate === 'support' ? 'text-emerald-600' : 
               activeGate === 'counter' ? 'text-rose-600' : 
               'text-amber-600'
             }`}>
               Adding {activeGate} logic...
             </span>
          </div>
          
          <textarea 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            placeholder="Add your logic..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 md:p-4 text-sm md:text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 resize-none h-28 md:h-36 overflow-y-auto mb-3" 
          />
          <div className="flex justify-end items-center px-1">
            <div className="flex items-center gap-2">
              <button onClick={() => { setActiveGate(null); setReason(""); }} className="px-4 py-2 text-[11px] font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-colors">
                CANCEL
              </button>
              <button onClick={handleSubmitReason} disabled={!reason.trim() || isSubmitting} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-[11px] font-bold tracking-widest uppercase disabled:opacity-40 transition-colors shadow-md">
                {isSubmitting ? "POSTING..." : "POST"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 TOGGLE COMMENTS DROPDOWN BUTTON */}
      {topLevelInteractions.length > 0 && (
        <div className={`mt-4 pt-3 flex items-center justify-between border-t ${borderSepClass}`}>
          <button 
            onClick={() => setShowComments(!showComments)} 
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-slate-800 uppercase tracking-widest transition-colors"
          >
            {showComments ? 'Hide Reflections' : `View ${topLevelInteractions.length} Reflections`}
            <i className={`fa-solid fa-chevron-${showComments ? 'up' : 'down'} text-[10px]`}></i>
          </button>
        </div>
      )}

      {/* 🌟 CONDITIONALLY RENDER COMMENT BOX */}
      {showComments && (
        <div className="animate-fade-in">
          <CommentBox post={post} showToast={showToast} />
        </div>
      )}

    </div>
  );
      }
