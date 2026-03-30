import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, query, doc } from 'firebase/firestore';
// 🌟 BUG KILLED: signInAnonymously wala import hata diya gaya hai
import { auth, db } from '../../firebase'; 

// Saare Premium Components jo humne abhi upgrade kiye hain
import ProgressSection from './ProgressSection';
import DonationForm from './DonationForm';
import SupportersList from './SupportersList';
import PaymentModal from './PaymentModal';

export default function DonationPage({ showToast, onBack }) {
  const [targetAmount, setTargetAmount] = useState(50000); 
  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingDonation, setPendingDonation] = useState(null);

  // 🌟 NAYA: Firebase Live Listeners (Real-time updates ke liye) 🌟
  useEffect(() => {
    // 🌟 BUG KILLED: Yahan se signInAnonymously() hata diya hai! Ab koi logout nahi hoga!

    // 1. Goal Amount fetch karna
    const unsubConfig = onSnapshot(doc(db, 'settings', 'config'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().targetAmount) {
        setTargetAmount(docSnap.data().targetAmount);
      }
    });

    // 2. Live Donations fetch karna
    const unsubDonations = onSnapshot(query(collection(db, 'donations')), (snapshot) => {
      let total = 0;
      let list = [];
      snapshot.forEach(doc => {
        let data = doc.data();
        total += (Number(data.amount) || 0);
        list.push({ id: doc.id, ...data });
      });
      // Nayi donations sabse upar aayengi
      list.sort((a, b) => (Number(b.timestamp) || 0) - (Number(a.timestamp) || 0));
      setDonations(list);
      setTotalRaised(total);
    });

    return () => {
      unsubConfig();
      unsubDonations();
    };
  }, []);

  // Jab user form bharkar 'Generate QR' dabayega
  const handleInitiateDonation = (data) => {
    setPendingDonation(data);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
      
      {/* 🌟 Premium Back Button 🌟 */}
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold text-sm transition-all outline-none bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:border-teal-200 hover:shadow-md w-max"
      >
        <div className="bg-slate-100 group-hover:bg-teal-50 w-7 h-7 rounded-full flex items-center justify-center transition-colors">
          <i className="fa-solid fa-arrow-left text-xs"></i>
        </div>
        Back to Home
      </button>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT COLUMN: Wall of Love (Supporters List) */}
        <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-8 lg:p-10 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="mb-2">
              <span className="bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Wall of Love
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-3 text-slate-800 flex items-center gap-3">
              Our Supporters <i className="fa-solid fa-heart text-rose-500 animate-pulse"></i>
            </h3>
            <p className="text-sm text-slate-500 mb-8 font-medium leading-relaxed max-w-lg">
              A huge thank you to everyone who believes in the vision of breaking boundaries between science and philosophy. You make this possible!
            </p>
            
            {/* VIP Supporters List Component */}
            <SupportersList donations={donations} />
          </div>
        </div>

        {/* RIGHT COLUMN: Action Area (Progress + Form) */}
        <div className="lg:col-span-5 relative order-1 lg:order-2">
          {/* Sticky container taaki scroll karne par form hamesha screen par rahe */}
          <div className="sticky top-24 space-y-6">
            
            {/* Premium Glassmorphism Wrapper */}
            <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-teal-500/10 border border-white/80 p-2 ring-1 ring-slate-900/5">
              <div className="bg-white rounded-[2rem] p-6 md:p-8 relative overflow-hidden">
                
                {/* Decorative corner shape */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-[100px] pointer-events-none"></div>
                
                {/* Glowing Progress Bar Component */}
                <ProgressSection 
                  totalRaised={totalRaised} 
                  targetAmount={targetAmount} 
                  donorCount={donations.length} 
                />
                
                {/* Divider */}
                <div className="relative flex items-center py-8">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <i className="fa-solid fa-bolt text-amber-400"></i> Support the Setup
                  </span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>
                
                {/* Custom Validation Donation Form Component */}
                <DonationForm onInitiate={handleInitiateDonation} />
              </div>
            </div>

            {/* Trust Badges under the form */}
            <div className="flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <i className="fa-solid fa-lock text-slate-400"></i> Secure
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <i className="fa-brands fa-upi text-slate-400 text-base"></i> UPI Supported
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Payment Modal (Hidden until generated) */}
      {isPaymentModalOpen && (
        <PaymentModal 
          pendingDonation={pendingDonation} 
          onClose={() => setIsPaymentModalOpen(false)}
          showToast={showToast}
        />
      )}
    </div>
  );
            }
