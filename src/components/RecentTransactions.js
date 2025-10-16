import React from 'react';
import { currencyFormat, dateStr } from '../utils/format';
import toast from 'react-hot-toast';
import CustomToast from './CustomToast';

function TransactionRow({ name, type, amount, date, currencyCode, locale, business, image }) {
  // API'den gelen image URL'ini kullan, yoksa varsayılan icon
  const iconSrc = image || '/icons/recent/Group 41.svg';

  return (
    <div className="py-0.5 sm:py-1 md:py-2 grid grid-cols-1 sm:grid-cols-5 items-center text-[8px] sm:text-[9px] md:text-sm gap-1 sm:gap-2 md:gap-0">
      <div className="col-span-1 sm:col-span-2">
        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
          <img src={iconSrc} alt="" className="h-4 w-4 sm:h-5 sm:w-5 md:h-8 md:w-8 rounded-md sm:rounded-lg" />
          <div className="min-w-0 flex-1">
            <div className="text-gray-900 font-medium text-[7px] sm:text-[8px] md:text-[14px] truncate">{name}</div>
            {business && <div className="text-[6px] sm:text-[7px] md:text-[12px] text-gray-500 truncate">{business}</div>}
          </div>
        </div>
      </div>
      <div className="text-gray-500 text-center sm:text-center text-[7px] sm:text-[8px] md:text-[14px]">{type}</div>
      <div className="text-right sm:text-right font-semibold text-gray-900 text-[7px] sm:text-[8px] md:text-[14px]">{currencyFormat(amount, currencyCode, locale)}</div>
      <div className="text-right text-gray-500 whitespace-nowrap text-[7px] sm:text-[8px] md:text-[14px]">{dateStr(date, 'en-GB')}</div>
    </div>
  );
}

export default function RecentTransactions({ transactions, loading, currencyCode, locale }) {
  // Toast mesajları için fonksiyonlar
  const handleTransactionAction = (action) => {
    switch (action) {
      case 'viewAll':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Loading all transactions..." 
            type="info" 
          />
        ));
        break;
      case 'loadError':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Failed to load transactions" 
            type="error" 
          />
        ));
        break;
      case 'transactionClick':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Transaction details loaded" 
            type="success" 
          />
        ));
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl pl-[8px] sm:pl-[12px] md:pl-[25px] pr-[8px] sm:pr-[12px] md:pr-[19px] py-2 sm:py-3 md:py-4 border w-full max-w-[717px]">
      <div className="flex items-center justify-between mb-0.5 sm:mb-1 md:mb-2">
        <h3 className="font-medium text-gray-900 text-[10px] sm:text-[12px] md:text-[18px]">Recent Transaction</h3>
        <button 
          onClick={() => handleTransactionAction('viewAll')}
          className="text-[8px] sm:text-[9px] md:text-[14px] font-bold text-[#29A073]"
        >
          View All <span aria-hidden className="inline-block w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] md:w-[18px] md:h-[18px]">›</span>
        </button>
      </div>
      {loading ? (
        <div className="space-y-0.5 sm:space-y-1 md:space-y-2">
          {[...Array(3)].map((_,i)=> (
            <div key={i} className="h-6 sm:h-8 md:h-10 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 rounded" />
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="hidden sm:grid grid-cols-5 text-[8px] sm:text-[9px] md:text-[12px] uppercase tracking-wide text-gray-500 font-semibold py-1 sm:py-2 md:py-3">
            <div className="col-span-2 pl-1">Name/Business</div>
            <div className="text-center">Type</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Date</div>
          </div>
          <div className="divide-y">
            {transactions.map(t => (
              <div 
                key={t.id}
                onClick={() => handleTransactionAction('transactionClick')}
                className="cursor-pointer hover:bg-gray-50 rounded"
              >
                <TransactionRow
                  name={t.name}
                  type={t.type}
                  amount={t.amount}
                  date={t.date}
                  currencyCode={currencyCode}
                  locale={locale}
                  business={t.business}
                  image={t.image}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


