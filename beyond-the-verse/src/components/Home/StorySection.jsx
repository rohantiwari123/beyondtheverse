import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getFAQs, submitUserQuestion } from "../../services/firebaseServices";

export default function StorySection({ isAuthenticated, onDonate }) {
  const navigate = useNavigate();
  const { userName, uid } = useAuth() || {};

  // --- FAQ Logic ---
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loadingFaqs, setLoadingFaqs] = useState(true);
  const [userQuestion, setUserQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchFaqsData = async () => {
      setLoadingFaqs(true);
      const fetchedFaqs = await getFAQs();
      setFaqs(fetchedFaqs && fetchedFaqs.length > 0 ? fetchedFaqs : [
        { q: "How does this website work?", a: "We combine science and simple life lessons to help you think clearly and live better every day." },
        { q: "How do you use the support money?", a: "Every bit of support goes into keeping the website running, buying better tools, and keeping the space ad-free." }
      ]);
      setLoadingFaqs(false);
    };
    fetchFaqsData();
  }, []);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    setIsSubmitting(true);
    try {
      await submitUserQuestion(userQuestion.trim(), { uid, name: userName });
      setSubmitStatus("success");
      setUserQuestion("");
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const platformSections = [
    {
      id: "community",
      icon: "fa-users",
      title: "Talk & Share",
      description: "A friendly space where good thoughts matter. Talk with others, share your ideas, and learn from different points of view without the usual social media noise.",
      features: [
        { name: "Smart Chat", desc: "Support or share doubts on any post." },
        { name: "Clear Topics", desc: "Find posts about science, life, or mind." },
        { name: "Quality Check", desc: "We help keep the talk respectful and clear." }
      ],
      path: "/community",
      requiresAuth: true,
      theme: { bg: "bg-white", border: "border-indigo-100", text: "text-indigo-600", accent: "bg-indigo-600" }
    },
    {
      id: "academy",
      icon: "fa-brain",
      title: "Learn & Test",
      description: "Test what you know and learn something new. Our simple tests help you understand how your mind works and how to use logic in real life.",
      features: [
        { name: "Your Vault", desc: "A safe place to see all your past results." },
        { name: "Real Data", desc: "Learn from proven facts and simple science." },
        { name: "Track Growth", desc: "See how your thinking improves over time." }
      ],
      path: "/exam",
      requiresAuth: true,
      theme: { bg: "bg-slate-50", border: "border-teal-100", text: "text-teal-600", accent: "bg-teal-600" }
    },
    {
      id: "mission",
      icon: "fa-heart",
      title: "Why We Are Here",
      description: "We want to make deep knowledge easy for everyone. We take complex ideas and turn them into simple steps you can use in your daily life.",
      features: [
        { name: "Our Goal", desc: "Making life better through clear thinking." },
        { name: "Ask Us", desc: "A direct way to get your questions answered." },
        { name: "No Ads", desc: "A clean space with no distracting commercials." }
      ],
      path: "/about",
      requiresAuth: false,
      theme: { bg: "bg-white", border: "border-amber-100", text: "text-amber-600", accent: "bg-amber-500" }
    },
    {
      id: "support",
      icon: "fa-hand-holding-heart",
      title: "Support Us",
      description: "This platform is built and funded by people like you. Your help keeps the site free, fast, and open for everyone who wants to learn.",
      features: [
        { name: "Live Progress", desc: "See our goals and how close we are." },
        { name: "Safe Payment", desc: "Support us easily and safely using UPI." },
        { name: "Special Thanks", desc: "We feature our supporters on our Wall of Love." }
      ],
      path: "/donation",
      requiresAuth: false,
      theme: { bg: "bg-slate-50", border: "border-rose-100", text: "text-rose-600", accent: "bg-rose-600" }
    }
  ];

  return (
    <div className="w-full">
      {/* 🚀 SECTIONS 01 - 04 */}
      {platformSections.map((section, idx) => (
        <section key={section.id} className={`w-full py-16 sm:py-24 lg:py-32 border-t border-slate-100 ${section.theme.bg}`}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className={`flex flex-col lg:flex-row gap-10 lg:gap-20 items-start ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Text Area */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 bg-white border ${section.theme.border} rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] ${section.theme.text}`}>
                    <i className={`fa-solid ${section.icon}`}></i> Part 0{idx + 1}
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-semibold text-slate-900 tracking-tight">
                    {section.title}
                  </h3>
                  <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                    {section.description}
                  </p>
                </div>

                <button 
                  onClick={() => section.id === 'support' && onDonate ? onDonate() : (section.requiresAuth && !isAuthenticated ? navigate('/login') : navigate(section.path))}
                  className={`w-full sm:w-auto px-8 py-4 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer hover:opacity-90 active:scale-95 flex items-center justify-center gap-3 ${section.theme.accent}`}
                >
                  {section.requiresAuth && !isAuthenticated ? "Join to Start" : `Open ${section.title}`}
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
              </div>

              {/* Small Features Grid */}
              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section.features.map((feat, fIdx) => (
                  <div key={fIdx} className="p-6 rounded-2xl border border-slate-200 bg-white transition-all cursor-default hover:border-slate-400">
                    <h4 className={`text-[10px] font-bold uppercase tracking-wide mb-2 ${section.theme.text}`}>{feat.name}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* 🔍 PART 05: COMMON QUESTIONS (FAQ) */}
      <section className="w-full py-16 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* FAQ List */}
            <div className="w-full lg:w-3/5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-[9px] font-bold uppercase tracking-widest text-teal-600 mb-4">
                  <i className="fa-solid fa-question"></i> FAQ
                </div>
                <h3 className="text-3xl sm:text-5xl font-semibold text-slate-900 tracking-tight">Common Questions</h3>
                <p className="text-slate-500 text-sm mt-2">Find quick answers about how we work.</p>
              </div>

              <div className="space-y-3">
                {loadingFaqs ? (
                  <div className="text-slate-300 text-[10px] font-bold uppercase tracking-widest animate-pulse">Loading...</div>
                ) : (
                  faqs.map((faq, idx) => (
                    <div key={idx} className={`border border-slate-200 transition-all rounded-xl overflow-hidden ${openIndex === idx ? "bg-slate-50/50" : "bg-white hover:border-slate-300"}`}>
                      <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full text-left px-5 py-4 flex justify-between items-center outline-none cursor-pointer">
                        <span className={`text-[15px] font-medium ${openIndex === idx ? "text-slate-900" : "text-slate-600"}`}>{faq.q}</span>
                        <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${openIndex === idx ? "rotate-180 text-teal-600" : "text-slate-300"}`}></i>
                      </button>
                      {openIndex === idx && <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100/50 pt-3 animate-fade-in">{faq.a}</div>}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="w-full lg:w-2/5">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sticky top-24">
                <h4 className="text-lg font-bold text-slate-900 mb-2">Ask Us Anything</h4>
                <p className="text-slate-500 text-xs mb-6">Have a different question? Send it to us!</p>
                
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <textarea 
                    value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Type your question here..." rows="4"
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-500 transition-all text-sm resize-none" required
                  />
                  <button disabled={isSubmitting || !userQuestion.trim()} className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest cursor-pointer transition-all active:scale-95 disabled:opacity-50">
                    {isSubmitting ? "Sending..." : "Submit Question"}
                  </button>
                  {submitStatus === "success" && <div className="text-emerald-600 text-[10px] font-bold uppercase mt-4 text-center"><i className="fa-solid fa-check"></i> Sent successfully!</div>}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}