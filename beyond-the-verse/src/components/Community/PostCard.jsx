import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

export default function PostCard({ post, showToast }) {
  // 🌟 isAdmin aur userId context se nikala
  const { isAuthenticated, isAdmin, userId } = useAuth();
  const navigate = useNavigate();

  const date = post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short'
  }) : "Now";

  // 🛡️ ADMIN: Delete Post
  const handleDelete = async () => {
    if (!window.confirm("Bhai, kya is post ko delete karna hai?")) return;
    try {
      await deleteDoc(doc(db, "posts", post.id));
      showToast("Post deleted successfully! 🗑️");
    } catch (e) {
      showToast("Delete failed. Check permissions.", false);
    }
  };

  // 🛡️ ADMIN: Pin/Unpin Post
  const handlePin = async () => {
    try {
      await updateDoc(doc(db, "posts", post.id), {
        isPinned: !post.isPinned 
      });
      showToast(post.isPinned ? "Thought Unpinned!" : "Thought Pinned to Top! 📌");
    } catch (e) {
      showToast("Pinning failed.", false);
    }
  };

  // Interaction Lock Logic for Guests
  const handleLockedAction = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast("🔐 Please login to Like or Reply!", false);
    }
  };

  return (
    <div className={`bg-white sm:rounded-[2rem] p-5 sm:p-7 border-y sm:border border-x-0 sm:border-x border-slate-100 shadow-sm transition-all overflow-hidden relative group ${post.isPinned ? 'ring-2 ring-teal-500/50 bg-teal-50/10' : ''}`}>
      
      {/* 📌 Pinned Badge (Sirf pinned posts par dikhega) */}
      {post.isPinned && (
        <div className="absolute top-0 right-10 bg-teal-600 text-white text-[9px] font-black px-3 py-1 rounded-b-xl shadow-sm uppercase tracking-widest animate-fade-in">
          Pinned
        </div>
      )}

      {/* Header Info */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 bg-gradient-to-br from-teal-50 to-indigo-50 rounded-full flex items-center justify-center font-black text-teal-700 text-sm md:text-base border border-teal-100 shadow-inner">
            {post.userName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-xs md:text-sm notranslate">{post.userName}</h4>
            <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">{date}</p>
          </div>
        </div>

        {/* 🛡️ ADMIN ACTIONS: Sirf Admin ko dikhenge */}
        {isAdmin && (
          <div className="flex gap-2">
            <button 
              onClick={handlePin}
              title={post.isPinned ? "Unpin Post" : "Pin Post"}
              className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${post.isPinned ? 'bg-teal-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400 hover:bg-teal-100 hover:text-teal-600'}`}
            >
              <i className="fa-solid fa-thumbtack text-xs"></i>
            </button>
            <button 
              onClick={handleDelete}
              title="Delete Post"
              className="h-8 w-8 bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white rounded-full flex items-center justify-center transition-all"
            >
              <i className="fa-solid fa-trash-can text-xs"></i>
            </button>
          </div>
        )}

        {/* Guest Category Label (Agar admin buttons nahi hain tabhi ye side mein dikhe) */}
        {!isAdmin && (
          <span className="bg-slate-50 text-slate-500 text-[9px] md:text-[11px] font-black px-3 py-1 rounded-full border border-slate-100 uppercase tracking-tighter">
            {post.category}
          </span>
        )}
      </div>

      {/* Main Content */}
      <p className="text-slate-700 font-medium leading-relaxed italic text-base md:text-xl mb-5 md:mb-8 px-1">
        "{post.text}"
      </p>

      {/* Action Area */}
      <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
        
        {/* Like Button */}
        <button 
          onClick={handleLockedAction}
          className={`flex items-center gap-2 transition-all ${isAuthenticated ? 'text-slate-400 hover:text-rose-500' : 'opacity-40 cursor-not-allowed'}`}
        >
          {isAuthenticated ? (
            <i className="fa-regular fa-heart text-sm md:text-lg"></i>
          ) : (
            <i className="fa-solid fa-lock text-[10px] md:text-xs text-slate-400"></i>
          )}
          <span className="text-xs md:text-sm font-bold">{post.likes?.length || 0}</span>
        </button>

        {/* Reply Button */}
        <button 
          onClick={handleLockedAction}
          className={`flex items-center gap-2 transition-all ${isAuthenticated ? 'text-slate-400 hover:text-teal-600' : 'opacity-40 cursor-not-allowed'}`}
        >
          {isAuthenticated ? (
            <i className="fa-regular fa-comment text-sm md:text-lg"></i>
          ) : (
            <i className="fa-solid fa-lock text-[10px] md:text-xs text-slate-400"></i>
          )}
          <span className="text-xs md:text-sm font-bold">{isAuthenticated ? 'Reply' : 'Locked'}</span>
        </button>

        {/* Status for Guests */}
        {!isAuthenticated && (
          <div className="ml-auto">
             <span className="text-[9px] font-black text-teal-600/40 uppercase tracking-widest italic animate-pulse">Login to engage</span>
          </div>
        )}
        
        {/* Category Badge for Admin View (Kyuki header me admin buttons aa gaye hain) */}
        {isAdmin && (
          <div className="ml-auto">
             <span className="bg-slate-50 text-slate-400 text-[9px] font-black px-2 py-1 rounded-md uppercase border border-slate-100">
               {post.category}
             </span>
          </div>
        )}
      </div>
    </div>
  );
                }
