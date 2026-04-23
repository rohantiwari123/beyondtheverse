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
    } catch (error) {
      alert("Failed to save settings.");
    }
    setIsSaving(false);
  };

  return (
    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 w-full mt-6 animate-fade-in-up">
      <h2 className="text-xl font-bold mb-5 text-slate-800 flex items-center gap-2">
        <i className="fa-solid fa-shield-halved text-teal-500"></i> Profile Visibility
      </h2>
      
      <div className="space-y-3">
        {[
          { key: 'showEmail', label: 'Show Email Address' },
          { key: 'showBio', label: 'Show Bio' },
          { key: 'showLocation', label: 'Show Location' },
          { key: 'showSocials', label: 'Show Social Links' }
        ].map(({ key, label }) => (
          <div key={key} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <button onClick={() => handleToggle(key)} className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${privacy[key] ? 'bg-teal-500' : 'bg-slate-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${privacy[key] ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>
        ))}
      </div>

      <button onClick={saveSettings} disabled={isSaving} className="mt-5 w-full bg-slate-900 text-white font-medium text-sm px-4 py-3 rounded-xl transition-all active:scale-95 hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2">
        {isSaving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-check"></i>}
        {isSaving ? "Saving..." : "Save Preferences"}
      </button>
    </div>
  );
}