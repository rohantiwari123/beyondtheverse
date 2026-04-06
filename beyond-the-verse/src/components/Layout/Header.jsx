import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";
import { subscribeToUserNotifications, markNotificationAsRead } from '../../services/firebaseServices'; // 🌟 Added
import { formatDateTime } from '../../utils/dateFormatter'; // 🌟 Added

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, userName, userId, logout } = useAuth(); // 🌟 Added userId

  // 🌟 Notification States
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navLinks = [
    { name: 'Home', path: '/', icon: 'fa-house' },
    { name: 'Assessments', path: '/exam', icon: 'fa-file-signature' },
    { name: 'Community', path: '/community', icon: 'fa-users' },
    { name: 'Donate', path: '/donate', icon: 'fa-hand-holding-heart' },
    { name: 'About', path: '/about', icon: 'fa-circle-info' }
  ];

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  // 🌟 Fetch Notifications
  useEffect(() => {
    if (isAuthenticated && userId) {
      const unsubscribe = subscribeToUserNotifications(userId, (notifs) => {
        setNotifications(notifs);
      });
      return () => unsubscribe();
    } else {
      setNotifications([]);
    }
  }, [isAuthenticated, userId]);

  // 🌟 Handle Notification Click
  const handleNotificationClick = async (notif) => {
    setShowNotifDropdown(false);
    if (!notif.isRead) {
      await markNotificationAsRead(notif.id);
    }
    navigate(notif.link);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    const handleResize = () => { if (window.innerWidth >= 1150) setIsMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => { document.body.style.overflow = 'unset'; window.removeEventListener('resize', handleResize); }
  }, [isMobileMenuOpen]);

  const isPathActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* 🌟 Changed overflow-hidden to overflow-visible so dropdown doesn't get cut off */}
      <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-200 w-full overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center">
          
          {/* 1. LEFT ZONE: LOGO (Fixed Width Area) */}
          <div className="flex items-center justify-start min-w-max lg:w-1/4">
            <Link to="/" className="flex items-center gap-2 lg:gap-3 select-none group">
              <div className="flex items-center justify-center h-8 w-8 lg:h-10 lg:w-10 bg-teal-50 border border-teal-100 rounded-lg lg:rounded-xl shrink-0 transition-transform group-hover:scale-105">
                <i className="fa-solid fa-atom text-teal-600 text-lg lg:text-xl"></i>
              </div>
              <div className="flex flex-col justify-center overflow-hidden">
                <h1 className="text-[13px] sm:text-base lg:text-lg font-black text-slate-800 leading-none tracking-tight truncate">
                  Beyond The <span className="text-teal-600">Verse</span>
                </h1>
                <span className="hidden xs:block text-[7px] lg:text-[8px] font-bold text-slate-400 tracking-widest uppercase mt-0.5 truncate">Empowering Education</span>
              </div>
            </Link>
          </div>

          {/* 2. CENTER ZONE: NAVIGATION (Hidden on medium/small laptops to prevent overlap) */}
          <nav className="hidden xl:flex flex-1 justify-center px-4">
            <div className="flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-[12px] xl:text-[13px] font-extrabold transition-all whitespace-nowrap ${
                    isPathActive(link.path) ? "bg-teal-50 text-teal-700" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* 3. RIGHT ZONE: ACTIONS (Stays on the right) */}
          <div className="flex items-center justify-end flex-1 lg:w-1/4 gap-2">
            
            {/* 🌟 UNIVERSAL NOTIFICATION BELL (Visible on all screens if authenticated) */}
            {isAuthenticated && (
              <div className="relative">
                <button 
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className={`h-8 w-8 xl:h-9 xl:w-9 flex items-center justify-center rounded-full transition-all border ${
                    showNotifDropdown ? 'bg-teal-50 text-teal-600 border-teal-200' : 'text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <i className="fa-regular fa-bell text-[15px] xl:text-base"></i>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 xl:top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full animate-pulse border border-white"></span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {showNotifDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifDropdown(false)}></div>
                    <div className="absolute right-0 mt-2 w-[280px] sm:w-[320px] bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in origin-top-right">
                      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-slate-50/80">
                        <span className="font-black text-slate-800 text-[13px] uppercase tracking-wide">Notifications</span>
                        {unreadCount > 0 && <span className="bg-teal-100 text-teal-700 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-teal-200">{unreadCount} New</span>}
                      </div>
                      
                      <div className="max-h-[350px] overflow-y-auto hide-scrollbar">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-slate-400">
                            <i className="fa-regular fa-bell-slash text-2xl mb-2 opacity-50"></i>
                            <p className="text-[11px] font-bold uppercase tracking-widest">Quiet in the verse</p>
                          </div>
                        ) : (
                          notifications.map(notif => (
                            <div 
                              key={notif.id} 
                              onClick={() => handleNotificationClick(notif)}
                              className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors flex gap-3.5 ${!notif.isRead ? 'bg-teal-50/40' : ''}`}
                            >
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${!notif.isRead ? 'bg-white text-teal-600 border-teal-200 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                                <i className="fa-solid fa-bolt text-[10px]"></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-[13px] truncate leading-tight ${!notif.isRead ? 'font-black text-slate-800' : 'font-bold text-slate-600'}`}>{notif.title}</p>
                                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed font-medium">{notif.message}</p>
                                <p className="text-[9px] text-slate-400 font-bold mt-2 uppercase tracking-wider">{formatDateTime(notif.timestamp)}</p>
                              </div>
                              {!notif.isRead && <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></div>}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Desktop Icons Group (Hidden below XL if space is tight, otherwise visible above LG) */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {isAuthenticated && userName && (
                <>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className={`h-8 w-8 xl:h-9 xl:w-9 flex items-center justify-center rounded-full transition-all border ${
                        isPathActive('/admin') ? "bg-slate-900 text-white border-slate-900" : "text-slate-400 border-transparent hover:bg-slate-100"
                      }`}
                      title="Admin Dashboard"
                    >
                      <i className="fa-solid fa-shield-halved text-xs xl:text-sm"></i>
                    </Link>
                  )}

                  <Link 
                    to="/settings" 
                    className={`h-8 w-8 xl:h-9 xl:w-9 flex items-center justify-center rounded-full transition-all border ${
                      isPathActive('/settings') ? "bg-teal-50 text-teal-600 border-teal-200" : "text-slate-400 border-transparent hover:bg-slate-100"
                    }`}
                    title="Settings"
                  >
                    <i className="fa-solid fa-gear text-xs xl:text-sm"></i>
                  </Link>

                  <Link 
                    to="/profile" 
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full transition-all border ${
                      isPathActive('/profile') ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <i className={`fa-solid fa-circle-user text-sm ${isPathActive('/profile') ? 'text-teal-500' : 'text-slate-400'}`}></i>
                    <span className="text-[11px] xl:text-xs font-black truncate max-w-[50px] xl:max-w-[100px]">
                      {userName.split(' ')[0]}
                    </span>
                  </Link>
                </>
              )}

              {isAuthenticated ? (
                <button onClick={handleLogout} className="bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1.5 rounded-lg text-[11px] xl:text-xs font-black hover:bg-rose-100 transition-all">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="bg-teal-600 text-white px-4 py-1.5 rounded-lg text-[11px] xl:text-xs font-black hover:bg-teal-700 transition-all">
                  Join
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle (Visible below XL to prevent nav overlap) */}
            <div className="flex xl:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(true)} 
                className="h-9 w-9 flex items-center justify-center bg-slate-800 text-white rounded-lg active:scale-95 transition-transform"
              >
                <i className="fa-solid fa-bars text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 🌟 MOBILE DRAWER */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity z-[100] xl:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div 
        className={`fixed top-0 right-0 h-screen w-[280px] sm:w-[320px] bg-white z-[110] xl:hidden flex flex-col transition-transform duration-300 ease-in-out border-l border-slate-200 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-atom text-teal-600 text-lg"></i>
            <span className="font-black text-slate-800 uppercase tracking-tight">Menu</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="h-8 w-8 flex items-center justify-center bg-slate-50 text-slate-400 rounded-full">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${
                isPathActive(link.path) ? "bg-teal-50 text-teal-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div className="w-5 flex justify-center shrink-0"><i className={`fa-solid ${link.icon} text-base`}></i></div>
              <span className="text-sm">{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* MOBILE BOTTOM ACTIONS */}
        <div className="p-4 pb-8 border-t border-slate-100 bg-slate-50 flex flex-col gap-3">
          {isAuthenticated && (
            <div className={`p-2 rounded-xl border flex items-center justify-between transition-colors ${isPathActive('/profile') || isPathActive('/settings') || isPathActive('/admin') ? 'bg-white border-teal-200 shadow-sm' : 'bg-white border-slate-200'}`}>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 flex-1 overflow-hidden px-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-base shrink-0 border ${isPathActive('/profile') ? 'bg-teal-500 text-white border-teal-600' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {userName?.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden flex-1">
                  <p className={`text-[9px] font-bold uppercase tracking-wider ${isPathActive('/profile') ? 'text-teal-600' : 'text-slate-400'}`}>Profile</p>
                  <p className="text-[13px] font-bold text-slate-800 truncate leading-tight">{userName}</p>
                </div>
              </Link>
              
              <div className="flex items-center gap-1 border-l border-slate-100 pl-1">
                {isAdmin && (
                  <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${isPathActive('/admin') ? 'text-slate-900 bg-slate-100' : 'text-slate-400'}`}>
                    <i className="fa-solid fa-shield-halved text-sm"></i>
                  </Link>
                )}
                <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${isPathActive('/settings') ? 'text-teal-600 bg-teal-50/50' : 'text-slate-400'}`}>
                  <i className="fa-solid fa-gear text-sm"></i>
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="w-full bg-white text-rose-600 py-2.5 rounded-xl text-xs font-bold border border-rose-100 active:bg-rose-50 transition-colors shadow-sm">
                Sign Out
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-teal-600 text-white py-2.5 rounded-xl text-center text-xs font-bold">
                Join Workspace
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
     }
