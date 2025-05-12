import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PhishingSimulation from './components/PhishingSimulation';
import PhishingAttempts from './components/PhishingAttempts';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLogout={handleLogout} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/phishing-simulation"
              element={
                <ProtectedRoute>
                  <PhishingSimulation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attempts"
              element={
                <ProtectedRoute>
                  <PhishingAttempts />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/phishing-simulation" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
