import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PostCard({ post, showToast }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const date = post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short'
  }) : "Now";

  // Interaction Lock Logic
  const handleLockedAction = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast("🔐 Please login to Like or Reply!", false);
      // Optional: Redirect to login after a delay
      // setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div className="bg-white sm:rounded-[2rem] p-5 sm:p-7 border-y sm:border border-x-0 sm:border-x border-slate-100 shadow-sm transition-all overflow-hidden group">
      
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
        <span className="bg-slate-50 text-slate-500 text-[9px] md:text-[11px] font-black px-3 py-1 rounded-full border border-slate-100 uppercase tracking-tighter">
          {post.category}
        </span>
      </div>

      {/* Main Content - Responsive Font */}
      <p className="text-slate-700 font-medium leading-relaxed italic text-base md:text-xl mb-5 md:mb-8 px-1">
        "{post.text}"
      </p>

      {/* Action Area (LOCKED for Guests) */}
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

        {!isAuthenticated && (
          <div className="ml-auto">
             <span className="text-[9px] font-black text-teal-600/40 uppercase tracking-widest italic animate-pulse">Login to engage</span>
          </div>
        )}
      </div>
    </div>
  );
}
