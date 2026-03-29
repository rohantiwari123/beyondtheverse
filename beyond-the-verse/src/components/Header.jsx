import React, { useState, useEffect, useRef } from "react";

// 🌟 NAYA: Props me isAuthenticated aur onLoginClick add kiya gaya hai
export default function Header({ isAdmin, isAuthenticated, onAdminClick, onLogout, onLoginClick, userName }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");
  
  // 🌟 NAYA: Mobile Hamburger Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English (Default)' }, { code: 'hi', name: 'हिंदी (Hindi)' }, 
    { code: 'mr', name: 'मराठी (Marathi)' }, { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'bn', name: 'বাংলা (Bengali)' }, { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' }, { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' }, { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'ur', name: 'اردو (Urdu)' }, { code: 'sa', name: 'संस्कृत (Sanskrit)' },
    { code: 'es', name: 'Español (Spanish)' }, { code: 'fr', name: 'Français (French)' }, 
    { code: 'de', name: 'Deutsch (German)' }, { code: 'ar', name: 'العربية (Arabic)' }
  ];

  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element');
      };
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
    const handleClickOutside = (event) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsLangOpen(false); 
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.hamburger-btn')) setIsMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const translatePage = (langCode, langName) => {
    const selectElement = document.querySelector('.goog-te-combo');
    if (selectElement) {
      if(langCode === 'en') {
        document.cookie = `googtrans=/en/en; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
        setCurrentLang("English"); setIsLangOpen(false); window.location.reload(); return; 
      }
      selectElement.value = langCode; selectElement.dispatchEvent(new Event('change'));
      setCurrentLang(langName.split(' ')[0]); setIsLangOpen(false); setIsMobileMenuOpen(false);
    } else { alert("Translation system is loading, please wait a second..."); }
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-slate-100 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center gap-3 relative">
        
        {/* 🌟 Logo Section */}
        <div className="flex items-center gap-2.5 select-none shrink-0">
          <div className="flex items-center justify-center h-9 w-9 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100/50 rounded-xl shadow-inner">
            <i className="fa-solid fa-atom text-lg text-teal-600"></i>
          </div>
          <div className="flex flex-col notranslate">
            <h1 className="text-lg md:text-xl font-extrabold text-slate-800 leading-tight tracking-tight">
              Beyond The <span className="text-teal-600">Verse</span>
            </h1>
            <span className="text-[8px] md:text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-[1px] md:mt-0">
              Empowering Education
            </span>
          </div>
        </div>

        <div id="google_translate_element" className="hidden"></div>

        {/* 🌟 Right Side (Desktop Navbar) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          
          {isAuthenticated && userName && (
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full text-indigo-700 shadow-sm" title={userName}>
              <i className="fa-solid fa-circle-user text-sm"></i>
              <span className="text-xs font-bold truncate max-w-[120px] notranslate">{userName.split(' ')[0]}</span>
            </div>
          )}

          {/* Language Dropdown (Desktop) */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all notranslate">
              <i className="fa-solid fa-globe text-teal-600"></i>
              <span>{currentLang}</span>
              <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isLangOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden py-1 z-[100] notranslate animate-fade-in-up">
                <div className="max-h-[60vh] overflow-y-auto lang-scrollbar flex flex-col">
                  {languages.map((lang) => (
                    <button key={lang.code} onClick={() => translatePage(lang.code, lang.name)} className={`w-full text-left px-4 py-2 text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors ${currentLang === lang.name.split(' ')[0] ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-600 font-medium'}`}>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isAdmin && (
            <button onClick={onAdminClick} className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-1.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95">
              <i className="fa-solid fa-shield-halved"></i> Dashboard
            </button>
          )}

          {/* 🌟 Conditional Auth Button (Login or Logout) */}
          {isAuthenticated ? (
            <button onClick={onLogout} className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-4 py-1.5 rounded-xl text-sm font-bold transition-all active:scale-95">
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          ) : (
            <button onClick={onLoginClick} className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-1.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-teal-500/30 active:scale-95">
              <i className="fa-solid fa-user-plus"></i> Join Us
            </button>
          )}
        </div>

        {/* 🌟 Right Side (Mobile Navbar) */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          {/* Mobile Language Button (Quick access) */}
          <button onClick={() => setIsLangOpen(!isLangOpen)} className="h-9 w-9 flex items-center justify-center bg-slate-50 border border-slate-200 text-teal-600 rounded-lg active:scale-95">
            <i className="fa-solid fa-globe text-sm"></i>
          </button>
          
          {/* Hamburger Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="hamburger-btn h-9 w-9 flex items-center justify-center bg-slate-800 text-white rounded-lg shadow-sm active:scale-95 transition-all">
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>

        {/* 🌟 Mobile Language Dropdown (Overlay) */}
        {isLangOpen && (
          <div className="absolute md:hidden top-[110%] right-4 w-48 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden py-1 z-[100] notranslate animate-fade-in-up">
            <div className="max-h-[50vh] overflow-y-auto lang-scrollbar flex flex-col">
              {languages.map((lang) => (
                <button key={lang.code} onClick={() => translatePage(lang.code, lang.name)} className={`w-full text-left px-4 py-2 text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors ${currentLang === lang.name.split(' ')[0] ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-600 font-medium'}`}>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 🌟 Mobile Hamburger Menu Dropdown 🌟 */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl z-40 animate-fade-in">
          <div className="p-4 flex flex-col gap-3">
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-lg shadow-inner">
                  <i className="fa-solid fa-user-astronaut"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Logged In As</p>
                  <p className="text-sm font-black text-slate-800 notranslate">{userName}</p>
                </div>
              </div>
            ) : (
              <div className="text-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-bold text-slate-600">Welcome, Explorer!</p>
                <p className="text-xs text-slate-400 mt-1">Join the community to unlock features.</p>
              </div>
            )}

            {isAdmin && (
              <button onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl text-sm font-bold shadow-md active:scale-95">
                <i className="fa-solid fa-shield-halved"></i> Admin Dashboard
              </button>
            )}

            {isAuthenticated ? (
              <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-600 border border-rose-200 py-3 rounded-xl text-sm font-bold active:scale-95">
                <i className="fa-solid fa-right-from-bracket"></i> Secure Logout
              </button>
            ) : (
              <button onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-xl text-sm font-bold shadow-md shadow-teal-500/30 active:scale-95">
                <i className="fa-solid fa-user-plus"></i> Login / Create Account
              </button>
            )}

          </div>
        </div>
      )}
    </header>
  );
  }
