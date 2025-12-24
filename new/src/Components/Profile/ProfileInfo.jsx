import React, { useState } from 'react';
import Select from 'react-select';
import { Code, Building2, Target, User, Edit3 } from 'lucide-react';
import { authService } from '../../api';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/AuthContext';

const ProfileInfo = ({ companyOptions, companiesLoading }) => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    graduation_year: '',
    branch: '',
    cgpa: '',
  });

  // Predefined options
  const skillOptions = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C++', label: 'C++' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'MySQL', label: 'MySQL' },
    { value: 'AWS', label: 'AWS' },
    { value: 'Docker', label: 'Docker' },
    { value: 'Data Structures', label: 'Data Structures' },
    { value: 'Algorithms', label: 'Algorithms' },
    { value: 'System Design', label: 'System Design' }
  ];

  const roleOptions = [
    { value: 'Software Engineer', label: 'Software Engineer' },
    { value: 'Frontend Developer', label: 'Frontend Developer' },
    { value: 'Backend Developer', label: 'Backend Developer' },
    { value: 'Full Stack Developer', label: 'Full Stack Developer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'DevOps Engineer', label: 'DevOps Engineer' },
    { value: 'Product Manager', label: 'Product Manager' }
  ];

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 10 }, (_, i) => currentYear - 2 + i);
  
  const branches = [
    'Computer Science Engineering',
    'Information Technology',
    'Electronics and Communication Engineering',
    'Software Engineering',
    'Data Science'
  ];

  // Enhanced custom select styles for white theme
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      borderWidth: '2px',
      boxShadow: state.isFocused ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none',
      backgroundColor: 'white',
      minHeight: '48px',
      borderRadius: '12px',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '2px solid #e5e7eb'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#dbeafe' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      padding: '12px 16px',
      '&:hover': {
        backgroundColor: state.isSelected ? '#3b82f6' : '#dbeafe'
      }
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#dbeafe',
      borderRadius: '8px',
      border: '1px solid #3b82f6'
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#1e40af',
      fontWeight: '600'
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#3b82f6',
      '&:hover': {
        backgroundColor: '#3b82f6',
        color: 'white'
      }
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditProfile = () => {
    if (!isEditing && user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        graduation_year: user.graduation_year || '',
        branch: user.branch || '',
        cgpa: user.cgpa || '',
      });
      setSelectedSkills((user.skills || []).map(skill => ({ value: skill, label: skill })));
      setSelectedCompanies((user.company_interest || []).map(company => ({ value: company, label: company })));
      setSelectedRoles((user.role_interest || []).map(role => ({ value: role, label: role })));
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    const payload = {
      ...profileData,
      skills: selectedSkills.map(skill => skill.value),
      company_interest: selectedCompanies.map(company => company.value),
      role_interest: selectedRoles.map(role => role.value),
    };

    try {
      const response = await authService.updateProfile(user.id, payload);
      if (response.success) {
        updateUser(response.user);
        toast.success('Profile updated successfully');
        setIsEditing(false);
        setProfileData({ name: '', email: '', graduation_year: '', branch: '', cgpa: '' });
        setSelectedSkills([]);
        setSelectedCompanies([]);
        setSelectedRoles([]);
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Error updating profile');
    }
  };

  const handleCancel = () => {
    setProfileData({ name: '', email: '', graduation_year: '', branch: '', cgpa: '' });
    setSelectedSkills([]);
    setSelectedCompanies([]);
    setSelectedRoles([]);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-600 via-blue-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-blue-700 bg-clip-text text-transparent">
              Profile Information
            </h2>
            <p className="text-gray-600 font-medium">Manage your personal and professional details</p>
          </div>
        </div>
        <button
          className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
          onClick={handleEditProfile}
        >
          <Edit3 className="w-5 h-5" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* User Info Display */}
      {!isEditing && (
        <div className="bg-gradient-to-br from-white to-primary-50/20 rounded-3xl shadow-2xl border-2 border-primary-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Name</label>
              <p className="text-lg text-gray-700 font-medium bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                {user?.name || 'Not specified'}
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Email</label>
              <p className="text-lg text-gray-700 font-medium bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                {user?.email}
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Graduation Year</label>
              <p className="text-lg text-gray-700 font-medium bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                {user?.graduation_year || 'Not specified'}
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">Branch</label>
              <p className="text-lg text-gray-700 font-medium bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                {user?.branch || 'Not specified'}
              </p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">CGPA</label>
              <p className="text-lg text-gray-700 font-medium bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 max-w-xs">
                {user?.cgpa || 'Not specified'}
              </p>
            </div>
          </div>

          {/* Enhanced Skills Display */}
          {user?.skills && user.skills.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <label className="text-xl font-bold text-gray-900">Skills</label>
              </div>
              <div className="flex flex-wrap gap-3">
                {user.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-green-100 text-green-800 text-sm font-bold rounded-xl border-2 border-green-200 shadow-md hover:shadow-lg transition-all duration-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Company Interests Display */}
          {user?.company_interest && user.company_interest.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <label className="text-xl font-bold text-gray-900">Company Interests</label>
              </div>
              <div className="flex flex-wrap gap-3">
                {user.company_interest.map((company, index) => (
                  <span key={index} className="px-4 py-2 bg-purple-100 text-purple-800 text-sm font-bold rounded-xl border-2 border-purple-200 shadow-md hover:shadow-lg transition-all duration-200">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Role Interests Display */}
          {user?.role_interest && user.role_interest.length > 0 && (
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <label className="text-xl font-bold text-gray-900">Role Interests</label>
              </div>
              <div className="flex flex-wrap gap-3">
                {user.role_interest.map((role, index) => (
                  <span key={index} className="px-4 py-2 bg-orange-100 text-orange-800 text-sm font-bold rounded-xl border-2 border-orange-200 shadow-md hover:shadow-lg transition-all duration-200">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Profile Edit Form */}
      {isEditing && (
        <div className="bg-gradient-to-br from-white to-primary-50/20 rounded-3xl shadow-2xl border-2 border-primary-200 p-8">
          <form onSubmit={e => { e.preventDefault(); handleSaveProfile(); }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-3 text-sm font-bold text-gray-900 uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block mb-3 text-sm font-bold text-gray-900 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  name="email"
                  disabled
                  value={profileData.email}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed opacity-60 text-gray-600 font-medium"
                />
              </div>
              <div>
                <label className="block mb-3 text-sm font-bold text-gray-900 uppercase tracking-wide">Graduation Year</label>
                <select
                  name="graduation_year"
                  value={profileData.graduation_year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl"
                >
                  <option value="">Select Year</option>
                  {graduationYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-3 text-sm font-bold text-gray-900 uppercase tracking-wide">Branch</label>
                <select
                  name="branch"
                  value={profileData.branch}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl"
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-3 text-sm font-bold text-gray-900 uppercase tracking-wide">CGPA</label>
                <input
                  type="number"
                  name="cgpa"
                  step="0.01"
                  value={profileData.cgpa}
                  onChange={handleInputChange}
                  className="w-full max-w-xs px-4 py-4 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl"
                  min={0}
                  max={10}
                  placeholder="e.g., 8.5"
                />
              </div>
            </div>

            {/* Enhanced Skills Multiselect */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <label className="text-lg font-bold text-gray-900">Skills</label>
              </div>
              <Select
                isMulti
                options={skillOptions}
                value={selectedSkills}
                onChange={setSelectedSkills}
                styles={customSelectStyles}
                placeholder="Select your skills..."
                closeMenuOnSelect={false}
                isSearchable={true}
              />
            </div>

            {/* Enhanced Company Interests Multiselect */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <label className="text-lg font-bold text-gray-900">Company Interests</label>
              </div>
              <Select
                isMulti
                options={companyOptions}
                value={selectedCompanies}
                onChange={setSelectedCompanies}
                styles={customSelectStyles}
                placeholder={companiesLoading ? "Loading companies..." : "Select companies you're interested in..."}
                closeMenuOnSelect={false}
                isSearchable={true}
                isLoading={companiesLoading}
              />
            </div>

            {/* Enhanced Role Interests Multiselect */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <label className="text-lg font-bold text-gray-900">Role Interests</label>
              </div>
              <Select
                isMulti
                options={roleOptions}
                value={selectedRoles}
                onChange={setSelectedRoles}
                styles={customSelectStyles}
                placeholder="Select roles you're interested in..."
                closeMenuOnSelect={false}
                isSearchable={true}
              />
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-end pt-8 border-t-2 border-primary-200">
              <button 
                type="button" 
                className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-medium" 
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
