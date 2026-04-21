import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LandingPage from './components/Landing/LandingPage';
import DashboardLayout from './components/Layout/DashboardLayoutPremium';
import DashboardHome from './components/Dashboard/DashboardHome';
import SalesManagement from './components/Dashboard/SalesManagement';
import RevenueManagement from './components/Dashboard/RevenueManagement';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import HistoryTimeline from './components/Dashboard/HistoryTimeline';
import Portfolio from './components/Dashboard/Portfolio';
import AnalyticsPage from './components/Dashboard/AnalyticsPage';
import AboutPage from './components/Pages/AboutPage';
import './index.css';

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="sales" element={<SalesManagement />} />
              <Route path="revenue" element={<RevenueManagement />} />
              <Route path="history" element={<HistoryTimeline />} />
              <Route path="portfolio" element={<Portfolio />} />
            </Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
