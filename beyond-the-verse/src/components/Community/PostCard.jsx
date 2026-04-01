import React from 'react';

export default function PostCard({ post }) {
  const date = post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short'
  }) : "Now";

  return (
    // sm:rounded-3xl (Desktop) | border-x-0 (Mobile side borders removed)
    <div className="bg-white sm:rounded-[2rem] p-5 sm:p-6 border-y sm:border border-x-0 sm:border-x border-slate-100 shadow-sm transition-all overflow-hidden">
      
      {/* User Info Header */}
      <div className="flex items-center justify-between mb-3 md:mb-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 bg-gradient-to-br from-teal-50 to-indigo-50 rounded-full flex items-center justify-center font-black text-teal-700 text-sm md:text-base border border-teal-100">
            {post.userName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-xs md:text-sm">{post.userName}</h4>
            <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">{date}</p>
          </div>
        </div>
        <span className="bg-slate-50 text-slate-500 text-[9px] md:text-[11px] font-black px-3 py-1 rounded-full border border-slate-100">
          {post.category}
        </span>
      </div>

      {/* Content Area - Responsive Font Size */}
      <p className="text-slate-700 font-medium leading-relaxed italic text-base md:text-xl mb-4 md:mb-6 px-1">
        "{post.text}"
      </p>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 pt-3 border-t border-slate-50">
        <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors group">
          <i className="fa-regular fa-heart text-sm md:text-lg"></i>
          <span className="text-xs md:text-sm font-bold">{post.likes?.length || 0}</span>
        </button>
        <button className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-colors">
          <i className="fa-regular fa-comment text-sm md:text-lg"></i>
          <span className="text-xs md:text-sm font-bold">Reply</span>
        </button>
      </div>
    </div>
  );
      }
