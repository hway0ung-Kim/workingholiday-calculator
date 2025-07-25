import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateQuickWage } from '../../utils/wageCalculation';

interface QuickWageCheckProps {
  onSignUpPrompt?: () => void;
}

const QuickWageCheck: React.FC<QuickWageCheckProps> = ({ onSignUpPrompt }) => {
  const { t } = useTranslation();
  const [hourlyRate, setHourlyRate] = useState<string>('');
  const [dailyHours, setDailyHours] = useState<string>('');
  const [daysPerWeek, setDaysPerWeek] = useState<string>('5');
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    if (!hourlyRate || !dailyHours) {
      alert(t('wage.quickCheck.fillAllFields'));
      return;
    }

    const rate = parseFloat(hourlyRate);
    const hours = parseFloat(dailyHours);
    const days = parseInt(daysPerWeek);

    if (rate <= 0 || hours <= 0 || days <= 0) {
      alert(t('wage.quickCheck.invalidValues'));
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const calculation = calculateQuickWage(rate, hours, days);
      setResult(calculation);
      setIsCalculating(false);
    }, 800);
  };

  const handleReset = () => {
    setHourlyRate('');
    setDailyHours('');
    setDaysPerWeek('5');
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t('wage.quickCheck.title')}
        </h2>
        <p className="text-gray-600 text-sm">
          {t('wage.quickCheck.subtitle')}
        </p>
      </div>

      {!result ? (
        <div className="space-y-4">
          <div>
            <label className="label-text">
              {t('wage.quickCheck.hourlyRate')} (AUD)
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="25.00"
              step="0.01"
              min="0"
              className="input-field"
            />
          </div>

          <div>
            <label className="label-text">
              {t('wage.quickCheck.dailyHours')}
            </label>
            <input
              type="number"
              value={dailyHours}
              onChange={(e) => setDailyHours(e.target.value)}
              placeholder="8"
              step="0.5"
              min="0"
              max="24"
              className="input-field"
            />
          </div>

          <div>
            <label className="label-text">
              {t('wage.quickCheck.daysPerWeek')}
            </label>
            <select
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              className="input-field"
            >
              <option value="1">1 {t('common.day')}</option>
              <option value="2">2 {t('common.days')}</option>
              <option value="3">3 {t('common.days')}</option>
              <option value="4">4 {t('common.days')}</option>
              <option value="5">5 {t('common.days')}</option>
              <option value="6">6 {t('common.days')}</option>
              <option value="7">7 {t('common.days')}</option>
            </select>
          </div>

          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="btn-primary w-full"
          >
            {isCalculating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {t('wage.quickCheck.calculating')}
              </div>
            ) : (
              t('wage.quickCheck.calculate')
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              {t('wage.quickCheck.result')}
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('wage.quickCheck.weeklyHours')}:</span>
                <span className="font-medium">{result.weeklyHours}h</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">{t('wage.quickCheck.regularPay')}:</span>
                <span className="font-medium">A${result.regularPay.toFixed(2)}</span>
              </div>
              
              {result.overtimeHours > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('wage.quickCheck.overtimePay')} ({result.overtimeHours}h):</span>
                  <span className="font-medium text-blue-600">A${result.overtimePay.toFixed(2)}</span>
                </div>
              )}
              
              <hr className="my-2 border-green-200" />
              
              <div className="flex justify-between text-base font-semibold">
                <span className="text-gray-800">{t('wage.quickCheck.grossPay')}:</span>
                <span className="text-green-600">A${result.grossPay.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-base font-semibold">
                <span className="text-gray-800">{t('wage.quickCheck.afterTax')}:</span>
                <span className="text-green-700">A${result.afterTaxPay.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-medium text-blue-800 mb-1">
                  {t('wage.quickCheck.signUpPrompt.title')}
                </h4>
                <p className="text-blue-700 text-sm mb-3">
                  {t('wage.quickCheck.signUpPrompt.description')}
                </p>
                <button
                  onClick={onSignUpPrompt}
                  className="btn-secondary text-xs"
                >
                  {t('wage.quickCheck.signUpPrompt.button')}
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleReset}
              className="btn-secondary flex-1"
            >
              {t('wage.quickCheck.calculate_again')}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500 text-center">
        {t('wage.quickCheck.disclaimer')}
      </div>
    </div>
  );
};

export default QuickWageCheck; 