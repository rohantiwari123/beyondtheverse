import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateUserPrivacySettings, getUserProfile } from '../../services/firebaseServices';

export default function PrivacySettings() {
  const { userId } = useAuth();
  const [privacy, setPrivacy] = useState({
    showEmail: false,
    showBio: true,
    showLocation: true,
    showSocials: true
  });
  const [isSaving, setIsSaving] = useState(false);

  // Database se current settings load karna
  useEffect(() => {
    if (!userId) return;
    getUserProfile(userId).then(profile => {
      if (profile?.privacySettings) {
        setPrivacy(profile.privacySettings);
      }
    });
  }, [userId]);

  const handleToggle = (key) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      await updateUserPrivacySettings(userId, privacy);
      alert("Privacy visibility updated! 🔒");
    } catch (err) {
      alert("Failed to save settings.");
    }
    setIsSaving(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-8 animate-fade-in">
      <h2 className="text-lg font-bold text-slate-900 mb-1">Profile Visibility</h2>
      <p className="text-sm text-slate-500 mb-6">Control what information is visible to others on your public profile.</p>
      
      <div className="space-y-3">
        {[
          { key: 'showEmail', label: 'Show Email Address' },
          { key: 'showBio', label: 'Show Bio' },
          { key: 'showLocation', label: 'Show Location' },
          { key: 'showSocials', label: 'Show Social Links' }
        ].map(({ key, label }) => (
          <div key={key} className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 transition-colors hover:bg-slate-50">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <button onClick={() => handleToggle(key)} className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors focus:outline-none ${privacy[key] ? 'bg-teal-500' : 'bg-slate-200'}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${privacy[key] ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>
        ))}
      </div>

      <button onClick={saveSettings} disabled={isSaving} className="mt-6 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 min-w-[160px] disabled:opacity-50">
        {isSaving ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-check"></i>}
        {isSaving ? "Saving..." : "Save Preferences"}
      </button>
    </div>
  );
}