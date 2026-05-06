import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginOverlay({
  icon = "fa-solid fa-lock",
  title = "Access Restricted",
  description = "Please log in to explore and interact with this content."
}) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-100/50 backdrop-blur-md">

      {/* 🌟 Shadow hata kar clean border aur responsive padding laga di hai */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] flex flex-col items-center justify-center text-center relative z-10 w-full max-w-md animate-fade-in-up">

        {/* 🌟 Icon ka size responsive aur ek pyara sa ring effect */}
        <div className="h-12 w-12 sm:h-14 sm:w-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-5 sm:mb-6 ring-4 ring-teal-50/50 transition-transform hover:scale-105">
          <i className={`${icon} text-lg sm:text-xl`}></i>
        </div>

        {/* 🌟 Responsive Typography (Mobile me thoda chota, desktop me bada) */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mb-2 sm:mb-3">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-slate-500 mb-6 sm:mb-8 max-w-[16rem] sm:max-w-xs mx-auto leading-relaxed">
          {description}
        </p>

        {/* 🌟 Buttons with clean hover and click (scale) effects */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">
          <button
            onClick={() => navigate('/login')}
            className="bg-slate-900 text-white rounded-xl sm:rounded-2xl px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-medium transition-all duration-200 hover:bg-slate-800  active:translate-y-0 active:scale-95 w-full sm:w-auto"
          >
            Log In
          </button>

          <button
            onClick={() => navigate('/login?mode=signup')}
            className="bg-slate-100 text-slate-700 rounded-xl sm:rounded-2xl px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-medium transition-all duration-200 hover:bg-slate-200  active:translate-y-0 active:scale-95 w-full sm:w-auto"
          >
            Join Now
          </button>
        </div>

      </div>
    </div>
  );
}
