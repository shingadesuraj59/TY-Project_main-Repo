import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { savedArticleService } from '../api';
import { useNavigate } from 'react-router-dom';
import SaveExperienceCard from '../Components/Experience/SaveExperienceCard';
import { 
  ArrowLeft, BookOpen, Trash2, Filter,
  Search, X, Download
} from 'lucide-react';
import toast from 'react-hot-toast';

const SavedPosts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedArticles, setSavedArticles] = useState([]);
  // const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchSavedArticles();
  }, [user]);

  // useEffect(() => {
  //   applyFilters();
  // }, [savedArticles, searchTerm, filterType]);

  const fetchSavedArticles = async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await savedArticleService.getSavedArticles(user.id);
      console.log('Saved articles response:', response);
      
      if (response.success) {
        // Handle different response structures
        const articles = response.saved_articles || [];
        setSavedArticles(articles);
      } else {
        toast.error('Failed to load saved articles');
        setSavedArticles([]);
      }
    } catch (error) {
      console.error('Error fetching saved articles:', error);
      toast.error('Error loading saved articles');
      setSavedArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  // const applyFilters = () => {
  //   let filtered = savedArticles;

  //   // Apply search filter
  //   if (searchTerm.trim()) {
  //     const lowerTerm = searchTerm.toLowerCase();
  //     filtered = filtered.filter(article =>
  //       article.title?.toLowerCase().includes(lowerTerm) ||
  //       article.companies?.name?.toLowerCase().includes(lowerTerm) ||
  //       article.role?.toLowerCase().includes(lowerTerm) ||
  //       article.tags?.some(tag => tag.toLowerCase().includes(lowerTerm))
  //     );
  //   }

  //   // Apply type filter
  //   if (filterType !== 'all') {
  //     filtered = filtered.filter(article => article.type === filterType);
  //   }

  //   setFilteredArticles(filtered);
  // };

  const handleDeleteSavedArticle = async (articleId) => {
    if (!user?.id) return;
    
    setDeletingId(articleId);
    try {
      const response = await savedArticleService.deleteSavedArticle(user.id, articleId);
      if (response.success) {
        toast.success('Article removed from saved');
        setSavedArticles(prev => prev.filter(article => article.id !== articleId));
        // Call onSaveUpdate if needed
      } else {
        toast.error('Failed to remove article');
      }
    } catch (error) {
      console.error('Error deleting saved article:', error);
      toast.error('Error removing article');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveUpdate = () => {
    // Refresh the list when an article is unsaved
    fetchSavedArticles();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
  };

  const exportSavedArticles = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      totalArticles: savedArticles.length,
      articles: savedArticles.map(article => ({
        title: article.title,
        company: article.companies?.name,
        role: article.role,
        type: article.type,
        isSelected: article.is_selected,
        createdAt: article.created_at,
        views: article.views,
        url: `${window.location.origin}/experience/${article.id}`
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `saved-articles-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Saved articles exported successfully');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your saved posts...</p>
          <p className="text-gray-400 text-sm mt-2">Fetching your collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Saved Interview Experiences
                  </h1>
                  <p className="text-gray-600">
                    {savedArticles.length} {savedArticles.length === 1 ? 'article' : 'articles'} saved for later
                  </p>
                </div>
              </div>

              {/* <div className="flex items-center space-x-3">
                <button
                  onClick={exportSavedArticles}
                  disabled={savedArticles.length === 0}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
                >
                  <Download size={18} />
                  <span>Export</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Filters */}
       

        {/* Content */}
        {savedArticles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No saved posts yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start exploring interview experiences and save articles that interest you for future reference.
            </p>
            <button
              onClick={() => navigate('/feed')}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore Experiences
            </button>
          </div>
        ) : savedArticles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No matching articles</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or clear filters to see all saved articles.
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1  xl:grid-cols-2 gap-6">
            {savedArticles.map((article, index) => (
              <div key={article.id || index} className="relative group">
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteSavedArticle(article.id)}
                  disabled={deletingId === article.id}
                  className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 transform scale-0 group-hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  title="Remove from saved"
                >
                  {deletingId === article.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>

                {/* Experience Card */}
                <SaveExperienceCard 
                  experience={article}
                  onSaveUpdate={handleSaveUpdate}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPosts;