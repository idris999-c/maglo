import React from 'react';
import WalletCard from './WalletCard';
import toast from 'react-hot-toast';
import CustomToast from './CustomToast';

export default function WalletPanel({ cards = [], loading = false }) {
  // Toast mesajları için fonksiyonlar
  const handleCardAction = (action) => {
    switch (action) {
      case 'add':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Card added successfully" 
            type="success" 
          />
        ));
        break;
      case 'remove':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Card removed successfully" 
            type="success" 
          />
        ));
        break;
      case 'update':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Card updated successfully" 
            type="success" 
          />
        ));
        break;
      case 'error':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Failed to load cards" 
            type="error" 
          />
        ));
        break;
      default:
        break;
    }
  };

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
    <div className="bg-white pt-1.5 sm:pt-2 md:pt-5 pb-1.5 sm:pb-2 md:pb-5 pr-1.5 sm:pr-2 md:pr-5">
      <div className="flex items-center justify-start mb-[6px] sm:mb-[8px] md:mb-[15px]">
        <h3 className="font-medium text-[10px] sm:text-[12px] md:text-[18px] text-gray-900">Wallet</h3>
        <button className="px-1 sm:px-1.5 md:px-3 rounded hover:bg-gray-100 w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[22px] md:h-[22px] flex items-center justify-center ml-auto sm:ml-2 md:ml-72" aria-label="More options">⋯</button>
      </div>
      <div className="relative w-full sm:w-[200px] md:w-[350px] lg:w-[434px]">
        {primaryCard && (
          <WalletCard 
            variant="dark" 
            bankLabel={primaryCard.bank} 
            number={primaryCard.cardNumber}
            className="w-full sm:w-[180px] md:w-[320px] lg:w-[354px] h-[80px] sm:h-[100px] md:h-[200px] lg:h-[210px] ml-0 mr-0 sm:mr-[10px] md:mr-[30px] lg:mr-[40px]" 
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
              className="w-[85%] sm:w-[160px] md:w-[290px] lg:w-[324px] h-[70px] sm:h-[90px] md:h-[170px] lg:h-[172px] -ml-1 sm:-ml-2 md:-ml-4 lg:-ml-5" 
            />
          </div>
        )}
        <div className="pt-8 sm:pt-12 md:pt-22 lg:pt-24"></div>
      </div>
    </div>
  );
}


