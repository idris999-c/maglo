import React from 'react';
import WalletCard from './WalletCard';

export default function WalletPanel({ cards = [], loading = false }) {
  if (loading) {
    return (
      <div className="bg-white p-1.5 sm:p-2 md:p-5 lg:p-6">
        <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-3">
          <h3 className="font-medium text-[10px] sm:text-[12px] md:text-[18px] text-gray-900">Wallet</h3>
          <button className="px-1 sm:px-2 md:px-3 rounded hover:bg-gray-100" aria-label="More options">⋯</button>
        </div>
        <div className="relative">
          <div className="h-24 sm:h-32 md:h-64 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-200 rounded" />
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </div>
      </div>
    );
  }

  // API'den gelen kartları kullan
  const displayCards = cards || [];
  
  const primaryCard = displayCards.find(card => card.isDefault) || displayCards[0];
  const secondaryCard = displayCards.find(card => !card.isDefault) || displayCards[1];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Wallet</h3>
        <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="More options">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="1" fill="#6B7280"/>
            <circle cx="19" cy="12" r="1" fill="#6B7280"/>
            <circle cx="5" cy="12" r="1" fill="#6B7280"/>
          </svg>
        </button>
      </div>
      <div className="relative">
        {primaryCard && (
          <WalletCard 
            variant="dark" 
            bankLabel={primaryCard.bank} 
            number={primaryCard.cardNumber}
            className="w-full h-48 mb-4" 
          />
        )}
        {secondaryCard && (
          <div className="relative">
            <WalletCard 
              variant="light" 
              bankLabel={secondaryCard.bank} 
              masked 
              number={secondaryCard.cardNumber} 
              expiry={`${String(secondaryCard.expiryMonth).padStart(2, '0')}/${String(secondaryCard.expiryYear).slice(-2)}`} 
              className="w-full h-44 -mt-8 ml-4" 
            />
          </div>
        )}
      </div>
    </div>
  );
}


