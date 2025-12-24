import React, { useState } from 'react';
import { 
  Route, 
  Target, 
  Play, 
  ExternalLink, 
  Calendar, 
  Zap,
  CheckCircle2,
  Circle,
  Book,
  Trophy,
  TrendingUp,
  Award,
  Clock,
  ChevronDown,
  ChevronRight,
  Code2,
  Brain
} from 'lucide-react';
import { roadmapService } from '../../api';
import toast from 'react-hot-toast';

const SavedRoadmaps = ({ savedRoadmaps, setSavedRoadmaps }) => {
  const [expandedRoadmap, setExpandedRoadmap] = useState(null);
  const [expandedSteps, setExpandedSteps] = useState(new Set());

  const toggleRoadmapExpansion = (roadmapId) => {
    setExpandedRoadmap(expandedRoadmap === roadmapId ? null : roadmapId);
    if (expandedRoadmap !== roadmapId) {
      setExpandedSteps(new Set([0])); // First step expanded by default
    }
  };

  const toggleStepExpansion = (stepIndex) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepIndex)) {
      newExpanded.delete(stepIndex);
    } else {
      newExpanded.add(stepIndex);
    }
    setExpandedSteps(newExpanded);
  };

  const toggleQuestionComplete = async (roadmapId, stepIndex, questionIndex) => {
    const roadmapToUpdate = savedRoadmaps.find(r => r.id === roadmapId);
    if (!roadmapToUpdate) return;

    const updatedRoadmap = { ...roadmapToUpdate };
    const question = updatedRoadmap.roadmap[stepIndex].questions[questionIndex];
    question.completed = !question.completed;

    setSavedRoadmaps(prev => 
      prev.map(r => r.id === roadmapId ? updatedRoadmap : r)
    );

    try {
      await roadmapService.updateRoadmapProgress(roadmapId, updatedRoadmap);
    } catch (error) {
      console.error('Failed to update progress:', error);
      toast.error('Failed to update progress');
      setSavedRoadmaps(prev => 
        prev.map(r => r.id === roadmapId ? roadmapToUpdate : r)
      );
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return 'from-green-500 to-emerald-500';
      case 'MEDIUM':
        return 'from-yellow-500 to-orange-500';
      case 'HARD':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const getStepIcon = (stepIndex) => {
    const icons = [Code2, Brain, Target, Book, Zap];
    const Icon = icons[stepIndex % icons.length];
    return Icon;
  };

  const calculateProgress = (roadmap) => {
    const totalQuestions = roadmap.roadmap?.reduce((acc, step) => acc + step.questions.length, 0) || 0;
    const completedQuestions = roadmap.roadmap?.reduce(
      (acc, step) => acc + step.questions.filter(q => q.completed).length, 0
    ) || 0;
    return { 
      total: totalQuestions, 
      completed: completedQuestions, 
      percentage: totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0 
    };
  };

  const getStepProgress = (step) => {
    const total = step.questions.length;
    const completed = step.questions.filter(q => q.completed).length;
    return { completed, total, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          <Route className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Saved Roadmaps ({savedRoadmaps.length})
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your personalized AI-generated study plans
          </p>
        </div>
      </div>

      {/* Content */}
      {savedRoadmaps.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Route className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">No saved roadmaps found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Create your first AI-powered interview roadmap to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {savedRoadmaps.map((roadmap) => {
            const progress = calculateProgress(roadmap);
            const isExpanded = expandedRoadmap === roadmap.id;
            
            return (
              <div key={roadmap.id} className="space-y-6">
                {/* Roadmap Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                    <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <Trophy className="w-7 h-7 text-yellow-300" />
                          </div>
                          <div>
                            <h3 className="text-3xl md:text-4xl font-bold">{roadmap.company} Interview Roadmap</h3>
                            <p className="text-lg text-blue-100">{roadmap.roadmap_name}</p>
                          </div>
                        </div>
                        
                        <p className="text-xl text-blue-100 max-w-2xl">
                          Your personalized study plan with {progress.total} carefully selected questions
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-4">
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                            <Target className="w-5 h-5 text-green-300" />
                            <span className="font-semibold">{progress.completed}/{progress.total} Complete</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                            <TrendingUp className="w-5 h-5 text-blue-300" />
                            <span className="font-semibold">{progress.percentage}% Progress</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                            <Clock className="w-5 h-5 text-purple-300" />
                            <span className="font-semibold">{roadmap.roadmap?.length || 0} Steps</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                            <Calendar className="w-5 h-5 text-pink-300" />
                            <span className="font-semibold">Saved {new Date(roadmap.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between text-sm text-blue-100">
                            <span>Overall Progress</span>
                            <span>{progress.percentage}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-emerald-400 h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
                              style={{ width: `${progress.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-3">
                        <button
                          onClick={() => toggleRoadmapExpansion(roadmap.id)}
                          className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                          <span>{isExpanded ? 'Hide Roadmap' : 'View Roadmap'}</span>
                        </button>
                        
                        {progress.percentage === 100 && (
                          <div className="flex items-center space-x-2 text-green-300 font-semibold">
                            <Award className="w-5 h-5" />
                            <span>Completed!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Roadmap Steps */}
                {isExpanded && (
                  <div className="space-y-6">
                    {roadmap.roadmap?.map((step, stepIndex) => {
                      const stepProgress = getStepProgress(step);
                      const isStepExpanded = expandedSteps.has(stepIndex);
                      const StepIcon = getStepIcon(stepIndex);
                      
                      return (
                        <div key={step.step} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-xl">
                          <div 
                            className="cursor-pointer p-6 hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-all duration-200"
                            onClick={() => toggleStepExpansion(stepIndex)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg bg-gradient-to-br ${
                                    stepIndex === 0 ? 'from-blue-500 to-indigo-600' :
                                    stepIndex === 1 ? 'from-green-500 to-emerald-600' :
                                    stepIndex === 2 ? 'from-purple-500 to-pink-600' :
                                    'from-orange-500 to-red-600'
                                  }`}>
                                    <StepIcon className="w-7 h-7" />
                                  </div>
                                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {step.step}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                    {step.title}
                                  </h4>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                    <span>{step.questions.length} questions</span>
                                    <span>•</span>
                                    <span>{stepProgress.completed}/{stepProgress.total} completed</span>
                                    <span>•</span>
                                    <span className={`font-semibold ${stepProgress.percentage === 100 ? 'text-green-600' : 'text-primary-600'}`}>
                                      {stepProgress.percentage}% done
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-4">
                                <div className="relative w-16 h-16">
                                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                                    <path
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeDasharray="100, 100"
                                      className="text-gray-200 dark:text-gray-700"
                                    />
                                    <path
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeDasharray={`${stepProgress.percentage}, 100`}
                                      className={stepProgress.percentage === 100 ? 'text-green-500' : 'text-primary-600'}
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className={`text-sm font-bold ${stepProgress.percentage === 100 ? 'text-green-600' : 'text-primary-600'}`}>
                                      {stepProgress.percentage}%
                                    </span>
                                  </div>
                                </div>

                                <button className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 rounded-lg transition-colors">
                                  {isStepExpanded ? (
                                    <ChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                  ) : (
                                    <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-700 ease-out ${
                                  stepProgress.percentage === 100 
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                    : 'bg-gradient-to-r from-primary-500 to-blue-500'
                                }`}
                                style={{ width: `${stepProgress.percentage}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Questions Content */}
                          {isStepExpanded && (
                            <div className="border-t border-gray-200/50 dark:border-gray-600/50 p-6 space-y-4 bg-gray-50/30 dark:bg-gray-700/30">
                              {step.questions.map((question, questionIndex) => (
                                <div
                                  key={question.id}
                                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl p-5 hover:shadow-md transition-all duration-200"
                                >
                                  <div className="flex items-start space-x-4">
                                    <button
                                      onClick={() => toggleQuestionComplete(roadmap.id, stepIndex, questionIndex)}
                                      className="flex-shrink-0 mt-1 p-1 hover:scale-110 transition-transform duration-200"
                                    >
                                      {question.completed ? (
                                        <CheckCircle2 className="w-7 h-7 text-green-600" />
                                      ) : (
                                        <Circle className="w-7 h-7 text-gray-400 hover:text-primary-600 transition-colors" />
                                      )}
                                    </button>

                                    <div className="flex-1 space-y-3">
                                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                        <h5 className={`font-semibold text-lg transition-all duration-200 ${
                                          question.completed 
                                            ? 'line-through text-gray-500 dark:text-gray-400' 
                                            : 'text-gray-900 dark:text-white group-hover:text-primary-600'
                                        }`}>
                                          {question.title || question.question}
                                        </h5>
                                        
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm flex-shrink-0 bg-gradient-to-r ${getDifficultyColor(question.difficulty)}`}>
                                          {question.difficulty}
                                        </div>
                                      </div>

                                      {question.link && (
                                        <div className="space-y-3">
                                          {question.topics && (
                                            <div className="flex flex-wrap gap-2">
                                              {question.topics.map((topic, idx) => (
                                                <span
                                                  key={idx}
                                                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium"
                                                >
                                                  {topic}
                                                </span>
                                              ))}
                                            </div>
                                          )}
                                          <div className="flex flex-wrap gap-3">
                                            <a
                                              href={question.link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="group/link flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-semibold transition-colors bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30"
                                            >
                                              <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                                              <span>Solve on LeetCode</span>
                                            </a>
                                            {question.youtube_videos && question.youtube_videos.length > 0 && (
                                              <a
                                                href={question.youtube_videos[0]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/video flex items-center space-x-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-semibold transition-colors bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30"
                                              >
                                                <Play className="w-4 h-4 group-hover/video:scale-110 transition-transform" />
                                                <span>Watch Tutorial</span>
                                              </a>
                                            )}
                                          </div>
                                        </div>
                                      )}

                                      {question.answer && (
                                        <div className="mt-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-700/50 dark:to-blue-900/10 rounded-xl border border-gray-200/50 dark:border-blue-800/30">
                                          <div className="flex items-start space-x-3">
                                            <Book className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Answer:</p>
                                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {question.answer}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedRoadmaps;


