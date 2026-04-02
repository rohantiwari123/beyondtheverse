import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate();

  const { isAuthenticated, isAdmin, userName, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/', icon: 'fa-house' },
    { name: 'Academy', path: '/academy', icon: 'fa-graduation-cap' }, 
    { name: 'Vault', path: '/vault', icon: 'fa-vault' },
    { name: 'Community', path: '/community', icon: 'fa-users' },
    { name: 'Donate', path: '/donate', icon: 'fa-hand-holding-heart' }
  ];

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

  return (
    <>
      <header className="bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-40 border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex justify-between items-center gap-3 relative">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 select-none shrink-0 group">
            <div className="flex items-center justify-center h-9 w-9 lg:h-10 lg:w-10 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100/50 rounded-xl lg:rounded-2xl shadow-inner group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-atom text-lg lg:text-xl text-teal-600"></i>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-800 leading-tight tracking-tight">
                Beyond The <span className="text-teal-600">Verse</span>
              </h1>
              <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-[1px] md:mt-0">
                Empowering Education
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 mr-auto ml-4 xl:ml-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`px-3 py-2 xl:px-4 xl:py-2 rounded-lg text-sm xl:text-base font-bold transition-all whitespace-nowrap ${
                    isActive 
                    ? "bg-teal-50 text-teal-700" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <i className={`fa-solid ${link.icon} mr-2 hidden xl:inline-block`}></i>
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 shrink-0">
            {isAuthenticated && userName && (
              <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 xl:px-4 xl:py-2 rounded-full text-indigo-700 shadow-sm" title={userName}>
                <i className="fa-solid fa-circle-user text-sm xl:text-base"></i>
                <span className="text-xs xl:text-sm font-bold truncate max-w-[100px] xl:max-w-[150px]">{userName.split(' ')[0]}</span>
              </div>
            )}

            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 xl:px-5 xl:py-2 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 whitespace-nowrap"
              >
                <i className="fa-solid fa-shield-halved"></i> 
                <span className="hidden xl:inline">Dashboard</span>
              </Link>
            )}

            {isAuthenticated ? (
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-3 py-1.5 xl:px-5 xl:py-2 rounded-xl text-sm font-bold transition-all active:scale-95 whitespace-nowrap">
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-1.5 xl:px-6 xl:py-2 rounded-xl text-sm font-bold transition-all shadow-md shadow-teal-500/30 active:scale-95 whitespace-nowrap">
                <i className="fa-solid fa-user-plus"></i> Join Us
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center shrink-0">
            <button onClick={() => setIsMobileMenuOpen(true)} className="hamburger-btn h-10 w-10 flex items-center justify-center bg-slate-800 text-white rounded-xl shadow-sm active:scale-95 transition-transform">
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SIDE DRAWER OVERLAY */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* MOBILE DRAWER CONTENT */}
      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-[280px] sm:w-[320px] bg-white shadow-2xl z-[100] lg:hidden flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
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
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-extrabold transition-all ${
                  isActive 
                  ? "bg-teal-50 text-teal-700 border border-teal-100/50 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-400'}`}>
                   <i className={`fa-solid ${link.icon}`}></i>
                </div>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Action Buttons */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
          {isAuthenticated && (
            <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm mb-2">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl">
                <i className="fa-solid fa-user-astronaut"></i>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logged In As</p>
                <p className="text-sm font-black text-slate-800 truncate">{userName}</p>
              </div>
            </div>
          )}

          {isAdmin && (
            <Link 
              to="/admin" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="w-full flex items-center justify-center gap-3 bg-slate-800 text-white py-3.5 rounded-xl text-sm font-bold shadow-md active:scale-95"
            >
              <i className="fa-solid fa-shield-halved"></i> Admin Dashboard
            </Link>
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