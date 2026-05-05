import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { uploadProfilePicture } from '../../services/firebaseServices'; 
import UserAvatar from '../common/UserAvatar'; // 🌟 Naya Import

// 🌟 FIX: isMyProfile prop add kiya (Default true) taaki loading me flicker na ho
export default function ProfileHeader({ profileData, isMyProfile = true }) {
    const { userName, userUsername, isAdmin, currentUser } = useAuth();
    
    const displayPhotoURL = isMyProfile ? currentUser?.photoURL : profileData?.profilePic;
    const displayUserName = isMyProfile ? userName : profileData?.name;
    const displayIsAdmin = isMyProfile ? isAdmin : (profileData?.role === 'admin');

    // 🌟 LOGIC: Privacy Settings (Email, Bio, Location, Socials)
    const privacy = profileData?.privacySettings || {};
    const showEmail = isMyProfile || privacy.showEmail === true; // Email by default public se hidden rahega
    const showBio = isMyProfile || privacy.showBio !== false;    // Bio default dikhega unless hidden
    const showLocation = isMyProfile || privacy.showLocation !== false; 
    const showSocials = isMyProfile || privacy.showSocials !== false; 

    const displayEmail = isMyProfile ? currentUser?.email : (showEmail && profileData?.email ? profileData.email : "Private User");

    // 🌟 LOGIC: Username nikalna aur agar na ho toh name se fallback banana
    const rawUsername = isMyProfile ? userUsername : profileData?.username;
    const displayUserUsername = rawUsername || (displayUserName || "user").toLowerCase().replace(/[^a-z0-9]/g, '');

    const bio = profileData?.bio;
    const location = profileData?.location;
    const website = profileData?.website;
    const twitter = profileData?.twitter;

    // 🌟 DP States
    const [imagePreview, setImagePreview] = useState(displayPhotoURL || null);
    const [isUploading, setIsUploading] = useState(false);

    // Agar URL change ho (jaise kisi dusri profile par gaye), to DP turant update ho jaye
    useEffect(() => {
        setImagePreview(displayPhotoURL);
    }, [displayPhotoURL]);

    // 🌟 Upload Handler
    const handleImageChange = async (e) => {
        if (!isMyProfile) return; // Dusre ki profile me DP change block
        
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            window.alert("Please upload an image file!");
            return;
        }

        try {
            setIsUploading(true);
            // Firebase service ko call karke photo ImgBB par bhejo
            const newPhotoURL = await uploadProfilePicture(currentUser.uid, file);
            
            // Screen par turant naya photo update kar do
            setImagePreview(newPhotoURL);
        } catch (error) {
            console.error(error);
            window.alert("Failed to update profile picture. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-[2rem] border border-slate-100 p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 animate-fade-in relative overflow-hidden">
            {/* Decorative background blur */}
            <div className="absolute -top-32 -right-32 w-72 h-72 bg-teal-50/50 rounded-full blur-3xl pointer-events-none"></div>

            {/* 📸 Avatar Wrapper */}
            <div className="relative shrink-0 group rounded-full">
                
                {/* 🌟 Yahan UserAvatar lagaya gaya hai (size xl ke sath) */}
                <UserAvatar 
                    photoURL={imagePreview} 
                    name={displayUserName} 
                    size="xl" 
                    isAdmin={false} // Chota crown disable kiya taaki bada wala laga sakein
                />

                {/* 🌟 Hover Overlay for Upload (Sirf khud ki profile par dikhega) */}
                {isMyProfile && (
                    <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white z-20 rounded-full">
                        <i className="fa-solid fa-camera mb-1 text-xl"></i>
                        <span className="text-[9px] font-bold uppercase tracking-wider">Change</span>
                        
                        {/* Hidden Input File */}
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageChange} 
                            disabled={isUploading}
                        />
                    </label>
                )}

                {/* 👑 Big Admin Badge (Profile Header ke hisaab se customize) */}
                {displayIsAdmin && (
                    <div className="absolute -top-1 -right-1 z-30 text-amber-500 bg-white rounded-full h-8 w-8 flex items-center justify-center border-[3px] border-white shadow-sm">
                        <i className="fa-solid fa-crown text-sm"></i>
                    </div>
                )}

                {/* ⏳ Uploading Spinner */}
                {isUploading && (
                    <div className="absolute inset-0 z-40 bg-white/80 rounded-full flex items-center justify-center border-4 border-white">
                        <i className="fa-solid fa-spinner fa-spin text-teal-500 text-3xl"></i>
                    </div>
                )}
            </div>

            {/* User Info (Tumhara Original Code) */}
            <div className="text-center sm:text-left z-10 flex-1">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3 flex-wrap">
                    {displayUserName || "Explorer"}
                    {displayIsAdmin && <span className="bg-amber-100 text-amber-700 text-[10px] uppercase px-2 py-0.5 rounded-md border border-amber-200 tracking-wider">Admin</span>}
                </h1>
            <p className="text-teal-600 font-medium text-sm sm:text-base mt-1 mb-0.5">@{displayUserUsername}</p>
            <p className="text-slate-500 text-xs sm:text-sm">{displayEmail}</p>

                {showBio && bio && (
                    <p className="text-slate-600 text-sm mt-3 leading-relaxed max-w-lg mx-auto sm:mx-0">
                        {bio}
                    </p>
                )}

                <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-100/80 text-[11px] font-bold text-slate-600 tracking-wide">
                        <i className="fa-solid fa-rocket text-teal-500"></i> Explorer of the Verse
                    </span>
                    
                    {showLocation && location && (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-100/80 text-[11px] font-bold text-slate-600 tracking-wide">
                            <i className="fa-solid fa-location-dot text-slate-400"></i> {location}
                        </span>
                    )}

                    {showSocials && website && (
                        <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/50 border border-blue-100/50 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors tracking-wide">
                            <i className="fa-solid fa-link"></i> Website
                        </a>
                    )}

                    {showSocials && twitter && (
                        <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50/50 border border-sky-100/50 text-[11px] font-bold text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-colors tracking-wide">
                            <i className="fa-brands fa-twitter"></i> @{twitter}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}