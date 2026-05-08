import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ResearchDetail from '../../components/Research/ResearchDetail';
import ResearchEmptyState from '../../components/Research/ResearchEmptyState';
import BackButton from '../../components/common/BackButton';

const SingleResearchPage = () => {
  const { researchId } = useParams();
  const [research, setResearch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const docRef = doc(db, 'researches', researchId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setResearch({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching research:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResearch();
  }, [researchId]);

  return (
    // Mobile: Pure App-like White. Desktop: Light grey so the book pops out.
    <div className="min-h-screen bg-white pb-24 transition-colors duration-300 sm:bg-slate-50/80 sm:py-8 lg:py-12">
      
      {/* Wrapper width adjusted slightly larger than the book to allow padding */}
      <div className="mx-auto w-full max-w-[900px] sm:px-6">
        
        {/* NATIVE TOOLBAR: Frosted Glass Sticky on Mobile, Static Transparent on Desktop */}
        <nav className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-slate-100 bg-white/90 px-5 py-3 backdrop-blur-xl transition-all sm:static sm:mb-8 sm:border-none sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
          <BackButton to="/research" label="Library" />
        </nav>

        {/* MAIN CONTAINER: Removed double boxing. Just a transparent structural wrapper now */}
        <main className="relative w-full">
          
          {loading ? (
            // Native & Clean Loading State matches typography
            <div className="flex min-h-[50vh] flex-col items-center justify-center py-[20vh] text-teal-600">
              <i className="fa-solid fa-circle-notch fa-spin text-3xl sm:text-4xl"></i>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-[11px]">
                Loading Manuscript
              </p>
            </div>
          ) : research ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 w-full duration-700">
              {/* ResearchDetail handles its own card/book UI now */}
              <ResearchDetail research={research} />
            </div>
          ) : (
            <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-12">
              <ResearchEmptyState
                message="Document Not Found"
                subMessage="This research might have been removed or the URL is incorrect."
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SingleResearchPage;