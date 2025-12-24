import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { savedArticleService, companyService, roadmapService } from '../api';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../Components/Profile/ProfileInfo';
import { 
  Bookmark, Map, User, TrendingUp, 
  BookOpen, Target, Clock, Star,
  ArrowRight, Eye, Heart, Building,
  GraduationCap, Award
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedArticles, setSavedArticles] = useState([]);
  const [savedRoadmaps, setSavedRoadmaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [stats, setStats] = useState({
    totalViews: 0,
    totalLikes: 0,
    completionRate: 0
  });

  useEffect(() => {
    if (user?.id) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchSavedArticles(),
        fetchUserRoadmaps(),
        fetchCompanies()
      ]);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedArticles = async () => {
    if (!user?.id) return;
    
    try {
      const response = await savedArticleService.getSavedArticles(user.id);
      if (response.success) {
        // Handle different response structures
        const articles = response.data || response.saved_articles || [];
        setSavedArticles(Array.isArray(articles) ? articles : []);
        
        // Calculate stats from saved articles
        calculateStats(Array.isArray(articles) ? articles : []);
      }
    } catch (error) {
      console.error('Error fetching saved articles:', error);
      setSavedArticles([]);
    }
  };

  const fetchUserRoadmaps = async () => {
    if (!user?.id) return;
    
    try {
      const response = await roadmapService.getUserRoadmaps(user.id);
      if (response.success) {
        const roadmaps = response.data || response.roadmaps || [];
        setSavedRoadmaps(Array.isArray(roadmaps) ? roadmaps : []);
      } else {
        console.error('Failed to fetch roadmaps:', response.error);
        setSavedRoadmaps([]);
      }
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
      setSavedRoadmaps([]);
    }
  };

  const fetchCompanies = async () => {
    setCompaniesLoading(true);
    try {
      const response = await companyService.getCompanies();
      if (response && response.success) {
        const companies = response.data || response.message || [];
        const options = companies.map(company => ({
          value: company.name,
          label: company.name
        }));
        setCompanyOptions(options);
      } else {
        setCompanyOptions([]);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanyOptions([]);
    } finally {
      setCompaniesLoading(false);
    }
  };

  const calculateStats = (articles) => {
    const totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0);
    const totalLikes = articles.reduce((sum, article) => sum + (article.likes || 0), 0);
    const completionRate = articles.length > 0 ? Math.min(100, Math.round((articles.filter(article => article.is_selected).length / articles.length) * 100)) : 0;

    setStats({
      totalViews,
      totalLikes,
      completionRate
    });
  };

  const handleNavigateToSavedPosts = () => {
    navigate('/saved-posts');
  };

  const handleNavigateToSavedRoadmaps = () => {
    navigate('/saved-roadmaps');
  };

  const handleNavigateToCreatePost = () => {
    navigate('/post');
  };

  const handleNavigateToRoadmap = () => {
    navigate('/roadmap');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your profile...</p>
          <p className="text-gray-400 text-sm mt-2">Getting everything ready for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with User Info */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.name}</span>!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Track your learning journey, saved content, and career progress all in one place
          </p>
        </div>

        

        {/* Content Grid */}
        <div className=" gap-8 mb-12">
          {/* Profile Information - Main Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              
              <div className="p-6">
                <ProfileInfo 
                  companyOptions={companyOptions} 
                  companiesLoading={companiesLoading} 
                />
              </div>
            </div>
          </div>

         
          
        </div>

        
       
      </div>
    </div>
  );
};

export default Profile;