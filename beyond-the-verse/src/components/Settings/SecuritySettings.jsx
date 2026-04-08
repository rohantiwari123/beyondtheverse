import React, { useState } from 'react';
import { updateUserSecurityPassword } from '../../services/firebaseServices';

export default function SecuritySettings({ showToast }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      if (showToast) showToast("Password must be at least 6 characters.", false);
      return;
    }
    if (newPassword !== confirmPassword) {
      if (showToast) showToast("Passwords do not match.", false);
      return;
    }
    
    setIsSaving(true);
    try {
      await updateUserSecurityPassword(newPassword);
      if (showToast) showToast("Password updated successfully!");
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      // Note: Firebase requires recent login to change password.
      if (error.code === 'auth/requires-recent-login') {
        if (showToast) showToast("Please log out and log in again to change password.", false);
      } else {
        if (showToast) showToast("Failed to update password.", false);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4 sm:mb-6 px-4 sm:px-0">
        <h2 className="text-xl sm:text-2xl text-slate-800">Security</h2>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-1">Keep your account safe</p>
      </div>

      <div className="bg-white border-y sm:border border-slate-200 sm:rounded-2xl p-5 sm:p-8">
        <form onSubmit={handleSave} className="max-w-xl space-y-5">
          <div>
            <label className="block text-[10px] sm:text-xs text-slate-500 mb-2">New Password</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder="Enter new password"
              className="w-full border border-slate-300 bg-white rounded-lg py-2.5 px-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs text-slate-500 mb-2">Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Confirm new password"
              className="w-full border border-slate-300 bg-white rounded-lg py-2.5 px-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-slate-800"
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isSaving || !newPassword || !confirmPassword}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? <><i className="fa-solid fa-spinner fa-spin"></i> Updating...</> : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}