// src/App.jsx
import React from 'react';
// 👇 BrowserRouter yahan import kiya
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';

// Pages Import
import Home from './pages/Home';
import Signup from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import CreateResume from './pages/CreateResume';
import ResumePreview from './pages/ResumePreview';

// 🔒 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    // 👇 Sabse bahar BrowserRouter lagaya
    <BrowserRouter>
      {/* 👇 Uske andar AuthProvider aur ThemeProvider */}
      <AuthProvider>
        <ThemeProvider>
          <div className="font-sans text-slate-900 dark:text-white bg-slate-50 dark:bg-[#020617] min-h-screen transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* Private Route */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/templates" 
                element={
                  <ProtectedRoute>
                    <Templates />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create-resume" 
                element={
                  <ProtectedRoute>
                    <CreateResume />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/edit-resume/:id" 
                element={
                  <ProtectedRoute>
                    <CreateResume />
                  </ProtectedRoute>
                } 
              />
               <Route 
                path="/resume/:id" 
                element={
                  <ProtectedRoute>
                    <ResumePreview />
                  </ProtectedRoute>
                } 
              />

              {/* Default Route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;