import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, Bookmark, User, Building, 
  CheckCircle, XCircle, BookmarkCheck, Share2,
  MoreHorizontal, ArrowRight, Calendar,
  GraduationCap, Target
} from 'lucide-react';
import { savedArticleService } from '../../api';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

const SaveExperienceCard = ({ experience, showRecommendationScore = false, onSaveUpdate }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("saved artcile in expe card : ", experience.interview_experiences)
    console.log("saved artcile in expe card : ", experience.interview_experiences.users.name)
const name = experience.interview_experiences.users.name;
  experience = experience.interview_experiences;
  
  console.log("naming : " , name)

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user?.id) return;
      
      try {
        const response = await savedArticleService.getSavedArticles(user.id);
        if (response.success && Array.isArray(response.data)) {
          const isArticleSaved = response.data.some(
            savedArticle => savedArticle.article_id === experience.id || savedArticle.id === experience.id
          );
          setIsSaved(isArticleSaved);
        }
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };

    checkIfSaved();
  }, [user?.id, experience.id]);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to save articles');
      return;
    }
    
    setIsLoading(true);
    try {
      if (isSaved) {
        await savedArticleService.deleteSavedArticle(user.id, experience.id);
        setIsSaved(false);
        toast.success('Removed from saved articles');
      } else {
        await savedArticleService.saveArticle(user.id, experience.id);
        setIsSaved(true);
        toast.success('Article saved successfully');
      }
      if (onSaveUpdate) onSaveUpdate();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to update saved status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: experience.title,
          text: `Check out this interview experience at ${experience.companies?.name}`,
          url: `${window.location.origin}/experience/${experience.id}`,
        });
      } catch (error) {
        navigator.clipboard.writeText(`${window.location.origin}/experience/${experience.id}`);
        toast.success('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/experience/${experience.id}`);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleReadMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/experience/${experience.id}`);
  };

  const getPreviewText = () => {
    const fullText = `${experience.application_process || ''} ${experience.preparation_tips || ''}`;
    if (!fullText.trim()) return 'Click "Read More" to view the complete interview experience including process details and preparation tips.';
    
    const maxLength = 150;
    return fullText.length > maxLength ? fullText.substring(0, maxLength) + '...' : fullText;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const hasAcademicInfo = experience.branch || experience.graduation_year || experience.cgpa;

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col min-h-[300px] group hover:border-primary-200">
      {/* Card Header */}
      <div className="p-6 pb-4 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <User className="w-7 h-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-gray-900 text-base truncate">
                {name || 'Anonymous'}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                <div className="flex items-center space-x-1">
                  <Building size={14} className="text-primary-600" />
                  <span className="font-medium truncate">{experience.companies?.name || 'Company'}</span>
                </div>
                <span className="text-primary-400">•</span>
                <div className="flex items-center space-x-1">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="font-medium">{formatDate(experience.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
          
         
        </div>

        {/* Experience Title */}
        <Link to={`/experience/${experience.id}`} onClick={(e) => e.stopPropagation()}>
          <h2 className="text-xl font-bold text-gray-900 mb-4 hover:text-primary-600 transition-colors cursor-pointer leading-tight line-clamp-2 group-hover:text-primary-700">
            {experience.title}
          </h2>
        </Link>

        {/* Key Information */}
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <span className={`px-3 py-2 rounded-full text-sm font-bold border-2 ${
            experience.type === 'Internship' 
              ? 'bg-green-50 text-green-800 border-green-200' 
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}>
            {experience.type}
          </span>
          
          <span className="px-3 py-2 rounded-full text-sm font-bold bg-gray-50 text-gray-800 border-2 border-gray-200">
            {experience.role}
          </span>
          
          {experience.is_selected !== null && (
            <span className={`px-3 py-2 rounded-full text-sm font-bold flex items-center space-x-2 border-2 ${
              experience.is_selected 
                ? 'bg-green-50 text-green-800 border-green-200' 
                : 'bg-red-50 text-red-800 border-red-200'
            }`}>
              {experience.is_selected ? <CheckCircle size={16} /> : <XCircle size={16} />}
              <span>{experience.is_selected ? 'Selected' : 'Not Selected'}</span>
            </span>
          )}

          {showRecommendationScore && experience.similarity > 0 && (
            <span className="px-3 py-2 rounded-full text-sm bg-primary-50 text-primary-800 font-bold border-2 border-primary-200">
              🎯 {(experience.similarity * 100).toFixed(0)}% Match
            </span>
          )}
        </div>

        {/* Academic Information */}
        {hasAcademicInfo && (
          <div className="flex items-center flex-wrap gap-3 mb-4 text-sm text-gray-600">
            {experience.branch && (
              <span className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl border border-blue-200 font-medium">
                <GraduationCap size={16} />
                <span>{experience.branch}</span>
              </span>
            )}
            {experience.graduation_year && (
              <span className="bg-green-50 text-green-700 px-3 py-2 rounded-xl border border-green-200 font-medium">
                {experience.graduation_year}
              </span>
            )}
            {experience.cgpa && (
              <span className="flex items-center space-x-1 bg-purple-50 text-purple-700 px-3 py-2 rounded-xl border border-purple-200 font-medium">
                <Target size={16} />
                <span>{experience.cgpa} CGPA</span>
              </span>
            )}
          </div>
        )}

        {/* Content Preview */}
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed text-base line-clamp-3 min-h-[72px]">
            {getPreviewText()}
          </p>
        </div>

        {/* Tags */}
        {experience.tags && experience.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {experience.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-primary-50 text-primary-800 text-sm rounded-lg border border-primary-200 font-bold hover:bg-primary-100 transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
            {experience.tags.length > 3 && (
              <span className="px-3 py-1 bg-blue-50 text-blue-800 text-sm rounded-lg border border-blue-200 font-bold">
                +{experience.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 border-t-2 border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          {/* Left side - Stats */}
          <div className="flex items-center space-x-1 text-gray-600">
            <Eye size={18} />
            <span className="text-sm font-medium ml-1">{experience.views || 0} views</span>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="p-3 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-200 transform hover:scale-110"
              title="Share this experience"
            >
              <Share2 size={18} />
            </button>
            
            <button
              onClick={handleSave}
              disabled={isLoading || !user}
              className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-110 ${
                isSaved 
                  ? 'text-primary-600 bg-primary-50 hover:bg-primary-100' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={!user ? 'Login to save' : isSaved ? 'Remove from saved' : 'Save article'}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />
              )}
            </button>

            {/* Read More Button - ALWAYS VISIBLE */}
            <button
              onClick={handleReadMore}
              className="flex items-center space-x-2 px-5 py-3 cursor-pointer bg-primary-600 hover:bg-primary-700 text-white text-base font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Read More</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveExperienceCard;