import React from 'react';
import WalletCard from './WalletCard';

export default function WalletPanel({ cards = [], loading = false }) {
  if (loading) {
    return (
      <div className="bg-white p-5 md:p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-xl text-gray-900">Wallet</h3>
          <button className="px-3 rounded hover:bg-gray-100" aria-label="More options">⋯</button>
        </div>
        <div className="relative">
          <div className="h-64 rounded relative overflow-hidden">
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
    <div className="bg-white p-5 md:p-6 ">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-xl text-gray-900">Wallet</h3>
        <button className="px-3 rounded hover:bg-gray-100" aria-label="More options">⋯</button>
      </div>
      <div className="relative">
        {primaryCard && (
          <WalletCard 
            variant="dark" 
            bankLabel={primaryCard.bank} 
            number={primaryCard.cardNumber}
            className="max-w-[94%] h-[224px]" 
          />
        )}
        {secondaryCard && (
          <div className="absolute inset-x-0 bottom-1 flex justify-center">
            <WalletCard 
              variant="light" 
              bankLabel={secondaryCard.bank} 
              masked 
              number={secondaryCard.cardNumber} 
              expiry={`${String(secondaryCard.expiryMonth).padStart(2, '0')}/${String(secondaryCard.expiryYear).slice(-2)}`} 
              className="w-11/12 sm:w-5/6 md:w-4/5 lg:w-4/5 h-[176px] -ml-4 md:-ml-6" 
            />
          </div>
        )}
        <div className="pt-28"></div>
      </div>
    </div>
  );
}


