// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../Context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   // Show loading spinner while checking authentication
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // If not authenticated, redirect to login
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // If authenticated, render the protected component
//   return children;
// };

// export default ProtectedRoute;


import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect not logged in users
    return <Navigate to="/login" replace />;
  }

  // Redirect users with incomplete profile to profile setup
  const isProfileComplete = user?.branch && user?.graduation_year;
  if (!isProfileComplete && window.location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />;
  }

  return children;
};

export default ProtectedRoute;
