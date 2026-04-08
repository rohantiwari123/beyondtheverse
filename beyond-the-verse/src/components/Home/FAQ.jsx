import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // User ki info nikalne ke liye
import { getFAQs, submitUserQuestion } from "../../services/firebaseServices"; // Services import

export default function FAQ() {
  const { userName, uid } = useAuth() || {}; // Fallback if not wrapped properly
  
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // User Question States
  const [userQuestion, setUserQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const defaultFaqs = [
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

  useEffect(() => {
    const fetchFaqsData = async () => {
      setLoading(true);
      const fetchedFaqs = await getFAQs();
      if (fetchedFaqs && fetchedFaqs.length > 0) {
        setFaqs(fetchedFaqs);
      } else {
        setFaqs(defaultFaqs);
      }
      setLoading(false);
    };
    fetchFaqsData();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 🌟 NAYA: Form Submit Handler
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Database me bhej rahe hain
      await submitUserQuestion(userQuestion.trim(), { uid, name: userName });
      setSubmitStatus("success");
      setUserQuestion(""); // Field clear kar do
      
      // 5 seconds baad success message hata do
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 sm:py-16 md:py-20 lg:py-24">
      
      {/* 🌟 ELEGANT HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
        <span className="text-teal-600 text-[10px] sm:text-xs mb-3 block">
          Clarify Your Doubts
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-slate-800 mb-4">
          Frequently Asked <span className="text-teal-600">Questions</span>
        </h2>
        <p className="text-slate-500 text-sm sm:text-base md:text-lg px-2">
          Everything you need to know about our initiative, philosophy, and support process.
        </p>
      </div>

      {/* 🌟 FAQ ACCORDION LIST */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-500 mb-4"></i>
          <span className="text-xs text-slate-400">Loading FAQs...</span>
        </div>
      ) : (
        <div className="border-t sm:border-t-0 border-slate-200 sm:space-y-4 px-0 sm:px-6 lg:px-8">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <div
                key={faq.id || idx}
                className={`group transition-colors duration-300 sm:rounded-2xl border-b sm:border ${
                  isOpen 
                    ? "bg-white sm:border-teal-500 border-b-teal-500" 
                    : "bg-white border-slate-200 sm:border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 sm:px-6 lg:px-8 py-5 sm:py-6 flex justify-between items-center gap-4 sm:gap-6 outline-none sm:rounded-2xl hover:bg-slate-50/50 transition-colors"
                >
                  <span className={`text-[15px] sm:text-base lg:text-lg transition-colors duration-300 pr-2 ${
                    isOpen ? "text-teal-800" : "text-slate-800 group-hover:text-teal-700"
                  }`}>
                    {faq.q}
                  </span>
                  
                  <div 
                    className={`shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center transition-all duration-300 border ${
                      isOpen 
                        ? "bg-teal-500 border-teal-500 text-white" 
                        : "bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 group-hover:border-teal-200"
                    }`}
                  >
                    <i 
                      className={`fa-solid fa-plus text-xs sm:text-sm transition-transform duration-300 ${
                        isOpen ? "rotate-[135deg]" : "rotate-0"
                      }`}
                    ></i>
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 lg:px-8 pb-6 sm:pb-8 text-sm sm:text-base text-slate-600 whitespace-pre-wrap">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🌟 NAYA: ASK A QUESTION SECTION (Flat & Edge-to-Edge on Mobile) */}
      <div className="mt-12 sm:mt-16 px-0 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="bg-slate-50 border-y sm:border border-slate-200 sm:rounded-3xl p-6 sm:p-8 lg:p-10">
          <div className="text-center max-w-lg mx-auto mb-6">
            <h3 className="text-xl sm:text-2xl text-slate-800 mb-2">Still have a question?</h3>
            <p className="text-xs sm:text-sm text-slate-500">Ask us directly. Our team will review and add relevant questions to the FAQ board.</p>
          </div>

          <form onSubmit={handleQuestionSubmit} className="max-w-2xl mx-auto flex flex-col gap-4">
            <div className="relative">
              <textarea 
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="Type your question here..."
                rows="3"
                className="w-full border border-slate-300 bg-white rounded-xl py-3 px-4 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm sm:text-base resize-none"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting || !userQuestion.trim()}
              className="w-full sm:w-auto sm:self-end bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isSubmitting ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Submitting...</>
              ) : (
                <>Submit Question <i className="fa-solid fa-paper-plane text-xs"></i></>
              )}
            </button>

            {/* Success/Error Feedback Messages */}
            {submitStatus === "success" && (
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center gap-3 text-teal-800 animate-fade-in">
                <i className="fa-solid fa-circle-check text-teal-600"></i>
                <p className="text-xs sm:text-sm">Your question has been submitted successfully! We'll review it shortly.</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 animate-fade-in">
                <i className="fa-solid fa-triangle-exclamation text-rose-600"></i>
                <p className="text-xs sm:text-sm">Failed to submit question. Please check your connection and try again.</p>
              </div>
            )}
          </form>
        </div>
      </div>
      
    </div>
  );
}