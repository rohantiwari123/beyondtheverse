import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function CommentNode({ interaction, post, showToast }) {
  const { isAuthenticated, isAdmin, userId, userName } = useAuth();
  
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false); // Collapsible replies

  const targetId = interaction.id || interaction.timestamp;
  const replies = interaction.replies || [];
  const gates = interaction.commentGates || { support: [], counter: [], doubt: [] };

  const supportCount = gates.support.length;
  const counterCount = gates.counter.length;
  const doubtCount = gates.doubt.length;
  const hasReacted = gates.support.includes(userId) || gates.counter.includes(userId) || gates.doubt.includes(userId);

  const typeConfig = {
    support: { icon: 'fa-regular fa-circle-check', color: 'text-emerald-600', label: 'Supported' },
    counter: { icon: 'fa-solid fa-bolt', color: 'text-rose-600', label: 'Countered' },
    doubt: { icon: 'fa-solid fa-magnifying-glass', color: 'text-amber-600', label: 'Questioned' }
  };
  const config = typeConfig[interaction.type] || typeConfig['support'];

  // Actions (Same as before)
  const handleDeleteComment = async () => {
    try {
      const newInteractions = post.interactions.filter(i => (i.id || i.timestamp) !== targetId);
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
      showToast("Comment deleted.");
    } catch (e) { showToast("Failed.", false); }
  };

  const handleReplySubmit = async () => {
    if (replyText.trim().length < 2) return;
    try {
      const newReply = { id: Date.now().toString(36), userId, userName: userName || "Explorer", text: replyText, timestamp: new Date().toISOString() };
      const newInteractions = post.interactions.map(i => (i.id || i.timestamp) === targetId ? { ...i, replies: [...(i.replies || []), newReply] } : i);
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
      setReplyText(""); setIsReplying(false); setShowReplies(true);
    } catch (e) { showToast("Failed.", false); }
  };

  const handleCommentGateClick = async (type) => {
    if (!isAuthenticated || hasReacted) return;
    try {
      const newGates = { ...gates, [type]: [...gates[type], userId] };
      const newInteractions = post.interactions.map(i => (i.id || i.timestamp) === targetId ? { ...i, commentGates: newGates } : i);
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
    } catch (e) { console.error(e); }
  };

  return (
    <div className="border-b border-slate-100 last:border-none py-4 md:py-6 group">
      <div className="flex items-start gap-3 md:gap-4 px-1">
        
        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs md:text-sm shrink-0 mt-1">
          {interaction.userName?.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 text-sm">{interaction.userName}</span>
              <span className={`text-[11px] md:text-xs font-semibold flex items-center gap-1 ${config.color}`}>
                <i className={config.icon}></i> {config.label}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-[11px] text-slate-400 font-medium">
                {new Date(interaction.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </span>
              {isAdmin && (
                <button onClick={handleDeleteComment} className="text-[10px] text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              )}
            </div>
          </div>
          
          <p className="text-slate-800 text-lg md:text-xl leading-[1.8] verse-thought-serif mt-1 mb-1.5">
            {interaction.text}
          </p>
          
          <div className="flex items-center gap-6 mt-2">
            <button onClick={() => setIsReplying(!isReplying)} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-900 font-medium">
              <i className="fa-regular fa-comment"></i> Reply
            </button>
            <button onClick={() => handleCommentGateClick('support')} className={`flex items-center gap-1.5 text-xs font-medium ${hasReacted && gates.support.includes(userId) ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'}`}>
              <i className="fa-regular fa-circle-check"></i> {supportCount > 0 && <span>{supportCount}</span>}
            </button>
            <button onClick={() => handleCommentGateClick('counter')} className={`flex items-center gap-1.5 text-xs font-medium ${hasReacted && gates.counter.includes(userId) ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'}`}>
              <i className="fa-solid fa-bolt"></i> {counterCount > 0 && <span>{counterCount}</span>}
            </button>
            <button onClick={() => handleCommentGateClick('doubt')} className={`flex items-center gap-1.5 text-xs font-medium ${hasReacted && gates.doubt.includes(userId) ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'}`}>
              <i className="fa-solid fa-magnifying-glass"></i> {doubtCount > 0 && <span>{doubtCount}</span>}
            </button>
          </div>

          {isReplying && (
            <div className="mt-3 flex items-center gap-2">
              <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." className="flex-1 bg-slate-50 border-none rounded-full px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-1 focus:ring-slate-200" />
              <button onClick={handleReplySubmit} disabled={replyText.length < 2} className="bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase disabled:bg-slate-200">Post</button>
            </div>
          )}

          {/* Collapsible Replies */}
          {replies.length > 0 && (
            <div className="mt-3">
              <button onClick={() => setShowReplies(!showReplies)} className="text-[11px] font-bold text-teal-600 flex items-center gap-1 mb-2 hover:underline">
                {showReplies ? 'Hide' : 'View'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
              </button>
              
              {showReplies && (
                <div className="space-y-3 border-l-2 border-slate-100 pl-4 ml-2 animate-fade-in">
                  {replies.map((reply) => (
                    <div key={reply.id || reply.timestamp} className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-[10px] shrink-0 mt-0.5">
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
          )}

        </div>
      </div>
    </div>
  );
}

// 🌟 Main Wrapper with Sort Logic
export default function CommentBox({ post, showToast }) {
  const [sortBy, setSortBy] = useState('new'); // 'new' or 'top'
  
  const interactions = post?.interactions || [];
  if (interactions.length === 0) return null;

  const sortedInteractions = [...interactions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    if (sortBy === 'top') {
      const aGates = a.commentGates || { support: [], counter: [], doubt: [] };
      const bGates = b.commentGates || { support: [], counter: [], doubt: [] };
      const aTotal = aGates.support.length + aGates.counter.length + aGates.doubt.length;
      const bTotal = bGates.support.length + bGates.counter.length + bGates.doubt.length;
      if (bTotal !== aTotal) return bTotal - aTotal; // Sort by total reactions
    }
    
    return new Date(b.timestamp) - new Date(a.timestamp); // Fallback to newest
  });

  return (
    <div className="mt-4 pt-4 border-t border-slate-100">
      
      {/* 🌟 Sort Controls */}
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-xs font-bold text-slate-900">{interactions.length} Reflections</span>
        <div className="flex gap-3 text-xs font-semibold">
          <button onClick={() => setSortBy('new')} className={`${sortBy === 'new' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>Newest</button>
          <button onClick={() => setSortBy('top')} className={`${sortBy === 'top' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>Top Logic</button>
        </div>
      </div>

      <div className="space-y-0">
        {sortedInteractions.map((interaction) => (
          <CommentNode key={interaction.id || interaction.timestamp} interaction={interaction} post={post} showToast={showToast} />
        ))}
      </div>
    </div>
  );
                                                             }
