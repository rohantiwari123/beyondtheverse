import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatDateTime } from '../../utils/dateFormatter';
import UserAvatar from '../common/UserAvatar';
import { Link } from 'react-router-dom'; // 🌟 Naya Import (Profile par bhejne ke liye)

// 🌟 Real Service Imports
import {
  upgradeCommentToAdmin,
  deleteCommentInteraction,
  editCommentInteraction,
  togglePinComment,
  addCommentReply,
  getUserProfile
} from '../../services/firebaseServices';

function InteractionNode({ interaction, allInteractions, post, showToast, isMainComment }) {
  const { isAuthenticated, isAdmin, userId, userName, userUsername, currentUser } = useAuth();

  const [isReplying, setIsReplying] = useState(false);
  const [replyType, setReplyType] = useState('support');
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(interaction.text);

  const isOwner = interaction.userId === userId;

  // 🌟 PRO FRONTEND TRICK
  const currentDisplayName = isOwner ? userName : interaction.userName;

  // 🌟 FIX: Old comments par bhi username dikhane ke liye dynamic fetch aur fallback
  const [fetchedUsername, setFetchedUsername] = useState(interaction.userUsername || "");

  useEffect(() => {
    let isMounted = true;
    if (!isOwner && !interaction.userUsername && interaction.userId) {
      getUserProfile(interaction.userId).then(profile => {
        if (isMounted && profile && profile.username) {
          setFetchedUsername(profile.username);
        }
      }).catch(() => {});
    }
    return () => { isMounted = false; };
  }, [isOwner, interaction.userUsername, interaction.userId]);

  const fallbackUsername = (interaction.userName || "user").toLowerCase().replace(/[^a-z0-9]/g, '');
  const ownerFallback = (userName || "user").toLowerCase().replace(/[^a-z0-9]/g, '');

  const currentDisplayUsername = isOwner 
    ? (userUsername || ownerFallback) 
    : (interaction.userUsername || fetchedUsername || fallbackUsername);

  const targetId = interaction.id || interaction.timestamp;
  const gates = interaction.commentGates || { support: [], counter: [], doubt: [] };

  const isAdminBadge = interaction.isAdminComment === true || interaction.role === 'admin';

  useEffect(() => {
    if (isOwner && isAdmin && !isAdminBadge) {
      upgradeCommentToAdmin(post.id, post.interactions, targetId)
        .catch(err => console.error("Admin upgrade failed", err));
    }
  }, [isOwner, isAdmin, isAdminBadge, post.id, targetId, post.interactions]);

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

    const currentReplyText = replyText.trim();
    const replyId = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);

    try {
      const replyData = {
        id: replyId,
        parentId: targetId,
        userId,
        userName: userName || "Explorer",
        userUsername: userUsername || "",
        photoURL: currentUser?.photoURL || null,
        type: replyType,
        text: currentReplyText,
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

  const nameColorClass = isAdminBadge
    ? "text-amber-900 font-medium hover:text-amber-700"
    : "text-slate-700 hover:text-slate-900"; // 🌟 Hover effect add kiya taaki clickable lage

  return (
    <div className={`transition-all group w-full ${isMainComment ? 'py-2' : ''}`}>

      {!isMainComment && parentInteraction && (
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mb-2 pl-12">
          <i className="fa-solid fa-reply rotate-180"></i>
          Replying to <Link to={`/profile/${parentInteraction.userId}`} className="text-teal-700 hover:underline">@{parentInteraction.userUsername || parentInteraction.userName?.toLowerCase().replace(/[^a-z0-9]/g, '')}</Link>
        </div>
      )}

      <div className="flex items-start gap-3 px-1">

        {/* 🌟 FIX: DP par Link lagaya */}
        <Link to={`/profile/${interaction.userId}`} className="shrink-0 transition-transform hover:scale-105 active:scale-95">
          <UserAvatar
            userId={interaction.userId} // 🌟 Bas ye ek nayi line jodani hai
            showCurrentUser={isOwner}
            photoURL={interaction.photoURL || interaction.userPhoto}
            name={interaction.userName}
            size={isMainComment ? "md" : "sm"}
            isAdmin={isAdminBadge}
          />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-0.5 relative">
            <div className="flex flex-col mb-1.5">
              <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                <Link to={`/profile/${interaction.userId}`}>
                  <span className={`${isMainComment ? 'text-sm sm:text-base font-bold' : 'text-[13px] sm:text-sm font-bold'} transition-colors ${nameColorClass}`}>
                    {currentDisplayName}
                  </span>
                </Link>
                {currentDisplayUsername && (
                  <Link to={`/profile/${interaction.userId}`} className="shrink-0">
                    <span className="text-[11px] sm:text-xs text-slate-500 hover:text-teal-600 hover:underline">
                      @{currentDisplayUsername}
                    </span>
                  </Link>
                )}
                <span className="text-slate-300 text-[10px] sm:text-xs hidden sm:inline">•</span>
                <span className="text-[10px] sm:text-xs text-slate-500 whitespace-nowrap">
                  {formatDateTime(interaction.timestamp)}
                  {interaction.isEdited && <span className="ml-1 italic opacity-70">(Edited)</span>}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap mt-0.5 sm:mt-1">
                <span className={`text-[9px] sm:text-[10px] font-semibold uppercase flex items-center gap-1 ${config.color} ${config.bg} border ${config.border} px-1.5 py-0.5 rounded-md tracking-wide`}>
                  <i className={config.icon}></i> {config.label}
                </span>
                {isAdminBadge ? (
                  <span className="bg-amber-50 text-amber-700 text-[9px] sm:text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md border border-amber-200 tracking-wide">
                    ADMIN
                  </span>
                ) : null}
                {interaction.isPinned && <i className="fa-solid fa-thumbtack text-teal-500 text-[10px] sm:text-xs ml-0.5"></i>}
              </div>
            </div>

            <button onClick={() => setShowMenu(!showMenu)} className="text-slate-400 hover:text-slate-900 p-1 -mr-1 transition-colors relative z-10">
              <i className="fa-solid fa-ellipsis"></i>
            </button>

            {showMenu && (
              <div className="absolute right-0 top-6 bg-white border border-slate-100 rounded-xl w-32 py-1 z-20 animate-fade-in">
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
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm sm:text-base focus:border-slate-400 outline-none resize-none overflow-hidden"
                rows="2"
              />
              <div className="flex gap-2 mt-2 justify-end">
                <button onClick={() => setIsEditing(false)} className="text-xs text-slate-500 px-3 py-1.5 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button onClick={handleEditSubmit} className="text-xs text-white bg-slate-900 px-4 py-1.5 rounded-lg">Save</button>
              </div>
            </div>
          ) : (
            <p className={`text-slate-700 whitespace-pre-wrap text-justify break-words break-all ${isMainComment ? 'text-sm sm:text-base mt-1' : 'text-xs sm:text-sm mt-0.5'} mb-1`}>
              {formatMessage(interaction.text)}
            </p>
          )}

          {!isEditing && (
            <div className="flex items-center gap-4 mt-2">
              <button onClick={() => handleIconClick('support')} className={`flex items-center gap-1.5 text-xs sm:text-sm transition-all hover:-translate-y-0.5 ${hasReacted && gates.support.includes(userId) ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'}`}>
                <i className={`${hasReacted && gates.support.includes(userId) ? 'fa-solid' : 'fa-regular'} fa-circle-check text-sm sm:text-base`}></i>{supportCount > 0 && <span>{supportCount}</span>}
              </button>
              <button onClick={() => handleIconClick('counter')} className={`flex items-center gap-1.5 text-xs sm:text-sm transition-all hover:-translate-y-0.5 ${hasReacted && gates.counter.includes(userId) ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'}`}>
                <i className="fa-solid fa-bolt text-sm sm:text-base"></i>{counterCount > 0 && <span>{counterCount}</span>}
              </button>
              <button onClick={() => handleIconClick('doubt')} className={`flex items-center gap-1.5 text-xs sm:text-sm transition-all hover:-translate-y-0.5 ${hasReacted && gates.doubt.includes(userId) ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600'}`}>
                <i className="fa-solid fa-magnifying-glass text-sm sm:text-base"></i>{doubtCount > 0 && <span>{doubtCount}</span>}
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
                placeholder={`Replying to @${currentDisplayUsername}...`}
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 focus:border-slate-400 outline-none resize-none overflow-hidden mb-2"
                rows="2" autoFocus
              />
              <div className="flex justify-between items-center px-1">
                <span className={`text-xs ${replyText.trim().length < 2 ? 'text-slate-400' : 'text-emerald-500'}`}>
                  {replyText.trim().length < 2 ? "Type to reply..." : "Ready"}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsReplying(false)} className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">CANCEL</button>
                  <button onClick={handleReplySubmit} disabled={replyText.trim().length < 2 || isSubmitting} className="bg-slate-900 text-white px-5 py-1.5 rounded-lg text-xs font-medium disabled:opacity-40">
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
            className="text-xs sm:text-sm font-medium text-slate-500 hover:text-teal-600 mb-3 flex items-center gap-2 transition-colors w-max"
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
        <span className="text-xs sm:text-sm text-slate-500 font-medium uppercase bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">{topLevelComments.length} Reflections</span>
        <div className="flex gap-4">
          <button onClick={() => setSortBy('new')} className={`text-xs sm:text-sm font-medium uppercase transition-all relative ${sortBy === 'new' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'}`}>
            Newest
            {sortBy === 'new' && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-600 rounded-full" />}
          </button>
          <button onClick={() => setSortBy('top')} className={`text-xs sm:text-sm font-medium uppercase transition-all relative ${sortBy === 'top' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'}`}>
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