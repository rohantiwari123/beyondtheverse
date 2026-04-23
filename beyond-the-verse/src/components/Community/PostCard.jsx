import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import CommentBox from './CommentBox';
import UserAvatar from '../common/UserAvatar';
import { Link } from 'react-router-dom'; // 🌟 Naya Import: Profile par link karne ke liye

// Utils aur Services
import { formatDateTime } from '../../utils/dateFormatter';
import {
  upgradeToAdminPost,
  editPostText,
  deletePost,
  togglePinPost,
  toggleBookmarkPost,
  addPostInteraction,
  createNotification
} from '../../services/firebaseServices';

export default function PostCard({ post, showToast, isSinglePost }) {
  const { isAuthenticated, userId, userName, isAdmin, currentUser } = useAuth();

  const [activeGate, setActiveGate] = useState(null);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showComments, setShowComments] = useState(isSinglePost || false);

  const interactions = post.interactions || [];
  const bookmarks = post.bookmarks || [];

  const topLevelInteractions = interactions.filter(i => !i.parentId);
  const userInteraction = topLevelInteractions.find(i => i.userId === userId);
  const hasInteracted = !!userInteraction;
  const userInteractionType = userInteraction ? userInteraction.type : null;
  const isBookmarked = bookmarks.includes(userId);
  const isOwner = post.userId === userId;

  const isAdminPost = post.isAdminPost === true || post.role === 'admin';

  // 🌟 PRO FRONTEND TRICK
  const currentDisplayName = isOwner ? userName : post.userName;

  useEffect(() => {
    if (isOwner && isAdmin && !isAdminPost) {
      upgradeToAdminPost(post.id).catch(err => console.error("Failed to auto-upgrade", err));
    }
  }, [isOwner, isAdmin, isAdminPost, post.id]);

  const supportCount = topLevelInteractions.filter(i => i.type === 'support').length;
  const counterCount = topLevelInteractions.filter(i => i.type === 'counter').length;
  const doubtCount = topLevelInteractions.filter(i => i.type === 'doubt').length;

  const getTextSizeClass = (text) => {
    const len = text.length;
    if (len < 80) return "text-2xl sm:text-3xl md:text-4xl font-medium leading-tight";
    if (len < 250) return "text-lg sm:text-xl md:text-2xl leading-snug";
    return "text-base sm:text-lg md:text-xl leading-relaxed";
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

  const executeDelete = async () => {
    try {
      await deletePost(post.id);
      showToast("Post Deleted.");
      setShowDeleteModal(false);
    } catch (e) {
      showToast("Failed to delete.", false);
      setShowDeleteModal(false);
    }
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
    const baseUrl = window.location.href.split('#')[0];
    const shareUrl = `${baseUrl}#/post/${post.id}`;

    navigator.clipboard.writeText(shareUrl);
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

    const currentReasonText = reason.trim();
    const interactionId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    try {
      await addPostInteraction(post.id, {
        id: interactionId,
        userId,
        userName: userName || "Explorer",
        photoURL: currentUser?.photoURL || null,
        type: activeGate,
        text: currentReasonText,
        timestamp: new Date().toISOString(),
        isPinned: false,
        replies: [],
        commentGates: { support: [], counter: [], doubt: [] }
      });

      await createNotification(post.userId, {
        triggerUserId: userId,
        title: "New Reflection",
        message: `${userName} added a ${activeGate} to your thought.`,
        link: `/post/${post.id}`
      });

      setActiveGate(null);
      setReason("");
      setShowComments(true);

      checkSpellingWithAPI(currentReasonText).then(async (mistakes) => {
        if (mistakes && mistakes.length > 0) {
          const botReplyData = {
            id: "bot_" + Date.now().toString(36),
            parentId: interactionId,
            userId: "system_bot_001",
            userName: "Grammar Bot 🤖",
            type: "support",
            text: `🤖 **Auto-Bot Alert:** I noticed a few typos in your reflection. Here are some suggestions:`,
            mistakes: mistakes.slice(0, 5),
            timestamp: new Date().toISOString(),
            commentGates: { support: [], counter: [], doubt: [] },
            isAdminComment: true
          };
          await addPostInteraction(post.id, botReplyData);
        }
      }).catch(err => console.log("Bot Error:", err));

    } catch (e) { showToast("Failed to record.", false); }
    finally { setIsSubmitting(false); }
  };

  const bgClass = isAdminPost ? "bg-amber-50/50" : "bg-white";
  const borderClass = isAdminPost ? "border-amber-200" : "border-slate-100 sm:border-slate-200";
  const pinnedClass = post.isPinned ? "bg-teal-50/30 border-teal-200" : "";

  return (
    <div className={`w-full border-y sm:border sm:rounded-2xl md:rounded-[2.5rem] lg:rounded-[3rem] mb-0 sm:mb-6 md:mb-8 pt-5 pb-4 sm:pt-8 sm:pb-6 px-4 sm:px-8 lg:px-10 transition-all duration-500 relative ${bgClass} ${borderClass} ${pinnedClass}`}>

      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4">

          {/* 🌟 FIX: DP par Link lagaya (Hover effect ke sath) */}
          <Link to={`/profile/${post.userId}`} className="shrink-0 transition-transform hover:scale-105 active:scale-95">
            <UserAvatar
              userId={post.userId} // 🌟 Bas ye ek nayi line jodani hai
              showCurrentUser={isOwner}
              photoURL={post.photoURL || post.userPhoto}
              name={post.userName}
              isAdmin={isAdminPost}
              size="lg"
            />
          </Link>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {/* 🌟 FIX: Naam par Link lagaya (Hover effect ke sath) */}
              <Link to={`/profile/${post.userId}`}>
                <h4 className={`text-sm sm:text-base lg:text-lg truncate hover:underline transition-colors ${isAdminPost ? 'text-amber-900 hover:text-amber-700' : 'text-slate-900 hover:text-teal-700'}`}>
                  {currentDisplayName}
                </h4>
              </Link>
              {isAdminPost && (
                <span className="bg-amber-100 text-amber-700 text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded border border-amber-200">
                  Admin
                </span>
              )}
              {post.isPinned && <i className="fa-solid fa-thumbtack text-teal-500 text-xs sm:text-sm"></i>}
            </div>
            <span className="text-xs sm:text-sm text-slate-500">
              {post.category} <span className="mx-1 opacity-30">•</span> {formatDateTime(post.createdAt)}
            </span>
          </div>
        </div>

        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-slate-300 hover:text-slate-900 p-2 transition-colors">
            <i className="fa-solid fa-ellipsis-vertical sm:text-lg"></i>
          </button>
          {showMenu && (
            <div className="absolute right-0 top-10 bg-white border border-slate-200 rounded-xl w-36 py-1.5 z-30 animate-fade-in">
              {isAdmin && (
                <button onClick={handlePin} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
                  {post.isPinned ? 'Unpin' : 'Pin Post'}
                </button>
              )}
              {(isOwner || isAdmin) && (
                <>
                  {isOwner && (
                    <button onClick={() => { setIsEditing(true); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
                      Edit Thought
                    </button>
                  )}
                  <button onClick={() => { setShowMenu(false); setShowDeleteModal(true); }} className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50">
                    Delete
                  </button>
                </>
              )}
              {!isOwner && (
                <button onClick={() => { showToast("Reported"); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-xs text-amber-600 hover:bg-amber-50">
                  Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        {isEditing ? (
          <div className="animate-fade-in space-y-3">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-base sm:text-lg focus:border-teal-500 focus:bg-white outline-none transition-all h-48 sm:h-64 resize-none"
              autoFocus
            />
            <div className="flex justify-end gap-2 px-1">
              <button onClick={() => { setIsEditing(false); setEditText(post.text); }} className="text-xs sm:text-sm font-medium text-slate-500 px-4 py-2 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleEditSubmit} disabled={!editText.trim() || isSavingEdit} className="bg-slate-900 text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-lg disabled:opacity-30">Save Change</button>
            </div>
          </div>
        ) : (
          <div className="max-h-[60vh] md:max-h-[500px] overflow-y-auto pr-3 -mr-3">
            <p className={`text-slate-900 whitespace-pre-wrap text-justify break-words transition-all ${getTextSizeClass(post.text)}`}>
              {post.text}
            </p>
          </div>
        )}
      </div>

      <div className={`flex items-center justify-between pt-4 border-t ${isAdminPost ? 'border-amber-100' : 'border-slate-50'} transition-colors`}>

        <div className={`flex items-center gap-5 sm:gap-8 lg:gap-10 ${hasInteracted ? 'pointer-events-none' : ''}`}>
          <button onClick={() => handleGateClick('support')} className={`flex items-center gap-1.5 sm:gap-2 transition-all ${hasInteracted
              ? (userInteractionType === 'support' ? 'text-emerald-600' : 'text-slate-200')
              : (activeGate === 'support' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600')
            }`}>
            <i className={`${hasInteracted && userInteractionType === 'support' ? 'fa-solid' : 'fa-regular'} fa-circle-check text-xl sm:text-2xl`}></i>
            <span className="text-xs sm:text-sm">{supportCount || ''}</span>
          </button>

          <button onClick={() => handleGateClick('counter')} className={`flex items-center gap-1.5 sm:gap-2 transition-all ${hasInteracted
              ? (userInteractionType === 'counter' ? 'text-rose-600' : 'text-slate-200')
              : (activeGate === 'counter' ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600')
            }`}>
            <i className="fa-solid fa-bolt text-xl sm:text-2xl"></i>
            <span className="text-xs sm:text-sm">{counterCount || ''}</span>
          </button>

          <button onClick={() => handleGateClick('doubt')} className={`flex items-center gap-1.5 sm:gap-2 transition-all ${hasInteracted
              ? (userInteractionType === 'doubt' ? 'text-amber-600' : 'text-slate-200')
              : (activeGate === 'doubt' ? 'text-amber-600' : 'text-slate-400 hover:text-amber-600')
            }`}>
            <i className="fa-solid fa-magnifying-glass text-xl sm:text-2xl"></i>
            <span className="text-xs sm:text-sm">{doubtCount || ''}</span>
          </button>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-slate-300">
          <button onClick={handleShare} className="hover:text-slate-900 transition-all active:scale-90">
            <i className="fa-solid fa-arrow-up-from-bracket sm:text-lg"></i>
          </button>
          <button onClick={handleBookmark} className={`transition-all active:scale-90 ${isBookmarked ? 'text-slate-900' : 'hover:text-slate-900'}`}>
            <i className={`${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark sm:text-lg`}></i>
          </button>
        </div>
      </div>

      {activeGate && !hasInteracted && (
        <div className="mt-6 animate-fade-in-up">
          <div className="relative">
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={`Why do you ${activeGate} this thought? State your logic...`}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white outline-none transition-all h-32 sm:h-40 resize-none"
              autoFocus
            />
            <div className="flex justify-end items-center mt-3 gap-2">
              <button onClick={() => { setActiveGate(null); setReason(""); }} className="px-4 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-lg transition-all">Cancel</button>
              <button
                onClick={handleSubmitReason}
                disabled={!reason.trim() || isSubmitting}
                className="bg-slate-900 text-white px-6 py-2 rounded-lg text-xs font-medium disabled:opacity-20 active:scale-95 transition-all"
              >
                {isSubmitting ? "..." : "Post Reflection"}
              </button>
            </div>
          </div>
        </div>
      )}

      {topLevelInteractions.length > 0 && (
        <div className={`mt-6 pt-4 border-t ${isAdminPost ? 'border-amber-100' : 'border-slate-50'}`}>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 transition-all"
          >
            {showComments ? 'Hide Reflections' : `View ${topLevelInteractions.length} Reflections`}
            <i className={`fa-solid fa-chevron-${showComments ? 'up' : 'down'} text-[10px] sm:text-xs`}></i>
          </button>
        </div>
      )}

      {showComments && (
        <div className="mt-4 animate-fade-in">
          <CommentBox post={post} showToast={showToast} />
        </div>
      )}

      {/* ==============================================
          🌟 CUSTOM DELETE CONFIRMATION MODAL 🌟 
      ================================================ */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full animate-fade-in-up border border-slate-200 text-center">

            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-5 mx-auto">
              <i className="fa-solid fa-trash-can text-2xl"></i>
            </div>

            <h3 className="text-lg sm:text-xl text-slate-800 mb-2">Delete Thought?</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-8">
              This action cannot be undone. Are you sure you want to permanently remove this thought from the verse?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm text-white bg-rose-500 hover:bg-rose-600 active:scale-95 transition-all"
              >
                Yes, Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
