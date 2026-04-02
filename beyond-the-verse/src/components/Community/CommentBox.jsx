import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

// 🌟 REUSABLE COMPONENT: For both Main Comments and Nested Replies
function InteractionNode({ interaction, allInteractions, post, showToast, isMainComment }) {
  const { isAuthenticated, isAdmin, userId, userName } = useAuth();
  
  const [isReplying, setIsReplying] = useState(false);
  const [replyType, setReplyType] = useState('support'); // Default selection for nested reply
  const [replyText, setReplyText] = useState("");

  const targetId = interaction.id || interaction.timestamp;
  const gates = interaction.commentGates || { support: [], counter: [], doubt: [] };

  const supportCount = gates.support.length;
  const counterCount = gates.counter.length;
  const doubtCount = gates.doubt.length;
  const hasReacted = gates.support.includes(userId) || gates.counter.includes(userId) || gates.doubt.includes(userId);

  // Styling Config (Works for both Main Comments and Replies now)
  const typeConfig = {
    support: { icon: 'fa-regular fa-circle-check', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100', label: 'Supported' },
    counter: { icon: 'fa-solid fa-bolt', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-100', label: 'Countered' },
    doubt: { icon: 'fa-solid fa-magnifying-glass', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100', label: 'Questioned' },
    reply: { icon: 'fa-solid fa-reply', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', label: 'Replied' }
  };
  const config = typeConfig[interaction.type] || typeConfig['reply'];

  // 🔍 Find who we are replying to
  const parentInteraction = allInteractions?.find(i => (i.id || i.timestamp) === interaction.parentId);

  // 🛡️ ADMIN ACTIONS
  const handleDeleteComment = async () => {
    try {
      const newInteractions = post.interactions.filter(i => (i.id || i.timestamp) !== targetId);
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
      showToast("Deleted.");
    } catch (e) { showToast("Failed.", false); }
  };

  // 💬 SUBMIT CLASSIFIED REPLY
  const handleReplySubmit = async () => {
    if (replyText.trim().length < 2) return;
    
    const superUniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    
    try {
      const newReply = { 
        id: superUniqueId, 
        parentId: targetId, 
        userId, 
        userName: userName || "Explorer", 
        type: replyType, // 🌟 Now saving Support/Counter/Doubt instead of just 'reply'
        text: replyText.trim(), 
        timestamp: new Date().toISOString(),
        commentGates: { support: [], counter: [], doubt: [] }
      };
      
      const newInteractions = [...post.interactions, newReply];
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
      
      setReplyText(""); 
      setIsReplying(false); 
    } catch (e) { showToast("Failed to reply.", false); }
  };

  // ⚡ QUICK REACTION (Without typing a reply)
  const handleCommentGateClick = async (type) => {
    if (!isAuthenticated) return showToast("Please login first.", false);
    if (hasReacted) return showToast("Already reacted to this.", false);
    try {
      const newGates = { ...gates, [type]: [...gates[type], userId] };
      const newInteractions = post.interactions.map(i => (i.id || i.timestamp) === targetId ? { ...i, commentGates: newGates } : i);
      await updateDoc(doc(db, "posts", post.id), { interactions: newInteractions });
    } catch (e) { console.error(e); }
  };

  return (
    <div className={`py-4 transition-all group ${isMainComment ? '' : 'border-t border-slate-100'}`}>
      
      {/* 🌟 WHO IS REPLYING TO WHOM? (Only for nested replies) */}
      {!isMainComment && parentInteraction && (
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mb-2 ml-10 md:ml-12">
          <i className="fa-solid fa-reply text-slate-300"></i>
          Replying to <span className="text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded uppercase tracking-wider">@{parentInteraction.userName}</span>
        </div>
      )}

      <div className="flex items-start gap-3 px-1">
        
        {/* Avatar */}
        <div className={`${isMainComment ? 'h-9 w-9 md:h-10 md:w-10 text-sm' : 'h-8 w-8 text-xs'} rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0 mt-0.5`}>
          {interaction.userName?.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-bold text-slate-900 ${isMainComment ? 'text-sm' : 'text-sm'}`}>{interaction.userName}</span>
              
              {/* 🌟 BADGE: Now visible on BOTH Main Comments and Replies */}
              <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-wide flex items-center gap-1.5 ${config.color} ${config.bg} border ${config.border} px-2 py-0.5 rounded-md`}>
                <i className={config.icon}></i> {config.label}
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
          
          <p className={`text-slate-800 leading-[1.7] verse-thought-serif ${isMainComment ? 'text-lg md:text-xl mt-1.5' : 'text-base md:text-lg mt-0.5'} mb-1.5`}>
            {interaction.text}
          </p>
          
          {/* Reaction & Reply Bar */}
          <div className="flex items-center gap-5 mt-2">
            <button onClick={() => { setIsReplying(!isReplying); if(!isAuthenticated) showToast("Login first", false); }} className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-900 font-bold transition-colors">
              <i className="fa-solid fa-reply"></i> Reply
            </button>
            
            {/* Quick Counters */}
            <button onClick={() => handleCommentGateClick('support')} className={`flex items-center gap-1 text-[11px] font-bold ${hasReacted && gates.support.includes(userId) ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'}`}>
              <i className="fa-regular fa-circle-check"></i> {supportCount > 0 && <span>{supportCount}</span>}
            </button>
            <button onClick={() => handleCommentGateClick('counter')} className={`flex items-center gap-1 text-[11px] font-bold ${hasReacted && gates.counter.includes(userId) ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'}`}>
              <i className="fa-solid fa-bolt"></i> {counterCount > 0 && <span>{counterCount}</span>}
            </button>
            <button onClick={() => handleCommentGateClick('doubt')} className={`flex items-center gap-1 text-[11px] font-bold ${hasReacted && gates.doubt.includes(userId) ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'}`}>
              <i className="fa-solid fa-magnifying-glass"></i> {doubtCount > 0 && <span>{doubtCount}</span>}
            </button>
          </div>

          {/* 🌟 NEW ADVANCED REPLY BOX */}
          {isReplying && isAuthenticated && (
            <div className="mt-3 bg-slate-50 p-3 md:p-4 rounded-2xl animate-fade-in border border-slate-100">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Choose Your Logic Stance:</label>
              
              {/* Gate Selectors */}
              <div className="flex flex-wrap gap-2 mb-3">
                <button onClick={() => setReplyType('support')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${replyType === 'support' ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'}`}>
                  <i className="fa-regular fa-circle-check"></i> Support
                </button>
                <button onClick={() => setReplyType('counter')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${replyType === 'counter' ? 'bg-rose-100 text-rose-700 ring-1 ring-rose-300' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'}`}>
                  <i className="fa-solid fa-bolt"></i> Counter
                </button>
                <button onClick={() => setReplyType('doubt')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${replyType === 'doubt' ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-300' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'}`}>
                  <i className="fa-solid fa-magnifying-glass"></i> Doubt
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row items-end gap-2">
                <textarea 
                  value={replyText} 
                  onChange={(e) => setReplyText(e.target.value)} 
                  placeholder={`State your logical response to ${interaction.userName}...`} 
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-1 focus:ring-slate-300 outline-none resize-none min-h-[50px]" 
                  rows="2"
                  autoFocus
                />
                <button onClick={handleReplySubmit} disabled={replyText.trim().length < 2} className="w-full md:w-auto bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest disabled:bg-slate-200 transition-colors shrink-0">
                  Post
                </button>
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

  // Recursively fetch all replies
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
      {/* Main Thread Origin */}
      <InteractionNode interaction={mainComment} allInteractions={allInteractions} post={post} showToast={showToast} isMainComment={true} />

      {/* Flat Nested Replies */}
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
      i.replies.forEach(r => flatInteractions.push({ ...r, parentId: i.id || i.timestamp, type: 'reply' }));
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
