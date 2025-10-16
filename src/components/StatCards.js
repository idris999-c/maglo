import React from 'react';
import { currencyFormat } from '../utils/format';

export default function StatCards({ totals, loading, currencyCode, locale }) {
  const Card = ({ label, value, icon, variant }) => {
    const isDark = variant === 'dark';
    return (
      <div
        className={`w-[120px] sm:w-[140px] md:w-[222px] h-[60px] sm:h-[70px] md:h-[105px] rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2 md:p-4 flex items-center gap-1 sm:gap-2 md:gap-3 ${
          isDark ? 'bg-[#363A3F] text-white' : 'bg-[#F8F8F8] text-gray-900'
        }`}
      >
        <div
          className={`w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-[35px] md:h-[35px] rounded-full flex items-center justify-center ${
            isDark ? 'bg-white/10' : 'bg-[#EDEDED]'
          }`}
        >
          <img src={icon} alt="" className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] md:w-[25px] md:h-[25px]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`${isDark ? 'text-gray-200' : 'text-gray-500'} text-[8px] sm:text-[10px] md:text-[14px] leading-tight`}>{label}</p>
          {loading ? (
            <div className="mt-[4px] sm:mt-[6px] md:mt-[10px] h-3 sm:h-4 md:h-5 rounded relative overflow-hidden">
              <div className={`${isDark ? 'bg-white/20' : 'bg-gray-200'} absolute inset-0 rounded`}></div>
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" style={{ WebkitMaskImage: 'linear-gradient(black, black)' }} />
            </div>
          ) : (
            <p className={`text-[12px] sm:text-[16px] md:text-[24px] font-semibold leading-tight mt-[4px] sm:mt-[6px] md:mt-[10px] ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
    <div className="flex flex-wrap gap-[8px] sm:gap-[12px] md:gap-[25px] w-full">
      {items.map(({ key, label, value, icon, variant }) => (
        <Card key={key} label={label} value={value} icon={icon} variant={variant} />
      ))}
    </div>
  );
}


