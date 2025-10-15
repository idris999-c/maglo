import React from 'react';
import { currencyFormat, dateStr } from '../utils/format';

export default function ScheduledTransfers({ transfers, loading, currencyCode, locale }) {
  return (
    <div className="bg-white p-5 pr-8 md:pr-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Scheduled Transfers</h3>
        <button className="text-sm font-medium text-[#29A073] inline-flex items-center gap-1">View All <span className="translate-y-[1px]">›</span></button>
      </div>
      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_,i)=> (
            <div key={i} className="h-12 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 rounded" />
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          ))}
        </div>
      ) : (
        (transfers || []).map((transfer, i) => (
          <div key={transfer.id} className={`flex items-center justify-between py-4 text-[15px] ${i===0 ? 'border-none' : 'border-t border-gray-200/70'}` }>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-[#E6F4FF] grid place-items-center">
                <img 
                  src={transfer.image || `/icons/transfers/Ellipse 6${(i % 4) ? `-${i % 4}` : ''}.svg`} 
                  alt="Avatar" 
                  className="h-8 w-8 rounded" 
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{transfer.name}</p>
                <p className="text-gray-500 text-sm">{dateStr(transfer.date, 'en-GB')}</p>
              </div>
            </div>
            <div className="text-gray-900 font-semibold">{currencyFormat(transfer.amount, transfer.currency === '$' ? 'USD' : transfer.currency || currencyCode, locale)}</div>
          </div>
        ))
      )}
    </div>
  );
}


