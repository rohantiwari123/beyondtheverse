import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// Components
import GeneralSettings from '../../components/Settings/GeneralSettings';
import SecuritySettings from '../../components/Settings/SecuritySettings';
import NotificationSettings from '../../components/Settings/NotificationSettings'; 
import DangerZone from '../../components/Settings/DangerZone'; 
import BackButton from '../../components/common/BackButton';
import PrivacySettings from '../../components/Settings/PrivacySettings';

export default function SettingsPage() {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('general');

    if (!currentUser) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-600"></i>
            </div>
        );
    }

    return (
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
                <div>
                    <div className="mb-4"><BackButton to={-1} label="Back" /></div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Account Settings</h1>
                    <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">Manage your identity, security, and preferences.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                
                {/* 🌟 SETTINGS NAVIGATION (Sidebar on Desktop, Horizontal on Mobile) */}
                <div className="w-full md:w-64 shrink-0 overflow-x-auto md:overflow-visible hide-scrollbar pb-3 md:pb-0 border-b md:border-b-0 border-slate-200">
                    <nav className="flex flex-row md:flex-col items-center md:items-stretch gap-2 min-w-max md:min-w-0">
                        <button 
                            onClick={() => setActiveTab('general')}
                            className={`flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap md:whitespace-normal ${activeTab === 'general' ? 'bg-teal-50 text-teal-700 border border-teal-100 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'}`}
                        >
                            <i className="fa-solid fa-user-gear md:w-5 text-center"></i> General Profile
                        </button>

                        <button 
                            onClick={() => setActiveTab('privacy')}
                            className={`flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap md:whitespace-normal ${activeTab === 'privacy' ? 'bg-teal-50 text-teal-700 border border-teal-100 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'}`}
                        >
                            <i className="fa-solid fa-shield-halved md:w-5 text-center"></i> Privacy
                        </button>
                        
                        <button 
                            onClick={() => setActiveTab('security')}
                            className={`flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap md:whitespace-normal ${activeTab === 'security' ? 'bg-teal-50 text-teal-700 border border-teal-100 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'}`}
                        >
                            <i className="fa-solid fa-lock md:w-5 text-center"></i> Security
                        </button>

                        <button 
                            onClick={() => setActiveTab('notifications')}
                            className={`flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap md:whitespace-normal ${activeTab === 'notifications' ? 'bg-teal-50 text-teal-700 border border-teal-100 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'}`}
                        >
                            <i className="fa-solid fa-bell md:w-5 text-center"></i> Notifications
                        </button>

                        {/* Divider Line (Desktop only) */}
                        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block md:hidden"></div>
                        <div className="h-px w-full bg-slate-200 my-2 hidden md:block"></div>

                        <button 
                            onClick={() => setActiveTab('danger')}
                            className={`flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap md:whitespace-normal ${activeTab === 'danger' ? 'bg-rose-50 text-rose-700 border border-rose-100 shadow-sm' : 'text-rose-500 hover:bg-rose-50 hover:text-rose-600 border border-transparent'}`}
                        >
                            <i className="fa-solid fa-triangle-exclamation md:w-5 text-center"></i> Danger Zone
                        </button>
                    </nav>
                </div>

                {/* 🌟 DYNAMIC CONTENT AREA */}
                <main className="flex-1 w-full max-w-none md:max-w-4xl">
                    {activeTab === 'general' && <GeneralSettings />}
                    {activeTab === 'privacy' && <PrivacySettings />}
                    {activeTab === 'security' && <SecuritySettings />}
                    {activeTab === 'notifications' && <NotificationSettings />}
                    {activeTab === 'danger' && <DangerZone />}
                </main>

            </div>
        </section>
    );
}