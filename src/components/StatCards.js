import React from 'react';
import { currencyFormat } from '../utils/format';

export default function StatCards({ totals, loading, currencyCode, locale }) {
  const Card = ({ label, value, icon, variant }) => {
    const isDark = variant === 'dark';
    return (
      <div
        className={`w-[320px] h-[160px] rounded-2xl p-5 flex items-center gap-4 ${
          isDark ? 'bg-[#363A3F] text-white' : 'bg-[#F8F8F8] text-gray-900'
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isDark ? 'bg-white/10' : 'bg-[#EDEDED]'
          }`}
        >
          <img src={icon} alt="" className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className={`${isDark ? 'text-gray-200' : 'text-gray-500'} text-[14px]`}>{label}</p>
          {loading ? (
            <div className={`${isDark ? 'bg-white/20' : 'bg-gray-200'} h-7 mt-2 rounded animate-pulse`} />
          ) : (
            <p className={`text-[28px] font-semibold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {currencyFormat(value, currencyCode, locale)}
            </p>
          )}
        </div>
      </div>
    );
  };

  const items = [
    {
      key: 'balance',
      label: 'Total balance',
      value: totals.balance,
      icon: '/icons/statcards/wallet-2.6 1.svg',
      variant: 'dark',
    },
    {
      key: 'spending',
      label: 'Total spending',
      value: totals.spending,
      icon: '/icons/statcards/wallet-2.6 1-1.svg',
      variant: 'light',
    },
    {
      key: 'saved',
      label: 'Total saved',
      value: totals.saved,
      icon: '/icons/statcards/wallet-add.12 1.svg',
      variant: 'light',
    },
  ];

  return (
    <div className="flex flex-wrap justify-between gap-8 w-full">
      {items.map(({ key, label, value, icon, variant }) => (
        <Card key={key} label={label} value={value} icon={icon} variant={variant} />
      ))}
    </div>
  );
}


