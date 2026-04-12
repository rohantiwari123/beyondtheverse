import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Components Import
import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileActions from '../../components/Profile/ProfileActions';

export default function ProfilePage() {
    const { currentUser, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    // 🌟 Loading State (अगर Auth लोड हो रहा है)
    if (!currentUser) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-600"></i>
            </div>
        );
    }

    // 🌟 Handlers
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
            
            {/* 1. Header Component */}
            <ProfileHeader 
                user={currentUser} 
                isAdmin={isAdmin} 
                onEditProfile={() => handleNavigate('/settings')} 
            />

            {/* 2. Actions Component */}
            <ProfileActions 
                isAdmin={isAdmin} 
                onNavigate={handleNavigate} 
                onLogout={handleLogout} 
            />

        </section>
    );
}