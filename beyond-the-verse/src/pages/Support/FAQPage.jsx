import React, { useState, useEffect } from 'react';
import BackButton from '../../components/common/BackButton';
import { getFAQs } from '../../services/firebaseServices';

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      const data = await getFAQs();
      setFaqs(data);
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <BackButton />

      <div className="mt-8 space-y-12">
        <div className="space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Help Center & FAQ</h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
            Everything you need to know about the initiative, the research process, and how our community functions.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
             <i className="fa-solid fa-circle-notch fa-spin text-2xl text-teal-600"></i>
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading Wisdom...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={faq.id || idx}
                className={`bg-white border rounded-2xl overflow-hidden transition-all ${activeIndex === idx ? 'border-teal-500 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <button 
                  onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left"
                >
                  <span className="font-bold text-slate-800 text-sm sm:text-base">{faq.q}</span>
                  <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${activeIndex === idx ? 'rotate-180 text-teal-600' : 'text-slate-400'}`}></i>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 pt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-50 bg-slate-50/30">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}

            {faqs.length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <i className="fa-solid fa-clipboard-question text-4xl text-slate-200 mb-4"></i>
                <p className="text-slate-500 font-medium">No FAQs found yet.</p>
              </div>
            )}
          </div>
        )}

        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-white text-xl font-bold">Still have questions?</h3>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            If you couldn't find the answer you were looking for, feel free to reach out to our team directly. We are always happy to help.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
