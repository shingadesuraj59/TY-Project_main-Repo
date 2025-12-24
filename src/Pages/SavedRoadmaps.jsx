import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { roadmapService } from '../api';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Map, Target, Calendar, 
  Clock, Trash2, Play
} from 'lucide-react';
import toast from 'react-hot-toast';

const SavedRoadmaps = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchUserRoadmaps();
  }, [user]);

  const fetchUserRoadmaps = async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await roadmapService.getUserRoadmaps(user.id);
      if (response.success) {
        const roadmaps = response.data || response.roadmaps || [];
        setSavedRoadmaps(Array.isArray(roadmaps) ? roadmaps : []);
      } else {
        toast.error('Failed to load roadmaps');
        setSavedRoadmaps([]);
      }
    } catch (error) {
      toast.error('Error loading learning roadmaps');
      setSavedRoadmaps([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRoadmap = async (roadmapId) => {
    toast.error('Delete functionality coming soon');
  };

  const handleViewRoadmap = (roadmapId) => {
    navigate(`/roadmap/${roadmapId}`);
  };

  const handleCreateNewRoadmap = () => {
    navigate('/roadmap');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently created';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoadmapDuration = (roadmap) => {
    if (!roadmap.roadmap || !Array.isArray(roadmap.roadmap.steps)) return 'Flexible';
    const totalWeeks = roadmap.roadmap.steps.reduce((total, step) => total + (step.duration_weeks || 1), 0);
    return totalWeeks === 1 ? '1 week' : `${totalWeeks} weeks`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-100 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">Loading your roadmaps...</p>
          <p className="text-gray-400 text-sm mt-2">Preparing your learning paths</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-50 via-white to-blue-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/profile')}
            className="flex cursor-pointer items-center space-x-2 text-gray-600 hover:text-blue-600 px-5 py-3 rounded-lg hover:bg-blue-50 border-none focus:outline-none mb-8"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Profile</span>
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-left">My Saved Roadmaps</h1>
          <p className="text-gray-500 text-lg mb-3 text-left">
            Quickly access your personalized preparation guides here.
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleCreateNewRoadmap}
              className="flex cursor-pointer items-center space-x-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition"
            >
              <Map size={18} />
              <span>Create New Roadmap</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {savedRoadmaps.length === 0 ? (
          <div className="bg-white border-2 border-blue-100 rounded-2xl shadow p-12 text-center flex flex-col items-center">
            <Map className="w-14 h-14 text-blue-200 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No roadmaps yet</h3>
            <p className="text-gray-500 mb-8 max-w-md">Create your first roadmap for a guided, organized career prep journey.</p>
            <button
              onClick={handleCreateNewRoadmap}
              className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-8 py-3 rounded-xl shadow transition"
            >
              Create Roadmap
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedRoadmaps.map((roadmap, idx) => {
              const duration = getRoadmapDuration(roadmap);
              return (
                <div
                  key={roadmap.id || idx}
                  className="group bg-white border-2 border-blue-100 rounded-xl shadow-md hover:shadow-lg hover:border-blue-300 transition p-6 flex flex-col"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow text-white">
                      <Target size={22} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {roadmap.roadmapName || roadmap.title || 'Learning Roadmap'}
                      </h2>
                      <p className="text-base text-gray-500">{roadmap.company || 'General Preparation'}</p>
                    </div>
                  </div>
                  {roadmap.userQuery && (
                    <p className="italic text-sm text-gray-500 mb-3">{roadmap.userQuery}</p>
                  )}
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(roadmap.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="mr-1"/>
                        <span>{duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => handleViewRoadmap(roadmap.id)}
                        className="flex cursor-pointer items-center justify-center gap-1 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow transition"
                      >
                        <span>Continue</span>
                        <Play size={16} className="ml-1" />
                      </button>
                      <button
                        onClick={() => handleDeleteRoadmap(roadmap.id)}
                        disabled={deletingId === roadmap.id}
                        className="p-2 cursor-pointer text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-md transition disabled:opacity-50 ml-auto"
                        title="Delete roadmap (Coming soon)"
                      >
                        {deletingId === roadmap.id ? (
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRoadmaps;
