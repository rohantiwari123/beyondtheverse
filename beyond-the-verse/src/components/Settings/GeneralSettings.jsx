import React, { useState } from 'react';
import { updateUserProfileName } from '../../services/firebaseServices';
import { useAuth } from '../../context/AuthContext';

export default function GeneralSettings({ showToast }) {
  const { userName, userEmail } = useAuth();
  const [name, setName] = useState(userName || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim() || name === userName) return;
    
    setIsSaving(true);
    try {
      await updateUserProfileName(name.trim());
      if (showToast) showToast("Profile updated successfully!");
      // Optional: Refresh to reflect new name in header instantly
      setTimeout(() => window.location.reload(), 1500); 
    } catch (error) {
      if (showToast) showToast("Failed to update profile.", false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4 sm:mb-6 px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl text-slate-800">General Settings</h2>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Manage your public info</p>
      </div>

      <div className="bg-white border-y sm:border border-slate-200 sm:rounded-2xl p-5 sm:p-8">
        <form onSubmit={handleSave} className="max-w-xl space-y-5">
          {/* Read-only Email */}
          <div>
            <label className="block text-[10px] sm:text-xs text-slate-400 mb-2">Email Address (Read Only)</label>
            <input 
              type="email" 
              value={userEmail || ''} 
              disabled 
              className="w-full bg-slate-50 border border-slate-200 text-slate-500 rounded-lg py-2.5 px-4 text-sm cursor-not-allowed"
            />
            <p className="text-[10px] sm:text-xs text-slate-400 mt-1.5">To change your email, please contact administration.</p>
          </div>

          {/* Editable Name */}
          <div>
            <label className="block text-[10px] sm:text-xs text-slate-500 mb-2">Display Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your full name"
              className="w-full border border-slate-300 bg-white rounded-lg py-2.5 px-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-slate-800"
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isSaving || name === userName || !name.trim()}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white px-8 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}