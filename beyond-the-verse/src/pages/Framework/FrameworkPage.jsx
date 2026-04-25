import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

// Helper function: Numbers ko Roman Numerals me badalne ke liye (e.g. 1 -> I, 2 -> II)
const toRoman = (num) => {
  const romanMap = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X' };
  return romanMap[num] || num;
};

export default function FrameworkPage({ showToast }) {
  const [scales, setScales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScales = async () => {
      try {
        const q = query(collection(db, 'framework_scales'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort ascending by orderNumber
        data.sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));
        setScales(data);
      } catch (error) {
        console.error("Error fetching framework scales:", error);
        if (showToast) showToast("Failed to load the knowledge tree.", false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScales();
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
          Beyond The Verse
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-tight mb-8 text-slate-900">
          The Knowledge Tree
        </h1>
        <p className="text-lg md:text-xl text-slate-600 italic max-w-2xl mx-auto leading-relaxed">
          A comprehensive mapping of reality, moving from the macro physical laws to the micro architecture of human cognition.
        </p>
      </div>

      {/* 📖 Book Content (Continuous Scroll) */}
      <div className="max-w-3xl mx-auto px-6 sm:px-12 mt-20">
        
        {scales.length === 0 ? (
          <div className="text-center py-20 text-slate-500 italic">
            The pages are currently empty. Please add content from the author dashboard.
          </div>
        ) : (
          <div className="space-y-32">
            {scales.map((scale, index) => (
              <article key={scale.id} className="relative">
                
                {/* Chapter Header */}
                <header className="text-center mb-16">
                  <span className="text-sm font-bold tracking-[0.2em] uppercase text-slate-400 mb-4 block">
                    Scale {toRoman(scale.orderNumber)}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 mb-6 capitalize leading-snug">
                    {scale.title}
                  </h2>
                  {scale.description && (
                    <p className="text-lg text-slate-600 italic max-w-xl mx-auto leading-relaxed">
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

                {/* Subjects (Sections of the chapter) */}
                <div className="space-y-20">
                  {scale.subjects && scale.subjects.map((subject) => (
                    <section key={subject.id} className="clear-both">
                      
                      <h3 className="text-2xl font-bold text-slate-800 mb-6 capitalize">
                        {subject.subjectName}
                      </h3>
                      
                      {/* Rationale with Drop Cap (पहला अक्षर बड़ा) */}
                      <p className="text-lg text-slate-700 leading-[1.8] mb-8 text-justify first-letter:text-6xl first-letter:font-bold first-letter:text-slate-900 first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                        {subject.mappingRationale}
                      </p>

                      {/* Inquiry Nodes (As clean bullet points) */}
                      {subject.inquiryNodes && subject.inquiryNodes.length > 0 && (
                        <div className="pl-4 sm:pl-8 border-l-2 border-slate-200">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
                            Lines of Inquiry
                          </h4>
                          <ul className="space-y-4">
                            {subject.inquiryNodes.map((node, idx) => (
                              <li key={idx} className="text-base text-slate-600 leading-relaxed flex items-start gap-3">
                                <span className="text-slate-300 mt-1.5 text-[10px]"><i className="fa-solid fa-circle"></i></span>
                                <span>{node}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </section>
                  ))}

                  {(!scale.subjects || scale.subjects.length === 0) && (
                    <p className="text-center text-slate-400 italic">No text written for this scale yet.</p>
                  )}
                </div>

              </article>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}