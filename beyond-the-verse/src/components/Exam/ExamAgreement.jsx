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
            { label: "Shuffling", value: "Questions & options are randomized", icon: "fa-solid fa-shuffle", color: "text-indigo-600" },
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
          title: "Technical Security",
          icon: "fa-solid fa-shield-halved",
          items: [
            { text: "Fullscreen mode is mandatory.", icon: "fa-solid fa-expand" },
            { text: "Tab switching / Minimizing is prohibited.", icon: "fa-solid fa-window-restore" },
            { text: "Split-screen / Multi-window is blocked.", icon: "fa-solid fa-layer-group" },
            { text: "Right-click, Copy, & Paste are disabled.", icon: "fa-solid fa-ban" },
          ]
        },
        {
          title: "Disqualification",
          icon: "fa-solid fa-gavel",
          items: [
            { text: "2 Warnings will lead to auto-submission.", icon: "fa-solid fa-triangle-exclamation" },
            { text: "Opening DevTools will terminate session.", icon: "fa-solid fa-code" },
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
            { label: "शफलिंग", value: "प्रश्न और विकल्प रैंडम होंगे", icon: "fa-solid fa-shuffle", color: "text-indigo-600" },
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
          title: "तकनीकी सुरक्षा",
          icon: "fa-solid fa-shield-halved",
          items: [
            { text: "फुलस्क्रीन मोड अनिवार्य है।", icon: "fa-solid fa-expand" },
            { text: "टैब स्विचिंग / मिनिमाइज करना वर्जित है।", icon: "fa-solid fa-window-restore" },
            { text: "स्प्लिट-स्क्रीन मोड ब्लॉक कर दिया गया है।", icon: "fa-solid fa-layer-group" },
            { text: "राइट-क्लिक, कॉपी और पेस्ट डिसेबल हैं।", icon: "fa-solid fa-ban" },
          ]
        },
        {
          title: "अयोग्यता (Disqualification)",
          icon: "fa-solid fa-gavel",
          items: [
            { text: "2 चेतावनियों के बाद ऑटो-सबमिशन होगा।", icon: "fa-solid fa-triangle-exclamation" },
            { text: "DevTools खोलने पर सत्र समाप्त हो जाएगा।", icon: "fa-solid fa-code" },
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-0 sm:p-4 overflow-hidden">
      <div className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
        
        {/* Header - Fixed at top */}
        <div className="bg-slate-900 px-6 py-6 sm:px-10 sm:py-8 text-white shrink-0">
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1">
              <h1 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">{t.title}</h1>
              <p className="text-slate-400 text-[10px] sm:text-sm mt-1 font-medium uppercase tracking-wider">{t.subtitle}</p>
            </div>
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 shrink-0 border-b-4 border-teal-700 active:border-b-0 active:translate-y-1"
            >
              <i className="fa-solid fa-language text-base"></i>
              <span className="hidden xs:inline">{t.langSwitch}</span>
            </button>
          </div>
        </div>

        {/* Content - Scrollable area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-10 bg-slate-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {t.sections.map((section, idx) => (
              <div key={idx} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 text-slate-800 border-b border-slate-100 pb-3">
                  <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                    <i className={`${section.icon} text-teal-600 text-sm`}></i>
                  </div>
                  <h3 className="font-bold uppercase tracking-widest text-[10px] sm:text-xs">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, iidx) => (
                    <li key={iidx} className="flex items-start gap-3">
                      <i className={`${item.icon} mt-1 text-[12px] sm:text-[14px] ${item.color || 'text-slate-400'}`}></i>
                      <div className="text-[12px] sm:text-sm leading-snug">
                        {item.label && <span className="text-slate-500 font-semibold mr-1.5">{item.label}:</span>}
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

          <div className="mt-6 sm:mt-8 bg-amber-50 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-2xl flex items-start gap-4">
            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0 hidden sm:flex">
              <i className="fa-solid fa-triangle-exclamation text-amber-600"></i>
            </div>
            <div className="text-[11px] sm:text-sm">
              <h4 className="font-black text-amber-900 uppercase tracking-tighter mb-1 flex items-center gap-2">
                <i className="fa-solid fa-triangle-exclamation sm:hidden"></i>
                Important Notice
              </h4>
              <p className="text-amber-800 leading-relaxed font-semibold">
                {lang === 'en' 
                  ? "Split-screen, window resizing, and tab switching are strictly prohibited. Your session will be automatically terminated upon violation."
                  : "स्प्लिट-स्क्रीन, विंडो रीसाइजिंग और टैब स्विचिंग सख्त वर्जित हैं। उल्लंघन करने पर आपका सत्र अपने आप समाप्त हो जाएगा।"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-5 sm:px-10 sm:py-8 border-t border-slate-100 bg-white shrink-0">
          <label className="flex items-start gap-3 sm:gap-4 cursor-pointer group mb-6 sm:mb-8">
            <div className="relative flex items-center justify-center mt-0.5 shrink-0">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer h-5 w-5 sm:h-6 sm:w-6 appearance-none rounded-md border-2 border-slate-300 checked:bg-slate-900 checked:border-slate-900 transition-all cursor-pointer"
              />
              <i className="fa-solid fa-check absolute text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity"></i>
            </div>
            <span className="text-[11px] sm:text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors leading-tight">
              {t.checkbox}
            </span>
          </label>

          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="flex-1 sm:flex-none px-4 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black text-slate-500 hover:bg-slate-100 transition-all border border-slate-200 uppercase tracking-widest"
            >
              {t.cancelButton}
            </button>
            <button 
              onClick={onAccept}
              disabled={!agreed}
              className="flex-[2] bg-slate-900 hover:bg-black disabled:opacity-30 disabled:pointer-events-none text-white px-6 sm:px-12 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black transition-all shadow-xl shadow-slate-900/30 uppercase tracking-widest flex items-center justify-center gap-3 border-b-4 border-black active:border-b-0 active:translate-y-1"
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
