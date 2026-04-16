import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { uploadProfilePicture } from '../../services/firebaseServices'; 
import UserAvatar from '../common/UserAvatar'; // 🌟 Naya Import

// 🌟 FIX: publicUser prop add kiya taaki dusre ki profile dikh sake
export default function ProfileHeader({ publicUser }) {
    const { userName, isAdmin, currentUser } = useAuth();
    
    // 🌟 LOGIC: Agar publicUser aaya hai, matlab kisi aur ki profile dekh rahe hain
    const isPublicProfile = !!publicUser;

    const displayPhotoURL = isPublicProfile ? publicUser?.profilePic : currentUser?.photoURL;
    const displayUserName = isPublicProfile ? publicUser?.name : userName;
    const displayEmail = isPublicProfile ? "Explorer of the Verse" : currentUser?.email;
    const displayIsAdmin = isPublicProfile ? (publicUser?.role === 'admin') : isAdmin;

    // 🌟 DP States
    const [imagePreview, setImagePreview] = useState(displayPhotoURL || null);
    const [isUploading, setIsUploading] = useState(false);

    // Agar URL change ho (jaise kisi dusri profile par gaye), to DP turant update ho jaye
    useEffect(() => {
        setImagePreview(displayPhotoURL);
    }, [displayPhotoURL]);

    // 🌟 Upload Handler
    const handleImageChange = async (e) => {
        if (isPublicProfile) return; // Dusre ki profile me DP change block
        
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file!");
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
            alert("Failed to update profile picture. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 animate-fade-in relative overflow-hidden shadow-sm">
            {/* Decorative background blur */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

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
                {!isPublicProfile && (
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
                    {displayUserName}
                    {displayIsAdmin && <span className="bg-amber-100 text-amber-700 text-[10px] uppercase px-2 py-0.5 rounded-md border border-amber-200 tracking-wider">Admin</span>}
                </h1>
                <p className="text-slate-500 text-sm mt-1">{displayEmail}</p>

                <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                        <i className="fa-solid fa-rocket text-teal-500"></i> Explorer of the Verse
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-600 uppercase tracking-wide">
                        <i className="fa-solid fa-shield-check text-emerald-500"></i> Verified
                    </span>
                </div>
            </div>
        </div>
    );
}