import React from 'react';

export default function ProfileActions({ isAdmin, onNavigate, onLogout }) {
    const styles = {
        grid: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-6 sm:mt-8",
        actionCard: "p-5 sm:p-6 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition-colors flex flex-col items-start gap-4 cursor-pointer group",
        cardIcon: "w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:scale-105 transition-transform",
        cardTitle: "text-base font-bold text-slate-900",
        cardDesc: "text-xs sm:text-sm text-slate-500 font-medium leading-relaxed",
        dangerZone: "mt-8 sm:mt-12 p-6 sm:p-8 bg-rose-50 border border-rose-100 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6",
    };

    return (
        <>
            <div className={styles.grid}>
                <div onClick={() => onNavigate('/settings')} className={styles.actionCard}>
                    <div className={styles.cardIcon}><i className="fa-solid fa-gear"></i></div>
                    <div>
                        <h3 className={styles.cardTitle}>Account Settings</h3>
                        <p className={styles.cardDesc}>Update your name, manage your email, and change your password.</p>
                    </div>
                </div>

                <div onClick={() => onNavigate('/library')} className={styles.actionCard}>
                    <div className={styles.cardIcon}><i className="fa-solid fa-bookmark"></i></div>
                    <div>
                        <h3 className={styles.cardTitle}>My Vault</h3>
                        <p className={styles.cardDesc}>Access your bookmarked thoughts, saved PDFs, and reading history.</p>
                    </div>
                </div>

                {isAdmin && (
                    <div onClick={() => onNavigate('/admin')} className={`${styles.actionCard} border-teal-200 bg-teal-50/30`}>
                        <div className={`${styles.cardIcon} bg-white border-teal-200 text-teal-700`}><i className="fa-solid fa-chart-line"></i></div>
                        <div>
                            <h3 className={styles.cardTitle}>Admin Dashboard</h3>
                            <p className={styles.cardDesc}>Manage community posts, exams, and platform analytics.</p>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.dangerZone}>
                <div>
                    <h3 className="text-lg font-bold text-rose-900">Sign Out</h3>
                    <p className="text-sm text-rose-700/70 font-medium mt-1">Ready to step out of the verse? You can always return.</p>
                </div>
                <button 
                    onClick={onLogout} 
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2.5"
                >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Logout
                </button>
            </div>
        </>
    );
}