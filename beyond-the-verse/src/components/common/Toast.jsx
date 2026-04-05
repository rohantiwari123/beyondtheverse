import React from "react";

export default function Toast({ toast }) {
  return (
    // Center alignment wrapper
    <div className="fixed z-[9999] bottom-10 left-0 right-0 flex justify-center pointer-events-none px-4">
      
      {/* 🌟 SIMPLE & FLAT UI: No Shadows, No Transform Animations */}
      <div
        className={`pointer-events-auto flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-sm font-bold tracking-wide transition-opacity duration-200 ${
          toast.show ? "opacity-100" : "opacity-0"
        } ${
          toast.isSuccess
            ? "bg-slate-900 border-slate-900 text-white" 
            : "bg-rose-600 border-rose-600 text-white"
        }`}
      >
        
        {/* Simple Icon without extra animations */}
        <i
          className={
            toast.isSuccess
              ? "fa-solid fa-circle-check text-teal-400 text-base"
              : "fa-solid fa-circle-exclamation text-white text-base"
          }
        ></i>

        {/* Clean Message */}
        <span className="whitespace-nowrap">{toast.message}</span>
        
      </div>
    </div>
  );
}