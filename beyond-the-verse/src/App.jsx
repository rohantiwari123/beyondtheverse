import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, doc } from 'firebase/firestore'; 
import { db } from './firebase'; 
import VaultPage from './pages/Vault/VaultPage';

// Context Hook
import { useAuth } from './context/AuthContext';

// Components & Layout
import Header from './components/Layout/Header';
import Toast from './components/Toast';

// Phase 1 Pages
import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/Home/HomePage';
import DonationPage from './pages/Donate/DonationPage';
import AboutPage from './pages/About/AboutPage';

// Phase 2 Pages
import CommunityPage from './pages/Community/CommunityPage';
import ExamList from './components/Academy/ExamList';
import ExamEngine from './components/Academy/ExamEngine';

// Admin Dashboard Page
import AdminDashboard from './pages/Admin/AdminDashboard';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const { isAuthenticated, isAdmin, logout } = useAuth();

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

  const isStandardLayout = ['/', '/donate', '/about', '/community', '/library', '/vault', '/academy', '/admin'].includes(location.pathname);

  return (
// font-[Poppins] hata kar sirf 'font-sans' kar diya ya class nikal di
<div className="relative min-h-screen bg-[#f8fafc] text-slate-800 antialiased overflow-x-hidden">      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      {location.pathname !== '/login' && (
        <Header />
      )}

      <main className={`relative z-10 ${isStandardLayout ? 'max-w-7xl mx-auto px-2 sm:px-4 py-6 md:py-10' : ''}`}>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPage showToast={showToast} /> : <Navigate to="/" />} />

          <Route path="/" element={<HomePage onNavigateToDonate={() => navigate('/donate')} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/donate" element={<DonationPage showToast={showToast} onBack={() => navigate('/')} />} />

          <Route path="/community" element={<CommunityPage showToast={showToast} />} />
          
          <Route path="/academy" element={<ExamList />} />
          <Route path="/academy/exam/:examId" element={<ExamEngine showToast={showToast} />} />
          <Route path="/vault" element={<VaultPage showToast={showToast} />} />
          
          <Route path="/admin" element={
            <AdminDashboard 
              showToast={showToast}
              donations={donations}
              totalRaised={totalRaised}
              targetAmount={targetAmount}
            />
          } />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      
      <Toast toast={toast} />
    </div>
  );
}