import React from 'react';
import { currencyFormat, dateStr } from '../utils/format';

export default function ScheduledTransfers({ transfers, loading, currencyCode, locale }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Scheduled Transfers</h3>
        <button className="text-sm font-bold text-[#29A073] hover:text-[#1f7a5a]">View All <span aria-hidden className="inline-block w-4 h-4">›</span></button>
      </div>
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_,i)=> (
            <div key={i} className="h-12 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 rounded" />
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {(transfers || []).map((transfer, i) => (
            <div key={transfer.id} className={`flex items-center justify-between py-3 ${i===0 ? 'border-none' : 'border-t border-gray-200'}` }>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#E6F4FF] grid place-items-center">
                <img 
                  src={transfer.image || `/icons/transfers/Ellipse 6${(i % 4) ? `-${i % 4}` : ''}.svg`} 
                  alt="Avatar" 
                  className="h-10 w-10 rounded-lg" 
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-sm truncate">{transfer.name}</p>
                <p className="text-gray-500 text-xs truncate">{dateStr(transfer.date, 'en-GB')}</p>
              </div>
            </div>
            <div className="text-gray-900 font-semibold text-base">{currencyFormat(transfer.amount, transfer.currency === '$' ? 'USD' : transfer.currency || currencyCode, locale)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



