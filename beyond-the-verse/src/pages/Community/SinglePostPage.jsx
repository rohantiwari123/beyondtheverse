import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../../services/firebaseServices';
import PostCard from '../../components/Community/PostCard';
import BackButton from '../../components/common/BackButton';

export default function SinglePostPage({ showToast }) {
  const { postId } = useParams(); // URL se ID nikalne ke liye
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const data = await getPostById(postId);
        if (data) {
          setPost(data);
        } else {
          if(showToast) showToast("This post has been deleted or does not exist.", false);
          navigate('/community'); // Post na mile to wapas bhej do
        }
      } catch (error) {
        if(showToast) showToast("Error loading post.", false);
        navigate('/community');
      } finally {
        setLoading(false);
      }
    };

    if (postId) fetchSinglePost();
  }, [postId, navigate, showToast]);

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20 pt-6 sm:pt-10 font-sans">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
        
        {/* Back Button */}
        <div className="px-4 sm:px-6 lg:px-8">
          <BackButton />
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <i className="fa-solid fa-circle-notch fa-spin text-3xl text-teal-500 mb-4"></i>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Loading Thought...</span>
          </div>
        ) : post ? (
          <div className="px-0 sm:px-6 lg:px-8">
            {/* Seedha apka bana banaya PostCard use kar lenge */}
            <PostCard post={post} showToast={showToast} />
          </div>
        ) : null}

      </div>
    </div>
  );
                 }
