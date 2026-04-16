import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, doc } from 'firebase/firestore'; 
import { db } from './firebase'; 

// Context Hook
import { useAuth } from './context/AuthContext';

// Components & Layout (इन्हें Lazy load नहीं करेंगे क्योंकि ये हर पेज पर दिखते हैं)
import Header from './components/Layout/Header';
import Toast from './components/common/Toast';

// 🌟 PRO FIX 1: Code Splitting (Lazy Loading) 🌟
// अब पेजेस सिर्फ तभी लोड होंगे जब यूज़र उनके लिंक पर क्लिक करेगा
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const DonationPage = lazy(() => import('./pages/Donation/DonationPage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage')); 
const SinglePostPage = lazy(() => import('./pages/Community/SinglePostPage'));
const CommunityPage = lazy(() => import('./pages/Community/CommunityPage'));
const ExamPage = lazy(() => import('./pages/Exam/ExamPage'));
const ExamEngine = lazy(() => import('./components/Exam/ExamEngine'));
const LibraryPage = lazy(() => import('./pages/Library/LibraryPage'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const SettingsPage = lazy(() => import('./pages/Settings/SettingsPage'));

// 🌟 PRO FIX 2: Global Page Loader 🌟
// जब तक पेज बैकग्राउंड में डाउनलोड होगा, यूज़र को ये प्रीमियम एनीमेशन दिखेगा
const PageLoader = () => (
  <div className="w-full h-[60vh] flex flex-col justify-center items-center">
    <i className="fa-solid fa-circle-notch fa-spin text-4xl text-teal-600 mb-4"></i>
    <p className="text-slate-500 font-medium tracking-widest uppercase text-xs animate-pulse">
      Loading Universe...
    </p>
  </div>
);

export default function App() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const { isAuthenticated, isAdmin } = useAuth();

  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });
  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [targetAmount, setTargetAmount] = useState(50000);

  // Live Donations & Goal Fetch (Logic untouched)
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

  const isStandardLayout = ['/', '/donate', '/about', '/exam', '/admin', '/profile', '/settings', '/community'].includes(location.pathname) || location.pathname.startsWith('/post/');

  return (
    <div className="relative selection:bg-teal-600 selection:text-white min-h-screen bg-[#f8fafc] text-slate-800 overflow-x-hidden ">      
      {/* Background Decorations */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none z-0"></div>
      <div className="fixed -top-32 -left-32 w-96 h-96 bg-teal-400/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {location.pathname !== '/login' && (
        <div className="relative z-50">
          <Header />
        </div>
      )}

      {/* Main Content Area */}
      <main className={`relative z-10 w-full ${isStandardLayout ? 'max-w-7xl mx-auto' : ''}`}>
        {/* 🌟 PRO FIX 3: Suspense Wrapper 🌟 */}
        {/* Routes को Suspense के अंदर रखना ज़रूरी है ताकि Lazy loading काम कर सके */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <LoginPage showToast={showToast} /> : <Navigate to="/" />} />

            <Route path="/" element={<HomePage onNavigateToDonate={() => navigate('/donate')} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/donate" element={<DonationPage showToast={showToast} onBack={() => navigate('/')} />} />
            <Route path="/community" element={<CommunityPage showToast={showToast} />} />
          
            <Route path="/post/:postId" element={<SinglePostPage showToast={showToast} />} /> 
            
            {/* Exam Routes */}
            <Route path="/exam" element={<ExamPage showToast={showToast} />} />
            <Route path="/exam/engine/:examId" element={<ExamEngine showToast={showToast} />} />

            {/* Profile Route */}
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
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
      
      {/* Toast Notification Layer */}
      <div className="relative z-[100]">
        <Toast toast={toast} />
      </div>
    </div>
  );
}