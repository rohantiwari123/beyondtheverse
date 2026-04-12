import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { deleteUserAccount } from '../../services/firebaseServices';

export default function DangerZone() {
    const { userId, logout } = useAuth();
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleDeleteAccount = async () => {
        setIsLoading(true);
        setErrorMsg("");

        try {
            await deleteUserAccount(userId);
            // Agar delete successful ho gaya, toh context se logout call kar do
            await logout();
        } catch (error) {
            // Firebase Security: sensitive operations require recent login
            if (error.code === 'auth/requires-recent-login') {
                setErrorMsg("Security Protocol: Please log out and log in again to delete your account.");
            } else {
                setErrorMsg("Failed to delete account. Contact Admin.");
            }
            setShowConfirm(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-rose-200 p-6 sm:p-8 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-rose-500 blur-3xl opacity-10"></div>

            <h2 className="text-lg font-bold text-rose-600 mb-1 flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation"></i> Danger Zone
            </h2>
            <p className="text-sm text-slate-500 mb-6">Irreversible and destructive actions for your account.</p>

            {errorMsg && (
                <div className="p-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2 bg-rose-50 text-rose-700 border border-rose-100">
                    <i className="fa-solid fa-shield-halved"></i>
                    {errorMsg}
                </div>
            )}

            <div className="border border-rose-100 rounded-xl p-4 sm:p-5 bg-rose-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h4 className="text-sm font-bold text-slate-800">Delete Account</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 max-w-sm">
                        Once you delete your account, there is no going back. All your data will be permanently wiped.
                    </p>
                </div>
                
                {!showConfirm ? (
                    <button 
                        onClick={() => setShowConfirm(true)}
                        className="px-5 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap"
                    >
                        Delete Account
                    </button>
                ) : (
                    <div className="flex items-center gap-2 animate-fade-in">
                        <button 
                            onClick={() => setShowConfirm(false)}
                            disabled={isLoading}
                            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleDeleteAccount}
                            disabled={isLoading}
                            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-rose-500/20 w-[110px] flex justify-center"
                        >
                            {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Yes, Delete'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}