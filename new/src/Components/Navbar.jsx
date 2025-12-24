import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { 
  User, LogOut, Home, Plus, BookOpen, Map, 
  ChevronDown, Menu, X, Bookmark, FileText,
  Route
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileDropdownOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Function to get user's initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  };

  const NavLink = ({ to, icon: Icon, children, onClick, mobile = false }) => (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center space-x-3 transition-all duration-200 font-medium cursor-pointer ${
        mobile 
          ? `px-4 py-3 rounded-lg ${
              isActive(to) 
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`
          : `px-4 py-2 rounded-lg ${
              isActive(to) 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{children}</span>
    </Link>
  );

  // Updated ProfileDropdownItem with proper navigation
  const ProfileDropdownItem = ({ icon: Icon, children, to }) => {
    const handleClick = () => {
      setProfileDropdownOpen(false);
      navigate(to);
    };

    return (
      <button
        onClick={handleClick}
        className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-left cursor-pointer"
      >
        <Icon size={18} />
        <span className="font-medium">{children}</span>
      </button>
    );
  };

  // Mobile Profile Dropdown Item
  const MobileProfileItem = ({ icon: Icon, children, to }) => {
    const handleClick = () => {
      setMobileMenuOpen(false);
      navigate(to);
    };

    return (
      <button
        onClick={handleClick}
        className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-left cursor-pointer"
      >
        <Icon size={18} />
        <span className="font-medium">{children}</span>
      </button>
    );
  };

  if (!isAuthenticated && !['/login', '/signup'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? "/" : "/login"} className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">IE</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">InterviewExp</span>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
              <NavLink to="/" icon={Home}>Home</NavLink>
              <NavLink to="/feed" icon={BookOpen}>Feed</NavLink>
              <NavLink to="/post" icon={Plus}>Post</NavLink>
              <NavLink to="/roadmap" icon={Map}>Roadmap</NavLink>
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <div></div>
            ) : (
              // User menu when authenticated
              <>
                {/* Desktop Profile Dropdown */}
                <div className="hidden md:flex items-center space-x-4">
                  <div className="relative">
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        {user?.profileImage ? (
                          <img 
                            src={user.profileImage} 
                            alt={user?.name} 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-sm font-bold">
                            {getInitials(user?.name)}
                          </span>
                        )}
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`text-gray-600 transition-transform duration-200 ${
                          profileDropdownOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {/* Profile Dropdown */}
                    {profileDropdownOpen && (
                      <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-semibold text-gray-900">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                        
                        {/* Profile Options */}
                        <div className="py-2">
                          <ProfileDropdownItem 
                            icon={User} 
                            to="/profile"
                          >
                            My Profile
                          </ProfileDropdownItem>
                          <ProfileDropdownItem 
                            icon={FileText} 
                            to="/my-posts"
                          >
                            My Posts
                          </ProfileDropdownItem>
                          <ProfileDropdownItem 
                            icon={Bookmark} 
                            to="/saved-posts"
                          >
                            Saved Posts
                          </ProfileDropdownItem>
                          <ProfileDropdownItem 
                            icon={Route} 
                            to="/saved-roadmaps"
                          >
                            Saved Roadmaps
                          </ProfileDropdownItem>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-gray-100 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
                          >
                            <LogOut size={18} />
                            <span className="font-medium">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isAuthenticated && mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            {/* Navigation Links */}
            <div className="space-y-1 mb-4">
              <NavLink to="/" icon={Home} mobile onClick={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/feed" icon={BookOpen} mobile onClick={() => setMobileMenuOpen(false)}>
                Feed
              </NavLink>
              <NavLink to="/post" icon={Plus} mobile onClick={() => setMobileMenuOpen(false)}>
                Post
              </NavLink>
              <NavLink to="/roadmap" icon={Map} mobile onClick={() => setMobileMenuOpen(false)}>
                Roadmap
              </NavLink>
            </div>

            {/* Profile Section */}
            <div className="border-t border-gray-200 pt-4">
              {/* User Info */}
              <div className="flex items-center space-x-3 px-4 py-3 mb-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user?.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-bold">
                      {getInitials(user?.name)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              
              {/* Profile Options */}
              <div className="space-y-1">
                <MobileProfileItem 
                  icon={User} 
                  to="/profile"
                >
                  My Profile
                </MobileProfileItem>
                <MobileProfileItem 
                  icon={FileText} 
                  to="/my-posts"
                >
                  My Posts
                </MobileProfileItem>
                <MobileProfileItem 
                  icon={Bookmark} 
                  to="/saved-posts"
                >
                  Saved Posts
                </MobileProfileItem>
                <MobileProfileItem 
                  icon={Route} 
                  to="/saved-roadmaps"
                >
                  Saved Roadmaps
                </MobileProfileItem>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-200 mt-3 pt-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdown */}
      {profileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40 cursor-pointer" 
          onClick={() => setProfileDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;