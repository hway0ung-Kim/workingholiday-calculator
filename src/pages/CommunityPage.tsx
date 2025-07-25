import React from 'react';
import { useTranslation } from 'react-i18next';

const CommunityPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('community.title')}</h1>
          <p className="mt-2 text-lg text-gray-600">
            Connect with other working holiday makers worldwide
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-center text-gray-500">
            Community features will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage; 