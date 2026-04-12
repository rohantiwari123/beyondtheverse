import React from 'react';

export default function ProfileHeader({ user, isAdmin, onEditProfile }) {
    const styles = {
        // Banner with a cosmic/verse premium gradient
        banner: "w-full h-36 sm:h-52 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-t-3xl relative overflow-hidden",
        // Decorative glowing orbs in the banner
        orb1: "absolute top-0 right-10 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl",
        orb2: "absolute -bottom-10 left-20 w-40 h-40 bg-slate-400/10 rounded-full blur-3xl",
        
        avatarContainer: "absolute -bottom-14 sm:-bottom-20 left-6 sm:left-10 w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-full p-1.5 sm:p-2 shadow-lg shadow-slate-900/5 z-10",
        avatar: "w-full h-full bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-4xl sm:text-5xl text-slate-300 overflow-hidden relative group",
        
        infoSection: "pt-16 sm:pt-24 pb-8 px-6 sm:px-10 bg-white border-x border-b border-slate-200 rounded-b-3xl flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-0",
        name: "text-2xl sm:text-3xl font-black text-slate-900 tracking-tight",
        email: "text-sm sm:text-base text-slate-500 font-medium mt-0.5",
        
        badgeRow: "flex flex-wrap items-center gap-2 mt-4",
        badgeRole: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest ${isAdmin ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`,
        badgeDate: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-white border border-slate-200 text-slate-400",
    };

    return (
        <div className="relative hover-trigger">
            <div className={styles.banner}>
                <div className={styles.orb1}></div>
                <div className={styles.orb2}></div>
            </div>

            <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                        <i className="fa-solid fa-user-astronaut"></i> // Space/Verse theme icon
                    )}
                </div>
            </div>

            <div className={styles.infoSection}>
                <div>
                    <h1 className={styles.name}>{user?.displayName || "Seeker of Truth"}</h1>
                    <p className={styles.email}>{user?.email}</p>
                    
                    <div className={styles.badgeRow}>
                        <span className={styles.badgeRole}>
                            <i className={`fa-solid ${isAdmin ? 'fa-shield-halved' : 'fa-compass'} text-[10px]`}></i>
                            {isAdmin ? "Admin" : "Explorer"}
                        </span>
                        <span className={styles.badgeDate}>
                            <i className="fa-regular fa-calendar text-[10px]"></i>
                            Joined 2026
                        </span>
                    </div>
                </div>

                <button onClick={onEditProfile} className="h-10 px-5 sm:px-6 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-[13px] font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2.5 shrink-0 shadow-sm">
                    <i className="fa-solid fa-pen text-[11px] text-slate-400"></i>
                    Edit Profile
                </button>
            </div>
        </div>
    );
}