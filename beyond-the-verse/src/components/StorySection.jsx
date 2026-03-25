import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function StorySection() {
  const [subjects, setSubjects] = useState([]);
  const [activeDef, setActiveDef] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "subjects"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSubjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. Hero Banner */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 rounded-2xl p-8 md:p-10 text-white shadow-xl overflow-hidden relative border border-teal-700/50">
        <div className="relative z-10 flex flex-col items-start">
          <span className="bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            एक बौद्धिक एवं शैक्षिक पहल
          </span>
          {/* 🌟 Yahan 'notranslate' add kiya hai 🌟 */}
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200 notranslate">
            Beyond The Verse
          </h2>
          <p className="text-teal-100 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
            विज्ञान और दर्शन के कृत्रिम विभाजन को समाप्त कर, वास्तविकता को समझने का एक ईमानदार प्रयास।
          </p>
        </div>
        <i className="fa-solid fa-atom absolute -bottom-10 -right-10 text-[180px] text-teal-600 opacity-20 rotate-12"></i>
      </div>

      {/* 2. Main Philosophy Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
        
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
                {/* 🌟 Yahan 'notranslate' add kiya hai 🌟 */}
                <span className="notranslate font-bold">Beyond The Verse</span> का उद्देश्य इसी कृत्रिम विभाजन को समाप्त करना है। यदि वास्तविकता एक ही है, तो उसे समझने के सभी प्रयास भी परस्पर विरोधी नहीं, बल्कि पूरक होने चाहिए।
              </span>
            </p>
          </div>
        </div>

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

        {/* 🌟 Dynamic Subjects Area 🌟 */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-6">
          <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider text-center flex justify-center items-center gap-2">
            <i className="fa-solid fa-globe text-teal-500"></i> अध्ययन क्षेत्र
          </h4>
          <p className="text-xs text-center text-slate-500 mb-5 max-w-2xl mx-auto">
            किसी भी विषय पर क्लिक करके उसका अर्थ समझें:
          </p>
          
          <div className="flex flex-wrap justify-center gap-2.5">
            {subjects.length === 0 ? (
               <p className="text-sm text-slate-400 italic">No subjects added yet.</p>
            ) : (
              subjects.map((sub) => (
                <div key={sub.id} className="relative group">
                  <button 
                    onClick={() => setActiveDef(activeDef === sub.id ? null : sub.id)}
                    className="bg-white hover:bg-teal-50 border border-slate-200 text-slate-700 hover:text-teal-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-2 outline-none"
                  >
                    {sub.name} <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${activeDef === sub.id ? 'rotate-180 text-teal-600' : ''}`}></i>
                  </button>

                  {/* Definition Tooltip Box */}
                  {activeDef === sub.id && (
                    <div className="absolute z-50 mt-2 w-72 bg-slate-800 text-slate-200 text-xs p-4 rounded-xl shadow-2xl border border-slate-700 left-1/2 -translate-x-1/2">
                      <p className="leading-relaxed">{sub.definition}</p>
                      
                      <button 
                        onClick={() => setActiveDef(null)}
                        className="mt-3 w-full bg-slate-700 hover:bg-slate-600 py-1.5 rounded text-slate-300 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 3. Rules & Ethics */}
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

      {/* 4. Call to Action */}
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
            WhatsApp Group से जुड़ें
          </a>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          यह पहल गैर-व्यावसायिक है। आपका स्वैच्छिक योगदान नीचे दिए गए फॉर्म के माध्यम से स्वीकार किया जाता है।
        </p>
      </div>

    </div>
  );
            }
