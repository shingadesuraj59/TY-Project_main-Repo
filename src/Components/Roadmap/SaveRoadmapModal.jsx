import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

const SaveRoadmapModal = ({ isOpen = true, onClose, onSave, roadmap }) => {
  const [roadmapName, setRoadmapName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Safe calculation of total questions
  const calculateTotalQuestions = () => {
    if (!roadmap?.roadmap || !Array.isArray(roadmap.roadmap)) return 0;
    
    try {
      return roadmap.roadmap.reduce((acc, step) => {
        let stepQuestions = 0;
        
        // Handle regular questions
        if (step.questions && Array.isArray(step.questions)) {
          stepQuestions += step.questions.length;
        }
        
        // Handle core questions
        if (step.core_questions && Array.isArray(step.core_questions)) {
          step.core_questions.forEach(topic => {
            if (topic.questions && Array.isArray(topic.questions)) {
              stepQuestions += topic.questions.length;
            }
          });
        }
        
        return acc + stepQuestions;
      }, 0);
    } catch (error) {
      console.error('Error calculating total questions:', error);
      return 0;
    }
  };

  // Safe calculation of completed questions
  const calculateCompletedQuestions = () => {
    if (!roadmap?.roadmap || !Array.isArray(roadmap.roadmap)) return 0;
    
    try {
      return roadmap.roadmap.reduce((acc, step) => {
        let stepCompleted = 0;
        
        // Handle regular questions
        if (step.questions && Array.isArray(step.questions)) {
          stepCompleted += step.questions.filter(q => q && q.completed).length;
        }
        
        // Handle core questions
        if (step.core_questions && Array.isArray(step.core_questions)) {
          step.core_questions.forEach(topic => {
            if (topic.questions && Array.isArray(topic.questions)) {
              stepCompleted += topic.questions.filter(q => q && q.completed).length;
            }
          });
        }
        
        return acc + stepCompleted;
      }, 0);
    } catch (error) {
      console.error('Error calculating completed questions:', error);
      return 0;
    }
  };

  const handleSave = async () => {
    if (!roadmapName.trim()) return;
    
    setIsSaving(true);
    try {
      // Safely call onSave if provided
      if (onSave) {
        await onSave(roadmapName.trim());
      }
      setRoadmapName('');
      onClose();
    } catch (error) {
      console.error('Failed to save roadmap:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setRoadmapName('');
    onClose();
  };

  if (isOpen === false) return null;

  const totalQuestions = calculateTotalQuestions();
  const completedQuestions = calculateCompletedQuestions();
  const progress = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <Save className="w-5 h-5 text-blue-600" />
            <span>Save Roadmap</span>
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Roadmap Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Company:</span>
              <span className="font-semibold">{roadmap?.company || 'Unknown'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Questions:</span>
              <span className="font-semibold">{totalQuestions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress:</span>
              <span className="font-semibold">{progress}% ({completedQuestions}/{totalQuestions})</span>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-2 mb-6">
          <label htmlFor="roadmapName" className="block text-sm font-medium text-gray-700">
            Roadmap Name
          </label>
          <input
            id="roadmapName"
            type="text"
            value={roadmapName}
            onChange={(e) => setRoadmapName(e.target.value)}
            placeholder="Enter a name for your roadmap"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Error Message */}
        {!roadmapName.trim() && (
          <div className="flex items-center space-x-2 text-amber-600 text-sm mb-4">
            <AlertCircle className="w-4 h-4" />
            <span>Please enter a name for your roadmap</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!roadmapName.trim() || isSaving}
            className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${
              !roadmapName.trim() || isSaving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Roadmap'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveRoadmapModal;