import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { authService } from '../api';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authService.register(registerData);

      if (response.success) {
        login(response.user, response.token);
        toast.success(`Welcome to InterviewExp, ${response.user.name}!`);

        const hasBranch = typeof response.user.branch === 'string' && response.user.branch.trim() !== '';
        const hasGradYear = typeof response.user.graduation_year === 'string' ? response.user.graduation_year.trim() !== '' : !!response.user.graduation_year;
        const isProfileComplete = hasBranch && hasGradYear;

        if (isProfileComplete) {
          navigate('/');
          return;
        }
        navigate('/profile-setup');
        return;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Enhanced Header */}
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-primary-600 via-blue-600 to-primary-700 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
            <span className="text-white font-bold text-4xl">IE</span>
          </div>
          <h2 className="mt-8 text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-700 bg-clip-text text-transparent">
            Join our community
          </h2>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            Create your account and start sharing interview experiences
          </p>
        </div>

        {/* Enhanced Form Card */}
        <div className="bg-gradient-to-br from-white to-primary-50/30 rounded-3xl shadow-2xl border-2 border-primary-200 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-3">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-4 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 placeholder-gray-400 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-3">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-4 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 placeholder-gray-400 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-3">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-12 py-4 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 placeholder-gray-400 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-primary-50 rounded-r-xl transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-primary-600" /> : <Eye className="h-5 w-5 text-gray-400 hover:text-primary-600" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-900 mb-3">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-12 py-4 border-2 border-primary-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 placeholder-gray-400 bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-primary-50 rounded-r-xl transition-colors duration-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-primary-600" /> : <Eye className="h-5 w-5 text-gray-400 hover:text-primary-600" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-4 px-6 border-2 border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-primary-300/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create your account</span>
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-primary-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-600 font-medium">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <Link 
                to="/login" 
                className="inline-flex items-center font-bold text-primary-600 hover:text-primary-700 transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-lg">Sign in here</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Terms Info */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            By creating an account, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
