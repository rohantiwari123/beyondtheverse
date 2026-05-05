import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ResearchDetail from '../../components/Research/ResearchDetail';
import ResearchEmptyState from '../../components/Research/ResearchEmptyState';
import ConfirmModal from '../../components/common/ConfirmModal';
import { useAuth } from '../../context/AuthContext';

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
    <div className="max-w-4xl mx-auto py-10 px-4 mt-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/research')}
          className="flex items-center gap-2 px-4 py-2 w-fit bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-teal-600 hover:border-teal-200 transition-colors font-medium text-sm shadow-sm"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Research Hub
        </button>
        
        {isAdmin && research && (
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2 w-fit bg-white border border-rose-200 rounded-xl text-rose-500 hover:text-white hover:bg-rose-500 hover:border-rose-500 transition-all font-medium text-sm shadow-sm active:scale-95"
          >
            <i className="fa-solid fa-trash"></i> Delete
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
        <div className="flex justify-center items-center py-20">
          <i className="fa-solid fa-circle-notch fa-spin text-4xl text-teal-600"></i>
        </div>
      ) : research ? (
        <ResearchDetail research={research} />
      ) : (
        <ResearchEmptyState 
          message="Research not found" 
          subMessage="The research you are looking for might have been removed or doesn't exist." 
        />
      )}
    </div>
  );
};

export default SingleResearchPage;