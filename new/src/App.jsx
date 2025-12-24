import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './Context/AuthContext';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';

// Pages
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProfileSetup from './Pages/ProfileSetup';
import Home from './Pages/Home';
import Feed from './Pages/Feed';
import PostExperience from './Pages/PostExperience';
import ViewExperience from './Pages/ViewExperience';
import Profile from './Pages/Profile';
import Companies from './Pages/Companies';
import Roadmap from './Pages/roadmap';
import SavedPosts from './Pages/SavedPosts';
import SavedRoadmaps from './Pages/SavedRoadmaps';
import MyPost from './Pages/MyPost';
import RoadmapDisplay from './Components/Roadmap/RoadmapDisplay';
import RoadmapView from './Pages/RoadmapView';
import About from './Pages/About';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* FIXED: Changed from dark blue to white background */}
        <div className="min-h-screen bg-white transition-colors duration-200">
          <Navbar />
          
          {/* FIXED: Removed container constraints for full-width design */}
          <main className="w-full">
            <Routes>
              {/* Public Routes - Only accessible when NOT logged in */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />

              
              
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              
              {/* Protected Routes - Only accessible when logged in */}

               <Route path="/profile-setup" element={
                <ProtectedRoute>
                  <ProfileSetup />
                </ProtectedRoute>
              } />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              
              <Route path="/feed" element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              } />
              
              <Route path="/profile-setup" element={
                <ProtectedRoute>
                  <ProfileSetup />
                </ProtectedRoute>
              } />
              
              <Route path="/post" element={
                <ProtectedRoute>
                  <PostExperience />
                </ProtectedRoute>
              } />
              
              <Route path="/experience/:id" element={
                <ProtectedRoute>
                  <ViewExperience />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              <Route path="/roadmap" element={
                <ProtectedRoute>
                  <Roadmap />
                </ProtectedRoute>
              } />
              <Route path="/roadmap/:id" element={
                <ProtectedRoute>
                  <RoadmapView />
                </ProtectedRoute>
              } />
              
              <Route path="/companies" element={
                <ProtectedRoute>
                  <Companies />
                </ProtectedRoute>
              } />


              <Route path="/saved-posts" element={
                <ProtectedRoute>
                   <SavedPosts />
                </ProtectedRoute>
              } />

              <Route path="/saved-roadmaps" element={
                <ProtectedRoute>
                <SavedRoadmaps />
                </ProtectedRoute>
              } />

               <Route path="/my-posts" element={
                <ProtectedRoute>
                  <MyPost />
                </ProtectedRoute>
              } />

              <Route path="/about" element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              } />
              
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          {/* Enhanced Toast Notifications with white theme */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#1f2937',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
                padding: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
                style: {
                  border: '1px solid #d1fae5',
                  background: '#f0fdf4',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
                style: {
                  border: '1px solid #fecaca',
                  background: '#fef2f2',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
