import React, { useState, useEffect, useRef } from "react";

// 🌟 NAYA: Props में `userName` ऐड किया गया है 🌟
export default function Header({ isAdmin, onAdminClick, onLogout, userName }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");
  const dropdownRef = useRef(null);

  // 🌍 Duniya bhar ki Bhashayein
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
    const handleClickOutside = (event) => { if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsLangOpen(false); };
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
      setCurrentLang(langName.split(' ')[0]); setIsLangOpen(false); 
    } else { alert("Translation system is loading, please wait a second..."); }
  };

  const handleShare = async () => {
    const shareData = { title: "Beyond The Verse", text: "Support this amazing educational initiative!", url: window.location.href };
    try { if (navigator.share) await navigator.share(shareData); else { await navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); } } catch (err) { console.log("Error sharing:", err); }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex justify-between items-center gap-2 sm:gap-3">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3 select-none shrink-0">
          <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 bg-teal-50 rounded-lg sm:rounded-xl">
            <i className="fa-solid fa-atom text-base sm:text-xl text-teal-600"></i>
          </div>
          <div className="flex flex-col notranslate">
            <h1 className="text-[17px] sm:text-xl font-extrabold text-slate-800 leading-tight tracking-tight">
              Beyond The <span className="text-teal-600">Verse</span>
            </h1>
            <span className="text-[7.5px] sm:text-[9px] font-bold text-slate-400 tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-[1px] sm:mt-0">
              Empowering Education
            </span>
          </div>
        </div>

        <div id="google_translate_element" className="hidden"></div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* 🌟 JADOO: User Name Capsule (सभी स्क्रीन पर दिखेगा) 🌟 */}
          {userName && (
            <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-indigo-700 shadow-sm transition-all" title={userName}>
              <i className="fa-solid fa-circle-user text-xs sm:text-sm"></i>
              {/* हम सिर्फ First Name दिखा रहे हैं ताकि मोबाइल पर डिज़ाइन खराब न हो */}
              <span className="text-[10px] sm:text-xs font-bold truncate max-w-[50px] sm:max-w-[100px] notranslate">
                {userName.split(' ')[0]}
              </span>
            </div>
          )}

          {/* Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold transition-all notranslate">
              <i className="fa-solid fa-globe text-teal-600 text-sm sm:text-base"></i>
              <span className="hidden md:inline">{currentLang}</span>
              <i className={`fa-solid fa-chevron-down text-[9px] sm:text-xs transition-transform ${isLangOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 sm:w-48 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden py-1 z-[100] notranslate">
                <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto lang-scrollbar flex flex-col">
                  {languages.map((lang) => (
                    <button key={lang.code} onClick={() => translatePage(lang.code, lang.name)} className={`w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors ${currentLang === lang.name.split(' ')[0] ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-600 font-medium'}`}>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admin Dashboard Button */}
          {isAdmin && (
            <button onClick={onAdminClick} className="flex items-center justify-center gap-1.5 sm:gap-2 bg-teal-600 hover:bg-teal-700 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all shadow-sm active:scale-95" title="Open Admin Dashboard">
              <i className="fa-solid fa-shield-halved text-xs sm:text-base"></i>
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          )}

          {/* Logout Button */}
          <button onClick={onLogout} className="flex items-center justify-center gap-1.5 sm:gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all active:scale-95 border border-rose-100" title="Logout">
            <i className="fa-solid fa-right-from-bracket text-xs sm:text-base"></i>
            <span className="hidden md:inline">Logout</span>
          </button>

        </div>
      </div>
    </header>
  );
      }
