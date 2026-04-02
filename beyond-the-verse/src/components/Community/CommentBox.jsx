import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function CommentNode({ interaction, post, showToast }) {
  const { isAuthenticated, isAdmin, userId, userName } = useAuth();
  
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fallbacks for older comments that might not have these fields
  const replies = interaction.replies || [];
  const gates = interaction.commentGates || { support: [], counter: [], doubt: [] };

  const supportCount = gates.support.length;
  const counterCount = gates.counter.length;
  const doubtCount = gates.doubt.length;
  
  // Check if current user has already reacted to THIS comment
  const hasReacted = gates.support.includes(userId) || gates.counter.includes(userId) || gates.doubt.includes(userId);

  const typeConfig = {
    support: { icon: 'fa-regular fa-circle-check', color: 'text-emerald-600', label: 'Supported' },
    counter: { icon: 'fa-solid fa-bolt', color: 'text-rose-600', label: 'Countered' },
    doubt: { icon: 'fa-solid fa-magnifying-glass', color: 'text-amber-600', label: 'Questioned' }
  };
  const config = typeConfig[interaction.type] || typeConfig['support']; // Safety fallback

  // 🛡️ ADMIN: Delete Comment
  const handleDeleteComment = async () => {
    try {
      const newInteractions = post.interactions.filter(i => i.id !== interaction.id);
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
      showToast("Comment deleted.");
    } catch (e) { showToast("Failed to delete.", false); }
  };

  // 🛡️ ADMIN: Pin Comment
  const handlePinComment = async () => {
    try {
      const newInteractions = post.interactions.map(i => 
        i.id === interaction.id ? { ...i, isPinned: !i.isPinned } : i
      );
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
    } catch (e) { showToast("Failed to pin.", false); }
  };

  // 💬 USER: Add a Reply to the Comment
  const handleReplySubmit = async () => {
    if (replyText.trim().length < 2) return;
    try {
      const newReply = {
        id: Date.now().toString(36),
        userId,
        userName: userName || "Explorer",
        text: replyText,
        timestamp: new Date().toISOString()
      };

      const newInteractions = post.interactions.map(i => 
        i.id === interaction.id ? { ...i, replies: [...(i.replies || []), newReply] } : i
      );

      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
      setReplyText("");
      setIsReplying(false);
      showToast("Reply posted!");
    } catch (e) { showToast("Failed to reply.", false); }
  };

  // 💬 USER: React to Comment (Support/Counter/Doubt)
  const handleCommentGateClick = async (type) => {
    if (!isAuthenticated) return showToast("Please login first.", false);
    if (hasReacted) return showToast("Already reacted to this comment.", false);

    try {
      const newGates = { ...gates, [type]: [...gates[type], userId] };
      const newInteractions = post.interactions.map(i => 
        i.id === interaction.id ? { ...i, commentGates: newGates } : i
      );
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
    } catch (e) { console.error(e); }
  };

  // Skip rendering if no ID (for super old database entries before this update)
  if (!interaction.id) return null;

  return (
    <div className={`border-b border-slate-100 last:border-none py-5 md:py-6 transition-colors ${interaction.isPinned ? 'bg-slate-50/50' : ''}`}>
      <div className="flex items-start gap-3 md:gap-4 px-1">
        
        {/* Avatar */}
        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs md:text-sm shrink-0">
          {interaction.userName?.charAt(0).toUpperCase()}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 text-sm tracking-tight truncate max-w-[120px] md:max-w-[200px]">
                {interaction.userName}
              </span>
              <span className={`text-[11px] md:text-xs font-semibold flex items-center gap-1 ${config.color}`}>
                <i className={config.icon}></i> {config.label}
              </span>
              {interaction.isPinned && <i className="fa-solid fa-thumbtack text-teal-500 text-[10px] ml-1"></i>}
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] md:text-[11px] text-slate-400 font-medium">
                {new Date(interaction.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </span>

              {/* Admin Actions */}
              {isAdmin && (
                <div className="flex items-center gap-2 ml-2 border-l border-slate-200 pl-3">
                  <button onClick={handlePinComment} className={`text-[10px] transition-colors ${interaction.isPinned ? 'text-teal-600' : 'text-slate-300 hover:text-slate-900'}`}>
                    <i className="fa-solid fa-thumbtack"></i>
                  </button>
                  {showDeleteConfirm ? (
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase">
                      <button onClick={handleDeleteComment} className="text-rose-600">Del</button>
                      <button onClick={() => setShowDeleteConfirm(false)} className="text-slate-400">X</button>
                    </div>
                  ) : (
                    <button onClick={() => setShowDeleteConfirm(true)} className="text-[10px] text-slate-300 hover:text-rose-600 transition-colors">
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Main Comment Text */}
          <p className="text-slate-800 text-lg md:text-xl leading-[1.8] verse-thought-serif mt-1.5 mb-2">
            {interaction.text}
          </p>
          
          {/* Reaction & Reply Bar */}
          <div className="flex items-center gap-6 mt-3 pt-1">
            <button onClick={() => setIsReplying(!isReplying)} className={`flex items-center gap-1.5 text-xs transition-colors ${isReplying ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-900 font-medium'}`}>
              <i className="fa-regular fa-comment"></i> Reply
            </button>

            <button onClick={() => handleCommentGateClick('support')} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${hasReacted && gates.support.includes(userId) ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'}`}>
              <i className="fa-regular fa-circle-check"></i> {supportCount > 0 && <span className="text-[11px]">{supportCount}</span>}
            </button>

            <button onClick={() => handleCommentGateClick('counter')} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${hasReacted && gates.counter.includes(userId) ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'}`}>
              <i className="fa-solid fa-bolt"></i> {counterCount > 0 && <span className="text-[11px]">{counterCount}</span>}
            </button>

            <button onClick={() => handleCommentGateClick('doubt')} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${hasReacted && gates.doubt.includes(userId) ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'}`}>
              <i className="fa-solid fa-magnifying-glass"></i> {doubtCount > 0 && <span className="text-[11px]">{doubtCount}</span>}
            </button>
          </div>

          {/* Reply Input Box */}
          {isReplying && (
            <div className="mt-3 animate-fade-in flex items-center gap-2">
              <input 
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 bg-slate-50 border-none rounded-full px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-1 focus:ring-slate-200"
              />
              <button 
                onClick={handleReplySubmit}
                disabled={replyText.length < 2}
                className="bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wide disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
              >
                Post
              </button>
            </div>
          )}

          {/* Display Replies */}
          {replies.length > 0 && (
            <div className="mt-4 space-y-3 border-l-2 border-slate-100 pl-4 ml-2">
              {replies.map((reply) => (
                <div key={reply.id} className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-[10px] shrink-0">
                    {reply.userName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-xs">{reply.userName}</span>
                      <span className="text-[9px] text-slate-400">{new Date(reply.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <p className="text-slate-700 text-sm mt-0.5">{reply.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// 🌟 Main Wrapper
export default function CommentBox({ post, showToast }) {
  const interactions = post?.interactions || [];
  if (interactions.length === 0) return null;

  // Sorting: Pinned comments show up first, then newest first
  const sortedInteractions = [...interactions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="mt-4 pt-4 border-t border-slate-100">
      <div className="space-y-0">
        {sortedInteractions.map((interaction) => (
          <CommentNode 
            key={interaction.id || interaction.timestamp} 
            interaction={interaction} 
            post={post}
            showToast={showToast}
          />
        ))}
      </div>
    </div>
  );
}
