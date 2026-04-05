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
  const isAdminComment = interaction.isAdminComment === true || interaction.role === 'admin';

  // 🚀 Logic: Auto-Upgrade Admin Comment
  useEffect(() => {
    if (isOwner && isAdmin && !isAdminComment) {
      upgradeCommentToAdmin(post.id, post.interactions, targetId)
        .catch(err => console.error("Admin upgrade failed", err));
    }
  }, [isOwner, isAdmin, isAdminComment, post.id, targetId, post.interactions]);

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

  // 🛠️ Action Handlers (Using Firebase Services)
  const handleDelete = async () => {
    if(!window.confirm("Delete this reflection?")) return;
    try {
      await deleteCommentInteraction(post.id, post.interactions, targetId, interaction.parentId, interaction.type, userId);
      showToast("Deleted successfully.");
    } catch (e) { showToast("Error deleting.", false); }
  };

  const handleEdit = async () => {
    if (editText.trim().length < 2) return;
    try {
      await editCommentInteraction(post.id, post.interactions, targetId, editText.trim());
      setIsEditing(false);
      setShowMenu(false);
      showToast("Updated.");
    } catch (e) { showToast("Update failed.", false); }
  };

  const handlePin = async () => {
    try {
      await togglePinComment(post.id, post.interactions, targetId, interaction.isPinned);
      showToast(interaction.isPinned ? "Unpinned" : "Pinned to top 📌");
      setShowMenu(false);
    } catch (e) { console.error(e); }
  };

  const handleIconClick = (type) => {
    if (!isAuthenticated) return showToast("Login first.", false);
    if (hasReacted) return showToast("Already added logic.", false);
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

  return (
    <div className={`transition-all w-full ${isMainComment ? 'py-4 sm:py-6' : 'py-2 sm:py-3'} ${isAdminComment ? 'bg-amber-50/30' : ''} rounded-2xl px-1 sm:px-2`}>
      
      {/* 🌟 Reply Context Label */}
      {!isMainComment && parentInteraction && (
        <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest pl-10 sm:pl-12 lg:pl-14">
          <i className="fa-solid fa-reply rotate-180 text-[8px]"></i>
          To <span className="text-teal-600">@{parentInteraction.userName}</span>
        </div>
      )}

      <div className="flex items-start gap-2.5 sm:gap-4 lg:gap-5">
        {/* Avatar Scaling */}
        <div className={`${isMainComment ? 'h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 text-xs' : 'h-7 w-7 sm:h-9 sm:w-9 text-[10px]'} rounded-full flex items-center justify-center font-black shrink-0 relative transition-all ${isAdminComment ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white" : "bg-slate-100 text-slate-500"}`}>
          {interaction.userName?.charAt(0).toUpperCase()}
          {isAdminComment && (
            <div className="absolute -top-1 -right-1 text-amber-500 bg-white rounded-full h-3.5 sm:h-4 lg:h-5 w-3.5 sm:w-4 lg:w-5 flex items-center justify-center border border-amber-100 shadow-sm">
              <i className="fa-solid fa-crown text-[5px] sm:text-[7px]"></i>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1 relative">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
              <span className={`font-black tracking-tight truncate ${isMainComment ? 'text-[13px] sm:text-sm md:text-base' : 'text-[12px] sm:text-[13px]'} ${isAdminComment ? 'text-amber-900' : 'text-slate-900'}`}>{interaction.userName}</span>
              {isAdminComment && <span className="bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-tighter px-1 rounded shrink-0">ADMIN</span>}
              <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-tight flex items-center gap-1 shrink-0 ${config.color} ${config.bg} border ${config.border} px-1.5 py-0.5 rounded`}>
                <i className={config.icon}></i> {config.label}
              </span>
              <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap">• {formatDateTime(interaction.timestamp)}</span>
            </div>

            <div className="relative shrink-0">
              <button onClick={() => setShowMenu(!showMenu)} className="text-slate-300 hover:text-slate-900 p-1 transition-colors">
                <i className="fa-solid fa-ellipsis-vertical text-xs sm:text-sm"></i>
              </button>
              {showMenu && (
                <div className="absolute right-0 top-7 bg-white border border-slate-100 shadow-xl rounded-xl w-32 py-1.5 z-30 animate-fade-in">
                  {isAdmin && <button onClick={handlePin} className="w-full text-left px-3 py-2 text-[10px] font-black text-slate-600 hover:bg-slate-50 uppercase tracking-tighter">{interaction.isPinned ? 'Unpin' : 'Pin to top'}</button>}
                  {(isOwner || isAdmin) && (
                    <>
                      {isOwner && <button onClick={() => { setIsEditing(true); setShowMenu(false); }} className="w-full text-left px-3 py-2 text-[10px] font-black text-slate-600 hover:bg-slate-50 uppercase tracking-tighter">Edit</button>}
                      <button onClick={handleDelete} className="w-full text-left px-3 py-2 text-[10px] font-black text-rose-500 hover:bg-rose-50 uppercase tracking-tighter">Delete</button>
                    </>
                  )}
                  {!isOwner && <button onClick={() => {showToast("Reported"); setShowMenu(false)}} className="w-full text-left px-3 py-2 text-[10px] font-black text-amber-600 hover:bg-amber-50 uppercase tracking-tighter">Report</button>}
                </div>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="mt-2 animate-fade-in">
              <textarea value={editText} onChange={(e) => setEditText(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-sm sm:text-base verse-thought-serif focus:border-teal-500 outline-none transition-all resize-none shadow-inner" rows="3" />
              <div className="flex gap-2 mt-2 justify-end">
                <button onClick={() => setIsEditing(false)} className="text-[10px] font-black text-slate-400 px-3 py-1 uppercase tracking-widest">CANCEL</button>
                <button onClick={handleEdit} className="text-[10px] font-black text-white bg-slate-900 px-4 py-1 rounded-lg uppercase tracking-widest">SAVE</button>
              </div>
            </div>
          ) : (
            <p className={`text-slate-800 leading-[1.6] sm:leading-relaxed verse-thought-serif whitespace-pre-wrap break-words ${isMainComment ? 'text-[14px] sm:text-[15px] md:text-base' : 'text-[13px] sm:text-[14px]'} mb-2`}>{interaction.text}</p>
          )}

          {!isEditing && (
            <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-4">
              {['support', 'counter', 'doubt'].map(type => (
                <button key={type} onClick={() => handleIconClick(type)} className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black transition-all active:scale-90 ${hasReacted && gates[type].includes(userId) ? typeConfig[type].color : 'text-slate-300 hover:text-slate-600'}`}>
                  <i className={`${hasReacted && gates[type].includes(userId) ? 'fa-solid' : 'fa-regular'} ${typeConfig[type].icon.split(' ')[1]} text-base sm:text-lg`}></i>
                  {gates[type].length > 0 && <span>{gates[type].length}</span>}
                </button>
              ))}
            </div>
          )}

          {isReplying && (
            <div className="mt-4 animate-fade-in-up">
              <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder={`Adding logic to this ${replyType}...`} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-sm sm:text-base text-slate-800 focus:border-teal-500 outline-none transition-all resize-none shadow-inner" rows="2" autoFocus />
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => setIsReplying(false)} className="px-3 py-1.5 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Cancel</button>
                <button onClick={handleReplySubmit} disabled={replyText.trim().length < 2 || isSubmitting} className="bg-slate-900 text-white px-5 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] disabled:opacity-20 transition-all shadow-md">Post Logic</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ThreadBlock({ mainComment, allInteractions, post, showToast }) {
  const [showReplies, setShowReplies] = useState(false);
  const descendants = allInteractions.filter(i => i.parentId === (mainComment.id || mainComment.timestamp)).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="border-b border-slate-50 last:border-0">
      <InteractionNode interaction={mainComment} allInteractions={allInteractions} post={post} showToast={showToast} isMainComment={true} />
      {descendants.length > 0 && (
        <div className="ml-4 sm:ml-10 md:ml-14 border-l-2 border-slate-50 pl-3 sm:pl-6 lg:pl-8 pb-2">
          <button onClick={() => setShowReplies(!showReplies)} className="text-[9px] sm:text-[10px] font-black text-slate-400 hover:text-teal-600 mb-2 mt-1 flex items-center gap-2 transition-all uppercase tracking-[0.2em]">
            {showReplies ? 'Hide reflections' : `See ${descendants.length} logical counters`}
            <i className={`fa-solid fa-chevron-${showReplies ? 'up' : 'down'} text-[8px]`}></i>
          </button>
          {showReplies && (
            <div className="space-y-1 sm:space-y-2 animate-fade-in">
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

export default function CommentBox({ post, showToast }) {
  const [sortBy, setSortBy] = useState('new');
  const rawInteractions = post?.interactions || [];
  if (rawInteractions.length === 0) return null;

  const flatInteractions = [];
  rawInteractions.forEach(i => {
    flatInteractions.push({ ...i, parentId: i.parentId || null });
    if (i.replies) i.replies.forEach(r => flatInteractions.push({ ...r, parentId: i.id || i.timestamp }));
  });

  const topLevelComments = flatInteractions.filter(i => !i.parentId).sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return sortBy === 'top' ? (b.commentGates?.support?.length || 0) - (a.commentGates?.support?.length || 0) : new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="mt-6 sm:mt-10 lg:mt-12 animate-fade-in px-1 sm:px-0">
      <div className="flex justify-between items-center mb-6 sm:mb-8 border-b border-slate-50 pb-4">
        <span className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{topLevelComments.length} Community Reflections</span>
        <div className="flex gap-4 sm:gap-6">
          {['new', 'top'].map(mode => (
            <button key={mode} onClick={() => setSortBy(mode)} className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all relative ${sortBy === mode ? 'text-teal-600' : 'text-slate-300 hover:text-slate-500'}`}>
              {mode === 'new' ? 'Newest' : 'Top Logic'}
              {sortBy === mode && <div className="absolute -bottom-[17px] left-0 w-full h-0.5 bg-teal-600 rounded-full" />}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {topLevelComments.map(mainComment => <ThreadBlock key={mainComment.id || mainComment.timestamp} mainComment={mainComment} allInteractions={flatInteractions} post={post} showToast={showToast} />)}
      </div>
    </div>
  );
                       }
