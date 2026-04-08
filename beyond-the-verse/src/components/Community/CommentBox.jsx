import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatDateTime } from '../../utils/dateFormatter';

// 🌟 Real Service Imports
import {
  upgradeCommentToAdmin,
  deleteCommentInteraction,
  editCommentInteraction,
  togglePinComment,
  addCommentReply
} from '../../services/firebaseServices';

function InteractionNode({ interaction, allInteractions, post, showToast, isMainComment }) {
  const { isAuthenticated, isAdmin, userId, userName } = useAuth();

  const [isReplying, setIsReplying] = useState(false);
  const [replyType, setReplyType] = useState('support');
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(interaction.text);
  const isOwner = interaction.userId === userId;

  const targetId = interaction.id || interaction.timestamp;
  const gates = interaction.commentGates || { support: [], counter: [], doubt: [] };
  
  // 🌟 FIX: Bot aur Admin ko alag-alag pehchanna
  const isBot = interaction.userId === 'system_bot_001';
  const isAdminBadge = interaction.isAdminComment === true || interaction.role === 'admin';

  useEffect(() => {
    // Bot ko admin upgrade process se bahar rakha hai
    if (isOwner && isAdmin && !isAdminBadge && !isBot) {
      upgradeCommentToAdmin(post.id, post.interactions, targetId)
        .catch(err => console.error("Admin upgrade failed", err));
    }
  }, [isOwner, isAdmin, isAdminBadge, isBot, post.id, targetId, post.interactions]);

  const supportCount = gates.support.length;
  const counterCount = gates.counter.length;
  const doubtCount = gates.doubt.length;
  const hasReacted = gates.support.includes(userId) || gates.counter.includes(userId) || gates.doubt.includes(userId);

  const typeConfig = {
    support: { icon: 'fa-regular fa-circle-check', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', label: 'SUPPORTED' },
    counter: { icon: 'fa-solid fa-bolt', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', label: 'COUNTERED' },
    doubt: { icon: 'fa-solid fa-magnifying-glass', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', label: 'DOUBTED' }
  };
  const config = typeConfig[interaction.type] || typeConfig['support'];

  const parentInteraction = allInteractions?.find(i => (i.id || i.timestamp) === interaction.parentId);

  const handleDeleteComment = async () => {
    if (!window.confirm("Delete this reflection?")) return;
    try {
      await deleteCommentInteraction(post.id, post.interactions, targetId, interaction.parentId, interaction.type, userId);
      showToast("Comment deleted.");
    } catch (e) { showToast("Failed to delete.", false); }
  };

  const handleEditSubmit = async () => {
    if (editText.trim().length < 2) return;
    try {
      await editCommentInteraction(post.id, post.interactions, targetId, editText.trim());
      setIsEditing(false);
      setShowMenu(false);
      showToast("Comment updated.");
    } catch (e) { showToast("Failed to update.", false); }
  };

  const handlePinComment = async () => {
    try {
      await togglePinComment(post.id, post.interactions, targetId, interaction.isPinned);
      showToast(interaction.isPinned ? "Unpinned!" : "Pinned to top! 📌");
      setShowMenu(false);
    } catch (e) { console.error(e); }
  };

  const handleIconClick = (type) => {
    if (!isAuthenticated) return showToast("Please login first.", false);
    if (hasReacted) return showToast("You have already added logic to this.", false);
    setReplyType(type);
    setIsReplying(true);
  };

  const handleReplySubmit = async () => {
    if (replyText.trim().length < 2) return;
    setIsSubmitting(true);
    try {
      const replyData = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2, 9),
        parentId: targetId,
        userId,
        userName: userName || "Explorer",
        type: replyType,
        text: replyText.trim(),
        timestamp: new Date().toISOString(),
        commentGates: { support: [], counter: [], doubt: [] },
        isAdminComment: isAdmin
      };
      await addCommentReply(post.id, post.interactions, targetId, replyData, gates);
      setReplyText("");
      setIsReplying(false);
      showToast("Logic recorded! 🚀");
    } catch (e) { showToast("Failed to reply.", false); }
    finally { setIsSubmitting(false); }
  };

  // Markdown (**) ko bold span me convert karne wala function
  const formatMessage = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={idx} className="font-semibold text-slate-800">{part.slice(2, -2)}</span>;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // 🌟 FIX: Avatar aur Name ki styling alag-alag (Bot vs Admin vs User)
  const avatarClass = isBot 
    ? "bg-slate-800 text-white" 
    : isAdminBadge 
      ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-sm shadow-amber-500/20" 
      : "bg-slate-100 text-slate-600";
      
  const nameColorClass = isBot 
    ? "text-slate-900 font-medium" 
    : isAdminBadge 
      ? "text-amber-900 font-medium" 
      : "text-slate-700";

  return (
    <div className={`transition-all group w-full ${isMainComment ? 'py-2' : ''}`}>

      {!isMainComment && parentInteraction && (
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-2 pl-12">
          <i className="fa-solid fa-reply rotate-180"></i>
          To <span className="text-teal-700">@{parentInteraction.userName}</span>
        </div>
      )}

      <div className="flex items-start gap-3 px-1">

        <div className={`${isMainComment ? 'h-10 w-10 text-sm' : 'h-8 w-8 text-xs'} rounded-full flex items-center justify-center shrink-0 relative transition-all ${avatarClass}`}>
          {interaction.userName?.charAt(0).toUpperCase()}
          {isBot && (
            <div className="absolute -top-0.5 -right-0.5 text-slate-500 bg-white rounded-full h-3.5 w-3.5 flex items-center justify-center border border-slate-200">
              <i className="fa-solid fa-robot text-[7px]"></i>
            </div>
          )}
          {!isBot && isAdminBadge && (
            <div className="absolute -top-1 -right-1 text-amber-500 bg-white rounded-full h-3.5 w-3.5 flex items-center justify-center shadow-sm border border-amber-100">
              <i className="fa-solid fa-crown text-[6px]"></i>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5 relative">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`${isMainComment ? 'text-sm' : 'text-[13px]'} transition-colors ${nameColorClass}`}>
                {interaction.userName}
              </span>

              {/* 🌟 FIX: Bot aur Admin ka Badge alag kar diya */}
              {isBot ? (
                <span className="bg-slate-100 text-slate-600 text-[9px] uppercase px-1.5 py-0.5 rounded flex items-center gap-1 border border-slate-200 tracking-wide">
                  Bot
                </span>
              ) : isAdminBadge ? (
                <span className="bg-amber-100 text-amber-700 text-[9px] uppercase px-1.5 py-0.5 rounded flex items-center gap-1 border border-amber-200 tracking-wide">
                  ADMIN
                </span>
              ) : null}

              {interaction.isPinned && <i className="fa-solid fa-thumbtack text-teal-500 text-[10px]"></i>}

              {/* Bot ko Support/Counter wala label nahi dikhega */}
              {!isBot && (
                <span className={`text-[9px] md:text-[10px] uppercase flex items-center gap-1.5 ${config.color} ${config.bg} border ${config.border} px-2 py-0.5 rounded-md`}>
                  <i className={config.icon}></i> {config.label}
                </span>
              )}

              <span className="text-[9px] md:text-[10px] text-slate-400 whitespace-nowrap">
                • {formatDateTime(interaction.timestamp)}
                {interaction.isEdited && <span className="ml-1 italic opacity-70">(Edited)</span>}
              </span>
            </div>

            <button onClick={() => setShowMenu(!showMenu)} className="text-slate-400 hover:text-slate-900 p-1 -mr-1 transition-colors relative z-10">
              <i className="fa-solid fa-ellipsis"></i>
            </button>

            {showMenu && (
              <div className="absolute right-0 top-6 bg-white border border-slate-100 shadow-xl rounded-xl w-32 py-1 z-20 animate-fade-in">
                {isAdmin && <button onClick={handlePinComment} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">{interaction.isPinned ? 'Unpin' : 'Pin to top'}</button>}
                {(isOwner || isAdmin) && (
                  <>
                    {isOwner && <button onClick={() => { setIsEditing(true); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">Edit</button>}
                    <button onClick={handleDeleteComment} className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50">Delete</button>
                  </>
                )}
                {!isOwner && <button onClick={() => { showToast("Reported"); setShowMenu(false) }} className="w-full text-left px-4 py-2 text-xs text-amber-600 hover:bg-amber-50">Report</button>}
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="animate-fade-in mb-2 mt-1">
              <textarea
                value={editText}
                onChange={(e) => {
                  setEditText(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:ring-1 focus:ring-slate-300 resize-none overflow-hidden shadow-inner"
                rows="2"
              />
              <div className="flex gap-2 mt-2 justify-end">
                <button onClick={() => setIsEditing(false)} className="text-xs text-slate-500 px-3 py-1.5 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button onClick={handleEditSubmit} className="text-xs text-white bg-slate-900 px-4 py-1.5 rounded-lg">Save</button>
              </div>
            </div>
          ) : (
            <>
              {/* Normal Text Output */}
              <p className={`text-slate-700 whitespace-pre-wrap text-justify break-words ${isMainComment ? 'text-[14px] mt-1' : 'text-sm mt-0.5'} mb-1`}>
                {formatMessage(interaction.text)}
              </p>

              {/* Bot ki galtiyo wali Table */}
              {interaction.mistakes && interaction.mistakes.length > 0 && (
                <div className="mt-2 mb-3 overflow-hidden rounded-lg border border-slate-200 w-full max-w-sm">
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-slate-50/80 border-b border-slate-100">
                      <tr>
                        <th className="px-3 py-2 text-slate-400 font-medium uppercase tracking-wider text-[10px] w-1/2">
                          Typo
                        </th>
                        <th className="px-3 py-2 text-slate-400 font-medium uppercase tracking-wider text-[10px] w-1/2">
                          Correction
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {interaction.mistakes.map((m, idx) => (
                        <tr key={idx} className="bg-white">
                          <td className="px-3 py-2 text-slate-500 line-through decoration-rose-300">
                            {m.wrong}
                          </td>
                          <td className="px-3 py-2 text-emerald-600 font-medium">
                            {m.correct}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {!isEditing && !isBot && (
            <div className="flex items-center gap-4 mt-2">
              <button onClick={() => handleIconClick('support')} className={`flex items-center gap-1.5 text-[11px] transition-all hover:-translate-y-0.5 ${hasReacted && gates.support.includes(userId) ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'}`}>
                <i className={`${hasReacted && gates.support.includes(userId) ? 'fa-solid' : 'fa-regular'} fa-circle-check text-sm`}></i>{supportCount > 0 && <span>{supportCount}</span>}
              </button>
              <button onClick={() => handleIconClick('counter')} className={`flex items-center gap-1.5 text-[11px] transition-all hover:-translate-y-0.5 ${hasReacted && gates.counter.includes(userId) ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'}`}>
                <i className="fa-solid fa-bolt text-sm"></i>{counterCount > 0 && <span>{counterCount}</span>}
              </button>
              <button onClick={() => handleIconClick('doubt')} className={`flex items-center gap-1.5 text-[11px] transition-all hover:-translate-y-0.5 ${hasReacted && gates.doubt.includes(userId) ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'}`}>
                <i className="fa-solid fa-magnifying-glass text-sm"></i>{doubtCount > 0 && <span>{doubtCount}</span>}
              </button>
            </div>
          )}

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
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-1 focus:ring-slate-300 outline-none resize-none overflow-hidden mb-2 shadow-inner"
                rows="2" autoFocus
              />
              <div className="flex justify-between items-center px-1">
                <span className={`text-[10px] ${replyText.trim().length < 2 ? 'text-slate-400' : 'text-emerald-500'}`}>
                  {replyText.trim().length < 2 ? "Type to reply..." : "Ready"}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsReplying(false)} className="px-3 py-1.5 text-[10px] text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">CANCEL</button>
                  <button onClick={handleReplySubmit} disabled={replyText.trim().length < 2 || isSubmitting} className="bg-slate-900 text-white px-5 py-1.5 rounded-lg text-[10px] disabled:opacity-40">
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

// 🌟 MANAGER BLOCK
function ThreadBlock({ mainComment, allInteractions, post, showToast }) {
  const [showReplies, setShowReplies] = useState(false);

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
    <div className="border-b border-slate-100 py-4">
      <InteractionNode interaction={mainComment} allInteractions={allInteractions} post={post} showToast={showToast} isMainComment={true} />

      {descendants.length > 0 && (
        <div className="mt-2 ml-4 md:ml-12 border-l-2 border-slate-50 pl-4">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-[11px] text-slate-400 hover:text-teal-600 mb-3 flex items-center gap-2 transition-colors w-max"
          >
            <i className={`fa-solid fa-reply ${!showReplies && 'rotate-180'} transition-transform`}></i>
            {showReplies ? 'Hide' : 'View'} {descendants.length} {descendants.length === 1 ? 'reply' : 'replies'}
          </button>

          {showReplies && (
            <div className="space-y-4 animate-fade-in mt-4">
              {descendants.map(reply => (
                <div key={reply.id || reply.timestamp}>
                  <InteractionNode
                    interaction={reply}
                    allInteractions={allInteractions}
                    post={post}
                    showToast={showToast}
                    isMainComment={false}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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
      <div className="flex justify-between items-center mb-6 px-1">
        <span className="text-[10px] sm:text-xs text-slate-400 uppercase bg-slate-50 border border-slate-100 px-3 py-1 rounded-full">{topLevelComments.length} Reflections</span>
        <div className="flex gap-4">
          <button onClick={() => setSortBy('new')} className={`text-[10px] sm:text-[11px] uppercase transition-all relative ${sortBy === 'new' ? 'text-teal-600' : 'text-slate-300 hover:text-slate-500'}`}>
            Newest
            {sortBy === 'new' && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-600 rounded-full" />}
          </button>
          <button onClick={() => setSortBy('top')} className={`text-[10px] sm:text-[11px] uppercase transition-all relative ${sortBy === 'top' ? 'text-teal-600' : 'text-slate-300 hover:text-slate-500'}`}>
            Top Logic
            {sortBy === 'top' && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-600 rounded-full" />}
          </button>
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
