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
    // Mobile: Pure App-like White. Desktop: Professional Slate for depth.
    <div className="min-h-screen bg-white transition-colors duration-300 sm:bg-slate-200/50">
      
      {/* NATIVE TOOLBAR: Frosted Glass Sticky on Mobile, Static Transparent on Desktop */}
      <nav className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-3 backdrop-blur-xl transition-all sm:static sm:bg-transparent sm:px-8 sm:py-6 sm:border-none">
        <BackButton to="/research" label="Research Archive" />
      </nav>

      {/* MAIN CONTAINER */}
      <main className="relative w-full">
        
        {loading ? (
          <div className="flex min-h-[70vh] flex-col items-center justify-center text-teal-600">
            <div className="h-10 w-10 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin mb-6"></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Retrieving Digital Manuscript
            </p>
          </div>
        ) : research ? (
          <div className="animate-in fade-in slide-in-from-bottom-6 w-full duration-1000 ease-out">
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
  );
};

export default SingleResearchPage;