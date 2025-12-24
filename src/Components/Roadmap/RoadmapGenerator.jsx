import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Building, Target, Wand2, AlertCircle, Sparkles, Key, ArrowRight, Code } from 'lucide-react';
import { roadmapService } from '../../api';

const RoadmapGenerator = ({ company, onGenerate, setLoading, hasApiKey, skipApiKey }) => {
  const [selectedCompany, setSelectedCompany] = useState(company || '');

  const handleGenerate = async () => {
    if (!selectedCompany.trim()) {
      toast.error('Please enter a company name');
      return;
    }

    setLoading(true);
    
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData?.id) {
        toast.error('Please login first');
        setLoading(false);
        return;
      }

      // Use the roadmapService instead of direct fetch
      const result = await roadmapService.generateRoadmap(userData.id, selectedCompany.trim());
      
      if (result.success) {
        // Use roadmapStructure from the response (your backend returns this)
        let roadmapData = result;
        console.log("roadmapData in RoadmapGenerator.jsx : ", roadmapData);
        
        // Ensure roadmap data is properly structured
        // if (!roadmapData) {
        //   throw new Error('No roadmap data received');
        // }

        // // Add company name to roadmap data
        // if (!roadmapData.company) {
        //   roadmapData.company = selectedCompany;
        // }

        // // Ensure roadmap array exists
        // if (!roadmapData.roadmap && roadmapData.roadmapStructure) {
        //   roadmapData.roadmap = roadmapData.roadmapStructure.roadmap || roadmapData.roadmapStructure;
        // }

        // console.log('Final roadmap data:', roadmapData);
        onGenerate(roadmapData);
        toast.success(`Roadmap generated in ${result.responseTime}s!`);
      } else {
        throw new Error(result.error || 'Failed to generate roadmap');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Error generating roadmap');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Wand2 className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">Generate Your Roadmap</h1>
          </div>
          <p className="text-blue-100 text-lg">Create a personalized study plan for {company}</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* API Status */}
          <div className="flex justify-center">
            {hasApiKey ? (
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200">
                <Key className="w-4 h-4" />
                <span className="text-sm font-semibold">Premium AI Mode</span>
              </div>
            ) : skipApiKey ? (
              <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full border border-yellow-200">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-semibold">Default Mode</span>
              </div>
            ) : (
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full border border-blue-200">
                <Code className="w-4 h-4" />
                <span className="text-sm font-semibold">Standard Mode</span>
              </div>
            )}
          </div>

          {/* Company Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Target Company</h3>
                <p className="text-blue-600 font-semibold">{selectedCompany}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Personalized</h4>
              <p className="text-sm text-gray-600">Tailored to your skill level</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">AI Optimized</h4>
              <p className="text-sm text-gray-600">Smart question selection</p>
            </div>
          </div> */}

          {/* Generate Button */}
          <div className="text-center pt-4">
            <button
              onClick={handleGenerate}
              disabled={!selectedCompany.trim()}
              className="group w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-3">
                <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                <span>Generate My Roadmap</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </button>
            <p className="text-gray-500 mt-3 text-sm">
              {hasApiKey 
                ? '🚀 Generating with advanced AI personalization...'
                : '⚡ Generating with optimized templates...'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapGenerator;