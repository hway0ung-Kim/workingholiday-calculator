import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">{t('home.title')}</span>
              <span className="block text-primary-600 text-shadow">
                Working Holiday Mate
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              {t('home.subtitle')}
            </p>

            {/* Motivational Quote */}
            <div className="mt-8 p-4 bg-white bg-opacity-80 rounded-lg shadow-md max-w-2xl mx-auto">
              <p className="text-lg font-medium text-gray-800 italic">
                "{t('home.motivationalQuote')}"
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12 sm:max-w-3xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 w-full">
                <Link
                  to="/wage-calculator"
                  className="btn-primary text-center py-4 px-6 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  💰 {t('home.wageCalculator')}
                </Link>
                <Link
                  to="/visa-calculator"
                  className="btn-success text-center py-4 px-6 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  📋 {t('home.visaExtension')}
                </Link>
                <Link
                  to="/community"
                  className="btn-secondary text-center py-4 px-6 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  🌍 {t('nav.community')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose Working Holiday Mate?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need for a successful working holiday in Australia
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mx-auto">
                  <span className="text-2xl">💵</span>
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  {t('home.features.wageTitle')}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {t('home.features.wageDesc')}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-success-100 mx-auto">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  {t('home.features.visaTitle')}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {t('home.features.visaDesc')}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-warning-100 mx-auto">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  {t('home.features.communityTitle')}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {t('home.features.communityDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Earners Section */}
      {user && (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                🏆 {t('home.topEarners')}
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                See how others are doing in their working holiday journey
              </p>
            </div>

            <div className="mt-10">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-center text-gray-500">
                  Rankings will be displayed here based on user consent
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      {!user && (
        <div className="bg-primary-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to start your journey?</span>
              <span className="block text-primary-200">Join thousands of working holiday makers.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage; 