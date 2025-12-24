import React, { useState } from 'react';
import { BookOpen, Trash2 } from 'lucide-react';
import { savedArticleService } from '../../api';
import ExperienceCard from '../Experience/ExperienceCard.jsx';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';

const SavedArticles = ({ savedArticles, setSavedArticles }) => {
  const { user } = useAuth();
  const [deletingArticleId, setDeletingArticleId] = useState(null);

  const handleDeleteSavedArticle = async (articleId) => {
    setDeletingArticleId(articleId);
    
    try {
      const response = await savedArticleService.deleteSavedArticle(user.id, articleId);
      if (response.success) {
        toast.success('Article removed from saved list');
        setSavedArticles(prevArticles => 
          prevArticles.filter(item => item.interview_experiences.id !== articleId)
        );
      } else {
        toast.error('Failed to remove article');
      }
    } catch (error) {
      console.error('Error deleting saved article:', error);
      toast.error('Error removing article');
    } finally {
      setDeletingArticleId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Saved Articles ({savedArticles.length})
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your bookmarked interview experiences and insights
          </p>
        </div>
      </div>
      
      {/* Content */}
      {savedArticles.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No saved articles found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Start saving interview experiences that interest you to build your knowledge library!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedArticles.map(({ interview_experiences }) => (
            <div key={interview_experiences.id} className="relative group">
              <ExperienceCard experience={interview_experiences} />
              
              <button
                onClick={() => handleDeleteSavedArticle(interview_experiences.id)}
                disabled={deletingArticleId === interview_experiences.id}
                className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110"
                title="Remove from saved articles"
              >
                {deletingArticleId === interview_experiences.id ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticles;


