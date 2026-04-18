import React, { useState, useEffect } from 'react';
import { updateUserProfileName, updateUserUsername } from '../../services/firebaseServices';
import { useAuth } from '../../context/AuthContext';

export default function GeneralSettings() {
    const { currentUser, userName, login, userUsername } = useAuth(); // login function to update context
    const [name, setName] = useState(userName || '');
    const [username, setUsername] = useState(userUsername || '');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    // 🌟 Username validation states
    const [usernameError, setUsernameError] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [usernameTouched, setUsernameTouched] = useState(false);

    // 🌟 Username validation function
    const validateUsername = (value) => {
        const cleanValue = value.toLowerCase().replace(/[^a-z0-9_]/g, '');
        
        if (!cleanValue) {
            setUsernameError('');
            setUsernameValid(false);
            return cleanValue;
        }
        
        if (cleanValue.length < 6) {
            setUsernameError('Username must be at least 6 characters long');
            setUsernameValid(false);
            return cleanValue;
        }
        
        if (cleanValue.length > 20) {
            setUsernameError('Username cannot exceed 20 characters');
            setUsernameValid(false);
            return cleanValue;
        }
        
        if (!/^[a-z0-9_]+$/.test(cleanValue)) {
            setUsernameError('Username can only contain letters, numbers, and underscores');
            setUsernameValid(false);
            return cleanValue;
        }
        
        if (cleanValue === userUsername) {
            setUsernameError('');
            setUsernameValid(false); // No change needed
            return cleanValue;
        }
        
        // Valid username
        setUsernameError('');
        setUsernameValid(true);
        return cleanValue;
    };

    // 🌟 Handle username input with real-time validation
    const handleUsernameChange = (e) => {
        const inputValue = e.target.value;
        const validatedValue = validateUsername(inputValue);
        setUsername(validatedValue);
        setUsernameTouched(true);
    };

    // 🌟 Initialize validation on component mount
    useEffect(() => {
        if (userUsername) {
            validateUsername(userUsername);
        }
    }, [userUsername]);

    const handleSave = async (e) => {
        e.preventDefault();
        if (name.trim() === userName && username.trim() === userUsername) return; // Agar kuch change nahi hua toh kuch mat karo
        
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Update name if changed
            if (name.trim() !== userName) {
                await updateUserProfileName(name);
            }
            
            // Update username if changed
            if (username.trim() !== userUsername) {
                await updateUserUsername(username);
            }
            
            // Context ko naye data ke sath update karo taaki UI turant badal jaye
            login(currentUser?.role || 'client', name, username); 
            setMessage({ type: 'success', text: 'Profile updated successfully! ✨' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to update profile. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900 mb-1">General Information</h2>
            <p className="text-sm text-slate-500 mb-6">Update your personal details and how people see you in the Verse.</p>

            {message.text && (
                <div className={`p-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2 ${message.type === 'success' ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                    <i className={`fa-solid ${message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-5 max-w-md">
                {/* 🌟 READ-ONLY EMAIL */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed">
                        <i className="fa-solid fa-envelope text-slate-400"></i>
                        <span className="text-sm font-medium">{currentUser?.email}</span>
                        <span className="ml-auto text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded-md font-bold uppercase">Verified</span>
                    </div>
                </div>

                {/* 🌟 EDITABLE NAME */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Display Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fa-solid fa-user text-slate-400"></i>
                        </div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 font-medium focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none"
                            placeholder="Your full name"
                        />
                    </div>
                </div>

                {/* 🌟 EDITABLE USERNAME */}
                <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fa-solid fa-at text-slate-400"></i>
                        </div>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            className={`w-full pl-11 pr-11 py-3 bg-white border rounded-xl text-sm text-slate-900 font-medium focus:ring-2 transition-all outline-none ${
                                usernameError 
                                    ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500' 
                                    : usernameValid 
                                        ? 'border-teal-300 focus:ring-teal-500/20 focus:border-teal-500'
                                        : 'border-slate-200 focus:ring-teal-500/20 focus:border-teal-500'
                            }`}
                            placeholder="your_unique_username"
                            minLength="6"
                            maxLength="20"
                        />
                        {/* Validation Icon */}
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            {username && (
                                <i className={`fa-solid text-sm ${
                                    usernameError ? 'fa-circle-xmark text-rose-500' :
                                    usernameValid ? 'fa-circle-check text-teal-500' :
                                    'fa-circle-info text-slate-400'
                                }`}></i>
                            )}
                        </div>
                    </div>
                    
                    {/* Error/Success Messages */}
                    {usernameTouched && username && (usernameError || usernameValid) && (
                        <div className={`mt-2 text-xs font-medium flex items-center gap-1.5 ${
                            usernameError ? 'text-rose-600' : 'text-teal-600'
                        }`}>
                            <i className={`fa-solid ${
                                usernameError ? 'fa-triangle-exclamation' : 
                                'fa-circle-check'
                            }`}></i>
                            {usernameError || 'Username available!'}
                        </div>
                    )}
                    
                    <div className="mt-1 text-[10px] text-slate-400">
                        Only lowercase letters, numbers, and underscores. 6-20 characters.
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={isLoading || (name.trim() === userName && username.trim() === userUsername) || usernameError}
                        className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 min-w-[120px]"
                    >
                        {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}