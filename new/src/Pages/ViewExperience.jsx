import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { experienceService, savedArticleService } from '../api';
import { 
  ArrowLeft, Eye, Heart, Bookmark, Calendar, Clock, User, Building, 
  CheckCircle, XCircle, BookmarkCheck, GraduationCap, Target, Award
} from 'lucide-react';
import toast from 'react-hot-toast';

const ViewExperience = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [savingArticle, setSavingArticle] = useState(false);

  useEffect(() => {
    fetchExperience();
  }, [id]);

  const fetchExperience = async () => {
    try {
      const response = await experienceService.getExperience(id);
      if (response.success) {
        setExperience(response.data);
        // Add view count
        await experienceService.addView(id);
      }
    } catch (error) {
      toast.error('Experience not found');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setSavingArticle(true);
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
    } catch (error) {
      toast.success('Article already saved');
    } finally {
      setSavingArticle(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Experience not found</h2>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 px-4 py-2 rounded-lg hover:bg-white transition-all duration-200 border border-transparent hover:border-gray-200"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Feed</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              disabled={savingArticle}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border ${
                isSaved 
                  ? 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100' 
                  : 'bg-white text-gray-700 border-gray-200 hover:text-primary-600 hover:border-primary-200'
              }`}
            >
              {savingArticle ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />
              )}
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-primary-50 via-blue-50 to-purple-50 border-b border-gray-200 p-8">
            {/* Title and Company */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{experience.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                  <Building className="w-5 h-5 text-primary-600" />
                  <span className="font-semibold text-gray-900">{experience.companies?.name}</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">{experience.users?.name}</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">{formatDate(experience.created_at)}</span>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                  experience.type === 'Internship' 
                    ? 'bg-green-100 text-green-800 border-green-200' 
                    : 'bg-blue-100 text-blue-800 border-blue-200'
                }`}>
                  {experience.type}
                </span>
                
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 border-2 border-gray-200">
                  {experience.role}
                </span>
                
                {experience.is_selected !== null && (
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 border-2 ${
                    experience.is_selected 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    {experience.is_selected ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    <span>{experience.is_selected ? 'Selected' : 'Not Selected'}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Academic Information - NEW SECTION */}
            {(experience.branch || experience.graduation_year || experience.cgpa) && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-primary-600" />
                  <span>Academic Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {experience.branch && (
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Branch</p>
                        <p className="font-semibold text-gray-900">{experience.branch}</p>
                      </div>
                    </div>
                  )}
                  
                  {experience.graduation_year && (
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Graduation Year</p>
                        <p className="font-semibold text-gray-900">{experience.graduation_year}</p>
                      </div>
                    </div>
                  )}
                  
                  {experience.cgpa && (
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">CGPA</p>
                        <p className="font-semibold text-gray-900">{experience.cgpa}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-8">
            {/* Stats */}
            <div className="flex items-center space-x-8 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-gray-600">
                <Eye size={20} className="text-blue-600" />
                <span className="font-medium">{experience.views || 0} views</span>
              </div>
              
             

              {experience.process_start_date && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock size={20} className="text-orange-500" />
                  <span className="font-medium">{formatDate(experience.process_start_date)}</span>
                </div>
              )}
            </div>

            {/* Application Process */}
            {experience.application_process && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Process</h2>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                    {experience.application_process}
                  </p>
                </div>
              </section>
            )}

            {/* Interview Rounds */}
            {experience.rounds && experience.rounds.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Interview Rounds</h2>
                <div className="space-y-6">
                  {experience.rounds.map((round, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-primary-200 transition-colors duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Round {index + 1}: {round.round_name || round.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            {round.duration && (
                              <span className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                                <Clock size={16} className="text-blue-600" />
                                <span className="font-medium">{round.duration} minutes</span>
                              </span>
                            )}
                            {round.difficulty && (
                              <span className={`px-3 py-1 rounded-lg text-sm font-semibold border-2 ${getDifficultyColor(round.difficulty)}`}>
                                {round.difficulty} Difficulty
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {round.description && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Round Description</h4>
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-lg border border-gray-200">
                            {round.description}
                          </p>
                        </div>
                      )}
                      
                      {round.questions_asked && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Questions Asked</h4>
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-primary-50 p-4 rounded-lg border border-primary-200">
                            {round.questions_asked}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Preparation Tips */}
            {experience.preparation_tips && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Preparation Tips</h2>
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                    {experience.preparation_tips}
                  </p>
                </div>
              </section>
            )}

            {/* Tags */}
            {experience.tags && experience.tags.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-3">
                  {experience.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary-100 text-primary-800 text-sm font-semibold rounded-lg border-2 border-primary-200 hover:bg-primary-200 transition-colors duration-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Timeline */}
            {(experience.process_start_date || experience.process_end_date) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Process Timeline</h2>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <p className="text-sm text-gray-600 mb-2">Process Started</p>
                      <p className="font-bold text-gray-900 text-lg">{formatDate(experience.process_start_date)}</p>
                    </div>
                    
                    {experience.process_end_date && (
                      <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">Process Ended</p>
                        <p className="font-bold text-gray-900 text-lg">{formatDate(experience.process_end_date)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <Link to="/feed">
            <button className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Explore More Experiences
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewExperience;