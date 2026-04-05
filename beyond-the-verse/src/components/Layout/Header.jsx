import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate();

  const { isAuthenticated, isAdmin, userName, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/', icon: 'fa-house' },
    { name: 'Exam', path: '/exam', icon: 'fa-file-signature' },
    { name: 'Community', path: '/community', icon: 'fa-users' },
    { name: 'Donate', path: '/donate', icon: 'fa-hand-holding-heart' },
    { name: 'About', path: '/about', icon: 'fa-circle-info' }
  ];

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  // 🌟 FIX: Scroll lock aur Overlay sync
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);

    return () => { 
      document.body.style.overflow = 'unset'; 
      window.removeEventListener('resize', handleResize);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-40 border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 flex justify-between items-center relative">
          
          {/* LEFT SIDE GROUP */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-8 xl:gap-10">
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 select-none shrink-0 group">
              <div className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100/50 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-inner group-hover:scale-105 transition-transform">
                <i className="fa-solid fa-atom text-base sm:text-lg lg:text-xl text-teal-600"></i>
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-black text-slate-800 leading-none tracking-tight">
                  Beyond The <span className="text-teal-600">Verse</span>
                </h1>
                <span className="text-[7px] sm:text-[8px] lg:text-[9px] xl:text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-0.5">
                  Empowering Education
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center md:gap-0.5 lg:gap-1.5 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className={`md:px-2 md:py-1.5 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5 rounded-lg text-[11px] lg:text-[13px] xl:text-sm font-bold transition-all whitespace-nowrap ${
                      isActive ? "bg-teal-50 text-teal-700" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <i className={`fa-solid ${link.icon} mr-1.5 hidden lg:inline-block text-[10px] lg:text-xs`}></i>
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT SIDE GROUP */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="hidden md:flex items-center md:gap-1.5 lg:gap-3 xl:gap-4">
              {isAuthenticated && userName && (
                <div className="flex items-center gap-1.5 lg:gap-2 bg-indigo-50 border border-indigo-100 md:px-2.5 md:py-1 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 rounded-full text-indigo-700 shadow-sm">
                  <i className="fa-solid fa-circle-user text-xs lg:text-sm xl:text-base"></i>
                  <span className="text-[10px] lg:text-xs xl:text-sm font-bold truncate md:max-w-[60px] lg:max-w-[100px] xl:max-w-[150px]">{userName.split(' ')[0]}</span>
                </div>
              )}

              {isAdmin && (
                <Link to="/admin" className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 lg:px-4 lg:py-1.5 xl:px-5 xl:py-2 rounded-lg lg:rounded-xl text-[10px] lg:text-xs xl:text-sm font-bold transition-all shadow-md active:scale-95">
                  Dashboard
                </Link>
              )}

              {isAuthenticated ? (
                <button onClick={handleLogout} className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-3 py-1.5 lg:px-4 lg:py-1.5 xl:px-5 xl:py-2 rounded-lg lg:rounded-xl text-[10px] lg:text-xs xl:text-sm font-bold transition-all">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 lg:px-5 lg:py-1.5 xl:px-6 xl:py-2 rounded-lg lg:rounded-xl text-[10px] lg:text-xs xl:text-sm font-bold transition-all">
                  Join Us
                </Link>
              )}
            </div>

            {/* Mobile Button Toggle */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)} 
                className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-slate-800 text-white rounded-lg sm:rounded-xl shadow-sm active:scale-95"
              >
                <i className="fa-solid fa-bars text-sm sm:text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 🌟 1. BACKGROUND OVERLAY (Flipped z-index and fixed position) */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 z-[100] pointer-events-auto' : 'opacity-0 z-[-1] pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* 🌟 2. MOBILE DRAWER CONTENT (Higher z-index than overlay) */}
      <div 
        className={`fixed top-0 right-0 h-screen w-[280px] sm:w-[320px] bg-white shadow-2xl z-[110] md:hidden flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-atom text-teal-600 text-lg"></i>
            <span className="font-black text-slate-800 text-base">Menu</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="h-8 w-8 flex items-center justify-center bg-slate-50 text-slate-400 rounded-full"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-extrabold transition-all ${
                  isActive ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <i className={`fa-solid ${link.icon} w-5 text-center`}></i>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-2.5">
          {isAuthenticated && (
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                {userName?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active User</p>
                <p className="text-sm font-black text-slate-800 truncate">{userName}</p>
              </div>
            </div>
          )}

          {isAdmin && (
            <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-slate-800 text-white py-3 rounded-xl text-center text-xs font-bold">
              Admin Dashboard
            </Link>
          )}

          {isAuthenticated ? (
            <button onClick={handleLogout} className="w-full bg-rose-50 text-rose-600 py-3 rounded-xl text-xs font-bold border border-rose-100">
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-teal-600 text-white py-3 rounded-xl text-center text-xs font-bold shadow-md shadow-teal-500/20">
              Join Us
            </Link>
          )}
        </div>
      </div>
    </>
  );
}