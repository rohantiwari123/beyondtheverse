import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile } from '../../services/firebaseServices'; // 🌟 Dusre user ka data laane ke liye

// 🌟 Memory Cache: Ek baar photo aa gayi, to dobara server se nahi mangega (Super Fast)
const userCache = {};

export default function UserAvatar({ 
    userId, // 🌟 Naya Prop: Jiski photo laani hai uski ID
    photoURL, // Fallback (Purani photo)
    name, 
    size = "md", 
    isAdmin = false, 
    className = "",
    showCurrentUser = false 
}) {
    const { currentUser, userName, isAdmin: loggedInUserAdmin } = useAuth();

    // States for Live Data
    const [livePhoto, setLivePhoto] = useState(photoURL);
    const [liveName, setLiveName] = useState(name);

    useEffect(() => {
        // 1. Agar khud ki profile hai, to seedha Auth se uthao (Instant)
        if (showCurrentUser || (userId && currentUser && userId === currentUser.uid)) {
            setLivePhoto(currentUser?.photoURL);
            setLiveName(userName || currentUser?.displayName);
            return;
        }

        // 2. Agar dusre ki profile hai aur uski ID humare paas hai
        if (userId) {
            if (userCache[userId]) {
                // Agar cache me pehle se hai, to turant dikha do
                setLivePhoto(userCache[userId].profilePic || photoURL);
                setLiveName(userCache[userId].name || name);
            } else {
                // Firestore se us user ka latest data lao aur Cache me save kar lo
                getUserProfile(userId).then(data => {
                    if (data) {
                        userCache[userId] = data; // Cache update
                        setLivePhoto(data.profilePic || photoURL);
                        setLiveName(data.name || name);
                    }
                }).catch(err => console.log("Avatar fetch error", err));
            }
        }
    }, [userId, currentUser, showCurrentUser, photoURL, name, userName]);

    const displayPhoto = livePhoto || photoURL;
    const displayName = liveName || name || "?";
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
                    <img 
                        src={displayPhoto} 
                        alt={`${displayName}'s avatar`} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }} 
                    />
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