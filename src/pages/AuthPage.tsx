import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const { user, signInWithGoogle, createUserProfile } = useAuth();
  const [nickname, setNickname] = useState('');
  const [showNicknameSetup, setShowNicknameSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNicknameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || nickname.length < 2) return;

    try {
      setLoading(true);
      setError('');
      await createUserProfile(nickname);
    } catch (error: any) {
      console.error('Profile creation error:', error);
      setError(error.message || 'Profile creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setError(error.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  // 이미 로그인한 사용자는 홈으로 리다이렉트
  if (user && user.nickname) {
    return <Navigate to="/" replace />;
  }

  // 닉네임 설정이 필요한 사용자
  if (user && !user.nickname) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('auth.setupNickname')}
              </h2>
              <p className="text-gray-600">
                {t('auth.welcome')}, {user.displayName}!
              </p>
            </div>

            <form onSubmit={handleNicknameSubmit} className="space-y-4">
              <div>
                <label className="label-text">
                  {t('auth.nicknameLabel')}
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder={t('auth.nicknamePlaceholder')}
                  className="input-field"
                  required
                  minLength={2}
                  maxLength={20}
                />
                {error && <p className="error-text">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={loading || nickname.length < 2}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? t('common.loading') : t('auth.completeSetup')}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('home.title')}
            </h1>
            <p className="text-gray-600">
              {t('auth.pleaseSignIn')}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? t('common.loading') : t('auth.signInWithGoogle')}
            </button>
            
            {error && (
              <div className="text-center">
                <p className="error-text">{error}</p>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 