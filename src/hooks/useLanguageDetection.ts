import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguageDetection = () => {
  const { i18n } = useTranslation();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const checkLanguagePreference = () => {
      // 이미 언어 설정이 저장되어 있는지 확인
      const savedLanguage = localStorage.getItem('i18nextLng');
      
      if (savedLanguage && savedLanguage !== 'en') {
        // 이미 설정된 언어가 있으면 모달을 표시하지 않음
        return;
      }

      // 브라우저 언어 감지
      const browserLanguage = navigator.language.toLowerCase();
      let targetLanguage: string | null = null;

      if (browserLanguage.startsWith('ko')) {
        targetLanguage = 'ko';
      } else if (browserLanguage.startsWith('ja')) {
        targetLanguage = 'ja';
      }

      // 한국어 또는 일본어가 감지되고, 현재 언어가 영어인 경우에만 모달 표시
      if (targetLanguage && i18n.language === 'en' && !savedLanguage) {
        setDetectedLanguage(targetLanguage);
        setShowLanguageModal(true);
      }
    };

    // 컴포넌트 마운트 후 1초 후에 실행 (i18n 초기화 대기)
    const timer = setTimeout(checkLanguagePreference, 1000);
    
    return () => clearTimeout(timer);
  }, [i18n.language]);

  const handleLanguageSelect = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
    setShowLanguageModal(false);
  };

  const closeLanguageModal = () => {
    setShowLanguageModal(false);
  };

  return {
    showLanguageModal,
    detectedLanguage,
    handleLanguageSelect,
    closeLanguageModal,
  };
}; 