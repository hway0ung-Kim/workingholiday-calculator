import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import QuickWageCheck from '../components/wage/QuickWageCheck';

const WageCalculatorPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'quick' | 'detailed'>('quick');

  const handleSignUpPrompt = () => {
    navigate('/auth');
  };

  const handleTabChange = (tab: 'quick' | 'detailed') => {
    if (tab === 'detailed' && !user) {
      // Prompt for login if trying to access detailed calculator
      const shouldLogin = window.confirm(t('wage.detailedRequiresLogin'));
      if (shouldLogin) {
        navigate('/auth');
        return;
      }
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('wage.calculator.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('wage.calculator.description')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg shadow-sm border">
            <button
              onClick={() => handleTabChange('quick')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'quick'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('wage.calculator.quickCheck')}
              </div>
            </button>
            <button
              onClick={() => handleTabChange('detailed')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'detailed'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {t('wage.calculator.detailedCalculator')}
                {!user && (
                  <svg className="w-3 h-3 ml-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {activeTab === 'quick' ? (
            <div>
              {/* Quick Check Description */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('wage.quickCheck.feature.title')}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {t('wage.quickCheck.feature.description')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {t('wage.quickCheck.feature.noSignup')}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {t('wage.quickCheck.feature.instant')}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {t('wage.quickCheck.feature.estimate')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Wage Check Component */}
              <QuickWageCheck onSignUpPrompt={handleSignUpPrompt} />
            </div>
          ) : (
            <div>
              {!user ? (
                /* Login Required Message */
                <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('wage.detailedCalculator.loginRequired.title')}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {t('wage.detailedCalculator.loginRequired.description')}
                  </p>
                  <button
                    onClick={() => navigate('/auth')}
                    className="btn-primary"
                  >
                    {t('auth.signIn')}
                  </button>
                </div>
              ) : (
                /* Detailed Calculator Content */
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {t('wage.detailedCalculator.title')}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {t('wage.detailedCalculator.description')}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {t('wage.detailedCalculator.comingSoon')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('wage.calculator.comparison.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-green-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('wage.calculator.quickCheck')}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('wage.calculator.comparison.quick.noAccount')}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('wage.calculator.comparison.quick.basicCalculation')}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('wage.calculator.comparison.quick.instant')}
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {t('wage.calculator.detailedCalculator')}
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('wage.calculator.comparison.detailed.profiles')}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('wage.calculator.comparison.detailed.fairWork')}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('wage.calculator.comparison.detailed.tracking')}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('wage.calculator.comparison.detailed.visaIntegration')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WageCalculatorPage; 