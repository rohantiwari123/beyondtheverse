import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, doc } from 'firebase/firestore'; 
import { db } from './firebase'; 

// Context Hook
import { useAuth } from './context/AuthContext';

// Components & Layout
import Header from './components/Layout/Header';
import Toast from './components/Toast';
import AdminModal from './components/AdminModal'; 

// Phase 1 Pages
import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/Home/HomePage';
import DonationPage from './pages/Donate/DonationPage';
import AboutPage from './pages/About/AboutPage';

// 🌟 PHASE 2: Upcoming Pages Imports
import CommunityPage from './pages/Community/CommunityPage';
//import LibraryPage from './pages/Library/LibraryPage';
//import VaultPage from './pages/Vault/VaultPage';

// 🌟 NAYE IMPORTS (Academy & Exam Engine)
import ExamPage from './pages/Academy/ExamPage';
import ExamEngine from './components/Academy/ExamEngine';
//import EventsPage from './pages/Academy/EventsPage';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const { isAuthenticated, isAdmin, logout } = useAuth();

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });

  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [targetAmount, setTargetAmount] = useState(50000);

  // Live Donations & Goal Fetch
  useEffect(() => {
    const unsubDonations = onSnapshot(collection(db, 'donations'), (snapshot) => {
      let total = 0; let list = [];
      snapshot.forEach(doc => { 
        total += (Number(doc.data().amount) || 0); 
        list.push({ id: doc.id, ...doc.data() }); 
      });
      list.sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
      setDonations(list); 
      setTotalRaised(total);
    });

    const unsubConfig = onSnapshot(doc(db, 'settings', 'config'), (docSnap) => {
      if (docSnap.exists()) setTargetAmount(docSnap.data().targetAmount);
    });

    return () => { unsubDonations(); unsubConfig(); };
  }, []); 

  const showToast = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => setToast({ show: false, message: '', isSuccess: true }), 3500);
  };

  // Pages where we want the standard max-width layout
  const isStandardLayout = ['/', '/donate', '/about', '/community', '/library', '/vault', '/academy'].includes(location.pathname);

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-[Poppins] text-slate-800 antialiased overflow-x-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header logic */}
      {location.pathname !== '/login' && (
        <Header onAdminClick={() => setIsAdminModalOpen(true)} />
      )}

      <main className={`relative z-10 ${isStandardLayout ? 'max-w-7xl mx-auto px-2 sm:px-4 py-6 md:py-10' : ''}`}>
        <Routes>
          {/* Auth Route */}
          <Route path="/login" element={
            !isAuthenticated ? <LoginPage showToast={showToast} /> : <Navigate to="/" />
          } />

          {/* Phase 1 Routes */}
          <Route path="/" element={
            <HomePage onNavigateToDonate={() => navigate('/donate')} />
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/donate" element={
            <DonationPage showToast={showToast} onBack={() => navigate('/')} />
          } />

          {/* 🌟 PHASE 2: New Module Routes */}
          <Route path="/community" element={<CommunityPage showToast={showToast} />} />
          
          {/* 🌟 ACADEMY ROUTES */}
          <Route path="/academy" element={<ExamPage showToast={showToast} />} />
          <Route path="/academy/exam/:examId" element={<ExamEngine showToast={showToast} />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Admin Dashboard Overlay */}
      {isAdmin && isAdminModalOpen && (
        <AdminModal 
          onClose={() => setIsAdminModalOpen(false)} 
          showToast={showToast}
          donations={donations}
          totalRaised={totalRaised}
          targetAmount={targetAmount}
        />
      )}
      
      <Toast toast={toast} />
    </div>
  );
                                                   }
