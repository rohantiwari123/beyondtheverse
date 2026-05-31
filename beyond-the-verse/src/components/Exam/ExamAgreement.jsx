import React, { useState } from 'react';

const ExamAgreement = ({ onAccept, onCancel, exam }) => {
  const [agreed, setAgreed] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' or 'hi'

  const questionCount = exam?.questions?.length || 50;
  const passingScore = Math.ceil(questionCount * 0.7);

  const content = {
    en: {
      title: "Exam Agreement & Instructions",
      subtitle: "Please read the following instructions carefully before starting the assessment.",
      sections: [
        {
          title: "Exam Details",
          icon: "fa-solid fa-circle-info",
          items: [
            { label: "Date", value: exam?.date || "7th June 2026", icon: "fa-solid fa-calendar-day" },
            { label: "Time", value: exam?.time || "2:00 PM – 4:00 PM", icon: "fa-solid fa-clock" },
            { label: "Subject", value: exam?.title || "Science – Curiosity (Class 6)", icon: "fa-solid fa-book" },
            { label: "Syllabus", value: exam?.syllabus || "Chapter 1 to Chapter 6", icon: "fa-solid fa-book-open" },
          ]
        },
        {
          title: "Exam Pattern",
          icon: "fa-solid fa-list-check",
          items: [
            { label: "Total Questions", value: `${questionCount} (MCQ)`, icon: "fa-solid fa-clipboard-question" },
            { label: "Passing Marks", value: `70% (${passingScore}/${questionCount})`, icon: "fa-solid fa-award" },
            { label: "Duration", value: "2 Hours", icon: "fa-solid fa-hourglass-half" },
          ]
        },
        {
          title: "Marking Scheme",
          icon: "fa-solid fa-calculator",
          items: [
            { label: "Correct Answer", value: "+1 Mark", icon: "fa-solid fa-circle-check", color: "text-emerald-600" },
            { label: "Wrong Answer", value: "-1 Mark", icon: "fa-solid fa-circle-xmark", color: "text-rose-600" },
            { label: "Unattempted", value: "-1 Mark", icon: "fa-solid fa-circle-minus", color: "text-amber-600" },
          ]
        },
        {
          title: "Exam Rules",
          icon: "fa-solid fa-gavel",
          items: [
            { text: "Split screen will immediately disqualify you.", icon: "fa-solid fa-window-restore" },
            { text: "Opening a new tab will immediately disqualify you.", icon: "fa-solid fa-plus" },
            { text: "Questions and options cannot be copied.", icon: "fa-solid fa-copy" },
            { text: "Any form of malpractice is strictly prohibited.", icon: "fa-solid fa-shield-virus" },
          ]
        }
      ],
      checkbox: "I have read and understood all the instructions and rules mentioned above. I agree to abide by them.",
      startButton: "Start Assessment",
      cancelButton: "Go Back",
      langSwitch: "हिन्दी में पढ़ें"
    },
    hi: {
      title: "परीक्षा समझौता और निर्देश",
      subtitle: "मूल्यांकन शुरू करने से पहले कृपया निम्नलिखित निर्देशों को ध्यान से पढ़ें।",
      sections: [
        {
          title: "परीक्षा का विवरण",
          icon: "fa-solid fa-circle-info",
          items: [
            { label: "तारीख", value: exam?.date || "7 जून 2026", icon: "fa-solid fa-calendar-day" },
            { label: "समय", value: exam?.time || "दोपहर 2:00 – शाम 4:00", icon: "fa-solid fa-clock" },
            { label: "विषय", value: exam?.title || "विज्ञान – जिज्ञासा (कक्षा 6)", icon: "fa-solid fa-book" },
            { label: "पाठ्यक्रम", value: exam?.syllabus || "अध्याय 1 से अध्याय 6", icon: "fa-solid fa-book-open" },
          ]
        },
        {
          title: "परीक्षा पैटर्न",
          icon: "fa-solid fa-list-check",
          items: [
            { label: "कुल प्रश्न", value: `${questionCount} (MCQ)`, icon: "fa-solid fa-clipboard-question" },
            { label: "उत्तीर्ण अंक", value: `70% (${passingScore}/${questionCount})`, icon: "fa-solid fa-award" },
            { label: "अवधि", value: "2 घंटे", icon: "fa-solid fa-hourglass-half" },
          ]
        },
        {
          title: "अंक योजना",
          icon: "fa-solid fa-calculator",
          items: [
            { label: "सही उत्तर", value: "+1 अंक", icon: "fa-solid fa-circle-check", color: "text-emerald-600" },
            { label: "गलत उत्तर", value: "-1 अंक", icon: "fa-solid fa-circle-xmark", color: "text-rose-600" },
            { label: "अनुत्तरित प्रश्न", value: "-1 अंक", icon: "fa-solid fa-circle-minus", color: "text-amber-600" },
          ]
        },
        {
          title: "परीक्षा के नियम",
          icon: "fa-solid fa-gavel",
          items: [
            { text: "स्प्लिट स्क्रीन आपको तुरंत अयोग्य घोषित कर देगी।", icon: "fa-solid fa-window-restore" },
            { text: "नया टैब खोलने पर आपको तुरंत अयोग्य घोषित कर दिया जाएगा।", icon: "fa-solid fa-plus" },
            { text: "प्रश्न और विकल्प कॉपी नहीं किए जा सकते।", icon: "fa-solid fa-copy" },
            { text: "किसी भी प्रकार का कदाचार सख्त वर्जित है।", icon: "fa-solid fa-shield-virus" },
          ]
        }
      ],
      checkbox: "मैंने ऊपर बताए गए सभी निर्देशों और नियमों को पढ़ और समझ लिया है। मैं उनका पालन करने के लिए सहमत हूँ।",
      startButton: "परीक्षा शुरू करें",
      cancelButton: "वापस जाएं",
      langSwitch: "Read in English"
    }
  };

  const t = content[lang];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-fade-in-up my-8">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-8 sm:px-10 text-white relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{t.title}</h1>
              <p className="text-slate-400 text-sm mt-1 font-medium">{t.subtitle}</p>
            </div>
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-white/10 flex items-center gap-2"
            >
              <i className="fa-solid fa-language text-lg"></i>
              {t.langSwitch}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 max-h-[60vh] overflow-y-auto custom-scrollbar bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {t.sections.map((section, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-slate-800 border-b border-slate-100 pb-3">
                  <i className={`${section.icon} text-teal-600`}></i>
                  <h3 className="font-bold uppercase tracking-widest text-xs">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, iidx) => (
                    <li key={iidx} className="flex items-start gap-3">
                      <i className={`${item.icon} mt-1 text-[14px] ${item.color || 'text-slate-400'}`}></i>
                      <div className="text-sm">
                        {item.label && <span className="text-slate-500 font-medium mr-1.5">{item.label}:</span>}
                        <span className={`font-bold ${item.color || 'text-slate-800'}`}>
                          {item.value || item.text}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start gap-4">
            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <i className="fa-solid fa-triangle-exclamation text-amber-600"></i>
            </div>
            <div className="text-sm">
              <h4 className="font-bold text-amber-900 uppercase tracking-tight mb-1">Important Notice</h4>
              <p className="text-amber-800 leading-relaxed font-medium">
                {lang === 'en' 
                  ? "By starting this exam, you acknowledge that your session will be monitored for tab switching and window resizing. Any attempt to bypass these rules will lead to automatic submission."
                  : "इस परीक्षा को शुरू करके, आप स्वीकार करते हैं कि आपके सत्र की टैब स्विचिंग और विंडो रीसाइजिंग के लिए निगरानी की जाएगी। इन नियमों को बायपास करने के किसी भी प्रयास से ऑटोमैटिक सबमिशन हो जाएगा।"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 sm:px-10 sm:py-8 border-t border-slate-100 bg-white">
          <label className="flex items-start gap-4 cursor-pointer group mb-8">
            <div className="relative flex items-center justify-center mt-1">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer h-6 w-6 appearance-none rounded-md border-2 border-slate-300 checked:bg-teal-600 checked:border-teal-600 transition-all cursor-pointer"
              />
              <i className="fa-solid fa-check absolute text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity"></i>
            </div>
            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed">
              {t.checkbox}
            </span>
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onCancel}
              className="px-8 py-4 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all border border-slate-200 uppercase tracking-widest"
            >
              {t.cancelButton}
            </button>
            <button 
              onClick={onAccept}
              disabled={!agreed}
              className="flex-1 bg-slate-900 hover:bg-black disabled:opacity-30 disabled:pointer-events-none text-white px-8 py-4 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-slate-900/20 uppercase tracking-widest flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-bolt"></i>
              {t.startButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamAgreement;
