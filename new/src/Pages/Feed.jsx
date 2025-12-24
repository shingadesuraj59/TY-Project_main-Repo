import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { experienceService } from '../api';
import ExperienceCard from '../Components/Experience/ExperienceCard.jsx';
import SearchBar from '../Components/SearchBar';
import { Sparkles, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Feed = () => {
  const { user } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [recommendedExperiences, setRecommendedExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    Promise.all([fetchExperiences(), fetchRecommendedExperiences()])
      .finally(() => setIsLoading(false));
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [experiences, searchTerm]);

  const fetchExperiences = async () => {
    try {
      if (!user?.id) return;
      const response = await experienceService.getAllExperiences(user.id);
      if (response.success) {
        setExperiences(response.data);
      } else {
        toast.error('Failed to load experiences');
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Failed to fetch experiences');
    }
  };

  const fetchRecommendedExperiences = async () => {
    try {
      if (!user?.id) return;
      const response = await experienceService.getRecommendedExperiences(user.id);
      if (response.success) {
        setRecommendedExperiences(response.data);
      } else {
        console.log('No recommendations available or failed to fetch');
      }
    } catch (error) {
      console.error('Error fetching recommended experiences:', error);
    }
  };

  const applyFilters = () => {
    if (!searchTerm.trim()) {
      setFilteredExperiences(experiences);
      return;
    }
    
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = experiences.filter(exp =>
      exp.title?.toLowerCase().includes(lowerTerm) ||
      exp.companies?.name?.toLowerCase().includes(lowerTerm) ||
      exp.users?.name?.toLowerCase().includes(lowerTerm) ||
      exp.role?.toLowerCase().includes(lowerTerm) ||
      exp.tags?.some(tag => tag.toLowerCase().includes(lowerTerm))
    );
    setFilteredExperiences(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm(''); // Clear search when switching tabs
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-20 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8"> {/* Increased max-width */}
        {/* Enhanced Feed Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-white to-primary-50/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-primary-100 hover:shadow-2xl transition-all duration-300">
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-700 bg-clip-text text-transparent mb-4">
                Experience Feed
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                Discover interview experiences from the community
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <SearchBar 
                  onSearch={handleSearch} 
                  placeholder="Search experiences, companies, roles..." 
                  className="w-full"
                />
              </div>
            </div>

            {/* Enhanced Tab Navigation */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center bg-primary-50/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-primary-200">
                <button
                  onClick={() => handleTabChange('all')}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 ${
                    activeTab === 'all'
                      ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-white/80'
                  }`}
                >
                  <span className="text-lg cursor-pointer">All Experiences</span>
                  {/* <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
                    activeTab === 'all'
                      ? 'bg-white/20 text-white'
                      : 'bg-primary-100 text-primary-700'
                  }`}>
                    {experiences.length}
                  </span> */}
                </button>
                
                {recommendedExperiences.length > 0 && (
                  <button
                    onClick={() => handleTabChange('recommended')}
                    className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 ${
                      activeTab === 'recommended'
                        ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-white/80'
                    }`}
                  >
                    <Sparkles size={18} className="text-yellow-500" />
                    <span className="text-lg cursor-pointer">Recommended</span>
                    {/* <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
                      activeTab === 'recommended'
                        ? 'bg-gradient-to-r from-yellow-200/30 to-orange-200/30 text-white'
                        : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700'
                    }`}>
                      {recommendedExperiences.length}
                    </span> */}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feed Content - Increased width */}
        <div className="max-w-5xl mx-auto"> {/* Increased max-width */}
          {activeTab === 'all' ? (
            // All Experiences Tab
            <>
              {searchTerm && (
                <div className="bg-gradient-to-r from-blue-50 to-primary-50 border-2 border-blue-200 rounded-2xl p-6 mb-8 text-center shadow-lg">
                  <p className="text-blue-800 font-medium">
                    Showing results for "<span className="font-bold text-blue-900">{searchTerm}</span>" 
                    <span className="ml-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold shadow-sm">
                      {filteredExperiences.length} results
                    </span>
                  </p>
                </div>
              )}

              {filteredExperiences.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* Two-column grid for larger screens */}
                  {filteredExperiences.map((experience, index) => (
                    <div 
                      key={`${experience.id}-${index}`} 
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ExperienceCard 
                        experience={experience} 
                        onSaveUpdate={() => {/* Handle save update if needed */}}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gradient-to-br from-white to-primary-50/30 rounded-3xl border-2 border-primary-100 shadow-xl">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Filter className="w-10 h-10 text-primary-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    No experiences found
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                    {searchTerm
                      ? 'Try adjusting your search terms to see more results.'
                      : 'Be the first to share an interview experience!'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-2xl hover:from-primary-700 hover:to-blue-700 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            // Recommended Experiences Tab
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 border-2 border-primary-200 rounded-3xl p-8 text-center shadow-xl">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                    Personalized Recommendations
                  </h2>
                </div>
                <p className="text-gray-700 text-xl max-w-2xl mx-auto font-medium">
                  Based on your interests in{' '}
                  <span className="font-bold text-primary-700 bg-primary-100 px-3 py-1 rounded-full">
                    {user?.company_interest?.join(', ')}
                  </span>{' '}
                  and{' '}
                  <span className="font-bold text-primary-700 bg-primary-100 px-3 py-1 rounded-full">
                    {user?.role_interest?.join(', ')}
                  </span>
                </p>
              </div>

              {recommendedExperiences.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* Two-column grid */}
                  {recommendedExperiences.map((experience, index) => (
                    <div 
                      key={`rec-${experience.id}-${index}`} 
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ExperienceCard 
                        experience={experience} 
                        showRecommendationScore 
                        onSaveUpdate={() => {/* Handle save update if needed */}}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gradient-to-br from-white to-primary-50/30 rounded-3xl border-2 border-primary-100 shadow-xl">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Sparkles className="w-10 h-10 text-primary-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    No recommendations yet
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                    Complete your profile setup to get personalized recommendations based on your interests!
                  </p>
                  <button className="px-10 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-2xl hover:from-primary-700 hover:to-purple-700 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Update your profile
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;























// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../Context/AuthContext';
// import { experienceService } from '../api';
// import ExperienceCard from '../Components/Experience/ExperienceCard.jsx';
// import SearchBar from '../Components/SearchBar';
// import { Sparkles, Filter } from 'lucide-react';
// import toast from 'react-hot-toast';

// const Feed = () => {
//   const { user } = useAuth();
//   const [experiences, setExperiences] = useState([]);
//   const [recommendedExperiences, setRecommendedExperiences] = useState([]);
//   const [filteredExperiences, setFilteredExperiences] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     if (!user) {
//       setIsLoading(false);
//       return;
//     }
//     setIsLoading(true);
//     Promise.all([fetchExperiences(), fetchRecommendedExperiences()])
//       .finally(() => setIsLoading(false));
//   }, [user]);

//   useEffect(() => {
//     applyFilters();
//   }, [experiences, searchTerm]);

//   const fetchExperiences = async () => {
//     try {
//       if (!user?.id) return;
//       const response = await experienceService.getAllExperiences(user.id);
//       if (response.success) {
//         setExperiences(response.data);
//       } else {
//         toast.error('Failed to load experiences');
//       }
//     } catch (error) {
//       console.error('Error fetching experiences:', error);
//       toast.error('Failed to fetch experiences');
//     }
//   };

//   const fetchRecommendedExperiences = async () => {
//     try {
//       if (!user?.id) return;
//       const response = await experienceService.getRecommendedExperiences(user.id);
//       if (response.success) {
//         setRecommendedExperiences(response.data);
//       } else {
//         console.log('No recommendations available or failed to fetch');
//       }
//     } catch (error) {
//       console.error('Error fetching recommended experiences:', error);
//     }
//   };

//   const applyFilters = () => {
//     if (!searchTerm.trim()) {
//       setFilteredExperiences(experiences);
//       return;
//     }
    
//     const lowerTerm = searchTerm.toLowerCase();
//     const filtered = experiences.filter(exp =>
//       exp.title?.toLowerCase().includes(lowerTerm) ||
//       exp.companies?.name?.toLowerCase().includes(lowerTerm) ||
//       exp.users?.name?.toLowerCase().includes(lowerTerm) ||
//       exp.role?.toLowerCase().includes(lowerTerm) ||
//       exp.tags?.some(tag => tag.toLowerCase().includes(lowerTerm))
//     );
//     setFilteredExperiences(filtered);
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setSearchTerm(''); // Clear search when switching tabs
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white px-4">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-20 border-b-4 border-primary-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium text-sm sm:text-base">Loading feed...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
//         {/* Enhanced Feed Header - Fully Responsive */}
//         <div className="text-center mb-6 sm:mb-8">
//           <div className="bg-gradient-to-r from-white to-primary-50/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg sm:shadow-xl border border-primary-100 sm:border-2 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300">
//             {/* Title Section - Mobile Optimized */}
//             <div className="mb-4 sm:mb-6 lg:mb-8">
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-700 bg-clip-text text-transparent mb-2 sm:mb-4">
//                 Experience Feed
//               </h1>
//               <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl lg:max-w-2xl mx-auto font-medium px-2">
//                 Discover interview experiences from the community
//               </p>
//             </div>

//             {/* Enhanced Search Bar - Responsive Width */}
//             <div className="max-w-full sm:max-w-lg lg:max-w-2xl mx-auto mb-4 sm:mb-6 lg:mb-8">
//               <div className="relative">
//                 <SearchBar 
//                   onSearch={handleSearch} 
//                   placeholder="Search experiences, companies, roles..." 
//                   className="w-full text-sm sm:text-base"
//                 />
//               </div>
//             </div>

//             {/* Enhanced Tab Navigation - Much Better Mobile Spacing */}
//             <div className="flex items-center justify-center px-2">
//               <div className="flex items-center bg-gray-100/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 w-full sm:w-auto max-w-full">
//                 <button
//                   onClick={() => handleTabChange('all')}
//                   className={`flex-1 sm:flex-none px-4 sm:px-6 lg:px-8 py-3 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-medium sm:font-bold transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 transform hover:scale-105 text-sm sm:text-sm lg:text-base whitespace-nowrap min-w-0 ${
//                     activeTab === 'all'
//                       ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-md sm:shadow-lg'
//                       : 'text-gray-600 hover:text-primary-600 hover:bg-white/80'
//                   }`}
//                 >
//                   <span className="cursor-pointer truncate">All Experiences</span>
//                 </button>
                
//                 {recommendedExperiences.length > 0 && (
//                   <button
//                     onClick={() => handleTabChange('recommended')}
//                     className={`flex-1 sm:flex-none px-4 sm:px-6 lg:px-8 py-3 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-medium sm:font-bold transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 transform hover:scale-105 text-sm sm:text-sm lg:text-base whitespace-nowrap min-w-0 ml-2 ${
//                       activeTab === 'recommended'
//                         ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-md sm:shadow-lg'
//                         : 'text-gray-600 hover:text-primary-600 hover:bg-white/80'
//                     }`}
//                   >
//                     <Sparkles size={14} className="text-yellow-500 sm:w-[16px] sm:h-[16px] flex-shrink-0" />
//                     <span className="cursor-pointer truncate">Recommended</span>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Feed Content - Responsive Grid System */}
//         <div className="max-w-full sm:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
//           {activeTab === 'all' ? (
//             // All Experiences Tab
//             <>
//               {searchTerm && (
//                 <div className="bg-gradient-to-r from-blue-50 to-primary-50 border border-blue-200 sm:border-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8 text-center shadow-md sm:shadow-lg">
//                   <p className="text-blue-800 font-medium text-sm sm:text-base flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
//                     <span>
//                       Showing results for "<span className="font-bold text-blue-900">{searchTerm}</span>"
//                     </span>
//                     <span className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-bold shadow-sm">
//                       {filteredExperiences.length} results
//                     </span>
//                   </p>
//                 </div>
//               )}

//               {filteredExperiences.length > 0 ? (
//                 <div className="grid grid-cols-1  xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
//                   {filteredExperiences.map((experience, index) => (
//                     <div 
//                       key={`${experience.id}-${index}`} 
//                       className="animate-fade-in-up w-full"
//                       style={{ animationDelay: `${index * 100}ms` }}
//                     >
//                       <ExperienceCard 
//                         experience={experience} 
//                         onSaveUpdate={() => {/* Handle save update if needed */}}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-white to-primary-50/30 rounded-2xl sm:rounded-3xl border border-primary-100 sm:border-2 shadow-lg sm:shadow-xl mx-2 sm:mx-0">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-primary-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
//                     <Filter className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary-600" />
//                   </div>
//                   <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
//                     No experiences found
//                   </h3>
//                   <p className="text-gray-600 mb-6 sm:mb-8 max-w-xs sm:max-w-md mx-auto text-sm sm:text-base lg:text-lg px-4">
//                     {searchTerm
//                       ? 'Try adjusting your search terms to see more results.'
//                       : 'Be the first to share an interview experience!'}
//                   </p>
//                   {searchTerm && (
//                     <button
//                       onClick={() => setSearchTerm('')}
//                       className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl sm:rounded-2xl hover:from-primary-700 hover:to-blue-700 font-medium sm:font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
//                     >
//                       Clear search
//                     </button>
//                   )}
//                 </div>
//               )}
//             </>
//           ) : (
//             // Recommended Experiences Tab
//             <div className="space-y-6 sm:space-y-8">
//               <div className="bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 border border-primary-200 sm:border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-center shadow-lg sm:shadow-xl mx-2 sm:mx-0">
//                 <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
//                   <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg sm:shadow-xl">
//                     <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
//                   </div>
//                   <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent text-center sm:text-left">
//                     Personalized Recommendations
//                   </h2>
//                 </div>
//                 <p className="text-gray-700 text-sm sm:text-base lg:text-xl max-w-full sm:max-w-2xl mx-auto font-medium px-2">
//                   Based on your interests in{' '}
//                   <span className="font-bold text-primary-700 bg-primary-100 px-2 py-1 rounded-full text-xs sm:text-sm lg:text-base">
//                     {user?.company_interest?.join(', ')}
//                   </span>{' '}
//                   and{' '}
//                   <span className="font-bold text-primary-700 bg-primary-100 px-2 py-1 rounded-full text-xs sm:text-sm lg:text-base">
//                     {user?.role_interest?.join(', ')}
//                   </span>
//                 </p>
//               </div>

//               {recommendedExperiences.length > 0 ? (
//                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
//                   {recommendedExperiences.map((experience, index) => (
//                     <div 
//                       key={`rec-${experience.id}-${index}`} 
//                       className="animate-fade-in-up w-full"
//                       style={{ animationDelay: `${index * 100}ms` }}
//                     >
//                       <ExperienceCard 
//                         experience={experience} 
//                         showRecommendationScore 
//                         onSaveUpdate={() => {/* Handle save update if needed */}}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-white to-primary-50/30 rounded-2xl sm:rounded-3xl border border-primary-100 sm:border-2 shadow-lg sm:shadow-xl mx-2 sm:mx-0">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-primary-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
//                     <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary-600" />
//                   </div>
//                   <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
//                     No recommendations yet
//                   </h3>
//                   <p className="text-gray-600 mb-6 sm:mb-8 max-w-xs sm:max-w-md mx-auto text-sm sm:text-base lg:text-lg px-4">
//                     Complete your profile setup to get personalized recommendations based on your interests!
//                   </p>
//                   <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl sm:rounded-2xl hover:from-primary-700 hover:to-purple-700 font-medium sm:font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base">
//                     Update your profile
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feed;

