import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase'; 
import BackButton from '../../components/common/BackButton'; // 👈 इम्पोर्ट करें

// Services
import { subscribeToTargetAmount, subscribeToDonations } from '../../services/firebaseServices';

// Components
import ProgressSection from '../../components/Donation/ProgressSection';
import DonationForm from '../../components/Donation/DonationForm';
import SupportersList from '../../components/Donation/SupportersList';
import PaymentModal from '../../components/Donation/PaymentModal';

export default function DonationPage({ showToast, onBack }) {
  const [targetAmount, setTargetAmount] = useState(50000); 
  const [donations, setDonations] = useState([]);
  const [totalRaised, setTotalRaised] = useState(0);
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingDonation, setPendingDonation] = useState(null);

  // 🌟 NAYA: Live Listeners using Services 🌟
  useEffect(() => {
    // 1. Goal Amount
    const unsubConfig = subscribeToTargetAmount((amount) => {
      setTargetAmount(amount);
    });

    // 2. Live Donations
    const unsubDonations = subscribeToDonations(({ list, total }) => {
      setDonations(list);
      setTotalRaised(total);
    });

    return () => {
      unsubConfig();
      unsubDonations();
    };
  }, []);

  const handleInitiateDonation = (data) => {
    setPendingDonation(data);
    setIsPaymentModalOpen(true);
  };

  return (
    // 🌟 FULLY RESPONSIVE WRAPPER
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-8 sm:space-y-10 lg:space-y-12 animate-fade-in-up relative z-10">
      
      {/* Decorative Background Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-br from-teal-50/40 to-emerald-50/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* 🌟 BACK BUTTON: Premium Pill Style */}
            <BackButton />

      {/* 🌟 MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
        
        {/* ==============================================================
            LEFT COLUMN: SUPPORTERS WALL (Bottom on Mobile, Left on Desktop)
        ============================================================== */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-8 order-2 lg:order-1">
          <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] border border-slate-100 p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/40 relative overflow-hidden h-full">
            
            {/* Inner Decoration */}
            <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-teal-50/50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="mb-3 sm:mb-4">
              <span className="bg-rose-50 text-rose-600 border border-rose-100 text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-widest px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm">
                Wall of Love
              </span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-5 text-slate-900 flex items-center gap-3 sm:gap-4 tracking-tight">
              Our Supporters <i className="fa-solid fa-heart text-rose-500 animate-pulse text-2xl sm:text-3xl md:text-4xl shadow-rose-500/20 drop-shadow-lg"></i>
            </h3>
            
            <p className="text-xs sm:text-sm lg:text-base text-slate-500 mb-8 sm:mb-10 font-medium max-w-lg leading-relaxed sm:leading-loose">
              A huge thank you to everyone who believes in the vision of breaking boundaries between science and philosophy. You make this possible!
            </p>
            
            {/* The List Component */}
            <div className="relative">
              <SupportersList donations={donations} />
            </div>
            
          </div>
        </div>

        {/* ==============================================================
            RIGHT COLUMN: ACTION AREA (Top on Mobile, Right on Desktop)
        ============================================================== */}
        <div className="lg:col-span-5 xl:col-span-5 relative order-1 lg:order-2">
          
          {/* 🌟 STICKY BEHAVIOR ON DESKTOP */}
          <div className="lg:sticky lg:top-28 xl:top-32 space-y-6 sm:space-y-8">
            
            {/* Card-in-Card Premium Design */}
            <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl shadow-teal-900/10 border border-white/80 p-2 sm:p-3 relative overflow-hidden">
              
              {/* Animated Border Glow Effect (Subtle) */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200/20 via-transparent to-emerald-200/20 z-0"></div>

              <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 relative z-10 border border-slate-50 shadow-inner">
                
                {/* 1. Goal Progress */}
                <ProgressSection 
                  totalRaised={totalRaised} 
                  targetAmount={targetAmount} 
                  donorCount={donations.length} 
                />
                
                {/* 2. Beautiful Divider */}
                <div className="relative flex items-center py-8 sm:py-10">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink-0 mx-4 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full text-slate-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-bolt text-amber-400"></i> Support Mission
                  </span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>
                
                {/* 3. The Form */}
                <DonationForm onInitiate={handleInitiateDonation} />
              </div>
            </div>

            {/* 🌟 TRUST BADGES (Responsive Centering) */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 px-4">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs lg:text-sm font-black uppercase tracking-widest text-slate-500 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                <i className="fa-solid fa-lock text-slate-400"></i> 100% Secure
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs lg:text-sm font-black uppercase tracking-widest text-slate-500 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                <i className="fa-brands fa-upi text-slate-400 text-sm sm:text-base"></i> UPI Supported
              </div>
            </div>

          </div>
        </div>
        
      </div>

      {/* 🌟 PAYMENT MODAL */}
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