import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../Context/AuthContext';
import { companyService, roadmapService } from '../api';
import Quiz from '../Components/Roadmap/Quiz';
import ApiKeyModal from '../Components/Roadmap/ApiKeyModal';
import CompanySelection from '../Components/Roadmap/CompanySelection';
import RoadmapGenerator from '../Components/Roadmap/RoadmapGenerator';
import LoadingScreen from '../Components/Roadmap/LoadingScreen';
import RoadmapDisplay from '../Components/Roadmap/RoadmapDisplay';
import SaveRoadmapModal from '../Components/Roadmap/SaveRoadmapModal';

const Roadmap = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState('apiKey');
  const [apiKey, setApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [skipApiKey, setSkipApiKey] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Create user-specific localStorage keys
  const getUserApiKeyName = (userId) => `gemini_api_key_${userId}`;
  const getUserSkipKeyName = (userId) => `roadmap_skip_api_key_${userId}`;
  const getQuizCompletedKey = (userId) => `quiz_completed_${userId}`;

  useEffect(() => {
    if (!user?.id) return;

    // Check for existing API key first
    const userApiKeyName = getUserApiKeyName(user.id);
    const userSkipKeyName = getUserSkipKeyName(user.id);
    
    const storedApiKey = localStorage.getItem(userApiKeyName);
    const skippedApiKey = localStorage.getItem(userSkipKeyName);
    
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setHasApiKey(true);
      setSkipApiKey(false);
    } else if (skippedApiKey === 'true') {
      setSkipApiKey(true);
      setHasApiKey(false);
    }

    // Check if user has already completed the quiz
    const quizCompletedKey = getQuizCompletedKey(user.id);
    const hasCompletedQuiz = localStorage.getItem(quizCompletedKey) === 'true';

    // Determine which step to show based on completion status
    if (storedApiKey || skippedApiKey === 'true') {
      // User has API key setup - check if quiz is needed
      if (hasCompletedQuiz) {
        // User has API key AND completed quiz - go directly to company selection
        setCurrentStep('company');
      } else {
        // User has API key but NOT completed quiz - show quiz
        setCurrentStep('quiz');
      }
    } else {
      // User has NO API key - show API key page first
      setCurrentStep('apiKey');
    }

    fetchCompanies();
  }, [user]);

  const fetchCompanies = async () => {
    setCompaniesLoading(true);
    try {
      const response = await companyService.getCompanies();
      if (response && response.success) {
        const companiesData = response.data || response.message || [];
        setCompanies(companiesData);
      } else {
        // Fallback companies
        setCompanies([
          { id: 1, name: 'Google' },
          { id: 2, name: 'Microsoft' },
          { id: 3, name: 'Amazon' },
          { id: 4, name: 'Meta' },
          { id: 5, name: 'Apple' },
          { id: 6, name: 'Netflix' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      // Fallback companies
      setCompanies([
        { id: 1, name: 'Google' },
        { id: 2, name: 'Microsoft' },
        { id: 3, name: 'Amazon' },
        { id: 4, name: 'Meta' },
        { id: 5, name: 'Apple' },
        { id: 6, name: 'Netflix' }
      ]);
    } finally {
      setCompaniesLoading(false);
    }
  };

  const handleApiKeySubmit = (key) => {
    if (!user?.id) {
      toast.error('Please login first');
      return;
    }

    const userApiKeyName = getUserApiKeyName(user.id);
    const userSkipKeyName = getUserSkipKeyName(user.id);

    setApiKey(key);
    setHasApiKey(true);
    setSkipApiKey(false);
    
    localStorage.setItem(userApiKeyName, key);
    localStorage.removeItem(userSkipKeyName);
    
    toast.success(`API key saved for ${user.name}!`);
    
    // After API key, check if quiz is needed
    const quizCompletedKey = getQuizCompletedKey(user.id);
    const hasCompletedQuiz = localStorage.getItem(quizCompletedKey) === 'true';
    
    if (hasCompletedQuiz) {
      setCurrentStep('company');
    } else {
      setCurrentStep('quiz');
    }
  };

  const handleSkipApiKey = () => {
    if (!user?.id) {
      toast.error('Please login first');
      return;
    }

    const userApiKeyName = getUserApiKeyName(user.id);
    const userSkipKeyName = getUserSkipKeyName(user.id);

    setSkipApiKey(true);
    setHasApiKey(false);
    
    localStorage.setItem(userSkipKeyName, 'true');
    localStorage.removeItem(userApiKeyName);
    
    toast.success('Proceeding with default functionality.');
    
    // After skipping API key, check if quiz is needed
    const quizCompletedKey = getQuizCompletedKey(user.id);
    const hasCompletedQuiz = localStorage.getItem(quizCompletedKey) === 'true';
    
    if (hasCompletedQuiz) {
      setCurrentStep('company');
    } else {
      setCurrentStep('quiz');
    }
  };

  const handleQuizComplete = (scores) => {
    console.log('Quiz completed with scores:', scores);
    
    // Mark quiz as completed for this user
    if (user?.id) {
      const quizCompletedKey = getQuizCompletedKey(user.id);
      localStorage.setItem(quizCompletedKey, 'true');
    }
    
    setCurrentStep('company');
  };

  const handleSkipQuiz = (existingScores) => {
    console.log('Quiz skipped, existing scores:', existingScores);
    
    // Mark quiz as completed even when skipped
    if (user?.id) {
      const quizCompletedKey = getQuizCompletedKey(user.id);
      localStorage.setItem(quizCompletedKey, 'true');
    }
    
    setCurrentStep('company');
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setCurrentStep('generator');
  };

  const handleGenerateRoadmap = async (roadmapData) => {
    // Normalize to shape: { company, roadmap: [...] }
    const normalized = roadmapData?.roadmap || roadmapData?.roadmapStructure || null;
    setGeneratedRoadmap(normalized);
    setLoading(false);
    setCurrentStep('result');
  };

  const handleGenerateNew = () => {
    setGeneratedRoadmap(null);
    setSelectedCompany('');
    setCurrentStep('company');
  };

  const handleSaveSuccess = () => {
    setShowSaveModal(false);
    toast.success('Roadmap saved to your profile!');
  };

  const handleSaveRoadmap = async (roadmapName) => {
    if (!user?.id || !generatedRoadmap) {
      toast.error('Missing user or roadmap');
      return;
    }
    try {
      const resp = await roadmapService.saveRoadmap(user.id, roadmapName, generatedRoadmap);
      if (resp?.success) {
        setShowSaveModal(false);
        console.log(resp)
        toast.success('Roadmap saved to your profile!');
        setCurrentStep('company');
      } else {
        toast.error(resp?.error || 'Failed to save roadmap');
      }
    } catch (e) {
      toast.error(e?.message || 'Failed to save roadmap');
    }
  };

  const handleRetryApiKey = () => {
    if (!user?.id) return;

    const userApiKeyName = getUserApiKeyName(user.id);
    const userSkipKeyName = getUserSkipKeyName(user.id);

    localStorage.removeItem(userSkipKeyName);
    localStorage.removeItem(userApiKeyName);
    setSkipApiKey(false);
    setHasApiKey(false);
    setApiKey('');
    setCurrentStep('apiKey');
  };

  const handleUpdateProgress = (updatedRoadmap) => {
    console.log("updated roadmap in roadmap.jsx : ", updatedRoadmap)
    setGeneratedRoadmap(updatedRoadmap);
  };

  // Show login prompt if no user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-lg mx-auto px-6 bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
          <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please login to access the AI-powered roadmap generator and save your progress.
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'apiKey':
        return (
          <ApiKeyModal 
            onSubmit={handleApiKeySubmit}
            onSkip={handleSkipApiKey}
            userName={user.name}
          />
        );
      
      case 'quiz':
        return (
          <Quiz 
            onQuizComplete={handleQuizComplete} 
            onSkipQuiz={handleSkipQuiz}
            userName={user.name} 
          />
        );
      
      case 'company':
        return (
          <CompanySelection
            companies={companies}
            companiesLoading={companiesLoading}
            onCompanySelect={handleCompanySelect}
            hasApiKey={hasApiKey}
            skipApiKey={skipApiKey}
            onRetryApiKey={handleRetryApiKey}
            userName={user.name}
          />
        );
      
      case 'generator':
        return (
          <RoadmapGenerator
            company={selectedCompany}
            onGenerate={handleGenerateRoadmap}
            setLoading={setLoading}
            hasApiKey={hasApiKey}
            skipApiKey={skipApiKey}
          />
        );
      
      case 'result':
        return (
          <RoadmapDisplay
            roadmap={generatedRoadmap}
            onSave={() => setShowSaveModal(true)}
            onGenerateNew={handleGenerateNew}
            onUpdateProgress={handleUpdateProgress}
          />
        );
      
      default:
        return (
          <ApiKeyModal 
            onSubmit={handleApiKeySubmit}
            onSkip={handleSkipApiKey}
            userName={user.name}
          />
        );
    }
  };

  // Show loading during roadmap generation
  if (loading) {
    return <LoadingScreen company={selectedCompany} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Progress Steps */}
      {currentStep !== 'apiKey' && currentStep !== 'result' && (
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-center space-x-8">
              {[
                { step: 'apiKey', label: 'API Setup', completed: true },
                { step: 'quiz', label: 'Assessment', completed: ['company', 'generator', 'result'].includes(currentStep) },
                { step: 'company', label: 'Company', completed: ['generator', 'result'].includes(currentStep) },
                { step: 'generator', label: 'Generate', completed: currentStep === 'result' }
              ].map((step, index) => (
                <div key={step.step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                    step.completed
                      ? 'bg-green-500 border-green-500 text-white shadow-lg'
                      : step.step === currentStep
                      ? 'bg-blue-500 border-blue-500 text-white shadow-lg scale-110'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-semibold ${
                      step.completed || step.step === currentStep
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}>
                      {step.label}
                    </div>
                  </div>
                  {index < 3 && (
                    <div className={`w-16 h-1 mx-4 rounded-full transition-all duration-300 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="py-8">
        {renderCurrentStep()}
      </div>

      {/* Save Modal */}
      {console.log("in save modal : ", showSaveModal)}
      {console.log("in save modal roadmap available : ", generatedRoadmap)}
      {showSaveModal && generatedRoadmap && (
        <SaveRoadmapModal
          roadmap={generatedRoadmap}
          user={user}
          onClose={() => setShowSaveModal(false)}
          onSave={handleSaveRoadmap}
        />
      )}
    </div>
  );
};

export default Roadmap;