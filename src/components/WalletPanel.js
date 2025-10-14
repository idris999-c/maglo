import React from 'react';
import WalletCard from './WalletCard';

export default function WalletPanel() {
  return (
    <div className="bg-white p-5 md:p-6 ">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-xl text-gray-900">Wallet</h3>
        <button className="px-3 rounded hover:bg-gray-100" aria-label="More options">⋯</button>
      </div>
      <div className="relative">
        <WalletCard variant="dark" bankLabel="Universal Bank" number="5495 7381 3759 2321" className="max-w-[94%] h-[224px]" />
         <div className="absolute inset-x-0 bottom-1 flex justify-center">
           <WalletCard variant="light" bankLabel="Commercial Bank" masked number="8595 2548 1234 5678" expiry="09/25" className="w-4/5 h-[176px] -ml-4 md:-ml-6" />
        </div>
        <div className="pt-28"></div>
      </div>
    </div>
  );
}


