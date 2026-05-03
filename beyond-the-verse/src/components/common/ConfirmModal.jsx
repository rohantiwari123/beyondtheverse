import React from 'react';

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Yes, Delete",
  cancelText = "Cancel"
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full animate-fade-in-up border border-slate-200 text-center">

        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-5 mx-auto">
          <i className="fa-solid fa-trash-can text-2xl"></i>
        </div>

        <h3 className="text-lg sm:text-xl text-slate-800 mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-8">
          {message}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm text-white bg-rose-500 hover:bg-rose-600 active:scale-95 transition-all"
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}
