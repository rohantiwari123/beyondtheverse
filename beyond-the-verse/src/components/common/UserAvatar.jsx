import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile } from '../../services/firebaseServices';

const userCache = {};

export default function UserAvatar({ 
    userId, 
    photoURL, 
    name, 
    size = "md", 
    isAdmin = false, 
    className = "",
    showCurrentUser = false 
}) {
    const { currentUser, userName, isAdmin: loggedInUserAdmin } = useAuth();

    const [livePhoto, setLivePhoto] = useState(photoURL);
    const [liveName, setLiveName] = useState(name);

    // 🌟 FIX 1: JADOO YAHAN HAI! Agar bahar se photo change ho to andar turant update ho.
    useEffect(() => {
        setLivePhoto(photoURL);
    }, [photoURL]);

    useEffect(() => {
        setLiveName(name);
    }, [name]);

    useEffect(() => {
        if (showCurrentUser || (userId && currentUser && userId === currentUser.uid)) {
            setLivePhoto(currentUser?.photoURL);
            setLiveName(userName || currentUser?.displayName);
            return;
        }

        if (userId) {
            if (userCache[userId]) {
                setLivePhoto(userCache[userId].profilePic || photoURL);
                setLiveName(userCache[userId].name || name);
            } else {
                getUserProfile(userId).then(data => {
                    if (data) {
                        userCache[userId] = data;
                        setLivePhoto(data.profilePic || photoURL);
                        setLiveName(data.name || name);
                    }
                }).catch(err => console.log("Avatar fetch error", err));
            }
        }
    }, [userId, currentUser, showCurrentUser, userName]);

    const displayPhoto = livePhoto;
    const displayName = liveName || "?";
    const displayAdmin = showCurrentUser ? loggedInUserAdmin : isAdmin;
    const initial = displayName.charAt(0).toUpperCase();

    const sizeClasses = {
        sm: "h-8 w-8 text-sm border",         
        md: "h-10 w-10 text-lg border-2",     
        lg: "h-14 w-14 text-2xl border-2",    
        xl: "h-24 w-24 text-4xl border-4"     
    };
    const dimensions = sizeClasses[size] || sizeClasses.md;

    return (
        <div className={`relative shrink-0 ${className}`}>
            <div className={`
                ${dimensions} rounded-full flex items-center justify-center font-bold overflow-hidden border-white shadow-sm
                ${displayAdmin && !displayPhoto ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-amber-500/30' : 'bg-slate-900 text-white'}
            `}>
                {displayPhoto ? (
                    <img src={displayPhoto} alt={`${displayName}'s avatar`} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                    initial
                )}
            </div>

            {displayAdmin && (
                <div className="absolute -top-1 -right-1 z-10 text-amber-500 bg-white rounded-full h-3.5 w-3.5 flex items-center justify-center border border-white shadow-sm text-[8px]">
                    <i className="fa-solid fa-crown"></i>
                </div>
            )}
        </div>
    );
}