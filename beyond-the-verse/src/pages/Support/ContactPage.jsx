import React, { useState } from 'react';
import BackButton from '../../components/common/BackButton';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <BackButton />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Connect with the Verse</h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Have a question about our research, need technical support, or want to collaborate? Our team is here to help you navigate the universe.
            </p>
          </div>

          <div className="space-y-6 pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shrink-0">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Email Us</h4>
                <p className="text-slate-500 text-sm">support@beyondtheverse.org</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Global HQ</h4>
                <p className="text-slate-500 text-sm">Digital Presence, Global Network</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full -translate-y-12 translate-x-12"></div>
          
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
              <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-2xl mb-6 border border-emerald-100">
                <i className="fa-solid fa-check"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Message Received!</h3>
              <p className="text-slate-500 text-sm">Our team will get back to you within 24-48 logical hours.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-teal-600 text-xs font-bold uppercase tracking-widest hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* 🛡️ SECURITY: Honeypot field (Hidden from humans, bots will fill it) */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="website_verification_code" tabIndex="-1" autoComplete="off" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                <input required type="text" placeholder="Your Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500 focus:bg-white transition-all text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                <input required type="email" placeholder="you@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500 focus:bg-white transition-all text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Message</label>
                <textarea required rows="4" placeholder="How can we help you?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500 focus:bg-white transition-all text-sm resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg shadow-teal-500/20 active:scale-95 transition-all">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
