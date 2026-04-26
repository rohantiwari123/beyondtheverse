import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

// Helper function: Numbers ko Roman Numerals me badalne ke liye (e.g. 1 -> I, 2 -> II)
const toRoman = (num) => {
  const romanMap = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X' };
  return romanMap[num] || num;
};

export default function FrameworkPage({ showToast }) {
  const [scales, setScales] = useState([]);
  const [intro, setIntro] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Intro
        const introRef = doc(db, 'settings', 'framework_intro');
        const introSnap = await getDoc(introRef);
        if (introSnap.exists()) {
          setIntro(introSnap.data());
        }

        // Fetch Scales
        const q = query(collection(db, 'framework_scales'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort ascending by orderNumber
        data.sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));
        setScales(data);
      } catch (error) {
        console.error("Error fetching framework data:", error);
        if (showToast) showToast("Failed to load the knowledge tree.", false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex justify-center items-center">
        <i className="fa-solid fa-circle-notch fa-spin text-3xl text-slate-400"></i>
      </div>
    );
  }

  return (
    // 🌟 Book Style Wrapper: Off-white paper background and Serif font
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 font-serif pb-32 selection:bg-slate-300 selection:text-slate-900">
      
      {/* 📖 Book Cover / Title Page */}
      <div className="pt-32 pb-24 px-6 text-center border-b border-slate-300/50 max-w-4xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-6">
          {intro?.pageLabel || 'Beyond The Verse'}
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-tight mb-8 text-slate-900">
          {intro?.pageTitle || 'The Knowledge Tree'}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 italic max-w-2xl mx-auto leading-relaxed text-center">
          {intro?.shortDescription || 'A comprehensive mapping of reality, moving from the macro physical laws to the micro architecture of human cognition.'}
        </p>
      </div>

      {/* Intro Main Body & Thesis */}
      {intro && (intro.mainBody || intro.coreThesis) && (
        <div className="max-w-4xl mx-auto px-6 sm:px-12 mt-16 mb-20 border-b border-slate-300/50 pb-16">
          {intro.mainBody && (
            <div className="text-lg text-slate-700 leading-[1.8] mb-12 text-justify hyphens-auto whitespace-pre-wrap">
              {intro.mainBody}
            </div>
          )}
          {intro.coreThesis && (
            <blockquote className="border-l-4 border-teal-600 pl-6 py-4 my-12 italic text-xl text-slate-800 bg-teal-50/50 rounded-r-lg shadow-sm">
              "{intro.coreThesis}"
            </blockquote>
          )}
        </div>
      )}

      {/* 📖 Book Content (Two-Column Book Spread) */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 mt-20">
        
        {scales.length === 0 ? (
          <div className="text-center py-20 text-slate-500 italic">
            The pages are currently empty. Please add content from the author dashboard.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 lg:gap-x-32 gap-y-32 relative">
            {/* Center Book Spine Line (Visible only on Desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-300/60 -translate-x-1/2"></div>
            
            {scales.map((scale, index) => (
              <article key={scale.id} className="relative">
                
                {/* Header (No forced words, just what YOU named it) */}
                <header className="text-center mb-16">
                  {/* Sirf decorative Roman Numeral (e.g. — I —) */}
                  {Number(scale.orderNumber) > 0 && (
                    <span className="text-sm font-bold tracking-[0.2em] text-slate-400 mb-4 block">
                      — {toRoman(scale.orderNumber)} —
                    </span>
                  )}
                  
                  {/* Yaha sirf wahi title aayega jo tum Admin me likhoge */}
                  <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 mb-6 capitalize leading-snug">
                    {scale.title}
                  </h2>
                  
                  {scale.description && (
                    <p className="text-lg text-slate-600 italic max-w-xl mx-auto leading-relaxed text-justify hyphens-auto">
                      {scale.description}
                    </p>
                  )}
                  
                  {/* Decorative divider */}
                  <div className="flex justify-center gap-2 mt-10 text-slate-300">
                    <i className="fa-solid fa-diamond text-[8px]"></i>
                    <i className="fa-solid fa-diamond text-[8px]"></i>
                    <i className="fa-solid fa-diamond text-[8px]"></i>
                  </div>
                </header>

                {/* Page Content */}
                <div className="space-y-20">
                  <section className="clear-both">
                    {scale.mappingRationale ? (
                      <>
                        {/* Rationale with Drop Cap aur Perfect Justify */}
                        <p className="text-lg text-slate-700 leading-[1.8] mb-12 text-justify hyphens-auto whitespace-pre-wrap first-letter:text-6xl first-letter:font-bold first-letter:text-slate-900 first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                          {scale.mappingRationale}
                        </p>

                        {/* Subsections (Optional Sub Points) */}
                        {scale.subsections && scale.subsections.length > 0 && (
                          <div className="space-y-12 mb-12">
                            {scale.subsections.map((sub, idx) => (
                              <div key={idx} className="clear-both">
                                {sub.heading && (
                                  <h3 className="text-xl font-bold text-slate-800 mb-4 capitalize">
                                    {sub.heading}
                                  </h3>
                                )}
                                {sub.explanation && (
                                  <p className="text-lg text-slate-700 leading-[1.8] text-justify hyphens-auto whitespace-pre-wrap">
                                    {sub.explanation}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Inquiry Nodes (As clean bullet points) */}
                        {scale.inquiryNodes && scale.inquiryNodes.length > 0 && scale.inquiryNodes.some(n => n.trim()) && (
                          <div className="pl-4 sm:pl-8 border-l-2 border-slate-200 mt-12">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
                              Lines of Inquiry
                            </h4>
                            <ul className="space-y-4">
                              {scale.inquiryNodes.filter(n => n.trim()).map((node, idx) => (
                                <li key={idx} className="text-base text-slate-600 leading-relaxed flex items-start gap-3 text-justify hyphens-auto">
                                  <span className="text-slate-300 mt-1.5 text-[10px] shrink-0"><i className="fa-solid fa-circle"></i></span>
                                  <span>{node}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-center text-slate-400 italic">No text written yet.</p>
                    )}
                  </section>
                </div>

              </article>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}