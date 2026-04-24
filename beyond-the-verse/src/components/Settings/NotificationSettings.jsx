import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserPreferences, updateUserPreferences } from '../../services/firebaseServices';

export default function NotificationSettings() {
    const { userId } = useAuth();
    
    const [preferences, setPreferences] = useState({
        pushMentions: true,
        emailDigest: false,
        newFeatures: true
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    // 🌟 Real-time data loading from Firebase
    useEffect(() => {
        const loadPreferences = async () => {
            if (!userId) return;
            const savedPrefs = await getUserPreferences(userId);
            if (savedPrefs) setPreferences(savedPrefs);
            setIsFetching(false);
        };
        loadPreferences();
    }, [userId]);

    const handleToggle = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        setMessage({ type: '', text: '' });
        
        try {
            await updateUserPreferences(userId, preferences); // 🌟 Saving to Real DB
            setMessage({ type: 'success', text: 'Notification preferences saved! 🔔' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save preferences.' });
        } finally {
            setIsLoading(false);
        }
    };

    const ToggleSwitch = ({ label, description, isChecked, onToggle }) => (
        <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
            <div className="pr-4">
                <h4 className="text-sm font-bold text-slate-800">{label}</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1">{description}</p>
            </div>
            <button 
                onClick={onToggle}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isChecked ? 'bg-teal-500' : 'bg-slate-200'}`}
            >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white ring-0 transition duration-200 ease-in-out ${isChecked ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
    );

    if (isFetching) return <div className="p-8 text-center text-slate-400 animate-pulse">Loading preferences...</div>;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-8 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Notification Preferences</h2>
            <p className="text-sm text-slate-500 mb-6">Choose what updates you want to hear about in the Verse.</p>

            {message.text && (
                <div className={`p-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2 ${message.type === 'success' ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                    <i className={`fa-solid ${message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
                    {message.text}
                </div>
            )}

            <div className="space-y-1 mb-6">
                <ToggleSwitch 
                    label="Push Notifications" 
                    description="Get notified instantly when someone replies or reacts to your thoughts."
                    isChecked={preferences.pushMentions}
                    onToggle={() => handleToggle('pushMentions')}
                />
                <ToggleSwitch 
                    label="Weekly Email Digest" 
                    description="A weekly summary of top posts, exams, and community highlights."
                    isChecked={preferences.emailDigest}
                    onToggle={() => handleToggle('emailDigest')}
                />
                <ToggleSwitch 
                    label="Platform Updates" 
                    description="Announcements about new features and updates to Beyond the Verse."
                    isChecked={preferences.newFeatures}
                    onToggle={() => handleToggle('newFeatures')}
                />
            </div>

            <button 
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 min-w-[140px]"
            >
                {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Save Preferences'}
            </button>
        </div>
    );
}