import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageModalProps {
  onLanguageSelect: (language: string) => void;
  onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ onLanguageSelect, onClose }) => {
  const { t, i18n } = useTranslation();

  const getLanguageName = (lang: string) => {
    switch (lang) {
      case 'ko':
        return t('language.korean');
      case 'ja':
        return t('language.japanese');
      default:
        return t('language.english');
    }
  };

  // 브라우저 언어 감지
  const browserLanguage = navigator.language.toLowerCase();
  let detectedLanguage = 'en';
  
  if (browserLanguage.startsWith('ko')) {
    detectedLanguage = 'ko';
  } else if (browserLanguage.startsWith('ja')) {
    detectedLanguage = 'ja';
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-fade-in">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {t('language.title')}
          </h3>
          
          <p className="text-sm text-gray-600 mb-6">
            {t('language.description', { language: getLanguageName(detectedLanguage) })}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => onLanguageSelect(detectedLanguage)}
              className="w-full btn-primary"
            >
              {t('language.switchTo', { language: getLanguageName(detectedLanguage) })}
            </button>

            <button
              onClick={() => onLanguageSelect('en')}
              className="w-full btn-secondary"
            >
              {t('language.keepEnglish')}
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal; 