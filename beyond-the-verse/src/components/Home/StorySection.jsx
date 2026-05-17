import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getFAQs, submitUserQuestion } from "../../services/firebaseServices";

// 🌟 REUSABLE STYLES DICTIONARY
const styles = {
  // Base Section Wrappers
  sectionWrapper: "w-full py-16 sm:py-24 lg:py-32 border-t border-slate-100 dark:border-slate-800/50 transition-colors duration-300",
  faqSectionWrapper: "w-full py-16 sm:py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/50 transition-colors duration-300",
  
  // Typography
  heading: "text-3xl sm:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight transition-colors",
  paragraph: "text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal max-w-xl transition-colors",
  
  // Feature Cards (Elevated)
  featureCard: "p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-800/50 transition-all cursor-default hover:border-slate-400 dark:hover:border-slate-600",
  featureTitle: "text-[10px] font-bold uppercase tracking-wide mb-2",
  featureDesc: "text-slate-500 dark:text-slate-400 text-sm leading-relaxed",

  // FAQ Accordion
  faqBadge: "inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-[9px] font-bold uppercase tracking-widest text-teal-600 dark:bg-teal-900/20 dark:border-teal-800 dark:text-teal-400 mb-4 transition-colors",
  faqItemBase: "border transition-all rounded-xl overflow-hidden",
  faqItemClosed: "bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700",
  faqItemOpen: "bg-slate-50 border-slate-300 dark:bg-slate-800 border-slate-700",
  faqQuestionOpen: "text-slate-900 dark:text-white",
  faqQuestionClosed: "text-slate-600 dark:text-slate-400",
  faqAnswer: "px-5 pb-5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100/50 dark:border-slate-700/50 pt-3 animate-fade-in",

  // Form (Elevated)
  formCard: "bg-slate-50 border border-slate-200 rounded-3xl p-8 sticky top-24 dark:bg-slate-900 dark:border-slate-800 transition-colors",
  formTitle: "text-lg font-bold text-slate-900 dark:text-white mb-2",
  formSub: "text-slate-500 dark:text-slate-400 text-xs mb-6",
  textarea: "w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-500 transition-all text-sm resize-none dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-teal-400",
  submitBtn: "w-full font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest cursor-pointer transition-all active:scale-95 disabled:opacity-50 bg-slate-900 hover:bg-black text-white dark:bg-teal-600 dark:hover:bg-teal-500"
};

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

  // 🌟 THEME FIX: Replaced transparent dark backgrounds with solid dark elevations
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
      // Solid Slate-950 (Level 0)
      theme: { bg: "bg-white dark:bg-slate-950", border: "border-indigo-100 dark:border-indigo-900/50", text: "text-indigo-600 dark:text-indigo-400", accent: "bg-indigo-600 dark:bg-indigo-600 hover:opacity-90" }
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
      // Solid Slate-900 (Level 1 Elevated)
      theme: { bg: "bg-slate-50 dark:bg-slate-900", border: "border-teal-100 dark:border-teal-900/50", text: "text-teal-600 dark:text-teal-400", accent: "bg-teal-600 dark:bg-teal-600 hover:opacity-90" }
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
      // Solid Slate-950 (Level 0)
      theme: { bg: "bg-white dark:bg-slate-950", border: "border-amber-100 dark:border-amber-900/50", text: "text-amber-600 dark:text-amber-400", accent: "bg-amber-500 dark:bg-amber-600 hover:opacity-90" }
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
      // Solid Slate-900 (Level 1 Elevated)
      theme: { bg: "bg-slate-50 dark:bg-slate-900", border: "border-rose-100 dark:border-rose-900/50", text: "text-rose-600 dark:text-rose-400", accent: "bg-rose-600 dark:bg-rose-600 hover:opacity-90" }
    }
  ];

  return (
    <div className="w-full">
      {/* 🚀 SECTIONS 01 - 04 */}
      {platformSections.map((section, idx) => (
        <section key={section.id} className={`${styles.sectionWrapper} ${section.theme.bg}`}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className={`flex flex-col lg:flex-row gap-10 lg:gap-20 items-start ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Text Area */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${section.theme.border} ${section.theme.text}`}>
                    <i className={`fa-solid ${section.icon}`}></i> Part 0{idx + 1}
                  </div>
                  <h3 className={styles.heading}>
                    {section.title}
                  </h3>
                  <p className={styles.paragraph}>
                    {section.description}
                  </p>
                </div>

                <button 
                  onClick={() => section.id === 'support' && onDonate ? onDonate() : (section.requiresAuth && !isAuthenticated ? navigate('/login') : navigate(section.path))}
                  className={`w-full sm:w-auto px-8 py-4 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-3 ${section.theme.accent}`}
                >
                  {section.requiresAuth && !isAuthenticated ? "Join to Start" : `Open ${section.title}`}
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
              </div>

              {/* Small Features Grid */}
              <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section.features.map((feat, fIdx) => (
                  <div key={fIdx} className={styles.featureCard}>
                    <h4 className={`${styles.featureTitle} ${section.theme.text}`}>{feat.name}</h4>
                    <p className={styles.featureDesc}>{feat.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* 🔍 PART 05: COMMON QUESTIONS (FAQ) */}
      <section className={styles.faqSectionWrapper}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* FAQ List */}
            <div className="w-full lg:w-3/5 space-y-8">
              <div>
                <div className={styles.faqBadge}>
                  <i className="fa-solid fa-question"></i> FAQ
                </div>
                <h3 className={styles.heading}>Common Questions</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 transition-colors">Find quick answers about how we work.</p>
              </div>

              <div className="space-y-3">
                {loadingFaqs ? (
                  <div className="text-slate-300 dark:text-slate-700 text-[10px] font-bold uppercase tracking-widest animate-pulse">Loading...</div>
                ) : (
                  faqs.map((faq, idx) => (
                    <div key={idx} className={`${styles.faqItemBase} ${openIndex === idx ? styles.faqItemOpen : styles.faqItemClosed}`}>
                      <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full text-left px-5 py-4 flex justify-between items-center outline-none cursor-pointer">
                        <span className={`text-[15px] font-medium ${openIndex === idx ? styles.faqQuestionOpen : styles.faqQuestionClosed}`}>{faq.q}</span>
                        <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${openIndex === idx ? "rotate-180 text-teal-600 dark:text-teal-400" : "text-slate-300 dark:text-slate-600"}`}></i>
                      </button>
                      {openIndex === idx && <div className={styles.faqAnswer}>{faq.a}</div>}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="w-full lg:w-2/5">
              <div className={styles.formCard}>
                <h4 className={styles.formTitle}>Ask Us Anything</h4>
                <p className={styles.formSub}>Have a different question? Send it to us!</p>
                
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <textarea 
                    value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Type your question here..." rows="4"
                    className={styles.textarea} required
                  />
                  <button disabled={isSubmitting || !userQuestion.trim()} className={styles.submitBtn}>
                    {isSubmitting ? "Sending..." : "Submit Question"}
                  </button>
                  {submitStatus === "success" && <div className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase mt-4 text-center"><i className="fa-solid fa-check"></i> Sent successfully!</div>}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}