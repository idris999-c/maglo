import React from 'react';
import { currencyFormat } from '../utils/format';

export default function ScheduledTransfers({ amounts, loading, currencyCode, locale }) {
  const names = ["Saleh Ahmed","Delowar Hossain","Moinul Hasan Nayem","Dr. Jubed Ahmed","AR. Jakir Alp"];
  return (
    <div className="bg-white p-5 pr-8 md:pr-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Scheduled Transfers</h3>
        <button className="text-sm font-medium text-[#29A073] inline-flex items-center gap-1">View All <span className="translate-y-[1px]">›</span></button>
      </div>
      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_,i)=> (<div key={i} className="h-12 rounded bg-gray-200 animate-pulse" />))}
        </div>
      ) : (
        names.map((n,i)=> (
          <div key={n} className={`flex items-center justify-between py-4 text-[15px] ${i===0 ? 'border-none' : 'border-t border-gray-200/70'}` }>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-[#E6F4FF] grid place-items-center">
                <img src={i === names.length - 1 ? '/icons/transfers/Avater.svg' : `/icons/transfers/Ellipse 6${(i % 4) ? `-${i % 4}` : ''}.svg`} alt="Avatar" className="h-8 w-8 rounded" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{n}</p>
                <p className="text-gray-500 text-sm">April {25 - i}, 2022 at 11:00</p>
              </div>
            </div>
            <div className="text-gray-900 font-semibold">-{currencyFormat(amounts[i], currencyCode, locale)}</div>
          </div>
        ))
      )}
    </div>
  );
}


