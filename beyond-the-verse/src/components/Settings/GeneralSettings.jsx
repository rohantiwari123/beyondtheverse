import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from '../../firebase';

// 🌟 Ek hi baar saare services import kiye hain (Cleaned)
import { 
    updateUserProfileName, 
    updateUserUsername, 
    getUserProfile, 
    syncUserDataAcrossPosts 
} from '../../services/firebaseServices';

export default function GeneralSettings() {
    const { currentUser, userName, login, userUsername, userId } = useAuth();
    
    // Form States
    const [name, setName] = useState(userName || '');
    const [username, setUsername] = useState(userUsername || '');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    // 🌟 Edit Mode States
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);

    // 🌟 Lock Timestamps from DB
    const [lastUpdated, setLastUpdated] = useState({ name: 0, username: 0 });

    // 1. Fetch timestamps on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            const profile = await getUserProfile(userId);
            if (profile) {
                setLastUpdated({
                    name: profile.lastEditedName || 0,
                    username: profile.lastEditedUsername || 0
                });
            }
        };
        fetchUserData();
    }, [userId]);

    // 🌟 Lock Logic: (30 days = 2592000000 ms)
    const checkLockStatus = (timestamp) => {
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        const now = Date.now();
        const diff = now - timestamp;
        const isLocked = diff < thirtyDaysInMs;
        const daysRemaining = Math.ceil((thirtyDaysInMs - diff) / (24 * 60 * 60 * 1000));
        return { isLocked, daysRemaining };
    };

    const nameStatus = checkLockStatus(lastUpdated.name);
    const userStatus = checkLockStatus(lastUpdated.username);

    // 🌟 Username validation states
    const [liveUsernameError, setLiveUsernameError] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

    const userRules = {
        length: username.length >= 6 && username.length <= 20,
        format: /^[a-z0-9_]+$/.test(username), 
        hasNumber: /[0-9]/.test(username), 
        hasUnderscore: /_/.test(username), 
    };
    const isUsernameFormatValid = username.length > 0 && Object.values(userRules).every(Boolean);

    // 🌟 LIVE USERNAME VALIDATOR
    useEffect(() => {
        if (!isEditingUsername || username === userUsername) {
            setLiveUsernameError('');
            setIsCheckingUsername(false);
            setIsUsernameAvailable(true);
            return;
        }

        if (username.trim() === '') {
            setLiveUsernameError('Username cannot be empty.');
            setIsUsernameAvailable(false);
            return;
        }

        // IMMEDIATE ERRORS
        let errorFound = '';
        if (!/^[a-z0-9_]+$/.test(username)) errorFound = "Only letters, numbers, and underscores allowed.";
        else if (username.length < 6) errorFound = "Too short (min 6 chars).";
        else if (username.length > 20) errorFound = "Too long (max 20 chars).";
        else if (!/[0-9]/.test(username)) errorFound = "Must contain at least 1 number.";
        else if (!/_/.test(username)) errorFound = "Must contain at least 1 underscore.";

        if (errorFound) {
            setLiveUsernameError(errorFound);
            setIsUsernameAvailable(false);
            return;
        }

        // DB Check
        setLiveUsernameError('');
        setIsCheckingUsername(true);
        setIsUsernameAvailable(null);

        const timeoutId = setTimeout(async () => {
            try {
                const q = query(collection(db, 'users'), where('username', '==', username));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    setIsUsernameAvailable(true); 
                } else {
                    setIsUsernameAvailable(false); 
                    setLiveUsernameError("Oops! Username already taken.");
                }
            } catch (error) { console.error(error); } finally { setIsCheckingUsername(false); }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [username, isEditingUsername, userUsername]);

    const handleSave = async (e) => {
        e.preventDefault();
        
        // Agar kuch change nahi hua toh return kardo
        if (name.trim() === userName && username === userUsername) return; 
        
        // Strict Error block
        if (username !== userUsername && (!isUsernameFormatValid || !isUsernameAvailable || liveUsernameError)) {
            return setMessage({ type: 'error', text: 'Please fix username errors before saving.' });
        }
        
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            let isNameChanged = false;
            let isUsernameChanged = false;

            // Update Name
            if (isEditingName && name.trim() !== userName) {
                await updateUserProfileName(name.trim());
                setLastUpdated(prev => ({ ...prev, name: Date.now() }));
                setIsEditingName(false);
                isNameChanged = true;
            }
            
            // Update Username
            if (isEditingUsername && username !== userUsername) {
                await updateUserUsername(username);
                setLastUpdated(prev => ({ ...prev, username: Date.now() }));
                setIsEditingUsername(false);
                isUsernameChanged = true;
            }
            
            // 🌟 THE MAGIC: Master Sync for old posts & comments!
            if (isNameChanged || isUsernameChanged) {
                await syncUserDataAcrossPosts(userId, name.trim(), username);
            }
            
            // UI Update via Context
            login(currentUser?.role || 'client', name.trim(), username); 
            setMessage({ type: 'success', text: 'Profile updated! All old posts synced. Locked for 30 days. ✨' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to update profile. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const RuleItem = ({ met, text }) => (
        <div className="flex items-center gap-1.5">
            <i className={`fa-solid ${met ? 'fa-circle-check text-teal-500' : 'fa-circle text-slate-200'} text-[10px]`}></i>
            <span className={`text-[10px] ${met ? 'text-slate-800' : 'text-slate-500'} whitespace-nowrap`}>{text}</span>
        </div>
    );

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900 mb-1">General Information</h2>
            <p className="text-sm text-slate-500 mb-6">Names and Usernames can only be changed once every 30 days.</p>

            {message.text && (
                <div className={`p-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2 ${message.type === 'success' ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                    <i className={`fa-solid ${message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-6 max-w-md">
                
                {/* 🌟 DISPLAY NAME SECTION */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Display Name</label>
                        {!isEditingName && (
                            <button 
                                type="button" 
                                disabled={nameStatus.isLocked}
                                onClick={() => setIsEditingName(true)}
                                className={`text-xs font-bold flex items-center gap-1.5 ${nameStatus.isLocked ? 'text-slate-300 cursor-not-allowed' : 'text-teal-600 hover:text-teal-700'}`}
                            >
                                <i className={`fa-solid ${nameStatus.isLocked ? 'fa-lock' : 'fa-pen-to-square'}`}></i> 
                                {nameStatus.isLocked ? `Locked` : 'Edit'}
                            </button>
                        )}
                    </div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditingName}
                        className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all outline-none ${isEditingName ? 'bg-white border-teal-500 ring-2 ring-teal-500/10' : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'}`}
                    />
                    {nameStatus.isLocked && (
                        <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-1">
                            <i className="fa-solid fa-clock"></i> Next change in {nameStatus.daysRemaining} days
                        </p>
                    )}
                </div>

                {/* 🌟 SMART USERNAME SECTION */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Username</label>
                        {!isEditingUsername && (
                            <button 
                                type="button" 
                                disabled={userStatus.isLocked}
                                onClick={() => setIsEditingUsername(true)}
                                className={`text-xs font-bold flex items-center gap-1.5 ${userStatus.isLocked ? 'text-slate-300 cursor-not-allowed' : 'text-teal-600 hover:text-teal-700'}`}
                            >
                                <i className={`fa-solid ${userStatus.isLocked ? 'fa-lock' : 'fa-pen-to-square'}`}></i> 
                                {userStatus.isLocked ? `Locked` : 'Edit'}
                            </button>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                            disabled={!isEditingUsername}
                            className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all outline-none ${isEditingUsername ? (liveUsernameError ? 'border-rose-400 bg-rose-50/10' : 'border-teal-500 ring-2 ring-teal-500/10') : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'}`}
                        />
                        {isEditingUsername && isCheckingUsername && <i className="fa-solid fa-spinner fa-spin absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>}
                        {isEditingUsername && !isCheckingUsername && username !== userUsername && isUsernameAvailable === true && <i className="fa-solid fa-circle-check absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 text-sm"></i>}
                    </div>

                    {userStatus.isLocked && (
                        <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-1">
                            <i className="fa-solid fa-clock"></i> Next change in {userStatus.daysRemaining} days
                        </p>
                    )}

                    {/* Rule Box (Shows when editing) */}
                    {isEditingUsername && username !== userUsername && (
                        <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl transition-all animate-fade-in-up">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1.5">
                                <RuleItem met={userRules.length} text="6 to 20 characters" />
                                <RuleItem met={userRules.format && username.length > 0} text="No spaces/special chars" />
                                <RuleItem met={userRules.hasNumber} text="At least 1 number (0-9)" />
                                <RuleItem met={userRules.hasUnderscore} text="At least 1 underscore (_)" />
                            </div>
                            {liveUsernameError && <p className="mt-2 text-[10px] text-rose-500 font-bold"><i className="fa-solid fa-triangle-exclamation"></i> {liveUsernameError}</p>}
                        </div>
                    )}
                </div>

                <div className="pt-4">
                    {(isEditingName || isEditingUsername) && (
                        <div className="flex gap-3">
                            <button 
                                type="submit" 
                                disabled={isLoading || (isEditingUsername && (!isUsernameAvailable || !isUsernameFormatValid))}
                                className="flex-1 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Save Changes'}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => { setIsEditingName(false); setIsEditingUsername(false); setName(userName); setUsername(userUsername); }}
                                className="px-6 py-2.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}