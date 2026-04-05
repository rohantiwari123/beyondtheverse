import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import CommentBox from './CommentBox'; 

// Utils aur Services
import { formatDateTime } from '../../utils/dateFormatter';
import { 
  upgradeToAdminPost, 
  editPostText, 
  deletePost, 
  togglePinPost, 
  toggleBookmarkPost, 
  addPostInteraction 
} from '../../services/firebaseServices';

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

  const isAdminPost = post.isAdminPost === true || post.role === 'admin'; 

  useEffect(() => {
    if (isOwner && isAdmin && !isAdminPost) {
      upgradeToAdminPost(post.id).catch(err => console.error("Failed to auto-upgrade", err));
    }
  }, [isOwner, isAdmin, isAdminPost, post.id]);

  const supportCount = topLevelInteractions.filter(i => i.type === 'support').length;
  const counterCount = topLevelInteractions.filter(i => i.type === 'counter').length;
  const doubtCount = topLevelInteractions.filter(i => i.type === 'doubt').length;

  // 🌟 FLUID TYPOGRAPHY LOGIC
  const getTextSizeClass = (text) => {
    const len = text.length;
    if (len < 80) return "text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-medium leading-[1.3] tracking-tight"; 
    if (len < 250) return "text-[1.15rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.75rem] leading-[1.6]"; 
    return "text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] lg:text-[1.25rem] leading-[1.75]"; 
  };

  const handleEditSubmit = async () => {
    if (!editText.trim()) return; 
    setIsSavingEdit(true);
    try {
      await editPostText(post.id, editText.trim());
      setIsEditing(false);
      setShowMenu(false);
      showToast("Post updated! ✏️");
    } catch (e) { showToast("Failed to update.", false); } 
    finally { setIsSavingEdit(false); }
  };

  const confirmDelete = async () => {
    if(!window.confirm("Delete this thought?")) return;
    try {
      await deletePost(post.id);
      showToast("Post Deleted.");
    } catch (e) { showToast("Failed to delete.", false); }
  };

  const handlePin = async () => {
    try {
      await togglePinPost(post.id, post.isPinned);
      setShowMenu(false);
    } catch (e) { console.error(e); }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) return showToast("Login to save posts.", false);
    try {
      await toggleBookmarkPost(post.id, userId, isBookmarked);
      showToast(isBookmarked ? "Removed from saved." : "Post saved!");
    } catch (e) { console.error(e); }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    showToast("Link copied! 🔗");
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
      await addPostInteraction(post.id, {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        userId, 
        userName: userName || "Explorer", 
        type: activeGate, 
        text: reason.trim(), 
        timestamp: new Date().toISOString(),
        isPinned: false, 
        replies: [], 
        commentGates: { support: [], counter: [], doubt: [] }
      });
      setActiveGate(null);
      setReason("");
      setShowComments(true); 
    } catch (e) { showToast("Failed to record.", false); } 
    finally { setIsSubmitting(false); }
  };

  const bgClass = isAdminPost ? "bg-amber-50/50" : "bg-white";
  const borderClass = isAdminPost ? "border-amber-200" : "border-slate-100 sm:border-slate-200";

  return (
    // 🌟 MOBILE EDGE-TO-EDGE: Removed horizontal borders and rounded corners on smallest screens
    <div className={`w-full border-y sm:border sm:rounded-2xl md:rounded-[2.5rem] lg:rounded-[3rem] mb-0 sm:mb-6 md:mb-8 pt-5 pb-4 sm:pt-8 sm:pb-6 px-4 sm:px-8 lg:px-10 transition-all duration-500 ${bgClass} ${borderClass} ${post.isPinned ? 'ring-2 ring-teal-500/10' : ''}`}>
      
      {/* 🌟 Header Section */}
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full flex items-center justify-center font-black text-sm sm:text-base relative shrink-0 ${isAdminPost ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white" : "bg-slate-900 text-white"}`}>
            {post.userName?.charAt(0).toUpperCase()}
            {isAdminPost && (
              <div className="absolute -top-1 -right-1 text-amber-500 bg-white rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center border border-amber-100 shadow-sm">
                <i className="fa-solid fa-crown text-[8px] sm:text-[10px]"></i>
              </div>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className={`font-black text-sm sm:text-base lg:text-lg truncate tracking-tight ${isAdminPost ? 'text-amber-900' : 'text-slate-900'}`}>{post.userName}</h4>
              {isAdminPost && (
                <span className="bg-amber-100 text-amber-700 text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border border-amber-200">
                  Admin
                </span>
              )}
              {post.isPinned && <i className="fa-solid fa-thumbtack text-teal-500 text-[10px] sm:text-xs"></i>}
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
              {post.category} <span className="mx-1 opacity-30">•</span> {formatDateTime(post.createdAt)} 
            </span>
          </div>
        </div>

        {/* 3 Dots Menu */}
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-slate-300 hover:text-slate-900 p-2 transition-colors">
            <i className="fa-solid fa-ellipsis-vertical sm:text-lg"></i>
          </button>
          {showMenu && (
            <div className="absolute right-0 top-10 bg-white border border-slate-200 rounded-xl w-36 py-1.5 z-30 shadow-xl animate-fade-in">
              {isAdmin && (
                <button onClick={handlePin} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 uppercase tracking-tighter">
                  {post.isPinned ? 'Unpin' : 'Pin Post'}
                </button>
              )}
              {(isOwner || isAdmin) && (
                <>
                  {isOwner && (
                    <button onClick={() => { setIsEditing(true); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 uppercase tracking-tighter">
                      Edit Thought
                    </button>
                  )}
                  <button onClick={confirmDelete} className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 uppercase tracking-tighter">
                    Delete
                  </button>
                </>
              )}
              {!isOwner && (
                <button onClick={() => {showToast("Reported"); setShowMenu(false);}} className="w-full text-left px-4 py-2 text-xs font-bold text-amber-600 hover:bg-amber-50 uppercase tracking-tighter">
                  Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 🌟 Main Content Area */}
      <div className="mb-6 sm:mb-8">
        {isEditing ? (
          <div className="animate-fade-in space-y-3">
            <textarea 
              value={editText} 
              onChange={(e) => setEditText(e.target.value)} 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-base sm:text-lg verse-thought-serif focus:border-teal-500 focus:bg-white outline-none transition-all h-48 sm:h-64 resize-none" 
              autoFocus
            />
            <div className="flex justify-end gap-2 px-1">
              <button onClick={() => { setIsEditing(false); setEditText(post.text); }} className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest px-4 py-2 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleEditSubmit} disabled={!editText.trim() || isSavingEdit} className="bg-slate-900 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-lg disabled:opacity-30">Save Change</button>
            </div>
          </div>
        ) : (
          <p className={`text-slate-900 verse-thought-serif whitespace-pre-wrap text-justify break-words transition-all ${getTextSizeClass(post.text)}`}>
            {post.text}
          </p>
        )}
      </div>

      {/* 🌟 Interaction & Action Bar */}
      <div className={`flex items-center justify-between pt-4 border-t ${isAdminPost ? 'border-amber-100' : 'border-slate-50'} transition-colors`}>
        
        {/* Interaction Gates */}
        <div className={`flex items-center gap-5 sm:gap-8 lg:gap-10 ${hasInteracted ? 'pointer-events-none' : ''}`}>
          <button onClick={() => handleGateClick('support')} className={`flex items-center gap-1.5 sm:gap-2 transition-all ${
            hasInteracted 
              ? (userInteractionType === 'support' ? 'text-emerald-600' : 'text-slate-200') 
              : (activeGate === 'support' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600')
          }`}>
            <i className={`${hasInteracted && userInteractionType === 'support' ? 'fa-solid' : 'fa-regular'} fa-circle-check text-xl sm:text-2xl`}></i>
            <span className="text-xs sm:text-sm font-black">{supportCount || ''}</span>
          </button>

          <button onClick={() => handleGateClick('counter')} className={`flex items-center gap-1.5 sm:gap-2 transition-all ${
            hasInteracted 
              ? (userInteractionType === 'counter' ? 'text-rose-600' : 'text-slate-200') 
              : (activeGate === 'counter' ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600')
          }`}>
            <i className="fa-solid fa-bolt text-xl sm:text-2xl"></i>
            <span className="text-xs sm:text-sm font-black">{counterCount || ''}</span>
          </button>

          <button onClick={() => handleGateClick('doubt')} className={`flex items-center gap-1.5 sm:gap-2 transition-all ${
            hasInteracted 
              ? (userInteractionType === 'doubt' ? 'text-amber-600' : 'text-slate-200') 
              : (activeGate === 'doubt' ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600')
          }`}>
            <i className="fa-solid fa-magnifying-glass text-xl sm:text-2xl"></i>
            <span className="text-xs sm:text-sm font-black">{doubtCount || ''}</span>
          </button>
        </div>

        {/* Action Icons (Share & Bookmark) */}
        <div className="flex items-center gap-4 sm:gap-6 text-slate-300">
          <button onClick={handleShare} className="hover:text-slate-900 transition-all active:scale-90">
            <i className="fa-solid fa-arrow-up-from-bracket sm:text-lg"></i>
          </button>
          <button onClick={handleBookmark} className={`transition-all active:scale-90 ${isBookmarked ? 'text-slate-900' : 'hover:text-slate-900'}`}>
            <i className={`${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark sm:text-lg`}></i>
          </button>
        </div>
      </div>

      {/* 🌟 Reply Reason Box - Fluid Design */}
      {activeGate && !hasInteracted && (
        <div className="mt-6 animate-fade-in-up">
          <div className="relative">
            <textarea 
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              placeholder={`Why do you ${activeGate} this thought? State your logic...`} 
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-sm sm:text-base text-slate-800 placeholder:text-slate-300 focus:border-slate-900 focus:bg-white outline-none transition-all h-32 sm:h-40 resize-none shadow-inner" 
              autoFocus
            />
            <div className="flex justify-end items-center mt-3 gap-2">
              <button onClick={() => { setActiveGate(null); setReason(""); }} className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-100 rounded-lg transition-all">Cancel</button>
              <button 
                onClick={handleSubmitReason} 
                disabled={!reason.trim() || isSubmitting} 
                className="bg-slate-900 text-white px-6 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase disabled:opacity-20 shadow-lg shadow-slate-900/10 active:scale-95 transition-all"
              >
                {isSubmitting ? "..." : "Post Reflection"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 Reflections Toggle */}
      {topLevelInteractions.length > 0 && (
        <div className={`mt-6 pt-4 border-t ${isAdminPost ? 'border-amber-100' : 'border-slate-50'}`}>
          <button 
            onClick={() => setShowComments(!showComments)} 
            className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-[0.2em] transition-all"
          >
            {showComments ? 'Hide Reflections' : `View ${topLevelInteractions.length} Reflections`}
            <i className={`fa-solid fa-chevron-${showComments ? 'up' : 'down'} text-[8px]`}></i>
          </button>
        </div>
      )}

      {/* 🌟 CommentBox - Conditional Rendering */}
      {showComments && (
        <div className="mt-4 animate-fade-in">
          <CommentBox post={post} showToast={showToast} />
        </div>
      )}

    </div>
  );
}