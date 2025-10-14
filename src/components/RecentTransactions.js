import React from 'react';
import { currencyFormat, dateStr } from '../utils/format';

function TransactionRow({ name, type, amount, date, currencyCode, locale }) {
  const lower = (name || '').toLowerCase();
  const business =
    lower.includes('netflix') ? 'Netflix' :
    lower.includes('figma') ? 'Figma, Inc' :
    lower.includes('iphone') || lower.includes('apple') ? 'Apple, Inc' : '';
  const iconSrc =
    lower.includes('netflix') ? '/icons/recent/Group 41-1.svg' :
    lower.includes('figma') ? '/icons/recent/Group 41-2.svg' :
    '/icons/recent/Group 41.svg';

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
            <div key={i} className="h-10 rounded bg-gray-200 animate-pulse" />
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
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


