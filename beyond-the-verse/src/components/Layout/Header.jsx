import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { subscribeToUserNotifications, markNotificationAsRead, requestPushNotificationPermission } from '../../services/firebaseServices';
import { formatDateTime } from '../../utils/dateFormatter';
import GlobalSearch from "../common/GlobalSearch";

const styles = {
  header: "bg-white/95 backdrop-blur-xl fixed top-0 left-0 right-0 z-[100] border-b w-full overflow-visible transition-colors duration-300 border-slate-200",  
  spacer: "h-14 sm:h-16 w-full shrink-0",
  logoContainer: "flex items-baseline gap-1",
  brandFirst: "text-[22px] sm:text-[26px] lg:text-[34px] font-cabinet font-black tracking-tighter leading-none text-slate-900",
  brandMiddle: "text-[16px] sm:text-[20px] lg:text-[24px] lowercase tracking-tighter leading-[0.85] font-serif italic font-bold text-slate-400",
  brandLast: "text-[20px] sm:text-[24px] lg:text-[28px] font-cabinet font-black tracking-tight leading-none text-teal-600",
  brandTagline: "hidden xs:flex items-center gap-1.5 text-[6.5px] sm:text-[7px] lg:text-[8px] uppercase mt-1.5 sm:mt-2 truncate tracking-[0.35em] font-medium font-sans text-slate-400",
  navContainer: "hidden xl:flex flex-1 justify-center px-4",
  navLinkWrapper: "flex items-center gap-1 xl:gap-2",
  navLinkBase: "px-3 py-2 rounded-lg text-[12px] xl:text-[13px] transition-all whitespace-nowrap",
  navLinkActive: "font-bold text-teal-700 bg-teal-50/50",
  navLinkInactive: "text-slate-500 hover:text-slate-800 hover:bg-slate-50",
  actionBtnBase: "h-8 w-8 xl:h-9 xl:w-9 flex items-center justify-center rounded-full transition-all border",
  actionBtnActive: "bg-teal-50 text-teal-600 border-teal-200",
  actionBtnInactive: "border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800",
  profileBtnBase: "flex items-center justify-center w-8 h-8 xl:w-9 xl:h-9 rounded-full transition-all border",
  profileBtnActive: "border-teal-500 shadow-sm shadow-teal-500/20",
  profileBtnInactive: "border-transparent hover:border-slate-200",
  profileImg: "w-full h-full rounded-full object-cover border border-slate-200",
  profileFallbackActive: "bg-teal-500 text-white",
  profileFallbackInactive: "bg-slate-200 text-slate-600",
  logoutBtn: "bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1.5 rounded-lg text-[11px] xl:text-xs hover:bg-rose-100 transition-all ml-1",
  loginBtn: "bg-teal-600 text-white px-4 py-1.5 rounded-lg text-[11px] xl:text-xs hover:bg-teal-700 transition-all shadow-sm ml-1",
  notifDropdown: "absolute right-0 mt-2 w-[280px] sm:w-[320px] bg-white border rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in origin-top-right border-slate-200",
  notifHeader: "flex items-center justify-between px-4 py-3.5 border-b bg-slate-50/80 border-slate-100",
  notifItemUnread: "p-4 border-b cursor-pointer transition-colors flex gap-3.5 border-slate-50 bg-teal-50/40 hover:bg-slate-50",
  notifItemRead: "p-4 border-b cursor-pointer transition-colors flex gap-3.5 border-slate-50 bg-white hover:bg-slate-50",
  mobileOverlay: "fixed inset-0 backdrop-blur-sm transition-opacity z-[100] xl:hidden bg-slate-900/60",
  mobileDrawer: "fixed top-0 right-0 h-screen w-[280px] sm:w-[320px] bg-white z-[110] xl:hidden flex flex-col transition-transform duration-300 ease-in-out border-l border-slate-200",
  mobileHeader: "flex items-center justify-between p-5 border-b border-slate-100",
  mobileCloseBtn: "h-8 w-8 flex items-center justify-center bg-slate-50 text-slate-400 rounded-full",
  mobileLinkBase: "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all",
  mobileLinkActive: "bg-teal-50 text-teal-700",
  mobileLinkInactive: "text-slate-600 hover:bg-slate-50",
  mobileAdminActive: "bg-slate-900 text-white",
  mobileAdminInactive: "bg-amber-50 text-amber-700 hover:bg-amber-100",
  mobileBottomContainer: "p-4 pb-8 border-t flex flex-col gap-3 border-slate-100 bg-slate-50",
  mobileProfileCardActive: "bg-white border-teal-200 shadow-sm",
  mobileProfileCardInactive: "bg-white border-slate-200",
  mobileProfileImgActive: "bg-teal-500 text-white border-teal-600",
  mobileProfileImgInactive: "bg-slate-100 text-slate-600 border-slate-200",
  mobileSettingsBtnActive: "text-teal-600 bg-teal-50/50",
  mobileSettingsBtnInactive: "text-slate-400",
  mobileLogoutBtn: "w-full bg-white text-rose-600 py-2.5 rounded-xl text-xs border active:bg-rose-50 transition-colors shadow-sm font-bold uppercase tracking-wider border-rose-100",
  mobileLoginBtn: "w-full bg-teal-600 text-white py-2.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider shadow-lg shadow-teal-500/20",
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, isTeacher, isExaminer, userName, userProfilePic, userId, logout } = useAuth();
  
  // High-level access check for Admin Link
  const canAccessAdmin = isAdmin || isTeacher || isExaminer;

  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  
  const unreadNotifs = notifications.filter(n => !n.isRead);
  const readNotifs = notifications.filter(n => n.isRead);
  const unreadCount = unreadNotifs.length;

  const navLinks = [
    { name: 'Home', path: '/', icon: 'fa-house' },
    { name: 'Library', path: '/library', icon: 'fa-box-archive' },
    { name: 'Exam', path: '/exam', icon: 'fa-file-signature' },
    { name: 'Community', path: '/community', icon: 'fa-users' },
    { name: 'Research', path: '/research', icon: 'fa-microscope' },
    { name: 'Framework', path: '/framework', icon: 'fa-network-wired' },
    { name: 'About', path: '/about', icon: 'fa-circle-info' },
    { name: 'Donate', path: '/donate', icon: 'fa-hand-holding-heart' }
  ];

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    if (isAuthenticated && userId) {
      requestPushNotificationPermission(userId);
      const unsubscribe = subscribeToUserNotifications(userId, (notifs) => {
        setNotifications(notifs);
      });
      return () => unsubscribe();
    } else {
      setNotifications([]);
    }
  }, [isAuthenticated, userId]);

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
      <header className={styles.header}>
        <div className="w-full px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center">

          <div className="flex items-center justify-start min-w-max lg:w-1/4">
            <Link to="/" className="flex flex-col justify-center items-start select-none">
              <div className={`${styles.logoContainer} hidden xs:flex`}>
                <span className={styles.brandFirst}>Beyond</span>
                <span className={styles.brandMiddle}>The</span>
                <span className={styles.brandLast}>Verse</span>
              </div>
              {/* Mobile-only compact logo */}
              <div className="xs:hidden flex items-baseline gap-0.5">
                <span className="text-[20px] font-black text-slate-900">B</span>
                <span className="text-[14px] font-bold text-slate-400">t</span>
                <span className="text-[18px] font-black text-teal-600">V</span>
              </div>
              <span className={styles.brandTagline}>
                <div className="h-px w-3 bg-teal-500/40"></div> Empowering Education
              </span>
            </Link>
          </div>

          <GlobalSearch />

          <div className="flex items-center justify-end flex-1 lg:w-1/4 gap-2">

            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className={`${styles.actionBtnBase} ${showNotifDropdown ? styles.actionBtnActive : styles.actionBtnInactive}`}
                >
                  <i className="fa-regular fa-bell text-[15px] xl:text-base"></i>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 xl:top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full animate-pulse border border-white"></span>
                  )}
                </button>

                {showNotifDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifDropdown(false)}></div>
                    <div className={styles.notifDropdown}>
                      <div className={styles.notifHeader}>
                        <span className="text-slate-800 text-[13px] uppercase font-bold">Notifications</span>
                        {unreadCount > 0 && <span className="bg-teal-100 text-teal-700 text-[9px] font-bold uppercase px-2 py-1 rounded-md border border-teal-200">{unreadCount} New</span>}
                      </div>

                      <div className="max-h-[350px] overflow-y-auto hide-scrollbar">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-slate-400">
                            <i className="fa-regular fa-bell-slash text-2xl mb-2 opacity-50"></i>
                            <p className="text-[11px] uppercase">Quiet in the verse</p>
                          </div>
                        ) : (
                          <>
                            {unreadNotifs.length > 0 && (
                              <div className="px-4 py-2.5 mt-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600">New</span>
                              </div>
                            )}
                            {unreadNotifs.map(notif => (
                              <div key={notif.id} onClick={() => handleNotificationClick(notif)} className={styles.notifItemUnread}>
                                <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 border bg-white text-teal-600 border-teal-200 shadow-sm">
                                  <i className="fa-solid fa-bolt text-[10px]"></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] truncate text-slate-800 font-medium">{notif.title}</p>
                                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{notif.message}</p>
                                  <p className="text-[9px] text-slate-400 mt-2 uppercase">{formatDateTime(notif.timestamp)}</p>
                                </div>
                                <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></div>
                              </div>
                            ))}

                            {readNotifs.length > 0 && (
                              <div className="px-4 py-2.5 mt-1 border-t border-slate-50 bg-white">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Earlier</span>
                              </div>
                            )}
                            {readNotifs.map(notif => (
                              <div key={notif.id} onClick={() => handleNotificationClick(notif)} className={styles.notifItemRead}>
                                <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 border bg-slate-50 text-slate-400 border-slate-200">
                                  <i className="fa-solid fa-bolt text-[10px]"></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] truncate text-slate-600">{notif.title}</p>
                                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{notif.message}</p>
                                  <p className="text-[9px] text-slate-400 mt-2 uppercase">{formatDateTime(notif.timestamp)}</p>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {isAuthenticated && userName && (
                <>
                  {canAccessAdmin && (
                    <Link 
                      to="/admin" 
                      className={`${styles.actionBtnBase} ${isPathActive('/admin') ? "bg-slate-900 text-white border-slate-900" : styles.actionBtnInactive}`} 
                      title={isAdmin ? "Admin Dashboard" : isTeacher ? "Teacher Tools" : "Examiner Tools"}
                    >
                      <i className={`fa-solid ${isAdmin ? "fa-shield-halved" : isTeacher ? "fa-chalkboard-user" : "fa-file-signature"} text-xs xl:text-sm`}></i>
                    </Link>
                  )}
                  <Link to="/settings" className={`${styles.actionBtnBase} ${isPathActive('/settings') ? styles.actionBtnActive : styles.actionBtnInactive}`} title="Settings">
                    <i className="fa-solid fa-gear text-xs xl:text-sm"></i>
                  </Link>
                  <Link to="/profile" className={`${styles.profileBtnBase} ${isPathActive('/profile') ? styles.profileBtnActive : styles.profileBtnInactive}`} title="Profile">
                    {userProfilePic ? (
                      <img src={userProfilePic} alt="Profile" className={styles.profileImg} />
                    ) : (
                      <div className={`w-full h-full rounded-full flex items-center justify-center text-[11px] xl:text-xs font-bold ${isPathActive('/profile') ? styles.profileFallbackActive : styles.profileFallbackInactive}`}>
                        {userName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Link>
                </>
              )}

              {isAuthenticated ? (
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              ) : (
                <Link to="/login" className={styles.loginBtn}>
                  Join
                </Link>
              )}
            </div>

            <div className="flex xl:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className="h-9 w-9 flex items-center justify-center bg-slate-100 text-slate-700 rounded-lg active:scale-95 transition-transform">
                <i className="fa-solid fa-bars text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.spacer}></div>

      <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>

      <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className={styles.mobileHeader}>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-atom text-teal-600 text-lg"></i>
            <span className="text-slate-800 uppercase font-bold text-sm tracking-tight">Menu</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileCloseBtn}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`${styles.mobileLinkBase} ${isPathActive(link.path) ? styles.mobileLinkActive : styles.mobileLinkInactive}`}>
              <div className="w-5 flex justify-center shrink-0"><i className={`fa-solid ${link.icon} text-base`}></i></div>
              <span className="text-sm font-medium">{link.name}</span>
            </Link>
          ))}

          {canAccessAdmin && (
            <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className={`${styles.mobileLinkBase} mt-2 ${isPathActive('/admin') ? styles.mobileAdminActive : styles.mobileAdminInactive}`}>
              <div className="w-5 flex justify-center shrink-0">
                <i className={`fa-solid ${isAdmin ? "fa-shield-halved" : isTeacher ? "fa-chalkboard-user" : "fa-file-signature"} text-base`}></i>
              </div>
              <span className="text-sm font-bold">{isAdmin ? "Admin Dashboard" : isTeacher ? "Teacher Tools" : "Examiner Tools"}</span>
            </Link>
          )}
        </nav>

        <div className={styles.mobileBottomContainer}>
          {isAuthenticated && (
            <div className={`p-2 rounded-xl border flex items-center justify-between transition-colors ${isPathActive('/profile') || isPathActive('/settings') ? styles.mobileProfileCardActive : styles.mobileProfileCardInactive}`}>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 flex-1 overflow-hidden px-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 border overflow-hidden ${isPathActive('/profile') ? styles.mobileProfileImgActive : styles.mobileProfileImgInactive}`}>
                  {userProfilePic ? (
                    <img src={userProfilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    userName?.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="overflow-hidden flex-1">
                  <p className={`text-[9px] uppercase ${isPathActive('/profile') ? 'text-teal-600' : 'text-slate-400'}`}>Profile</p>
                  <p className="text-[13px] text-slate-800 truncate font-medium">{userName}</p>
                </div>
              </Link>
              <div className="flex items-center gap-1 border-l border-slate-100 pl-1">
                <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${isPathActive('/settings') ? styles.mobileSettingsBtnActive : styles.mobileSettingsBtnInactive}`}>
                  <i className="fa-solid fa-gear text-sm"></i>
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {isAuthenticated ? (
              <button onClick={handleLogout} className={styles.mobileLogoutBtn}>
                Sign Out
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileLoginBtn}>
                Join Workspace
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}