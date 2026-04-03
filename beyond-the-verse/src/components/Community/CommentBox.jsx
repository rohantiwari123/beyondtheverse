import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { formatDateTime } from './PostCard'; 

// 🌟 REUSABLE COMPONENT: For both Main Comments and Nested Replies
function InteractionNode({ interaction, allInteractions, post, showToast, isMainComment }) {
  const { isAuthenticated, isAdmin, userId, userName } = useAuth();

  // Reply States
  const [isReplying, setIsReplying] = useState(false);
  const [replyType, setReplyType] = useState('support'); 
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3-DOT MENU & EDITING
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(interaction.text);
  const isOwner = interaction.userId === userId;

  const targetId = interaction.id || interaction.timestamp;
  const gates = interaction.commentGates || { support: [], counter: [], doubt: [] };

  // 🌟 ADMIN COMMENT CHECK
  const isAdminComment = interaction.isAdminComment === true || interaction.role === 'admin';

  // 🚀 🌟 AUTO-UPGRADE MAGIC FOR COMMENTS: Bina button dabaye purane comments ko Admin Comment bana dega
  useEffect(() => {
    if (isOwner && isAdmin && !isAdminComment) {
      const updatedInteractions = post.interactions.map(i => 
        (i.id || i.timestamp) === targetId ? { ...i, isAdminComment: true } : i
      );
      updateDoc(doc(db, "posts", post.id), { interactions: updatedInteractions })
        .catch(err => console.error("Failed to auto-upgrade comment", err));
    }
  }, [isOwner, isAdmin, isAdminComment, post.id, targetId, post.interactions]);

  const supportCount = gates.support.length;
  const counterCount = gates.counter.length;
  const doubtCount = gates.doubt.length;
  const hasReacted = gates.support.includes(userId) || gates.counter.includes(userId) || gates.doubt.includes(userId);

  // Styling Config for Badges
  const typeConfig = {
    support: { icon: 'fa-regular fa-circle-check', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100', label: 'SUPPORTED' },
    counter: { icon: 'fa-solid fa-bolt', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-100', label: 'COUNTERED' },
    doubt: { icon: 'fa-solid fa-magnifying-glass', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100', label: 'DOUBTED' }
  };
  const config = typeConfig[interaction.type] || typeConfig['support'];

  const parentInteraction = allInteractions?.find(i => (i.id || i.timestamp) === interaction.parentId);

  // 🛡️ ADMIN / OWNER ACTIONS
  const handleDeleteComment = async () => {
    try {
      let newInteractions = post.interactions.filter(i => (i.id || i.timestamp) !== targetId);

      if (interaction.parentId) {
        newInteractions = newInteractions.map(i => {
          if ((i.id || i.timestamp) === interaction.parentId) {
            const updatedGates = { ...i.commentGates };
            if (updatedGates[interaction.type]) {
              updatedGates[interaction.type] = updatedGates[interaction.type].filter(uid => uid !== interaction.userId);
            }
            return { ...i, commentGates: updatedGates };
          }
          return i;
        });
      }

      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
      setShowMenu(false);
      showToast("Comment deleted.");
    } catch (e) { showToast("Failed to delete.", false); }
  };

  const handleEditSubmit = async () => {
    if (editText.trim().length < 2) return;
    try {
      const newInteractions = post.interactions.map(i =>
        (i.id || i.timestamp) === targetId ? { ...i, text: editText.trim(), isEdited: true } : i
      );
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
      setIsEditing(false);
      setShowMenu(false);
      showToast("Comment updated.");
    } catch (e) { showToast("Failed to update.", false); }
  };

  const handlePinComment = async () => {
    try {
      const newInteractions = post.interactions.map(i =>
        (i.id || i.timestamp) === targetId ? { ...i, isPinned: !interaction.isPinned } : i
      );
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
      setShowMenu(false);
      showToast(interaction.isPinned ? "Unpinned!" : "Pinned to top! 📌");
    } catch (e) { console.error(e); }
  };

  const handleIconClick = (type) => {
    if (!isAuthenticated) return showToast("Please login first.", false);
    if (hasReacted) return showToast("You have already added logic to this.", false);
    
    setReplyType(type);
    setIsReplying(true);
  };

  // 🚀 SUBMIT THE LOGIC
  const handleReplySubmit = async () => {
    if (replyText.trim().length < 2) return;

    setIsSubmitting(true);
    const superUniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);

    try {
      const newReply = {
        id: superUniqueId, parentId: targetId, userId, userName: userName || "Explorer",
        type: replyType, text: replyText.trim(), timestamp: new Date().toISOString(),
        commentGates: { support: [], counter: [], doubt: [] },
        isAdminComment: isAdmin // 🌟 Naye replies mein direct Admin Flag save hoga
      };

      const newGates = { ...gates };
      if (!newGates[replyType].includes(userId)) {
        newGates[replyType] = [...newGates[replyType], userId];
      }

      const newInteractions = post.interactions.map(i => {
        if ((i.id || i.timestamp) === targetId) return { ...i, commentGates: newGates };
        return i;
      });

      newInteractions.push(newReply);
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });

      setReplyText("");
      setIsReplying(false);
      showToast("Logic recorded! 🚀");
    } catch (e) { showToast("Failed to reply.", false); } 
    finally { setIsSubmitting(false); }
  };

  // 🌟 ADMIN COMMENT STYLING
  const avatarClass = isAdminComment ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-sm shadow-amber-500/20" : "bg-slate-100 text-slate-600";
  const nameColorClass = isAdminComment ? "text-amber-900" : "text-slate-900";

  return (
    <div className={`py-4 transition-all group ${isMainComment ? '' : 'border-t border-slate-100'}`}>

      {/* WHO IS REPLYING TO WHOM? */}
      {!isMainComment && parentInteraction && (
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mb-2 ml-10 md:ml-12">
          <i className="fa-solid fa-reply text-slate-300"></i>
          Replying to <span className="text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded uppercase tracking-wider">@{parentInteraction.userName}</span>
        </div>
      )}

      <div className="flex items-start gap-3 px-1">

        {/* 🌟 AVATAR WITH CROWN */}
        <div className={`${isMainComment ? 'h-9 w-9 md:h-10 md:w-10 text-sm' : 'h-8 w-8 text-xs'} rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5 relative transition-all ${avatarClass}`}>
          {interaction.userName?.charAt(0).toUpperCase()}
          {isAdminComment && (
            <div className="absolute -top-1 -right-1 text-amber-500 bg-white rounded-full h-3.5 w-3.5 flex items-center justify-center shadow-sm border border-amber-100">
              <i className="fa-solid fa-crown text-[6px]"></i>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">

          {/* 🌟 HEADER WITH 3-DOT MENU */}
          <div className="flex items-center justify-between mb-0.5 relative">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-bold ${isMainComment ? 'text-sm' : 'text-sm'} transition-colors ${nameColorClass}`}>
                {interaction.userName}
              </span>
              
              {/* 🌟 ADMIN BADGE */}
              {isAdminComment && (
                <span className="bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded flex items-center gap-1 border border-amber-200">
                  <i className="fa-solid fa-shield-halved"></i> Admin
                </span>
              )}

              {interaction.isPinned && <i className="fa-solid fa-thumbtack text-teal-500 text-[10px]"></i>}

              {/* LOGIC BADGE (Supported/Countered/Doubted) */}
              <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-wide flex items-center gap-1.5 ${config.color} ${config.bg} border ${config.border} px-2 py-0.5 rounded-md`}>
                <i className={config.icon}></i> {config.label}
              </span>
              
              <span className="text-[9px] md:text-[10px] text-slate-400 font-medium whitespace-nowrap">
                • {formatDateTime(interaction.timestamp)}
                {interaction.isEdited && <span className="ml-1 italic opacity-70">(Edited)</span>}
              </span>
            </div>

            {/* 3 Dots Menu Button */}
            <button onClick={() => setShowMenu(!showMenu)} className="text-slate-400 hover:text-slate-900 p-1 -mr-1 transition-colors relative z-10">
              <i className="fa-solid fa-ellipsis"></i>
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 top-6 bg-white border border-slate-100 shadow-xl rounded-xl w-32 py-1 z-20 animate-fade-in">
                {isAdmin && (
                  <button onClick={handlePinComment} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    {interaction.isPinned ? 'Unpin' : 'Pin to top'}
                  </button>
                )}
                {(isOwner || isAdmin) && (
                  <>
                    {isOwner && (
                      <button onClick={() => { setIsEditing(true); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                        Edit
                      </button>
                    )}
                    <button onClick={handleDeleteComment} className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                      Delete
                    </button>
                  </>
                )}
                {!isOwner && (
                  <button onClick={() => {showToast("Reported"); setShowMenu(false)}} className="w-full text-left px-4 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-50">
                    Report
                  </button>
                )}
              </div>
            )}
          </div>

          {/* TEXT OR EDIT MODE */}
          {isEditing ? (
            <div className="animate-fade-in mb-2 mt-1">
              <textarea 
                value={editText} 
                onChange={(e) => {
                  setEditText(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm verse-thought-serif focus:ring-1 focus:ring-slate-300 resize-none overflow-hidden" 
                rows="2"
              />
              <div className="flex gap-2 mt-2 justify-end">
                <button onClick={() => setIsEditing(false)} className="text-xs font-bold text-slate-500 px-3 py-1.5 hover:bg-slate-100 rounded-lg">Cancel</button>
                <button onClick={handleEditSubmit} className="text-xs font-bold text-white bg-slate-900 px-4 py-1.5 rounded-lg">Save</button>
              </div>
            </div>
          ) : (
            <p className={`text-slate-800 leading-[1.7] verse-thought-serif whitespace-pre-wrap text-justify break-words ${isMainComment ? 'text-lg md:text-xl mt-1.5' : 'text-base md:text-lg mt-0.5'} mb-1.5`}>
              {interaction.text}
            </p>
          )}

          {/* REACTION / ICONS BAR (Reply triggers) */}
          {!isEditing && (
            <div className="flex items-center gap-4 mt-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Reply:</span>
              
              <button onClick={() => handleIconClick('support')} className={`flex items-center gap-1.5 text-[11px] font-bold transition-all hover:-translate-y-0.5 ${hasReacted && gates.support.includes(userId) ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'}`}>
                <i className="fa-regular fa-circle-check text-sm"></i>
                {supportCount > 0 && <span>{supportCount}</span>}
              </button>
              
              <button onClick={() => handleIconClick('counter')} className={`flex items-center gap-1.5 text-[11px] font-bold transition-all hover:-translate-y-0.5 ${hasReacted && gates.counter.includes(userId) ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'}`}>
                <i className="fa-solid fa-bolt text-sm"></i>
                {counterCount > 0 && <span>{counterCount}</span>}
              </button>
              
              <button onClick={() => handleIconClick('doubt')} className={`flex items-center gap-1.5 text-[11px] font-bold transition-all hover:-translate-y-0.5 ${hasReacted && gates.doubt.includes(userId) ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'}`}>
                <i className="fa-solid fa-magnifying-glass text-sm"></i>
                {doubtCount > 0 && <span>{doubtCount}</span>}
              </button>
            </div>
          )}

          {/* THE CLEAN REPLY BOX */}
          {isReplying && isAuthenticated && !hasReacted && !isEditing && (
            <div className="mt-3 animate-fade-in">
              <textarea
                value={replyText}
                onChange={(e) => {
                  setReplyText(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                placeholder="Add your reply..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-1 focus:ring-slate-300 outline-none resize-none overflow-hidden mb-2"
                rows="2"
                autoFocus
              />
              
              <div className="flex justify-between items-center px-1">
                <span className={`text-[10px] font-bold ${replyText.trim().length < 2 ? 'text-slate-400' : 'text-emerald-500'}`}>
                   {replyText.trim().length < 2 ? "Type to reply..." : "Ready"}
                </span>
                
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsReplying(false)} className="px-3 py-1.5 text-[10px] font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                    CANCEL
                  </button>
                  <button 
                    onClick={handleReplySubmit} 
                    disabled={replyText.trim().length < 2 || isSubmitting} 
                    className="bg-slate-900 text-white px-5 py-1.5 rounded-lg text-[10px] font-bold tracking-widest disabled:opacity-40"
                  >
                    {isSubmitting ? "..." : "POST"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// 🌟 THREAD MANAGER
function ThreadBlock({ mainComment, allInteractions, post, showToast }) {
  const [showReplies, setShowReplies] = useState(true);

  const getAllDescendants = (parentId) => {
    let result = [];
    const children = allInteractions.filter(i => i.parentId === parentId);
    children.forEach(child => {
      result.push(child);
      result = result.concat(getAllDescendants(child.id || child.timestamp));
    });
    return result;
  };

  const descendants = getAllDescendants(mainComment.id || mainComment.timestamp);
  descendants.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="border-b border-slate-100 py-3 md:py-4">
      <InteractionNode interaction={mainComment} allInteractions={allInteractions} post={post} showToast={showToast} isMainComment={true} />

      {descendants.length > 0 && (
        <div className="mt-1 ml-4 md:ml-10 border-l-[1.5px] border-slate-100 pl-3 md:pl-5">
          <button onClick={() => setShowReplies(!showReplies)} className="text-[10px] font-bold text-slate-400 hover:text-teal-600 mb-1 mt-1 flex items-center gap-1.5">
            <div className="h-[1px] w-4 bg-slate-200"></div>
            {showReplies ? 'Hide' : 'View'} {descendants.length} {descendants.length === 1 ? 'reply' : 'replies'}
          </button>

          {showReplies && (
            <div className="space-y-0 animate-fade-in">
              {descendants.map(reply => (
                <InteractionNode key={reply.id || reply.timestamp} interaction={reply} allInteractions={allInteractions} post={post} showToast={showToast} isMainComment={false} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 🌟 MAIN EXPORT WRAPPER
export default function CommentBox({ post, showToast }) {
  const [sortBy, setSortBy] = useState('new');

  const rawInteractions = post?.interactions || [];
  if (rawInteractions.length === 0) return null;

  const flatInteractions = [];
  rawInteractions.forEach(i => {
    flatInteractions.push({ ...i, parentId: i.parentId || null });
    if (i.replies) {
      i.replies.forEach(r => flatInteractions.push({ ...r, parentId: i.id || i.timestamp, type: r.type || 'support' }));
    }
  });

  const topLevelComments = flatInteractions.filter(i => !i.parentId);

  const sortedTopLevel = [...topLevelComments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    if (sortBy === 'top') {
      const aGates = a.commentGates || { support: [], counter: [], doubt: [] };
      const bGates = b.commentGates || { support: [], counter: [], doubt: [] };
      const aTotal = aGates.support.length + aGates.counter.length + aGates.doubt.length;
      const bTotal = bGates.support.length + bGates.counter.length + bGates.doubt.length;
      if (bTotal !== aTotal) return bTotal - aTotal;
    }
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="mt-4 pt-4 border-t border-slate-100">
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{topLevelComments.length} Reflections</span>
        <div className="flex gap-3 text-[11px] font-bold">
          <button onClick={() => setSortBy('new')} className={`${sortBy === 'new' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-400 hover:text-slate-600'} pb-1`}>Newest</button>
          <button onClick={() => setSortBy('top')} className={`${sortBy === 'top' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-400 hover:text-slate-600'} pb-1`}>Top Logic</button>
        </div>
      </div>

      <div className="space-y-0">
        {sortedTopLevel.map((mainComment) => (
          <ThreadBlock
            key={mainComment.id || mainComment.timestamp}
            mainComment={mainComment}
            allInteractions={flatInteractions}
            post={post}
            showToast={showToast}
          />
        ))}
      </div>
    </div>
  );
}
