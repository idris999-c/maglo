import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const CustomToast = ({ toast, message, type = 'success' }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-8 h-8 text-emerald-600" />;
      case 'error':
        return <ExclamationCircleIcon className="w-8 h-8 text-red-600" />;
      case 'warning':
        return <ExclamationCircleIcon className="w-8 h-8 text-amber-600" />;
      case 'info':
        return <InformationCircleIcon className="w-8 h-8 text-blue-600" />;
      default:
        return <CheckCircleIcon className="w-8 h-8 text-emerald-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-white border-emerald-200 shadow-emerald-100/50';
      case 'error':
        return 'bg-white border-red-200 shadow-red-100/50';
      case 'warning':
        return 'bg-white border-amber-200 shadow-amber-100/50';
      case 'info':
        return 'bg-white border-blue-200 shadow-blue-100/50';
      default:
        return 'bg-white border-emerald-200 shadow-emerald-100/50';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-gray-900';
      case 'error':
        return 'text-gray-900';
      case 'warning':
        return 'text-gray-900';
      case 'info':
        return 'text-gray-900';
      default:
        return 'text-gray-900';
    }
  };

  const getAccentColor = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-amber-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-emerald-500';
    }
  };

  return (
    <div
      className={`
        ${getBackgroundColor()}
        border-l-4 ${getAccentColor().replace('bg-', 'border-l-')}
        border rounded-xl shadow-2xl p-6 min-w-[400px] max-w-lg
        transform transition-all duration-500 ease-in-out
        ${toast.visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'}
        backdrop-blur-sm
        hover:shadow-2xl hover:scale-[1.02] transition-all duration-200
        z-50
      `}
      style={{
        animation: toast.visible 
          ? 'slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1)' 
          : 'slideOutRight 0.5s cubic-bezier(0.4, 0, 1, 1)'
      }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          <div className={`w-12 h-12 rounded-full ${getAccentColor().replace('bg-', 'bg-')} bg-opacity-10 flex items-center justify-center`}>
            {getIcon()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-base font-semibold leading-6 ${getTextColor()}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
