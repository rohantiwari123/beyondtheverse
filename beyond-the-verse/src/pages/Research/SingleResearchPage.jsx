import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ResearchDetail from '../../components/Research/ResearchDetail';
import ResearchEmptyState from '../../components/Research/ResearchEmptyState';
import ConfirmModal from '../../components/common/ConfirmModal';
import { useAuth } from '../../context/AuthContext';
B
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
    <div className="min-h-screen bg-slate-50 pb-20 pt-2 sm:pt-8">
      <div className="mx-auto max-w-5xl px-0 sm:px-4">
        <div className="sticky top-14 z-30 flex items-center justify-between gap-2 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl sm:static sm:mb-6 sm:rounded-2xl sm:border sm:shadow-sm">
          <button
            onClick={() => navigate('/research')}
            className="flex min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-teal-700"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span className="truncate">Research Hub</span>
          </button>

          {isAdmin && research && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-600 transition-all hover:bg-rose-500 hover:text-white active:scale-95"
            >
              <i className="fa-solid fa-trash"></i>
              <span className="hidden sm:inline">Delete</span>
            </button>
          )}
        </div>

        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Delete Research?"
          message="This action cannot be undone. Are you sure you want to permanently remove this research?"
        />

        {loading ? (
          <div className="flex items-center justify-center py-24 text-teal-600">
            <i className="fa-solid fa-circle-notch fa-spin text-4xl"></i>
          </div>
        ) : research ? (
          <ResearchDetail research={research} />
        ) : (
          <ResearchEmptyState
            message="Research not found"
            subMessage="The research you are looking for might have been removed or does not exist."
          />
        )}
      </div>
    </div>
  );
};

export default SingleResearchPage;
