import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, doc } from 'firebase/firestore'; 
import { db } from './firebase'; 

// Context Hook
import { useAuth } from './context/AuthContext';

// Components & Layout
import Header from './components/Layout/Header';
import Toast from './components/common/Toast';

// Phase 1 Pages
import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/Home/HomePage';
import DonationPage from './pages/Donation/DonationPage';
import AboutPage from './pages/About/AboutPage';
import ProfilePage from './pages/Profile/ProfilePage'; // 🌟 NAYA

// Phase 2 Pages
import CommunityPage from './pages/Community/CommunityPage';
import ExamPage from './pages/Exam/ExamPage';
import ExamEngine from './components/Exam/ExamEngine';

// Admin Dashboard Page
import AdminDashboard from './pages/Admin/AdminDashboard';
import SettingsPage from './pages/Settings/SettingsPage';

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

  // 🌟 FIX: Removed strict paddings so child components can be Edge-to-Edge on mobile
const isStandardLayout = ['/', '/donate', '/about', '/exam', '/admin', '/profile', '/settings'].includes(location.pathname);
  return (
    // 🌟 NAYA: Fluid Typography (text sizes scale automatically) & Premium Text Selection
<div className="relative min-h-screen bg-[#f8fafc] text-slate-800 antialiased overflow-x-hidden selection:bg-teal-200 selection:text-teal-900">      
      {/* Background Decorations (Fixed to background so they don't mess with scrolling) */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none z-0"></div>
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-teal-400/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {location.pathname !== '/login' && (
        <div className="relative z-50">
          <Header />
        </div>
      )}

      {/* Main Content Area */}
      <main className={`relative z-10 w-full ${isStandardLayout ? 'max-w-7xl mx-auto' : ''}`}>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPage showToast={showToast} /> : <Navigate to="/" />} />

          <Route path="/" element={<HomePage onNavigateToDonate={() => navigate('/donate')} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/donate" element={<DonationPage showToast={showToast} onBack={() => navigate('/')} />} />
          <Route path="/community" element={<CommunityPage showToast={showToast} />} />
          
          {/* Exam Routes */}
          <Route path="/exam" element={<ExamPage showToast={showToast} />} />
          <Route path="/exam/engine/:examId" element={<ExamEngine showToast={showToast} />} />

          {/* 🌟 NAYA: Profile Route */}
          <Route path="/profile" element={<ProfilePage showToast={showToast} />} />
          
          
          <Route path="/admin" element={
            <AdminDashboard 
              showToast={showToast}
              donations={donations}
              totalRaised={totalRaised}
              targetAmount={targetAmount}
            />
          } />

          <Route path="/settings" element={<SettingsPage showToast={showToast} />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      
      {/* Toast Notification Layer */}
      <div className="relative z-[100]">
        <Toast toast={toast} />
      </div>
    </div>
  );
}