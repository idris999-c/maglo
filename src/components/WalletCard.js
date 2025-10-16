import React from 'react';

export default function WalletCard({
  variant = 'dark',
  bankLabel = 'Universal Bank',
  cardName = '',
  masked = false,
  number = '5495 7381 3759 2321',
  expiry,
  className = '',
}) {
  const isDark = variant === 'dark';
  const maskedDisplay = masked ? `${number.replace(/\s+/g, '').slice(0, 8)}****` : number;
  return (
    <div
      className={
        `${isDark ? 'from-[#4A4A49] to-[#20201F] text-white' : 'from-white/60 to-white/25 backdrop-blur-sm ring-1 ring-white/60 text-gray-900'} ` +
        'relative rounded-2xl p-4 bg-gradient-to-br shadow-sm overflow-hidden ' +
        className
      }
      aria-label={`Maglo ${bankLabel} card`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2 text-xs font-medium">
          <span className={`text-[12px] sm:text-[16px] font-semibold ${isDark ? '' : 'text-white'}`}>Maglo.</span>
          <span className={isDark ? 'opacity-60' : 'text-white/70'}>|</span>
          <span className={`text-[10px] sm:text-[12px] ${isDark ? 'opacity-30' : 'text-white/90'}`}>{bankLabel.replace('Maglo | ', '')}</span>
        </div>
      </div>
      

      <div className="flex items-center justify-between mt-3 sm:mt-5">
        <img src="/icons/wallet/Group.svg" alt="Chip" className={`${isDark ? 'w-[24px] h-[18px] sm:w-[38px] sm:h-[30px]' : 'h-4 sm:h-6'}`} />
        <img src="/icons/wallet/wifi.3 1.png" alt="Wave" className={`${isDark ? 'h-5 sm:h-8' : 'h-3 sm:h-5'} opacity-70`} />
      </div>

      <div className="mt-2 sm:mt-4">
        <p className={`font-mono text-[10px] sm:text-base tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {maskedDisplay}
        </p>
        {expiry && (
          <div className="mt-1 sm:mt-2 text-[8px] sm:text-xs flex items-center gap-2 sm:gap-4">
            <span className={isDark ? 'opacity-70' : 'text-gray-600'}>{expiry}</span>
          </div>
        )}
      </div>

      {isDark && (
        <img
          src="/icons/wallet/International.svg"
          alt="Card brand"
          className="absolute bottom-3 right-4 sm:bottom-6 sm:right-8 h-4 sm:h-8 w-auto"
        />
      )}
      {!isDark && (
        <img
          src="/icons/wallet/Vector.png"
          alt="VISA"
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 h-3 sm:h-4 w-auto"
        />
      )}

      {!isDark && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/25 via-black/10 to-transparent rounded-t-2xl" />
      )}
    </div>
  );
}


