import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { onSnapshot, collection, doc } from 'firebase/firestore'; 
import { db } from './firebase'; 

// Context Hook
import { useAuth } from './context/AuthContext';

// Components & Layout
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Toast from './components/common/Toast';
import ExamResult from './components/Exam/ExamResult';

// 🌟 REUSABLE STYLES DICTIONARY (Level 0 Elevation)
const styles = {
  // Main App Wrapper
  appWrapper: "relative min-h-screen overflow-x-hidden transition-colors duration-300 selection:bg-teal-600 selection:text-white bg-[#f8fafc] text-slate-800 dark:bg-slate-950 dark:text-slate-100",
  
  // Background Ambient Glow (Level 0 Decorations)
  bgGradient: "fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none z-0",
  bgGlow: "fixed -top-32 -left-32 w-96 h-96 bg-teal-400/10 rounded-full blur-[100px] pointer-events-none z-0",
  
  // Layout Zones
  headerZone: "relative z-50",
  mainZone: "relative z-10 w-full",
  footerZone: "relative z-10",
  toastZone: "relative z-[100]",

  // Loader Styles
  loaderContainer: "w-full h-[60vh] flex flex-col justify-center items-center",
  loaderSpinner: "fa-solid fa-circle-notch fa-spin text-4xl text-teal-600 mb-4 dark:text-teal-500",
  loaderText: "text-slate-500 font-medium tracking-widest uppercase text-xs animate-pulse dark:text-slate-400"
};

// 🌟 PRO FIX 1: Code Splitting (Lazy Loading) 🌟
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const DonationPage = lazy(() => import('./pages/Donation/DonationPage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const FrameworkPage = lazy(() => import('./pages/Framework/FrameworkPage'));
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage')); 
const SinglePostPage = lazy(() => import('./pages/Community/SinglePostPage'));
const CommunityPage = lazy(() => import('./pages/Community/CommunityPage'));
const ExamPage = lazy(() => import('./pages/Exam/ExamPage'));
const ExamEngine = lazy(() => import('./components/Exam/ExamEngine'));
const LibraryPage = lazy(() => import('./pages/Library/LibraryPage'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const SettingsPage = lazy(() => import('./pages/Settings/SettingsPage'));
const ResearchPage = lazy(() => import('./pages/Research/ResearchPage'));
const SingleResearchPage = lazy(() => import('./pages/Research/SingleResearchPage'));

// ⚖️ NEW LEGAL & SUPPORT PAGES
const PrivacyPage = lazy(() => import('./pages/Legal/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/Legal/TermsPage'));
const ContactPage = lazy(() => import('./pages/Support/ContactPage'));
const FAQPage = lazy(() => import('./pages/Support/FAQPage'));

// 🌟 PRO FIX 2: Global Page Loader 🌟
const PageLoader = () => (
  <div className={styles.loaderContainer}>
    <i className={styles.loaderSpinner}></i>
    <p className={styles.loaderText}>Loading Universe...</p>
  </div>
);

export default function App() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const { isAuthenticated } = useAuth();

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

  return (
    <div className={styles.appWrapper}>      
      {/* Background Decorations */}
      <div className={styles.bgGradient}></div>
      <div className={styles.bgGlow}></div>

      {!['/login', '/signup'].includes(location.pathname) && (
        <div className={styles.headerZone}>
          <Header />
        </div>
      )}

      {/* Main Content Area */}
      <main className={styles.mainZone}>
        {/* 🌟 PRO FIX 3: Suspense Wrapper 🌟 */}
        <Suspense fallback={<PageLoader />}>
          <div key={location.pathname} className="page-fade-in">
            <Routes location={location}>
              <Route path="/login" element={!isAuthenticated ? <LoginPage showToast={showToast} /> : <Navigate to="/" />} />
              <Route path="/signup" element={!isAuthenticated ? <LoginPage showToast={showToast} initialAuthMode="signup" /> : <Navigate to="/" />} />

              <Route path="/" element={<HomePage onNavigateToDonate={() => navigate('/donate')} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/donate" element={<DonationPage showToast={showToast} onBack={() => navigate('/')} />} />
              <Route path="/community" element={<CommunityPage showToast={showToast} />} />
              <Route path="/framework" element={<FrameworkPage showToast={showToast} />} />
              <Route path="/post/:postId" element={<SinglePostPage showToast={showToast} />} />  
              
              {/* Exam Routes */}
              <Route path="/exam" element={<ExamPage showToast={showToast} />} />
              <Route path="/exam/engine/:examId" element={<ExamEngine showToast={showToast} />} />
              <Route path="/exam/result/:examId" element={<ExamResult showToast={showToast} />} />

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
              <Route path="/research" element={<ResearchPage showToast={showToast} />} />
              <Route path="/research/:researchId" element={<SingleResearchPage showToast={showToast} />} />
              <Route path="/profile/:id" element={<ProfilePage showToast={showToast} />} />

              {/* Legal & Support Routes */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Suspense>
      </main>

      {!['/login', '/signup'].includes(location.pathname) && (
        <div className={styles.footerZone}>
          <Footer />
        </div>
      )}
      
      {/* Toast Notification Layer */}
      <div className={styles.toastZone}>
        <Toast toast={toast} />
      </div>
    </div>
  );
}