import React from "react";

export default function StorySection() {
  return (
    <div className="space-y-6">
      {/* 1. Hero Banner */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 rounded-2xl p-8 md:p-10 text-white shadow-xl overflow-hidden relative border border-teal-700/50">
        <div className="relative z-10 flex flex-col items-start">
          <span className="bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            एक बौद्धिक एवं शैक्षिक पहल
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200">
            Beyond The Verse
          </h2>
          <p className="text-teal-100 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
            विज्ञान और दर्शन के कृत्रिम विभाजन को समाप्त कर, वास्तविकता को समझने का एक ईमानदार प्रयास।
          </p>
        </div>
        {/* Abstract Background Icon */}
        <i className="fa-solid fa-atom absolute -bottom-10 -right-10 text-[180px] text-teal-600 opacity-20 rotate-12"></i>
      </div>

      {/* 2. Main Philosophy Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
        
        {/* The Problem */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-eye-low-vision text-teal-600"></i> पहल के पीछे का उद्देश्य
          </h3>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-slate-600 leading-relaxed space-y-3">
            <p>
              आज के समय में <strong>विज्ञान</strong> एक विषय (subject) बनकर रह गया है। लोग उसे पढ़ते हैं, परीक्षाओं में अंक प्राप्त करते हैं, पर वह उनके जीवन, निर्णयों और दृष्टिकोण में दिखाई नहीं देता। उसी प्रकार, <strong>दर्शन</strong> भी एक बौद्धिक अभ्यास बनकर रह गया है—पढ़ा जाता है, समझा नहीं जाता; दोहराया जाता है, जिया नहीं जाता।
            </p>
            <p>
              एक ओर वह व्यक्ति है जो विज्ञान को केवल बाहरी वस्तुओं तक सीमित मानता है, और दूसरी ओर वह व्यक्ति है जो अध्यात्म या दर्शन के नाम पर विज्ञान को नकार देता है। 
              <span className="block mt-2 font-semibold text-teal-700 bg-teal-50 p-2 rounded-lg border border-teal-100">
                Beyond The Verse का उद्देश्य इसी कृत्रिम विभाजन को समाप्त करना है। यदि वास्तविकता एक ही है, तो उसे समझने के सभी प्रयास भी परस्पर विरोधी नहीं, बल्कि पूरक होने चाहिए।
              </span>
            </p>
          </div>
        </div>

        {/* Core Perspective */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-300 transition-colors shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-microscope text-teal-500 text-lg"></i> वैज्ञानिक दृष्टि
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              यह मंच विज्ञान को केवल सूत्रों और प्रयोगशालाओं तक सीमित नहीं मानता, बल्कि उसे एक <strong>दृष्टिकोण (way of seeing)</strong> के रूप में देखता है। विज्ञान का वास्तविक अर्थ है—अवलोकन, परीक्षण और पूर्वाग्रह-रहित समझ।
            </p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-300 transition-colors shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-brain text-teal-500 text-lg"></i> दर्शन एवं स्व-अवलोकन
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              जिस प्रकार हम बाहरी जगत को वैज्ञानिक दृष्टि से देखते हैं, उसी प्रकार हम अपने भीतर—विचारों, भावनाओं और प्रतिक्रियाओं—का भी अवलोकन कर सकते हैं। यह दर्शन का वास्तविक उद्देश्य है।
            </p>
          </div>
        </div>

        {/* Subjects Badges */}
        <div>
          <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider text-center">
            विस्तृत अध्ययन क्षेत्र
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {["भौतिकी (Physics)", "रसायन (Chemistry)", "जीवविज्ञान (Biology)", "मनोविज्ञान (Psychology)", "न्यूरोसाइंस (Neuroscience)", "समाजशास्त्र (Sociology)", "मानवशास्त्र (Anthropology)"].map((subject, idx) => (
              <span key={idx} className="bg-slate-100 hover:bg-teal-50 border border-slate-200 text-slate-700 hover:text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-default">
                {subject}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Rules & Ethics (Grid) */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-6 text-center text-teal-400">
          आचार संहिता एवं बौद्धिक दृष्टि
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <i className="fa-solid fa-scale-balanced text-teal-400 text-xl mt-1"></i>
            <div>
              <h5 className="font-bold text-slate-200">वस्तुनिष्ठता</h5>
              <p className="text-xs text-slate-400 mt-1">विचारों को तर्क और प्रमाण के आधार पर परखा जाएगा, न कि व्यक्तिगत विश्वास के आधार पर।</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <i className="fa-solid fa-shield-halved text-teal-400 text-xl mt-1"></i>
            <div>
              <h5 className="font-bold text-slate-200">बौद्धिक ईमानदारी</h5>
              <p className="text-xs text-slate-400 mt-1">किसी भी निष्कर्ष को बिना पर्याप्त जांच और अवलोकन के स्वीकार नहीं किया जाएगा।</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <i className="fa-solid fa-comments text-teal-400 text-xl mt-1"></i>
            <div>
              <h5 className="font-bold text-slate-200">संवाद का उद्देश्य</h5>
              <p className="text-xs text-slate-400 mt-1">हमारा उद्देश्य स्पष्टता और समझ विकसित करना है—न कि विवाद में विजय प्राप्त करना।</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <i className="fa-solid fa-ban text-teal-400 text-xl mt-1"></i>
            <div>
              <h5 className="font-bold text-slate-200">नो-स्पैम नीति</h5>
              <p className="text-xs text-slate-400 mt-1">अप्रासंगिक संदेश, प्रचार सामग्री और भावनात्मक प्रतिक्रियाओं को प्रोत्साहित नहीं किया जाएगा।</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Call to Action / Invitation */}
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 text-center space-y-4">
        <p className="text-teal-800 font-medium italic">
          "यह एक निमंत्रण है—सिर्फ जानकारी इकट्ठा करने का नहीं, बल्कि देखने, परखने और समझने की एक ईमानदार प्रक्रिया में शामिल होने का।"
        </p>
        
        <div className="flex justify-center pt-2">
          <a 
            href="https://chat.whatsapp.com/EXTq8cGEOcwAcrZN8fr4qw?mode=gi_t_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold py-3 px-6 rounded-xl transition-transform transform hover:scale-105 shadow-lg shadow-green-500/30"
          >
            <i className="fa-brands fa-whatsapp text-2xl"></i>
            WhatsApp Group से जुड़ें
          </a>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          यह पहल गैर-व्यावसायिक है। आपका स्वैच्छिक योगदान नीचे दिए गए फॉर्म के माध्यम से स्वीकार किया जाता है।
        </p>
      </div>

    </div>
  );
        }
