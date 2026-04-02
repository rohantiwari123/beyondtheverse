import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

// 🌟 RECURSIVE COMPONENT: Ye khud ko call karega jab tak replies khatam nahi hote
function CommentNode({ interaction, allInteractions, post, showToast, depth = 0 }) {
  const { isAuthenticated, isAdmin, userId, userName } = useAuth();
  
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(true);

  // 🔍 Find all replies where parentId matches this comment's ID
  const nestedReplies = allInteractions
    .filter(i => i.parentId === (interaction.id || interaction.timestamp))
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Oldest first for replies

  const targetId = interaction.id || interaction.timestamp;
  const gates = interaction.commentGates || { support: [], counter: [], doubt: [] };

  const supportCount = gates.support.length;
  const counterCount = gates.counter.length;
  const doubtCount = gates.doubt.length;
  const hasReacted = gates.support.includes(userId) || gates.counter.includes(userId) || gates.doubt.includes(userId);

  // Styling Config (Added 'reply' type for nested ones)
  const typeConfig = {
    support: { icon: 'fa-regular fa-circle-check', color: 'text-emerald-600', label: 'Supported' },
    counter: { icon: 'fa-solid fa-bolt', color: 'text-rose-600', label: 'Countered' },
    doubt: { icon: 'fa-solid fa-magnifying-glass', color: 'text-amber-600', label: 'Questioned' },
    reply: { icon: 'fa-solid fa-reply', color: 'text-slate-500', label: 'Replied' }
  };
  const config = typeConfig[interaction.type] || typeConfig['reply'];

  // 🛡️ ADMIN ACTIONS
  const handleDeleteComment = async () => {
    try {
      const newInteractions = post.interactions.filter(i => (i.id || i.timestamp) !== targetId);
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
      showToast("Deleted.");
    } catch (e) { showToast("Failed.", false); }
  };

  // 💬 SUBMIT INFINITE NESTED REPLY
  const handleReplySubmit = async () => {
    if (replyText.trim().length < 2) return;
    
    // Create unique ID for the new reply
    const superUniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    
    try {
      const newReply = { 
        id: superUniqueId, 
        parentId: targetId, // 🌟 INFINITY KEY: Linking this reply to current comment
        userId, 
        userName: userName || "Explorer", 
        type: 'reply', // Mark as a generic reply
        text: replyText.trim(), 
        timestamp: new Date().toISOString(),
        commentGates: { support: [], counter: [], doubt: [] }
      };
      
      const newInteractions = [...post.interactions, newReply];
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
      
      setReplyText(""); 
      setIsReplying(false); 
      setShowReplies(true);
    } catch (e) { showToast("Failed to reply.", false); }
  };

  const handleCommentGateClick = async (type) => {
    if (!isAuthenticated || hasReacted) return;
    try {
      const newGates = { ...gates, [type]: [...gates[type], userId] };
      const newInteractions = post.interactions.map(i => (i.id || i.timestamp) === targetId ? { ...i, commentGates: newGates } : i);
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
    } catch (e) { console.error(e); }
  };

  // 🎨 Visual Depth Control: Indent the replies to create a Thread structure
  const isNested = depth > 0;
  const maxDepthReached = depth > 5; // Prevent squishing on mobile after 5 levels

  return (
    <div className={`${isNested ? 'mt-4 border-l-2 border-slate-100 pl-3 md:pl-5 ml-2 md:ml-4' : 'border-b border-slate-100 last:border-none py-5 md:py-6'} transition-all group`}>
      
      <div className="flex items-start gap-3 px-1">
        
        {/* Avatar gets slightly smaller at deeper levels */}
        <div className={`${isNested ? 'h-7 w-7 md:h-8 md:w-8 text-[10px]' : 'h-10 w-10 text-sm'} rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0 mt-0.5`}>
          {interaction.userName?.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-bold text-slate-900 ${isNested ? 'text-xs md:text-sm' : 'text-sm'}`}>{interaction.userName}</span>
              <span className={`text-[10px] md:text-[11px] font-semibold flex items-center gap-1 ${config.color}`}>
                {config.icon !== 'fa-solid fa-reply' && <i className={config.icon}></i>} {config.label}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[9px] md:text-[10px] text-slate-400 font-medium">
                {new Date(interaction.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </span>
              {isAdmin && (
                <button onClick={handleDeleteComment} className="text-[10px] text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              )}
            </div>
          </div>
          
          <p className={`text-slate-800 leading-[1.7] verse-thought-serif ${isNested ? 'text-base md:text-lg mt-0.5' : 'text-lg md:text-xl mt-1.5'} mb-1.5`}>
            {/* Convert @username mentions to blue text */}
            {interaction.text.split(' ').map((word, i) => 
              word.startsWith('@') ? <span key={i} className="text-teal-600 font-medium">{word} </span> : word + ' '
            )}
          </p>
          
          {/* Reaction Bar */}
          <div className="flex items-center gap-5 mt-1.5">
            <button onClick={() => setIsReplying(!isReplying)} className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-900 font-bold transition-colors">
              <i className="fa-solid fa-reply"></i> Reply
            </button>
            <button onClick={() => handleCommentGateClick('support')} className={`flex items-center gap-1.5 text-[11px] font-bold ${hasReacted && gates.support.includes(userId) ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'}`}>
              <i className="fa-regular fa-circle-check"></i> {supportCount > 0 && <span>{supportCount}</span>}
            </button>
            <button onClick={() => handleCommentGateClick('counter')} className={`flex items-center gap-1.5 text-[11px] font-bold ${hasReacted && gates.counter.includes(userId) ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'}`}>
              <i className="fa-solid fa-bolt"></i> {counterCount > 0 && <span>{counterCount}</span>}
            </button>
            <button onClick={() => handleCommentGateClick('doubt')} className={`flex items-center gap-1.5 text-[11px] font-bold ${hasReacted && gates.doubt.includes(userId) ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'}`}>
              <i className="fa-solid fa-magnifying-glass"></i> {doubtCount > 0 && <span>{doubtCount}</span>}
            </button>
          </div>

          {/* Reply Input Box */}
          {isReplying && (
            <div className="mt-3 flex items-center gap-2 animate-fade-in">
              <input 
                type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} 
                placeholder={`Reply to ${interaction.userName}...`} 
                className="flex-1 bg-slate-50 border border-slate-100 rounded-full px-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-1 focus:ring-slate-300 outline-none" 
                autoFocus
              />
              <button onClick={handleReplySubmit} disabled={replyText.trim().length < 2} className="bg-slate-900 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase disabled:bg-slate-200 transition-colors">
                Post
              </button>
            </div>
          )}

          {/* 🌟 INFINITE RECURSION: Render children here */}
          {nestedReplies.length > 0 && (
            <div className="mt-2">
              {/* Optional Collapse Button */}
              {isNested && (
                <button onClick={() => setShowReplies(!showReplies)} className="text-[10px] font-bold text-slate-400 hover:text-teal-600 mt-2">
                  {showReplies ? 'Hide replies' : `Show ${nestedReplies.length} replies`}
                </button>
              )}
              
              {showReplies && (
                <div className={maxDepthReached ? "" : ""}>
                  {nestedReplies.map((reply) => (
                    // This component calls itself!
                    <CommentNode 
                      key={reply.id} 
                      interaction={reply} 
                      allInteractions={allInteractions} 
                      post={post} 
                      showToast={showToast} 
                      depth={maxDepthReached ? depth : depth + 1} 
                    />
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

// 🌟 MAIN EXPORT WRAPPER
export default function CommentBox({ post, showToast }) {
  const [sortBy, setSortBy] = useState('new'); 
  
  const rawInteractions = post?.interactions || [];
  if (rawInteractions.length === 0) return null;

  // 1. Data Normalization: Move old 'replies' to flat list with parentId for backward compatibility
  const flatInteractions = [];
  rawInteractions.forEach(i => {
    flatInteractions.push({ ...i, parentId: i.parentId || null });
    if (i.replies) {
      i.replies.forEach(r => flatInteractions.push({ ...r, parentId: i.id || i.timestamp, type: 'reply' }));
    }
  });

  // 2. Separate Top-Level Comments from Replies
  const topLevelComments = flatInteractions.filter(i => !i.parentId);

  // 3. Sort Top-Level Comments
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
      
      <div className="flex justify-between items-center mb-4 px-1">
        <span className="text-xs font-bold text-slate-900">{topLevelComments.length} Reflections</span>
        <div className="flex gap-3 text-xs font-semibold">
          <button onClick={() => setSortBy('new')} className={`${sortBy === 'new' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>Newest</button>
          <button onClick={() => setSortBy('top')} className={`${sortBy === 'top' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>Top Logic</button>
        </div>
      </div>

      <div className="space-y-0">
        {/* Render only Top-Level here. They will recursively render their own children. */}
        {sortedTopLevel.map((interaction) => (
          <CommentNode 
            key={interaction.id || interaction.timestamp} 
            interaction={interaction} 
            allInteractions={flatInteractions} 
            post={post} 
            showToast={showToast} 
            depth={0} 
          />
        ))}
      </div>
    </div>
  );
                                                             }
