import React, { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { currencyFormat } from '../utils/format';
import Dropdown from './Dropdown';

export default function WorkingCapitalChart({ data, loading, currencyCode, locale, period, onChangePeriod }) {
  const periodLabel = period === '30d' ? 'Last 30 days' : period === 'daily' ? 'Today' : 'Last 7 days';
  const xTick = period === '30d'
    ? { fill: '#475569', fontSize: 10, letterSpacing: -0.3 }
    : period === 'daily'
      ? { fill: '#1f2937', fontSize: 10, letterSpacing: -0.2 }
      : { fill: '#1f2937', fontSize: 12, letterSpacing: -0.2 };
  const yTick = period === '30d' ? { fill: '#1f2937', fontSize: 11 } : { fill: '#1f2937', fontSize: 12 };
  const xPadding = period === '30d' ? { left: 16, right: 16 } : { left: 28, right: 20 };
  const xInterval = 0; // show all labels
  // Keep the 'Apr' prefix for 30-day view per design
  const formatDayTick = (value) => value;

  // Compute dynamic Y-axis for daily to make ups/downs visible
  const dailyMax = Array.isArray(data)
    ? data.reduce((max, d) => Math.max(max, d.income || 0, d.expense || 0), 0)
    : 0;
  const dailyUpper = Math.max(100, Math.ceil(dailyMax * 1.2));
  const dailyTicks = [0, 0.25, 0.5, 0.75, 1].map((r) => Math.round(dailyUpper * r));
  return (
    <div className="bg-white rounded-xl p-4 border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className=" font-semibold text-lg text-gray-900">Working Capital</div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border hidden sm:inline-block" aria-label="current period">
            {periodLabel}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#29A073' }} />Income</span>
          <span className="flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#C8EE44' }} />Expenses</span>
        </div>
        <Dropdown
          value={period}
          onChange={(v)=> onChangePeriod && onChangePeriod(v)}
          options={[
            { value: 'daily', label: 'Today' },
            { value: '7d', label: 'Last 7 days' },
            { value: '30d', label: 'Last 30 days' },
          ]}
          align="right"
          labelForValue={(v)=> (v==='30d' ? 'Last 30 days' : v==='daily' ? 'Today' : 'Last 7 days')}
        />
      </div>
      {loading ? (
        <div className="h-64 rounded bg-gray-200 animate-pulse" />
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, left: 0, right: 0, bottom: 0 }}>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                interval={xInterval}
                minTickGap={0}
                height={28}
                tick={xTick}
                tickMargin={period === '30d' ? 4 : 6}
                padding={xPadding}
                tickFormatter={formatDayTick}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={period === 'daily' ? [0, dailyUpper] : [0, 10000]}
                ticks={period === 'daily' ? dailyTicks : [0, 3000, 5000, 7000, 10000]}
                tick={yTick}
                tickFormatter={(v)=> period === 'daily' ? currencyFormat(v, currencyCode, locale) : `${Math.round(v/1000)}K`}
              />
              <Tooltip formatter={(v) => currencyFormat(v, currencyCode, locale)} cursor={{ fill: 'rgba(229,231,235,0.35)' }} />
              <Line type="monotone" dataKey="income" stroke="#29A073" strokeWidth={3} dot={false} strokeLinecap="round" strokeLinejoin="round" />
              <Line type="monotone" dataKey="expense" stroke="#C8EE44" strokeWidth={3} dot={false} strokeLinecap="round" strokeLinejoin="round" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}


