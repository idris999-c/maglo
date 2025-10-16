import React from 'react';
import { currencyFormat, dateStr } from '../utils/format';
import toast from 'react-hot-toast';
import CustomToast from './CustomToast';

export default function ScheduledTransfers({ transfers, loading, currencyCode, locale }) {
  // Toast mesajları için fonksiyonlar
  const handleTransferAction = (action) => {
    switch (action) {
      case 'viewAll':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Loading all scheduled transfers..." 
            type="info" 
          />
        ));
        break;
      case 'loadError':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Failed to load scheduled transfers" 
            type="error" 
          />
        ));
        break;
      case 'transferCancel':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Transfer cancelled successfully" 
            type="success" 
          />
        ));
        break;
      case 'transferEdit':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Transfer updated successfully" 
            type="success" 
          />
        ));
        break;
      case 'transferClick':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Transfer details loaded" 
            type="info" 
          />
        ));
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl md:rounded-xl pt-3 sm:pt-3 md:pt-5 pb-3 sm:pb-3 md:pb-5 px-3 sm:px-3 md:px-5 w-[90%] sm:w-[200px] md:w-[350px] lg:w-[420px] h-[200px] sm:h-[220px] md:h-[425px] mb-[20px] sm:mb-[30px] md:mb-[40px] lg:mb-0 border">
      <div className="flex items-center justify-between mb-[8px] sm:mb-[12px] md:mb-[25px]">
        <h3 className="font-medium text-gray-900 text-[10px] sm:text-[12px] md:text-[18px]">Scheduled Transfers</h3>
        <button 
          onClick={() => handleTransferAction('viewAll')}
          className="text-[8px] sm:text-[9px] md:text-[14px] font-bold text-[#29A073]"
        >
          View All <span aria-hidden className="inline-block w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-[18px] md:h-[18px]">›</span>
        </button>
      </div>
      {loading ? (
        <div className="space-y-[4px] sm:space-y-[6px] md:space-y-[12px]">
          {[...Array(5)].map((_,i)=> (
            <div key={i} className="h-6 sm:h-8 md:h-12 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 rounded" />
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-[4px] sm:space-y-[6px] md:space-y-[12px]">
          {(transfers || []).map((transfer, i) => (
            <div 
              key={transfer.id} 
              onClick={() => handleTransferAction('transferClick')}
              className={`flex items-center justify-between py-0.5 sm:py-1 md:py-2 text-[8px] sm:text-[9px] md:text-sm cursor-pointer hover:bg-gray-50 rounded ${i===0 ? 'border-none' : 'border-t border-gray-200/70'}` }
            >
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
              <div className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px] md:h-[33px] md:w-[33px] rounded-sm sm:rounded-md bg-[#E6F4FF] grid place-items-center">
                <img 
                  src={transfer.image || `/icons/transfers/Ellipse 6${(i % 4) ? `-${i % 4}` : ''}.svg`} 
                  alt="Avatar" 
                  className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px] md:h-[33px] md:w-[33px] rounded-sm sm:rounded" 
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-[7px] sm:text-[8px] md:text-[14px] truncate">{transfer.name}</p>
                <p className="text-gray-500 text-[6px] sm:text-[7px] md:text-[12px] truncate">{dateStr(transfer.date, 'en-GB')}</p>
              </div>
            </div>
            <div className="text-gray-900 font-semibold text-[8px] sm:text-[10px] md:text-[16px]">{currencyFormat(transfer.amount, transfer.currency === '$' ? 'USD' : transfer.currency || currencyCode, locale)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



