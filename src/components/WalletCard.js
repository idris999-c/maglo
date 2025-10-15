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
        'relative rounded-2xl p-5 bg-gradient-to-br shadow-sm overflow-hidden w-full ' +
        className
      }
      aria-label={`Maglo ${bankLabel} card`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className={`text-base font-semibold ${isDark ? '' : 'text-white'}`}>Maglo.</span>
          <span className={isDark ? 'opacity-60' : 'text-white/70'}>|</span>
          <span className={isDark ? 'opacity-30' : 'text-white/90'}>{bankLabel.replace('Maglo | ', '')}</span>
        </div>
      </div>
      

      <div className="flex items-center justify-between mt-6">
        <img src="/icons/wallet/Group.svg" alt="Chip" className={`${isDark ? 'h-8' : 'h-7'}`} />
        <img src="/icons/wallet/wifi.3 1.png" alt="Wave" className={`${isDark ? 'h-9' : 'h-6'} opacity-70`} />
      </div>

      <div className="mt-5">
        <p className={`font-mono text-lg md:text-xl tracking-[0.2em] md:tracking-[0.25em] whitespace-nowrap font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {maskedDisplay}
        </p>
        {expiry && (
          <div className="mt-2 text-xs flex items-center gap-4">
            <span className={isDark ? 'opacity-70' : 'text-gray-600'}>{expiry}</span>
          </div>
        )}
      </div>

      {isDark && (
        <img
          src="/icons/wallet/International.svg"
          alt="Card brand"
          className="absolute bottom-5 right-8 sm:bottom-6 sm:right-9 md:bottom-7 md:right-10 h-7 sm:h-8 md:h-9 w-auto"
        />
      )}
      {!isDark && (
        <img
          src="/icons/wallet/Vector.png"
          alt="VISA"
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 h-5 w-auto"
        />
      )}

      {!isDark && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/25 via-black/10 to-transparent rounded-t-2xl" />
      )}
    </div>
  );
}


