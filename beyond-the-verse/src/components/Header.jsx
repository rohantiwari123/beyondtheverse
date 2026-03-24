import React, { useState, useEffect } from "react";

export default function Header({ onAdminClick }) {
  const [clickCount, setClickCount] = useState(0);

  // 🌟 NAYA: Google Translate Auto-Load Logic 🌟
  useEffect(() => {
    // Check if script is already there to prevent duplicates
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { 
            pageLanguage: 'hi', // Base language Hindi/English jo bhi aapka text hai
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE 
          },
          'google_translate_element'
        );
      };
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (clickCount >= 3) {
      onAdminClick();
      setClickCount(0);
    }
    const timer = setTimeout(() => setClickCount(0), 1000);
    return () => clearTimeout(timer);
  }, [clickCount, onAdminClick]);

  // Share Functionality (Mobile friendly)
  const handleShare = async () => {
    const shareData = {
      title: "Beyond The Verse",
      text: "Support this amazing educational initiative!",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-3">
        
        {/* Logo & Secret Admin Trigger */}
        <div
          className="group flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setClickCount((prev) => prev + 1)}
          title="Beyond The Verse"
        >
          {/* Atom Icon with Secret Visual Feedback */}
          <div className="relative flex items-center justify-center h-10 w-10 bg-teal-50 rounded-xl group-hover:bg-teal-100 transition-colors">
            <i className={`fa-solid fa-atom text-xl text-teal-600 transition-transform duration-300 ${clickCount > 0 ? 'rotate-45 scale-110' : ''}`}></i>
            
            {/* Secret Dots (Only visible when clicking) */}
            <div className="absolute -bottom-1.5 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 w-1 rounded-full transition-all duration-200 ${
                    i < clickCount ? 'bg-teal-500 scale-100' : 'bg-transparent scale-0'
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* 🌟 NAYA: 'notranslate' class lagayi hai taaki logo translate na ho 🌟 */}
          <div className="flex flex-col notranslate">
            <h1 className="text-xl font-extrabold text-slate-800 leading-tight">
              Beyond The <span className="text-teal-600">Verse</span>
            </h1>
            <span className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase">
              Empowering Education
            </span>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          
          {/* 🌟 NAYA: Google Translate Dropdown Container 🌟 */}
          <div id="google_translate_element" className="overflow-hidden rounded-lg"></div>

          {/* Live Indicator (Blinking Dot) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live
          </div>

          {/* Modern Share Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering admin clicks by mistake
              handleShare();
            }}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <i className="fa-solid fa-share-nodes"></i>
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

      </div>
    </header>
  );
          }
