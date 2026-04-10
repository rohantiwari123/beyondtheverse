import React from 'react';

// 🌟 Prop mein 'isAdmin' add kiya
export default function LibraryEmptyState({ openModal, isAdmin }) {
  return (
    <div className="mx-4 sm:mx-0 py-24 sm:py-32 flex flex-col items-center justify-center border border-dashed border-slate-300 bg-slate-50/50 rounded-2xl sm:rounded-[2rem]">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
        <i className="fa-solid fa-folder-open text-3xl sm:text-4xl text-slate-300"></i>
      </div>
      <p className="text-slate-900 text-lg sm:text-xl font-bold tracking-tight mb-2">This folder is empty</p>
      
      {/* 🌟 Text ko admin/user ke hisaab se adjust kiya */}
      <p className="text-slate-500 text-sm sm:text-base mb-8 text-center max-w-xs">
        {isAdmin 
          ? "Get started by creating a new folder or uploading your first document." 
          : "There are no files or folders here yet."}
      </p>
      
      {/* 🌟 Button ab sirf Admin ko dikhega */}
      {isAdmin && (
        <button 
          onClick={() => openModal("folder")} 
          className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 hover:border-slate-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 transition-all shadow-sm flex items-center gap-2"
        >
          <i className="fa-solid fa-plus text-slate-400"></i> Create Folder
        </button>
      )}
    </div>
  );
}