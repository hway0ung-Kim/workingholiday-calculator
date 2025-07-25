import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';

// Components
import Navbar from './components/layout/Navbar';
import MobileNavbar from './components/layout/MobileNavbar';
import LanguageModal from './components/common/LanguageModal';
import HomePage from './pages/HomePage';
import WageCalculatorPage from './pages/WageCalculatorPage';
import VisaCalculatorPage from './pages/VisaCalculatorPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import CalendarPage from './pages/CalendarPage';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useLanguageDetection } from './hooks/useLanguageDetection';

function App() {
  const { i18n } = useTranslation();
  const { user, loading } = useAuth();
  const { showLanguageModal, handleLanguageSelect, closeLanguageModal } = useLanguageDetection();

  useEffect(() => {
    // 앱 초기화 로직
    console.log('Working Holiday Calculator App initialized');
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="pb-16 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/wage-calculator" element={<WageCalculatorPage />} />
            <Route path="/visa-calculator" element={<VisaCalculatorPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {user?.isAdmin && (
              <Route path="/admin" element={<AdminPage />} />
            )}
          </Routes>
        </main>

        {/* Mobile Navigation */}
        <MobileNavbar />

        {/* Language Selection Modal */}
        {showLanguageModal && (
          <LanguageModal
            onLanguageSelect={handleLanguageSelect}
            onClose={closeLanguageModal}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
