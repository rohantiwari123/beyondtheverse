import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, query, doc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { auth, db } from './firebase';

// Components
import Header from './components/Header';
import StorySection from './components/StorySection';
import FAQ from './components/FAQ';
import ProgressSection from './components/ProgressSection';
import DonationForm from './components/DonationForm';
import SupportersList from './components/SupportersList';
import PaymentModal from './components/PaymentModal';
import AdminModal from './components/AdminModal';
import Toast from './components/Toast';

export default function App() {
  // States
  const [targetAmount, setTargetAmount] = useState(50000);
  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  
  // UI States
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [pendingDonation, setPendingDonation] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });

  // Firebase Live Data Listeners
  useEffect(() => {
    signInAnonymously(auth).catch(console.error);

    // Fetch Target Amount
    const unsubConfig = onSnapshot(doc(db, 'settings', 'config'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().targetAmount) {
        setTargetAmount(docSnap.data().targetAmount);
      }
    });

    // Fetch Live Donations
    const unsubDonations = onSnapshot(query(collection(db, 'donations')), (snapshot) => {
      let total = 0;
      let list = [];
      snapshot.forEach(doc => {
        let data = doc.data();
        let amt = Number(data.amount) || 0;
        total += amt;
        list.push({ id: doc.id, ...data });
      });
      list.sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
      setDonations(list);
      setTotalRaised(total);
    });

    return () => {
      unsubConfig();
      unsubDonations();
    };
  }, []);

  // Toast Handler
  const showToast = (message, isSuccess = true) => {
    setToast({ show: true, message, isSuccess });
    setTimeout(() => setToast({ show: false, message: '', isSuccess: true }), 3500);
  };

  // Form Submission Handler
  const handleInitiateDonation = (data) => {
    setPendingDonation(data);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] font-[Poppins] text-slate-800 antialiased overflow-hidden">
      
      {/* 🌟 PREMIUN BACKGROUND GLOW EFFECTS (Aurora Style) 🌟 */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-32 -right-32 w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      <Header onAdminClick={() => setIsAdminModalOpen(true)} />

      {/* Main Layout Grid */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* ================= LEFT COLUMN (Content) ================= */}
        <div className="lg:col-span-7 space-y-10">
          <StorySection />
          
          {/* Wall of Love (Supporters) - Moved to Left for better UX */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
              <i className="fa-solid fa-heart text-rose-500"></i> Supporters List
            </h3>
            <p className="text-xs text-slate-500 mb-6">Thank you to everyone who is supporting this educational initiative.</p>
            <SupportersList donations={donations} />
          </div>

          <FAQ />
        </div>

        {/* ================= RIGHT COLUMN (Action Panel) ================= */}
        <div className="lg:col-span-5 relative">
          
          {/* Sticky Container - Hamesha screen par rahega */}
          <div className="sticky top-24 space-y-6">
            
            {/* Glassmorphism Outer Ring */}
            <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-teal-500/10 border border-white/80 p-1.5 ring-1 ring-slate-900/5">
              
              {/* Inner White Card */}
              <div className="bg-white rounded-[1.75rem] p-6 md:p-8 relative overflow-hidden">
                
                {/* Halka sa background design form ke piche */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-[100px] -z-10"></div>

                <ProgressSection 
                  totalRaised={totalRaised} 
                  targetAmount={targetAmount} 
                  donorCount={donations.length} 
                />
                
                {/* Beautiful Divider */}
                <div className="relative flex items-center py-8">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <i className="fa-solid fa-bolt text-amber-400"></i> Support the Setup
                  </span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>
                
                {/* Donation Form */}
                <DonationForm onInitiate={handleInitiateDonation} />
                
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center items-center gap-4 text-slate-400 text-xs font-medium opacity-80">
              <span className="flex items-center gap-1"><i className="fa-solid fa-lock text-slate-300"></i> Secure</span>
              <span>•</span>
              <span className="flex items-center gap-1"><i className="fa-solid fa-bolt text-amber-400/70"></i> Fast</span>
              <span>•</span>
              <span className="flex items-center gap-1"><i className="fa-solid fa-shield-check text-emerald-400/70"></i> Verified</span>
            </div>

          </div>
        </div>

      </main>

      {/* ================= MODALS & TOASTS ================= */}
      {isPaymentModalOpen && (
        <PaymentModal 
          pendingDonation={pendingDonation} 
          onClose={() => setIsPaymentModalOpen(false)}
          showToast={showToast}
        />
      )}
      
      {isAdminModalOpen && (
        <AdminModal 
          onClose={() => setIsAdminModalOpen(false)} 
          donations={donations}
          totalRaised={totalRaised}
          targetAmount={targetAmount}
          showToast={showToast}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
    }
