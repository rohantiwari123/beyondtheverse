import React, { useState } from 'react';

// Global Components
import Header from './components/Header';
import AdminModal from './components/AdminModal';
import Toast from './components/Toast';

// Pages
import HomePage from './components/HomePage/HomePage';
import DonationPage from './components/DonationPage/DonationPage';

export default function App() {
  // 🌟 NAYA: Page Switch karne ka State ('home' ya 'donate') 🌟
  const [currentPage, setCurrentPage] = useState('home');
  
  // Global UI States
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });

  // Global Toast Function (Yeh DonationPage ko pass karenge)
  const showToast = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => setToast({ show: false, message: '', isSuccess: true }), 3500);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-[Poppins] text-slate-800 antialiased overflow-hidden">
      
      {/* 🌟 PREMIUN BACKGROUND GLOW EFFECTS 🌟 */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Header Hamesha Upar Dikhega */}
      <Header onAdminClick={() => setIsAdminModalOpen(true)} />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        {/* 🌟 JADOO YAHAN HAI: Conditional Rendering 🌟 */}
        {currentPage === 'home' ? (
          <HomePage onNavigateToDonate={() => setCurrentPage('donate')} />
        ) : (
          <DonationPage showToast={showToast} onBack={() => setCurrentPage('home')} />
        )}

      </main>

      {/* Global Modals */}
      {isAdminModalOpen && (
        <AdminModal onClose={() => setIsAdminModalOpen(false)} showToast={showToast} />
      )}
      <Toast toast={toast} />
      
    </div>
  );
}
