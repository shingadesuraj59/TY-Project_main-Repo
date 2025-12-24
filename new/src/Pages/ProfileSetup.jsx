import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { authService } from '../api';
import { User, GraduationCap, Code, Building2, Target, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

const branches = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics and Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Aerospace Engineering',
  'Biotechnology',
  'Other'
];

const ProfileSetup = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    graduation_year: '',
    branch: '',
    cgpa: '',
    skills: [],
    company_interest: [],
    role_interest: ''
  });
  const [errors, setErrors] = useState({});
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');

  // Validation check for form inputs
  const validateInputs = () => {
    const newErrors = {};

    if (!formData.graduation_year) {
      newErrors.graduation_year = 'Please select your graduation year';
    }
    if (!formData.branch) {
      newErrors.branch = 'Please select your branch/stream';
    }
    if (formData.cgpa && (formData.cgpa < 0 || formData.cgpa > 10)) {
      newErrors.cgpa = 'CGPA must be between 0 and 10';
    }
    if (formData.role_interest && formData.role_interest.length > 50) {
      newErrors.role_interest = 'Role interest description is too long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddCompany = () => {
    if (currentCompany.trim() && !formData.company_interest.includes(currentCompany.trim())) {
      setFormData(prev => ({
        ...prev,
        company_interest: [...prev.company_interest, currentCompany.trim()]
      }));
      setCurrentCompany('');
    }
  };

  const handleRemoveCompany = (companyToRemove) => {
    setFormData(prev => ({
      ...prev,
      company_interest: prev.company_interest.filter(company => company !== companyToRemove)
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateInputs()) {
    toast.error('Please fix validation errors');
    return;
  }

  // Convert role_interest string to array
  const rolesArray = formData.role_interest
    .split(/[,\\n]/)       // split on commas or newlines
    .map(r => r.trim())    // trim whitespace
    .filter(r => r.length > 0); // remove empty

  const payload = {
    ...formData,
    role_interest: rolesArray
  };

  setIsLoading(true);

  try {
    const response = await authService.updateProfile(user.id, payload);
    if (response.success) {
      updateUser(response.user);
      toast.success('Profile setup completed successfully!');
      navigate('/');
    } else {
      toast.error(response.message || 'Failed to update profile');
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update profile');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};


  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-600 via-blue-600 to-primary-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-blue-700 bg-clip-text text-transparent mb-4">
            Complete Your Profile
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Help us personalize your experience and connect you with relevant opportunities
          </p>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-white to-primary-50/20 rounded-3xl shadow-2xl border-2 border-primary-200 p-10">
          <form onSubmit={handleSubmit} className="space-y-10" noValidate>
            {/* Academic Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Academic Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="graduation_year" className="block text-sm font-bold text-gray-900 mb-3">
                    Graduation Year
                  </label>
                  <select
                    id="graduation_year"
                    name="graduation_year"
                    value={formData.graduation_year}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl ${errors.graduation_year ? 'border-red-500' : 'border-primary-200'}`}
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i - 2;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  {errors.graduation_year && <p className="text-red-600 mt-1 text-sm">{errors.graduation_year}</p>}
                </div>

                <div>
                  <label htmlFor="branch" className="block text-sm font-bold text-gray-900 mb-3">
                    Branch/Stream
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl ${errors.branch ? 'border-red-500' : 'border-primary-200'}`}
                  >
                    <option value="">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                  {errors.branch && <p className="text-red-600 mt-1 text-sm">{errors.branch}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="cgpa" className="block text-sm font-bold text-gray-900 mb-3">
                    CGPA/Percentage
                  </label>
                  <input
                    type="number"
                    id="cgpa"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="e.g., 8.5 or 85"
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl ${errors.cgpa ? 'border-red-500' : 'border-primary-200'}`}
                  />
                  {errors.cgpa && <p className="text-red-600 mt-1 text-sm">{errors.cgpa}</p>}
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Technical Skills</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    className="flex-1 px-4 py-4 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl"
                    placeholder="Add a skill (e.g., JavaScript, Python, React)"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <Plus size={18} />
                    <span>Add</span>
                  </button>
                </div>

                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-green-100 text-green-800 border-2 border-green-200 font-bold shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-green-600 hover:text-green-800 transition-colors duration-200"
                        >
                          <X size={16} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Company Interests */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Company Interests</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={currentCompany}
                    onChange={(e) => setCurrentCompany(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCompany())}
                    className="flex-1 px-4 py-4 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl"
                    placeholder="Add companies you're interested in (e.g., Google, Microsoft)"
                  />
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <Plus size={18} />
                    <span>Add</span>
                  </button>
                </div>

                {formData.company_interest.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {formData.company_interest.map((company, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-purple-100 text-purple-800 border-2 border-purple-200 font-bold shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        {company}
                        <button
                          type="button"
                          onClick={() => handleRemoveCompany(company)}
                          className="ml-2 text-purple-600 hover:text-purple-800 transition-colors duration-200"
                        >
                          <X size={16} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Role Interest */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Role Interest</h2>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  What type of role are you looking for?
                </label>
                <input
                  type="array"
                  name="role_interest"
                  value={formData.role_interest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl"
                  placeholder="e.g., Software Engineer, Data Scientist, Product Manager"
                />
                {errors.role_interest && <p className="text-red-600 text-sm mt-1">{errors.role_interest}</p>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center pt-8 border-t-2 border-primary-200 space-y-4 sm:space-y-0">
              {/* <button
                type="button"
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700 font-medium text-lg transition-colors duration-200"
              >
                Skip for now
              </button> */}

              <button
                type="submit"
                disabled={isLoading}
                className="text-center w-full sm:w-auto bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-3"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="text-lg">Complete Setup</span>
                )}
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              You can always update this information later in your profile settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
