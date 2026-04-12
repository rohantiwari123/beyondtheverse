import React, { useState } from 'react';
import { updateUserSecurityPassword } from '../../services/firebaseServices';

export default function SecuritySettings() {
    const [passwords, setPasswords] = useState({ new: '', confirm: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (passwords.new.length < 6) {
            return setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
        }
        if (passwords.new !== passwords.confirm) {
            return setMessage({ type: 'error', text: 'New passwords do not match!' });
        }

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await updateUserSecurityPassword(passwords.new);
            setMessage({ type: 'success', text: 'Password updated successfully! 🔒' });
            setPasswords({ new: '', confirm: '' }); // Form clear kar do
        } catch (error) {
            // Firebase tabhi allow karta hai jab user ne haal hi mein login kiya ho
            if (error.code === 'auth/requires-recent-login') {
                setMessage({ type: 'error', text: 'Please log out and log in again to change your password.' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update password. Please try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Security & Password</h2>
            <p className="text-sm text-slate-500 mb-6">Ensure your account is using a long, random password to stay secure.</p>

            {message.text && (
                <div className={`p-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2 ${message.type === 'success' ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                    <i className={`fa-solid ${message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-5 max-w-md">
                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fa-solid fa-lock text-slate-400"></i>
                        </div>
                        <input
                            type="password"
                            value={passwords.new}
                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                            required
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none"
                            placeholder="Enter new password"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Confirm New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fa-solid fa-check-double text-slate-400"></i>
                        </div>
                        <input
                            type="password"
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                            required
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none"
                            placeholder="Confirm your password"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={isLoading || !passwords.new || !passwords.confirm}
                        className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 min-w-[160px]"
                    >
                        {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Update Password'}
                    </button>
                </div>
            </form>
        </div>
    );
}