import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from '../../firebase';
import UserAvatar from '../common/UserAvatar';

import { 
    updateUserProfileName, 
    updateUserUsername, 
    getUserProfile, 
    syncUserDataAcrossPosts,
    updateUserProfileDetails,
    uploadProfilePicture
} from '../../services/firebaseServices';

export default function GeneralSettings() {
    const { currentUser, userName, login, userUsername, userId } = useAuth();
    
    // Form States
    const [name, setName] = useState(userName || '');
    const [username, setUsername] = useState(userUsername || '');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [twitter, setTwitter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    // Edit Mode States
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingDetails, setIsEditingDetails] = useState(false);

    // Profile Picture Upload State
    const [isUploadingDP, setIsUploadingDP] = useState(false);

    // Lock Timestamps from DB
    const [lastUpdated, setLastUpdated] = useState({ name: 0, username: 0 });
    const [originalDetails, setOriginalDetails] = useState({});

    // 1. Fetch timestamps and user data
    useEffect(() => {
        const fetchUserData = async () => {
            const profile = await getUserProfile(userId);
            if (profile) {
                setLastUpdated({
                    name: profile.lastEditedName || 0,
                    username: profile.lastEditedUsername || 0
                });
                setBio(profile.bio || '');
                setLocation(profile.location || '');
                setWebsite(profile.website || '');
                setTwitter(profile.twitter || '');
                setOriginalDetails({
                    bio: profile.bio || '',
                    location: profile.location || '',
                    website: profile.website || '',
                    twitter: profile.twitter || ''
                });
            }
        };
        fetchUserData();
    }, [userId]);

    // Lock Logic: (30 days = 2592000000 ms)
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

    // Username validation states
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
        
        const isDetailsChanged = bio !== originalDetails.bio || location !== originalDetails.location || website !== originalDetails.website || twitter !== originalDetails.twitter;

        if (name.trim() === userName && username === userUsername && !isDetailsChanged) return; 
        
        if (username !== userUsername && (!isUsernameFormatValid || !isUsernameAvailable || liveUsernameError)) {
            return setMessage({ type: 'error', text: 'Please fix username errors before saving.' });
        }
        
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            let isNameChanged = false;
            let isUsernameChanged = false;

            if (isEditingName && name.trim() !== userName) {
                await updateUserProfileName(name.trim());
                setLastUpdated(prev => ({ ...prev, name: Date.now() }));
                setIsEditingName(false);
                isNameChanged = true;
            }
            
            if (isEditingUsername && username !== userUsername) {
                await updateUserUsername(username);
                setLastUpdated(prev => ({ ...prev, username: Date.now() }));
                setIsEditingUsername(false);
                isUsernameChanged = true;
            }
            
            if (isEditingDetails && isDetailsChanged) {
                await updateUserProfileDetails({ bio, location, website, twitter });
                setOriginalDetails({ bio, location, website, twitter });
                setIsEditingDetails(false);
            }
            
            if (isNameChanged || isUsernameChanged) {
                await syncUserDataAcrossPosts(userId, name.trim(), username);
                login(currentUser?.role || 'client', name.trim(), username); 
            }
            
            let successMessage = 'Profile updated successfully! ✨';
            if (isNameChanged || isUsernameChanged) successMessage += ' Username/Name locked for 30 days. Old posts synced.';
            
            setMessage({ type: 'success', text: successMessage });
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to update profile. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setMessage({ type: 'error', text: 'Please upload an image file!' });
            return;
        }

        try {
            setIsUploadingDP(true);
            setMessage({ type: '', text: '' });
            await uploadProfilePicture(currentUser.uid, file);
            setMessage({ type: 'success', text: 'Profile picture updated successfully! ✨' });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to update profile picture. Please try again.' });
        } finally {
            setIsUploadingDP(false);
        }
    };

    const RuleItem = ({ met, text }) => (
        <div className="flex items-center gap-1.5">
            <i className={`fa-solid ${met ? 'fa-circle-check text-teal-500' : 'fa-circle text-slate-200'} text-[10px]`}></i>
            <span className={`text-[10px] ${met ? 'text-slate-800' : 'text-slate-500'} whitespace-nowrap`}>{text}</span>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 animate-fade-in relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute -top-32 -right-32 w-72 h-72 bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="text-xl font-black text-slate-900 mb-2">General Information</h2>
                <p className="text-sm text-slate-500 mb-8">Manage your personal details and how you appear to others.</p>

                {message.text && (
                    <div className={`p-4 rounded-2xl mb-8 text-sm font-medium flex items-center gap-3 ${message.type === 'success' ? 'bg-teal-50 text-teal-800 border border-teal-100' : 'bg-rose-50 text-rose-800 border border-rose-100'}`}>
                        <i className={`fa-solid text-lg ${message.type === 'success' ? 'fa-circle-check text-teal-500' : 'fa-circle-exclamation text-rose-500'}`}></i>
                        {message.text}
                    </div>
                )}

                {/* 🌟 Avatar Section */}
                <div className="flex items-center gap-6 mb-10 p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="relative shrink-0">
                        <UserAvatar 
                            userId={userId}
                            showCurrentUser={true}
                            size="lg" 
                        />
                        {isUploadingDP && (
                            <div className="absolute inset-0 bg-white/80 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-spinner fa-spin text-teal-500 text-xl"></i>
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 mb-1">Profile Picture</h3>
                        <p className="text-xs text-slate-500 mb-3">Upload a new avatar to personalize your profile.</p>
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors active:scale-95">
                            <i className="fa-solid fa-cloud-arrow-up text-slate-400"></i>
                            {isUploadingDP ? "Uploading..." : "Upload Image"}
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleImageChange} 
                                disabled={isUploadingDP}
                            />
                        </label>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-8 max-w-xl">
                    
                    {/* 🌟 Identity Section */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2">
                            <i className="fa-solid fa-id-card"></i> Core Identity
                        </h3>

                        {/* DISPLAY NAME */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-bold text-slate-700">Display Name</label>
                                {!isEditingName && (
                                    <button 
                                        type="button" 
                                        disabled={nameStatus.isLocked}
                                        onClick={() => setIsEditingName(true)}
                                        className={`text-[11px] font-bold flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${nameStatus.isLocked ? 'text-slate-400 bg-slate-50 cursor-not-allowed' : 'text-teal-700 bg-teal-50 hover:bg-teal-100'}`}
                                    >
                                        <i className={`fa-solid ${nameStatus.isLocked ? 'fa-lock' : 'fa-pen'}`}></i> 
                                        {nameStatus.isLocked ? `Locked` : 'Edit'}
                                    </button>
                                )}
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditingName}
                                className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all outline-none ${isEditingName ? 'bg-white border-teal-500' : 'bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed'}`}
                            />
                            {nameStatus.isLocked && (
                                <p className="mt-2 text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                                    <i className="fa-solid fa-clock text-slate-300"></i> Locked for {nameStatus.daysRemaining} more days
                                </p>
                            )}
                        </div>

                        {/* USERNAME */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-bold text-slate-700">Username</label>
                                {!isEditingUsername && (
                                    <button 
                                        type="button" 
                                        disabled={userStatus.isLocked}
                                        onClick={() => setIsEditingUsername(true)}
                                        className={`text-[11px] font-bold flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors ${userStatus.isLocked ? 'text-slate-400 bg-slate-50 cursor-not-allowed' : 'text-teal-700 bg-teal-50 hover:bg-teal-100'}`}
                                    >
                                        <i className={`fa-solid ${userStatus.isLocked ? 'fa-lock' : 'fa-pen'}`}></i> 
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
                                    className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all outline-none ${isEditingUsername ? (liveUsernameError ? 'border-rose-400 bg-rose-50 text-rose-900' : 'bg-white border-teal-500') : 'bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed'}`}
                                />
                                {isEditingUsername && isCheckingUsername && <i className="fa-solid fa-spinner fa-spin absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>}
                                {isEditingUsername && !isCheckingUsername && username !== userUsername && isUsernameAvailable === true && <i className="fa-solid fa-circle-check absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 text-sm"></i>}
                            </div>

                            {userStatus.isLocked && (
                                <p className="mt-2 text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                                    <i className="fa-solid fa-clock text-slate-300"></i> Locked for {userStatus.daysRemaining} more days
                                </p>
                            )}

                            {isEditingUsername && username !== userUsername && (
                                <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl transition-all animate-fade-in">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                                        <RuleItem met={userRules.length} text="6 to 20 characters" />
                                        <RuleItem met={userRules.format && username.length > 0} text="No spaces/special chars" />
                                        <RuleItem met={userRules.hasNumber} text="At least 1 number (0-9)" />
                                        <RuleItem met={userRules.hasUnderscore} text="At least 1 underscore (_)" />
                                    </div>
                                    {liveUsernameError && <p className="mt-3 text-[11px] text-rose-600 font-bold flex items-center gap-1.5"><i className="fa-solid fa-circle-exclamation"></i> {liveUsernameError}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 🌟 Public Profile Section */}
                    <div className="space-y-5 pt-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <i className="fa-solid fa-globe"></i> Public Details
                            </h3>
                            {!isEditingDetails && (
                                <button 
                                    type="button" 
                                    onClick={() => setIsEditingDetails(true)}
                                    className="text-[11px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5"
                                >
                                    <i className="fa-solid fa-pen"></i> Edit Details
                                </button>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Biography</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                disabled={!isEditingDetails}
                                rows="3"
                                placeholder="Tell the Verse about yourself..."
                                className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all outline-none resize-none ${isEditingDetails ? 'bg-white border-teal-500' : 'bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed'}`}
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5"><i className="fa-solid fa-location-dot text-slate-400 mr-1"></i> Location</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    disabled={!isEditingDetails}
                                    placeholder="e.g. Earth, Milky Way"
                                    className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all outline-none ${isEditingDetails ? 'bg-white border-teal-500' : 'bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed'}`}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5"><i className="fa-solid fa-link text-slate-400 mr-1"></i> Website</label>
                                <input
                                    type="url"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    disabled={!isEditingDetails}
                                    placeholder="https://"
                                    className={`w-full px-4 py-3 border rounded-xl text-sm font-medium transition-all outline-none ${isEditingDetails ? 'bg-white border-teal-500' : 'bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed'}`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5"><i className="fa-brands fa-twitter text-sky-500 mr-1"></i> Twitter</label>
                            <div className="relative flex items-center">
                                <span className={`absolute left-4 text-sm font-bold ${isEditingDetails ? 'text-slate-400' : 'text-slate-300'}`}>@</span>
                                <input
                                    type="text"
                                    value={twitter}
                                    onChange={(e) => setTwitter(e.target.value.replace('@', ''))}
                                    disabled={!isEditingDetails}
                                    placeholder="username"
                                    className={`w-full pl-8 pr-4 py-3 border rounded-xl text-sm font-medium transition-all outline-none ${isEditingDetails ? 'bg-white border-teal-500' : 'bg-slate-50 border-slate-100 text-slate-500 cursor-not-allowed'}`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 🌟 Action Buttons */}
                    {(isEditingName || isEditingUsername || isEditingDetails) && (
                        <div className="pt-6 border-t border-slate-100 flex gap-4 animate-fade-in-up">
                            <button 
                                type="submit" 
                                disabled={isLoading || (isEditingUsername && (!isUsernameAvailable || !isUsernameFormatValid))}
                                className="flex-1 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:active:scale-100"
                            >
                                {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <><i className="fa-solid fa-check"></i> Save All Changes</>}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => { 
                                    setIsEditingName(false); 
                                    setIsEditingUsername(false); 
                                    setIsEditingDetails(false);
                                    setName(userName); 
                                    setUsername(userUsername);
                                    setBio(originalDetails.bio);
                                    setLocation(originalDetails.location);
                                    setWebsite(originalDetails.website);
                                    setTwitter(originalDetails.twitter);
                                }}
                                className="px-6 py-3.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors active:scale-[0.98]"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}