import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Page imports
import Login from './pages/Login';
import Signup from './pages/Signup';
import AccountLink from './pages/AccountLink';
import Dashboard from './pages/Dashboard';
import CampaignDetail from './pages/CampaignDetail';
import CreativesAudience from './pages/CreativesAudience';
import LandingPage from './pages/LandingPage';
import Analytics from './pages/Analytics';
import InsightsHub from './pages/InsightsHub';
import AudienceBuilder from './pages/AudienceBuilder';
import IntegrationsCenter from './pages/IntegrationsCenter';
import SeoAudit from './pages/SeoAudit';

// Layout
import MainLayout from './layouts/MainLayout';

// Auth context will be implemented later
const App = () => {
  // TEMPORARY: Set to true for development to bypass authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  
  // Check if user is authenticated - temporarily disabled for development
  /*useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);*/

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth routes */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} 
        />
        
        {/* Protected routes */}
        <Route element={<MainLayout />}>
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/account-link" 
            element={isAuthenticated ? <AccountLink /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/campaigns/:id" 
            element={isAuthenticated ? <CampaignDetail /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/creatives-audience" 
            element={isAuthenticated ? <CreativesAudience /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/analytics" 
            element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/insights" 
            element={isAuthenticated ? <InsightsHub /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/audience-builder" 
            element={isAuthenticated ? <AudienceBuilder /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/integrations" 
            element={isAuthenticated ? <IntegrationsCenter /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/seo-audit" 
            element={isAuthenticated ? <SeoAudit /> : <Navigate to="/login" />} 
          />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
