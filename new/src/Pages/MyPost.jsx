import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { experienceService } from '../api';
import { useNavigate } from 'react-router-dom';
import MyPostExperienceCard from '../Components/Experience/MyPostExperienceCard'; // Use the new specialized card
import { ArrowLeft, BookOpen, Trash2, Pencil, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const MyPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchMyPosts();
    // eslint-disable-next-line
  }, [user]);

  const fetchMyPosts = async () => {
    setIsLoading(true);
    try {
      const response = await experienceService.getMyExperiences();
      if (response.success) {
        setMyPosts(response.data || []);
      } else {
        toast.error('Failed to load your posts');
        setMyPosts([]);
      }
    } catch (error) {
      toast.error('Error loading posts');
      setMyPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    setDeletingId(postId);
    try {
      const response = await experienceService.deleteExperience(postId);
      if (response.success) {
        toast.success('Post deleted');
        setMyPosts(prev => prev.filter(post => post.id !== postId));
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      toast.error('Error deleting post');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/post?edit=${postId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your posts...</p>
          <p className="text-gray-400 text-sm mt-2">Fetching your experiences</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-4 py-2 rounded-xl hover:bg-white transition-all duration-200 border border-transparent hover:border-blue-200"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Profile</span>
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    My Interview Experiences
                  </h1>
                  <p className="text-gray-600">
                    {myPosts.length} {myPosts.length === 1 ? 'post' : 'posts'} shared
                  </p>
                </div>
              </div>
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 shadow-lg"
                onClick={() => navigate('/post')}
              >
                <PlusCircle size={20}/>
                <span>Add New Experience</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {myPosts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No posts shared yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Click below to start sharing your own interview experiences.
            </p>
            <button
              onClick={() => navigate('/post')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Add Experience
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {myPosts.map((post, index) => (
              <div key={post.id || index} className="relative">
                {/* Actions */}
                <div className="absolute top-2 right-2 z-10 flex space-x-2">
{/*                   <button
                    onClick={() => handleEditPost(post.id)}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow transition-all duration-200"
                    title="Edit Post"
                  >
                    <Pencil size={16} />
                  </button> */}
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    disabled={deletingId === post.id}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete Post"
                  >
                    {deletingId === post.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
                <MyPostExperienceCard
                  experience={post}
                  showRecommendationScore={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPost;
