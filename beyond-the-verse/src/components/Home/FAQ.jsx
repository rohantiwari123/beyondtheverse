import React, { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is the core philosophy of Beyond The Verse?",
      a: "Our initiative aims to end the artificial division between science and philosophy. We believe that to truly understand reality, observation, experimentation, and self-reflection must go hand in hand.",
    },
    {
      q: "How will the setup funds be used?",
      a: "The funds will go directly towards purchasing better streaming equipment, a high-quality microphone, drawing tablets, and paying for premium software subscriptions required to run uninterrupted, high-quality classes.",
    },
    {
      q: "Is my contribution payment secure?",
      a: "Yes, absolutely! We do not collect any bank details on our website. You make the payment securely using your own trusted UPI app (GPay, PhonePe, Paytm, etc.) by scanning the generated QR code.",
    },
    {
      q: "Can I contribute anonymously?",
      a: "Of course. You can write 'Anonymous' or 'Well Wisher' in the Name field if you prefer not to disclose your real name publicly on the Supporters List.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // 🌟 FULLY RESPONSIVE WRAPPER
    <div className="w-full max-w-5xl mx-auto py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Decorative Background Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-gradient-to-br from-teal-50/50 to-emerald-50/30 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* 🌟 ELEGANT HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16">
        <span className="text-teal-600 font-extrabold tracking-widest uppercase text-[10px] sm:text-xs mb-3 sm:mb-4 block">
          Clarify Your Doubts
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4 sm:mb-5">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400">Questions</span>
        </h2>
        <p className="text-slate-500 font-medium text-sm sm:text-base md:text-lg leading-relaxed px-2">
          Everything you need to know about our initiative, philosophy, and support process.
        </p>
      </div>

      {/* 🌟 FAQ ACCORDION LIST */}
      <div className="space-y-4 sm:space-y-5 lg:space-y-6 max-w-3xl mx-auto relative z-10">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          
          return (
            /* 🌟 PREMIUM CARD STYLING */
            <div
              key={idx}
              className={`group rounded-[1.5rem] sm:rounded-[2rem] border transition-all duration-500 ${
                isOpen 
                  ? "bg-white border-teal-200 shadow-xl shadow-teal-900/5 -translate-y-1" 
                  : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-md"
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-5 sm:px-8 lg:px-10 py-5 sm:py-6 lg:py-8 flex justify-between items-center gap-4 sm:gap-6 outline-none"
              >
                <span className={`font-bold text-base sm:text-lg lg:text-xl transition-colors duration-300 pr-2 ${
                  isOpen ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                }`}>
                  {faq.q}
                </span>
                
                {/* 🌟 NEW: Animated Plus/Minus Button */}
                <div 
                  className={`shrink-0 h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isOpen 
                      ? "bg-teal-500 text-white shadow-md shadow-teal-500/30" 
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600"
                  }`}
                >
                  <i 
                    className={`fa-solid fa-plus text-sm sm:text-base lg:text-lg transition-transform duration-500 ${
                      isOpen ? "rotate-[135deg]" : "rotate-0"
                    }`}
                  ></i>
                </div>
              </button>

              {/* 🌟 SMOOTH GRID ANIMATION FOR ANSWER */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 sm:px-8 lg:px-10 pb-6 sm:pb-8 lg:pb-10 text-sm sm:text-base lg:text-lg text-slate-600 font-medium leading-relaxed sm:leading-loose">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}