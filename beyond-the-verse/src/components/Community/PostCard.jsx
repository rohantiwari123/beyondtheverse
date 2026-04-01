import React from 'react';

export default function PostCard({ post }) {
  // Timestamp formatting logic
  const date = post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  }) : "Just now";

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-teal-100 to-indigo-100 rounded-full flex items-center justify-center font-black text-teal-700">
            {post.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm">{post.userName}</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{date}</p>
          </div>
        </div>
        <span className="bg-slate-50 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full border border-slate-100 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
          {post.category}
        </span>
      </div>

      <p className="text-slate-600 font-medium leading-relaxed italic text-lg mb-4">
        "{post.text}"
      </p>

      <div className="flex items-center gap-4 pt-2 border-t border-slate-50">
        <button className="flex items-center gap-1.5 text-slate-400 hover:text-rose-500 transition-colors group/btn">
          <i className="fa-regular fa-heart text-sm group-hover/btn:scale-125 transition-transform"></i>
          <span className="text-xs font-bold">{post.likes?.length || 0}</span>
        </button>
        <button className="flex items-center gap-1.5 text-slate-400 hover:text-teal-600 transition-colors">
          <i className="fa-regular fa-comment text-sm"></i>
          <span className="text-xs font-bold text-slate-400">Reply</span>
        </button>
      </div>
    </div>
  );
        }
