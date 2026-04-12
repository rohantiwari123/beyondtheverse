import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ProfileHeader() {
    const { userName, isAdmin, currentUser } = useAuth();
    const initial = userName?.charAt(0).toUpperCase() || '?';

    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 animate-fade-in relative overflow-hidden shadow-sm">
            {/* Decorative background blur */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

            {/* Avatar */}
            <div className={`h-24 w-24 sm:h-28 sm:w-28 rounded-full flex items-center justify-center text-4xl sm:text-5xl font-black shrink-0 relative z-10 shadow-sm border-4 border-white ${isAdmin ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-amber-500/30' : 'bg-slate-900 text-white'}`}>
                {initial}
                {isAdmin && (
                    <div className="absolute -bottom-1 -right-1 text-amber-500 bg-white rounded-full h-8 w-8 flex items-center justify-center border-[3px] border-white shadow-sm">
                        <i className="fa-solid fa-crown text-sm"></i>
                    </div>
                )}
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left z-10 flex-1">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                    {userName}
                    {isAdmin && <span className="bg-amber-100 text-amber-700 text-[10px] uppercase px-2 py-0.5 rounded-md border border-amber-200 tracking-wider">Admin</span>}
                </h1>
                <p className="text-slate-500 text-sm mt-1">{currentUser?.email}</p>

                <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                        <i className="fa-solid fa-rocket text-teal-500"></i> Explorer of the Verse
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                        <i className="fa-solid fa-shield-check text-emerald-500"></i> Verified
                    </span>
                </div>
            </div>
        </div>
    );
}