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
    <div className="space-y-6 pt-4">
      
      {/* 🌟 NAYA: Beautiful Header Section 🌟 */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-extrabold text-slate-800 flex items-center justify-center gap-2">
          <i className="fa-solid fa-clipboard-question text-teal-500"></i>
          Got Questions?
        </h3>
        <p className="text-sm text-slate-500 font-medium">Everything you need to know about our initiative and support process.</p>
      </div>

      <div className="space-y-3 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            /* 🌟 NAYA: Premium Card Styling for each FAQ 🌟 */
            <div
              key={idx}
              className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                isOpen 
                  ? "bg-white border-teal-200 shadow-md shadow-teal-500/10" 
                  : "bg-white/50 border-slate-200 hover:border-teal-300 hover:bg-white"
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-5 sm:px-6 py-4 flex justify-between items-center gap-4 outline-none"
              >
                <span className={`font-bold text-sm sm:text-base transition-colors ${isOpen ? "text-teal-700" : "text-slate-700"}`}>
                  {faq.q}
                </span>
                
                {/* 🌟 NAYA: Animated Icon Button 🌟 */}
                <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-teal-100 text-teal-600" : "bg-slate-100 text-slate-400"}`}>
                  <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}></i>
                </div>
              </button>

              {/* 🌟 NAYA: Smooth Grid Animation (No hardcoded pixels) 🌟 */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 sm:px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3 mt-1">
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
