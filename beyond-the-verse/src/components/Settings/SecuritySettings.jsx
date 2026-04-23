import React, { useState } from 'react';
import { updateUserSecurityPassword } from '../../services/firebaseServices';

export default function SecuritySettings() {
    const [passwords, setPasswords] = useState({ new: '', confirm: '' });
    const [showPassword, setShowPassword] = useState(false); // 🌟 Eye icon toggle
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // 🌟 1. DYNAMIC PASSWORD RULES
    const passRules = {
        length: passwords.new.length >= 8,
        uppercase: /[A-Z]/.test(passwords.new),
        lowercase: /[a-z]/.test(passwords.new),
        number: /[0-9]/.test(passwords.new),
        special: /[!@#$%^&*]/.test(passwords.new),
    };
    const isPasswordValid = Object.values(passRules).every(Boolean);

    // 🌟 2. LIVE ERROR GENERATOR
    let livePasswordError = '';
    if (passwords.new.length > 0 && !isPasswordValid) {
        if (!passRules.length) livePasswordError = "Password is too short (min 8 chars).";
        else if (!passRules.uppercase) livePasswordError = "Missing uppercase letter (A-Z).";
        else if (!passRules.lowercase) livePasswordError = "Missing lowercase letter (a-z).";
        else if (!passRules.number) livePasswordError = "Missing number (0-9).";
        else if (!passRules.special) livePasswordError = "Missing special character (!@#$...).";
    }

    // 🌟 3. CONFIRM PASSWORD MATCHER
    const isConfirming = passwords.confirm.length > 0;
    const passwordsMatch = passwords.new === passwords.confirm;
    const confirmError = isConfirming && !passwordsMatch ? "Passwords do not match." : "";

    const handleSave = async (e) => {
        e.preventDefault();
        
        // Extra backend safety check
        if (!isPasswordValid) return setMessage({ type: 'error', text: 'Please fulfill all password requirements.' });
        if (!passwordsMatch) return setMessage({ type: 'error', text: 'New passwords do not match!' });

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await updateUserSecurityPassword(passwords.new);
            setMessage({ type: 'success', text: 'Password updated successfully! 🔒' });
            setPasswords({ new: '', confirm: '' }); // Form clear
            setShowPassword(false);
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                setMessage({ type: 'error', text: 'Please log out and log in again to change your password.' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update password. Please try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Rule Indicator Component
    const RuleItem = ({ met, text }) => (
        <div className="flex items-center gap-1.5">
            <i className={`fa-solid ${met ? 'fa-circle-check text-teal-500' : 'fa-circle text-slate-200'} text-[11px] transition-colors duration-200`}></i>
            <span className={`text-[11px] ${met ? 'text-slate-800' : 'text-slate-500'} transition-colors duration-200 whitespace-nowrap`}>
                {text}
            </span>
        </div>
    );

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Security & Password</h2>
            <p className="text-sm text-slate-500 mb-6">Ensure your account is using a strong, random password to stay secure.</p>

            {message.text && (
                <div className={`p-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2 ${message.type === 'success' ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                    <i className={`fa-solid ${message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-6 max-w-md">
                
                {/* 🌟 NEW PASSWORD FIELD WITH LIVE ERRORS */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className={`fa-solid fa-lock ${livePasswordError ? 'text-rose-400' : 'text-slate-400'}`}></i>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={passwords.new}
                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                            required
                            className={`w-full pl-11 pr-10 py-3 bg-white border rounded-xl text-sm text-slate-900 font-medium transition-all outline-none ${
                                livePasswordError 
                                ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/30' 
                                : 'border-slate-200 focus:border-teal-500'
                            }`}
                            placeholder="Enter new password"
                        />
                        {/* Eye Button & Success Tick */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {passwords.new.length > 0 && isPasswordValid && (
                                <i className="fa-solid fa-circle-check text-emerald-500 text-sm animate-fade-in-up mr-1"></i>
                            )}
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600 p-1">
                                <i className={`fa-solid text-sm ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>
                    
                    {/* Live Error Text */}
                    {livePasswordError && (
                        <span className="text-[10px] sm:text-[11px] text-rose-500 font-bold mt-1.5 ml-1 flex items-center gap-1.5 animate-fade-in-up">
                            <i className="fa-solid fa-triangle-exclamation"></i> {livePasswordError}
                        </span>
                    )}

                    {/* Live Rules Box */}
                    <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1.5">
                            <RuleItem met={passRules.length} text="8+ characters" />
                            <RuleItem met={passRules.uppercase} text="Uppercase (A-Z)" />
                            <RuleItem met={passRules.lowercase} text="Lowercase (a-z)" />
                            <RuleItem met={passRules.number} text="Number (0-9)" />
                            <RuleItem met={passRules.special} text="Special (!@#$)" />
                        </div>
                    </div>
                </div>

                {/* 🌟 CONFIRM PASSWORD FIELD */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Confirm New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className={`fa-solid fa-check-double ${confirmError ? 'text-rose-400' : 'text-slate-400'}`}></i>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                            required
                            className={`w-full pl-11 pr-10 py-3 bg-white border rounded-xl text-sm text-slate-900 font-medium transition-all outline-none ${
                                confirmError 
                                ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/30' 
                                : 'border-slate-200 focus:border-teal-500'
                            }`}
                            placeholder="Confirm your password"
                        />
                        {/* Success Tick for Confirm */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                            {isConfirming && passwordsMatch && (
                                <i className="fa-solid fa-circle-check text-emerald-500 text-sm animate-fade-in-up mr-1"></i>
                            )}
                        </div>
                    </div>
                    {/* Confirm Match Error */}
                    {confirmError && (
                        <span className="text-[10px] sm:text-[11px] text-rose-500 font-bold mt-1.5 ml-1 flex items-center gap-1.5 animate-fade-in-up">
                            <i className="fa-solid fa-triangle-exclamation"></i> {confirmError}
                        </span>
                    )}
                </div>

                <div className="pt-2">
                    <button 
                        type="submit" 
                        // 🌟 BUTTON TAB TAK DISABLED RAHEGA JAB TAK SAB THEEK NA HO
                        disabled={isLoading || !isPasswordValid || !passwordsMatch || !isConfirming}
                        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 min-w-[160px]"
                    >
                        {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Update Password'}
                    </button>
                </div>
            </form>
        </div>
    );
}