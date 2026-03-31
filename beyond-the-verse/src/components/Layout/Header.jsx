import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
// 🌟 JADOO: Context Import kiya
import { useAuth } from "../../context/AuthContext";

export default function Header({ onAdminClick }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const location = useLocation(); 
  const navigate = useNavigate();

  // 🌟 JADOO: Ab sara data context se aayega
  const { isAuthenticated, isAdmin, userName, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Donate', path: '/donate' }
  ];

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

  // Secure Logout function
  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileMenuOpen]);

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
    <>
      <header className="bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-40 border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex justify-between items-center gap-3 relative">
          
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 select-none shrink-0 group">
            <div className="flex items-center justify-center h-9 w-9 lg:h-10 lg:w-10 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100/50 rounded-xl lg:rounded-2xl shadow-inner group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-atom text-lg lg:text-xl text-teal-600"></i>
            </div>
            <div className="flex flex-col notranslate">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-800 leading-tight tracking-tight">
                Beyond The <span className="text-teal-600">Verse</span>
              </h1>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-[1px] md:mt-0">
                Empowering Education
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2 mr-auto ml-6 lg:ml-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`px-3 py-2 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base font-bold transition-all ${
                    isActive 
                    ? "bg-teal-50 text-teal-700" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div id="google_translate_element" className="hidden"></div>

          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            {isAuthenticated && userName && (
              <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-indigo-700 shadow-sm" title={userName}>
                <i className="fa-solid fa-circle-user text-sm lg:text-base"></i>
                <span className="text-xs lg:text-sm font-bold truncate max-w-[120px] lg:max-w-[150px] notranslate">{userName.split(' ')[0]}</span>
              </div>
            )}

            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl text-sm font-semibold transition-all notranslate">
                <i className="fa-solid fa-globe text-teal-600"></i>
                <span className="hidden lg:inline">{currentLang}</span>
                <span className="lg:hidden">{currentLang.slice(0, 3)}</span>
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
              <button onClick={onAdminClick} className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-1.5 lg:px-5 lg:py-2 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95">
                <i className="fa-solid fa-shield-halved"></i> 
                <span className="hidden lg:inline">Dashboard</span>
              </button>
            )}

            {isAuthenticated ? (
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-4 py-1.5 lg:px-5 lg:py-2 rounded-xl text-sm font-bold transition-all active:scale-95">
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-1.5 lg:px-6 lg:py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-teal-500/30 active:scale-95">
                <i className="fa-solid fa-user-plus"></i> Join Us
              </Link>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="h-10 w-10 flex items-center justify-center bg-slate-50 border border-slate-200 text-teal-600 rounded-xl active:scale-95 transition-transform">
              <i className="fa-solid fa-globe text-base"></i>
            </button>
            
            <button onClick={() => setIsMobileMenuOpen(true)} className="hamburger-btn h-10 w-10 flex items-center justify-center bg-slate-800 text-white rounded-xl shadow-sm active:scale-95 transition-transform">
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
          </div>

          {isLangOpen && (
            <div className="absolute md:hidden top-[110%] right-4 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden py-1 z-[100] notranslate animate-fade-in-up">
              <div className="max-h-[50vh] overflow-y-auto lang-scrollbar flex flex-col">
                {languages.map((lang) => (
                  <button key={lang.code} onClick={() => translatePage(lang.code, lang.name)} className={`w-full text-left px-4 py-3 text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors ${currentLang === lang.name.split(' ')[0] ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-600 font-medium'}`}>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MOBILE SIDE DRAWER */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-[280px] sm:w-[320px] bg-white shadow-2xl z-[100] md:hidden flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2 notranslate">
            <i className="fa-solid fa-atom text-teal-600 text-xl"></i>
            <span className="font-black text-slate-800 text-lg">Menu</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="h-10 w-10 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-full transition-colors"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-5 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-extrabold transition-all ${
                  isActive 
                  ? "bg-teal-50 text-teal-700 border border-teal-100/50" 
                  : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <i className={`fa-solid ${link.name === 'Home' ? 'fa-house' : link.name === 'About' ? 'fa-book-open' : 'fa-hand-holding-heart'} ${isActive ? 'text-teal-500' : 'text-slate-400'}`}></i>
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm mb-2">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl">
                <i className="fa-solid fa-user-astronaut"></i>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logged In As</p>
                <p className="text-sm font-black text-slate-800 notranslate truncate">{userName}</p>
              </div>
            </div>
          ) : (
            <div className="text-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-2">
              <p className="text-sm font-black text-slate-800">Welcome, Explorer!</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">Join us to unlock premium features.</p>
            </div>
          )}

          {isAdmin && (
            <button onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-3 bg-slate-800 text-white py-3.5 rounded-xl text-sm font-bold shadow-md active:scale-95">
              <i className="fa-solid fa-shield-halved"></i> Admin Dashboard
            </button>
          )}

          {isAuthenticated ? (
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 bg-rose-50 text-rose-600 border border-rose-200 py-3.5 rounded-xl text-sm font-bold active:scale-95">
              <i className="fa-solid fa-right-from-bracket"></i> Secure Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="w-full flex items-center justify-center gap-3 bg-teal-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-md shadow-teal-500/30 active:scale-95"
            >
              <i className="fa-solid fa-user-plus"></i> Login / Create Account
            </Link>
          )}
        </div>
      </div>
    </>
  );
      }
