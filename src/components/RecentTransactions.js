import React from 'react';
import { currencyFormat, dateStr } from '../utils/format';

function TransactionRow({ name, type, amount, date, currencyCode, locale, business, image }) {
  // API'den gelen image URL'ini kullan, yoksa varsayılan icon
  const iconSrc = image || '/icons/recent/Group 41.svg';

  return (
    <div className="py-4 grid grid-cols-1 sm:grid-cols-5 items-center text-sm gap-4">
      <div className="col-span-1 sm:col-span-2">
        <div className="flex items-center gap-3">
          <img src={iconSrc} alt="" className="h-10 w-10 rounded-lg" />
          <div className="min-w-0 flex-1">
            <div className="text-gray-900 font-medium truncate">{name}</div>
            {business && <div className="text-sm text-gray-500 truncate">{business}</div>}
          </div>
        </div>
      </div>
      <div className="text-gray-500 text-center">{type}</div>
      <div className="text-right font-semibold text-gray-900">{currencyFormat(amount, currencyCode, locale)}</div>
      <div className="text-right text-gray-500 whitespace-nowrap">{dateStr(date, 'en-GB')}</div>
    </div>
  );
}

export default function RecentTransactions({ transactions, loading, currencyCode, locale }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
        <button className="text-sm font-bold text-[#29A073] hover:text-[#1f7a5a]">View All <span aria-hidden className="inline-block w-4 h-4">›</span></button>
      </div>
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_,i)=> (
            <div key={i} className="h-12 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 rounded" />
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="hidden sm:grid grid-cols-5 text-xs uppercase tracking-wide text-gray-500 font-semibold py-3 border-b border-gray-200">
            <div className="col-span-2">Name/Business</div>
            <div className="text-center">Type</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Date</div>
          </div>
          <div className="divide-y divide-gray-200">
            {transactions.map(t => (
              <TransactionRow
                key={t.id}
                name={t.name}
                type={t.type}
                amount={t.amount}
                date={t.date}
                currencyCode={currencyCode}
                locale={locale}
                business={t.business}
                image={t.image}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


