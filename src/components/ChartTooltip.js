import React from 'react';
import { currencyFormat } from '../utils/format';

export default function ChartTooltip({ active, payload, label, currencyCode = 'USD', locale = 'en-US' }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;
  const income = data?.income || 0;
  const expense = data?.expense || 0;
  const net = income - expense;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 sm:p-3 min-w-[120px] sm:min-w-[200px]">
      {/* Header */}
      <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2 border-b border-gray-100 pb-1 sm:pb-2">
        {label}
      </div>
      
      {/* Income */}
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#29A073]"></div>
          <span className="text-xs sm:text-sm text-gray-600">Income</span>
        </div>
        <span className="text-xs sm:text-sm font-semibold text-[#29A073]">
          {currencyFormat(income, currencyCode, locale)}
        </span>
      </div>
      
      {/* Expense */}
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#C8EE44]"></div>
          <span className="text-xs sm:text-sm text-gray-600">Expense</span>
        </div>
        <span className="text-xs sm:text-sm font-semibold text-[#C8EE44]">
          {currencyFormat(expense, currencyCode, locale)}
        </span>
      </div>
      
      {/* Net */}
      <div className="flex items-center justify-between pt-1 sm:pt-2 border-t border-gray-100">
        <span className="text-xs sm:text-sm font-medium text-gray-700">Net</span>
        <span className={`text-xs sm:text-sm font-bold ${net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {currencyFormat(net, currencyCode, locale)}
        </span>
      </div>
      
      {/* Percentage change (if available) */}
      {data?.change && (
        <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-gray-500">
          {data.change > 0 ? '+' : ''}{data.change.toFixed(1)}% from previous
        </div>
      )}
    </div>
  );
}
