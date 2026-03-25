import React, { useState, useEffect, useRef } from "react";

export default function Header({ onAdminClick }) {
  const [clickCount, setClickCount] = useState(0);
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");
  const dropdownRef = useRef(null);

  // 🌍 Duniya bhar ki Bhashayein
  const languages = [
    { code: 'en', name: 'English (Default)' }, 
    { code: 'hi', name: 'हिंदी (Hindi)' }, 
    { code: 'mr', name: 'मराठी (Marathi)' }, 
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'bn', name: 'বাংলা (Bengali)' }, 
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' }, 
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' }, 
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'ur', name: 'اردو (Urdu)' }, 
    { code: 'sa', name: 'संस्कृत (Sanskrit)' },
    { code: 'es', name: 'Español (Spanish)' }, 
    { code: 'fr', name: 'Français (French)' }, 
    { code: 'de', name: 'Deutsch (German)' }, 
    { code: 'ar', name: 'العربية (Arabic)' }
  ];

  // Secret Admin Logic
  useEffect(() => {
    if (clickCount >= 3) {
      onAdminClick();
      setClickCount(0);
    }
    const timer = setTimeout(() => setClickCount(0), 1000);
    return () => clearTimeout(timer);
  }, [clickCount, onAdminClick]);

  // Google Script Load (English Default ke sath)
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { 
            pageLanguage: 'en', // Yahan base language ENGLISH set ki hai
            autoDisplay: false 
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
    
    // Dropdown ke bahar click karne par band karne ka logic
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync Google Translate State on Load 
  useEffect(() => {
    const checkCookie = () => {
      const match = document.cookie.match(/(?:^|;)\s*googtrans=([^;]*)/);
      if (match) {
        const langCode = match[1].split('/')[2];
        const activeLang = languages.find(l => l.code === langCode);
        if (activeLang) setCurrentLang(activeLang.name.split(' ')[0]);
      }
    };
    setTimeout(checkCookie, 1000);
  }, []);

  // 🌟 NAYA: Smart Translation Trigger (With Cookie Deletion for English) 🌟
  const translatePage = (langCode, langName) => {
    const selectElement = document.querySelector('.goog-te-combo');
    
    if (selectElement) {
      // 1. Agar user ne 'English (Default)' select kiya hai:
      if(langCode === 'en') {
        // A) Google ki Translation Cookies Delete karo (Memory saaf)
        document.cookie = `googtrans=/en/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
        
        // B) Dropdown update karo
        setCurrentLang("English");
        setIsLangOpen(false);
        
        // C) Page refresh karke original English state laao
        window.location.reload(); 
        return; 
      }

      // 2. Agar koi aur bhasha chuni hai (jaise Hindi):
      selectElement.value = langCode;
      selectElement.dispatchEvent(new Event('change')); // Google ko background me trigger karo
      setCurrentLang(langName.split(' ')[0]); // UI mein chota naam dikhane ke liye
      setIsLangOpen(false); // Dropdown band karo
      
    } else {
      alert("Translation system is loading, please wait a second...");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Beyond The Verse",
      text: "Support this amazing educational initiative!",
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) { console.log("Error sharing:", err); }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-3">
        
        {/* Logo (Safe from translation) */}
        <div
          className="group flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setClickCount((prev) => prev + 1)}
          title="Admin Login"
        >
          <div className="relative flex items-center justify-center h-10 w-10 bg-teal-50 rounded-xl group-hover:bg-teal-100 transition-colors">
            <i className={`fa-solid fa-atom text-xl text-teal-600 transition-transform duration-300 ${clickCount > 0 ? 'rotate-45 scale-110' : ''}`}></i>
            <div className="absolute -bottom-1.5 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`h-1 w-1 rounded-full transition-all duration-200 ${i < clickCount ? 'bg-teal-500 scale-100' : 'bg-transparent scale-0'}`} />
              ))}
            </div>
          </div>
          <div className="flex flex-col notranslate">
            <h1 className="text-xl font-extrabold text-slate-800 leading-tight">
              Beyond The <span className="text-teal-600">Verse</span>
            </h1>
            <span className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase">
              Empowering Education
            </span>
          </div>
        </div>

        {/* Hidden Google Element */}
        <div id="google_translate_element" className="hidden"></div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          
          {/* Custom Native Language Dropdown (Scrollable) */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-sm font-semibold transition-all notranslate"
            >
              <i className="fa-solid fa-globe text-teal-600"></i>
              <span className="hidden sm:inline">{currentLang}</span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isLangOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden py-1 z-[100] notranslate">
                <div className="max-h-[60vh] overflow-y-auto lang-scrollbar flex flex-col">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => translatePage(lang.code, lang.name)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors ${currentLang === lang.name.split(' ')[0] ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-600 font-medium'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); handleShare(); }}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95"
          >
            <i className="fa-solid fa-share-nodes"></i>
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

      </div>
    </header>
  );
    }
