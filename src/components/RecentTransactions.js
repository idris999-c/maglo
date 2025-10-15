import React from 'react';
import { currencyFormat, dateStr } from '../utils/format';

function TransactionRow({ name, type, amount, date, currencyCode, locale, business, image }) {
  // API'den gelen image URL'ini kullan, yoksa varsayılan icon
  const iconSrc = image || '/icons/recent/Group 41.svg';

  return (
    <div className="py-4 grid grid-cols-5 items-center text-sm">
      <div className="col-span-2">
        <div className="flex items-center gap-3">
          <img src={iconSrc} alt="" className="h-9 w-9 rounded-lg" />
          <div>
            <div className="text-gray-900 font-medium">{name}</div>
            {business && <div className="text-xs text-gray-500">{business}</div>}
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
    <div className="bg-white rounded-2xl p-6 border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">Recent Transaction</h3>
        <button className="text-sm font-medium text-[#29A073]">View All <span aria-hidden>›</span></button>
      </div>
      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_,i)=> (
            <div key={i} className="h-10 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 rounded" />
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-5 text-[11px] uppercase tracking-wide text-gray-500 font-semibold pb-2">
            <div className="col-span-2 pl-1">Name/Business</div>
            <div className="text-center">Type</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Date</div>
          </div>
          <div className="divide-y">
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


