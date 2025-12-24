import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { experienceService, companyService } from '../api';
import { Save, Plus, X, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const PostExperience = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company_id: '',
    role: '',
    process_start_date: '',
    process_end_date: '',
    type: 'Placement',
    application_process: '',
    preparation_tips: '',
    is_selected: '',
    // Add Academic Information fields
    branch: '',
    graduation_year: '',
    cgpa: '',
    tags: [],
    rounds: []
  });
  const [currentTag, setCurrentTag] = useState('');
  const [currentRound, setCurrentRound] = useState({
    name: '',
    description: '',
    duration: '',
    difficulty: 'Medium'
  });

  // Updated branch options based on your image
  const branchOptions = [
    'Computer Science',
    'Information Technology', 
    'Electronics & Communication',
    'CSE(AIML)',
    'CSE(AI)',
    'AIDS',
    'CS(IOT CS BT)',
    'CSE(DS)',
    'CS(Software Engineering)',
    'Mechanical',
    'Civil',
    'Other'
  ];

  // Generate graduation year options (current year + 2 to current year - 10)
  const currentYear = new Date().getFullYear();
  const graduationYearOptions = [];
  for (let year = currentYear + 2; year >= currentYear - 10; year--) {
    graduationYearOptions.push(year);
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await companyService.getCompanies();
      if (response.success) {
        setCompanies(response.message || response.data || []);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddRound = () => {
    if (currentRound.name.trim() && currentRound.description.trim()) {
      setFormData(prev => ({
        ...prev,
        rounds: [...prev.rounds, { ...currentRound }]
      }));
      setCurrentRound({
        name: '',
        description: '',
        duration: '',
        difficulty: 'Medium'
      });
    }
  };

  const handleRemoveRound = (index) => {
    setFormData(prev => ({
      ...prev,
      rounds: prev.rounds.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const experienceData = {
        ...formData,
        author_id: user.id,
        is_selected: formData.is_selected === 'true' ? true : 
                    formData.is_selected === 'false' ? false : null
      };

      const response = await experienceService.addExperience(experienceData);
      if (response.success) {
        toast.success('Experience shared successfully!');
        navigate('/');
      } else {
        toast.error(response.message || 'Failed to share experience');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to share experience');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 px-4 py-3 rounded-xl hover:bg-primary-50 transition-all duration-300 font-medium transform hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-white to-primary-50/30 rounded-3xl shadow-xl border-2 border-primary-100 p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-700 bg-clip-text text-transparent mb-3">
              Share Your Interview Experience
            </h1>
            <p className="text-gray-700 text-lg font-medium">Help fellow students by sharing your interview journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Enhanced Academic Information Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-200 pb-3 flex items-center">
                <span className="mr-3 text-2xl">🎓</span>
                Academic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Branch *
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                    required
                  >
                    <option value="">Select your branch</option>
                    {branchOptions.map(branch => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Graduation Year *
                  </label>
                  <select
                    name="graduation_year"
                    value={formData.graduation_year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                    required
                  >
                    <option value="">Select your batch</option>
                    {graduationYearOptions.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    CGPA (Optional)
                  </label>
                  <input
                    type="number"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    min="0"
                    max="10"
                    step="0.01"
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                    placeholder="e.g., 8.5"
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Basic Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-200 pb-3">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Experience Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                    placeholder="e.g., Software Engineer Interview at Google"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Company *
                  </label>
                  <select
                    name="company_id"
                    value={formData.company_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                    required
                  >
                    <option value="">Select Company</option>
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Role *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                    placeholder="e.g., Software Engineer, Data Analyst"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Interview Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                    required
                  >
                    <option value="Placement">Full-time Placement</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Process Start Date
                  </label>
                  <input
                    type="date"
                    name="process_start_date"
                    value={formData.process_start_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Process End Date
                  </label>
                  <input
                    type="date"
                    name="process_end_date"
                    value={formData.process_end_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Application Process */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-200 pb-3">Application Process</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  How did you apply? What was the application process? Please also mention the eligibility criteria required by the company
                </label>
                <textarea
                  name="application_process"
                  value={formData.application_process}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                  placeholder="Describe your application process, eligibility criteria, application deadlines, etc."
                />
              </div>
            </div>

            {/* Enhanced Interview Rounds */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-200 pb-3">Interview Rounds</h2>
              
              {/* Enhanced Add Round Form */}
              <div className="bg-primary-50/50 border-2 border-primary-200 p-6 rounded-2xl space-y-4 shadow-lg">
                <h3 className="font-bold text-gray-900 text-lg">Add Interview Round</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={currentRound.name}
                    onChange={(e) => setCurrentRound(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                    placeholder="Round name (e.g., Technical Round 1)"
                  />
                  
                  <input
                    type="text"
                    value={currentRound.duration}
                    onChange={(e) => setCurrentRound(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                    placeholder="Duration (e.g., 45 minutes)"
                  />
                </div>
                
                <select
                  value={currentRound.difficulty}
                  onChange={(e) => setCurrentRound(prev => ({ ...prev, difficulty: e.target.value }))}
                  className="w-full max-w-xs px-4 py-3 border-1 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                
                <textarea
                  value={currentRound.description}
                  onChange={(e) => setCurrentRound(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                  placeholder="Describe the round, questions asked, experience, etc."
                />
                
                <button
                  type="button"
                  onClick={handleAddRound}
                  className="flex items-center space-x-2 px-6 py-3 border-2 border-primary-300 rounded-xl text-primary-700 hover:bg-primary-100 hover:border-primary-400 transition-all duration-300 font-bold transform hover:scale-105"
                >
                  <Plus size={16} />
                  <span>Add Round</span>
                </button>
              </div>

              {/* Enhanced Added Rounds */}
              {formData.rounds.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg">Added Rounds:</h3>
                  {formData.rounds.map((round, index) => (
                    <div key={index} className="bg-white border-2 border-primary-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{round.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                            <span className="font-medium">Duration: {round.duration}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              round.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                              round.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {round.difficulty}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveRound(index)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 transition-all duration-200"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-700 font-medium">{round.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Preparation Tips */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-200 pb-3">Preparation & Tips</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Preparation tips and resources
                </label>
                <textarea
                  name="preparation_tips"
                  value={formData.preparation_tips}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                  placeholder="Share your preparation strategy, resources used, time spent, etc."
                />
              </div>
            </div>

            {/* Enhanced Tags */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-200 pb-3">Tags</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="w-full max-w-xs px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 bg-white text-gray-900 font-medium transition-all duration-300 hover:shadow-md"
                    placeholder="Add tag (e.g., JavaScript, DSA)"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="flex items-center space-x-2 px-6 py-3 border-2 border-primary-300 rounded-xl text-primary-700 hover:bg-primary-100 hover:border-primary-400 transition-all duration-300 font-bold transform hover:scale-105"
                  >
                    <Plus size={16} />
                    <span>Add Tag</span>
                  </button>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-primary-100 text-primary-800 border-2 border-primary-200 font-bold shadow-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-primary-600 hover:text-primary-800 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Result Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-primary-200 pb-3">Result</h2>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-4">
                  Were you selected?
                </label>
                <div className="flex flex-col space-y-4">
                  <label className="flex items-center cursor-pointer p-3 rounded-xl border-2 border-primary-200 hover:bg-primary-50 transition-all duration-200">
                    <input
                      type="radio"
                      name="is_selected"
                      value="true"
                      checked={formData.is_selected === 'true'}
                      onChange={handleInputChange}
                      className="mr-4 text-primary-600 focus:ring-primary-500 w-4 h-4"
                    />
                    <span className="text-gray-900 font-medium">Yes, I got selected</span>
                  </label>
                  <label className="flex items-center cursor-pointer p-3 rounded-xl border-2 border-primary-200 hover:bg-primary-50 transition-all duration-200">
                    <input
                      type="radio"
                      name="is_selected"
                      value="false"
                      checked={formData.is_selected === 'false'}
                      onChange={handleInputChange}
                      className="mr-4 text-primary-600 focus:ring-primary-500 w-4 h-4"
                    />
                    <span className="text-gray-900 font-medium">No, I didn't get selected</span>
                  </label>
                  <label className="flex items-center cursor-pointer p-3 rounded-xl border-2 border-primary-200 hover:bg-primary-50 transition-all duration-200">
                    <input
                      type="radio"
                      name="is_selected"
                      value=""
                      checked={formData.is_selected === ''}
                      onChange={handleInputChange}
                      className="mr-4 text-primary-600 focus:ring-primary-500 w-4 h-4"
                    />
                    <span className="text-gray-900 font-medium">Result pending</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Enhanced Submit Button */}
            <div className="flex justify-end space-x-4 pt-8 border-t-2 border-primary-200">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-bold transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={18} />
                    <span>Share Experience</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostExperience;
