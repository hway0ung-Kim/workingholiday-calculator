import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const CalendarPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // 로그인하지 않은 사용자는 인증 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getCurrentMonth = () => {
    const date = new Date(selectedDate);
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      monthName: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
  };

  const generateCalendarDays = () => {
    const { year, month } = getCurrentMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const formatDateForComparison = (day: number) => {
    const { year, month } = getCurrentMonth();
    return new Date(year, month, day).toISOString().split('T')[0];
  };

  const isToday = (day: number) => {
    const today = new Date().toISOString().split('T')[0];
    return formatDateForComparison(day) === today;
  };

  const isSelected = (day: number) => {
    return formatDateForComparison(day) === selectedDate;
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(formatDateForComparison(day));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const { year, month } = getCurrentMonth();
    const newDate = new Date(year, month + (direction === 'next' ? 1 : -1), 1);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            📅 Work Calendar
          </h1>
          <p className="text-gray-600">
            Track your daily work hours and calculate earnings
          </p>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h2 className="text-lg font-semibold text-gray-900">
              {getCurrentMonth().monthName}
            </h2>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`
                  relative p-2 h-12 flex items-center justify-center text-sm cursor-pointer rounded-lg transition-colors
                  ${day === null ? 'invisible' : ''}
                  ${day && isToday(day) ? 'bg-primary-100 text-primary-700 font-medium' : ''}
                  ${day && isSelected(day) ? 'bg-primary-600 text-white' : ''}
                  ${day && !isToday(day) && !isSelected(day) ? 'hover:bg-gray-100' : ''}
                `}
                onClick={() => day && handleDateClick(day)}
              >
                {day}
                {/* Work indicator dot - placeholder for actual work data */}
                {day && day % 3 === 0 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-success-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Date Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <button className="btn-primary">
              + Add Work Record
            </button>
          </div>

          {/* Work Records for Selected Date */}
          <div className="space-y-3">
            {/* Placeholder for work records */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-center">
                No work records for this date
              </p>
              <p className="text-sm text-gray-400 text-center mt-1">
                Click "Add Work Record" to get started
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage; 