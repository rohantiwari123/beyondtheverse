import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ResearchDetail from '../../components/Research/ResearchDetail';
import ResearchEmptyState from '../../components/Research/ResearchEmptyState';
import ConfirmModal from '../../components/common/ConfirmModal';
import { useAuth } from '../../context/AuthContext';
// Shared BackButton Import (Path aap apne folder structure ke hisaab se adjust kar sakte hain)
import BackButton from '../../components/common/BackButton';

const SingleResearchPage = ({ showToast }) => {
  const { researchId } = useParams();
  const navigate = useNavigate();
  const [research, setResearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isAdmin } = useAuth();

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

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'researches', researchId));
      if(showToast) showToast("Research deleted successfully!", true);
      navigate('/research');
    } catch (error) {
      console.error("Error deleting research:", error);
      if(showToast) showToast("Failed to delete research. Please try again.", false);
    }
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 ease-in-out sm:bg-slate-50/50 pb-20">
      
      <div className="mx-auto w-full max-w-screen-xl lg:px-8">
        
        {/* DYNAMIC NAVIGATION - Edge-to-Edge on Mobile */}
        <nav className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-slate-100 bg-white/80 px-[5vw] py-3 backdrop-blur-md transition-all sm:static sm:mb-8 sm:border-none sm:bg-transparent sm:px-0 sm:py-6 sm:backdrop-blur-none">
          
          {/* Replaced custom button with your shared BackButton component */}
          <BackButton to="/research" label="Library" />

          {isAdmin && research && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex h-9 items-center justify-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 text-xs font-bold text-rose-600 transition-all hover:bg-rose-600 hover:text-white sm:h-11 sm:px-6 sm:text-sm active:scale-95 shadow-sm"
            >
              <i className="fa-solid fa-trash-can"></i>
              <span className="hidden sm:inline">Delete Article</span>
            </button>
          )}
        </nav>

        {/* FLUID MAIN CONTENT */}
        <main className="relative w-full overflow-hidden break-words">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-[20vh] text-teal-600">
              <i className="fa-solid fa-circle-notch fa-spin text-3xl sm:text-4xl"></i>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">Loading Insight</p>
            </div>
          ) : research ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ResearchDetail research={research} />
            </div>
          ) : (
            <div className="px-6 py-12">
              <ResearchEmptyState
                message="Article not found"
                subMessage="This research might have been archived or moved to a different field."
              />
            </div>
          )}
        </main>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Permanently Delete?"
        message="This will remove the research, its sources, and metadata from the public library."
      />
    </div>
  );
};

export default SingleResearchPage;