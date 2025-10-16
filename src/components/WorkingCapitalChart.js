import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { currencyFormat } from '../utils/format';
import Dropdown from './Dropdown';

export default function WorkingCapitalChart({ data, loading, currencyCode, locale, period, onChangePeriod }) {
  const periodLabel = period === '30d' ? 'Last 6 months' : period === 'daily' ? 'Today' : 'Last 7 days';
  const xTick = period === '30d'
    ? { fill: '#475569', fontSize: 10, letterSpacing: -0.3 }
    : period === 'daily'
      ? { fill: '#1f2937', fontSize: 10, letterSpacing: -0.2 }
      : { fill: '#1f2937', fontSize: 12, letterSpacing: -0.2 };
  const yTick = { fill: '#1f2937', fontSize: 12 };
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
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Working Capital</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: '#29A073' }} />
              Income
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: '#C8EE44' }} />
              Expenses
            </span>
          </div>
          <Dropdown
            value={period}
            onChange={(v)=> onChangePeriod && onChangePeriod(v)}
            options={[
              { value: 'daily', label: 'Today' },
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 6 months' },
            ]}
            align="right"
            labelForValue={(v)=> (v==='30d' ? 'Last 6 months' : v==='daily' ? 'Today' : 'Last 7 days')}
          />
        </div>
      </div>
      {loading ? (
        <div className="h-64 rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-200 rounded" />
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data || []} margin={{ top: 10, left: 0, right: 0, bottom: 0 }}>
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
                domain={period === 'daily' ? [0, 'dataMax'] : (period === '7d' ? [0, 'dataMax'] : [0, 'dataMax'])}
                ticks={undefined}
                tick={yTick}
                tickFormatter={(v)=> period === 'daily' ? `${Math.round(v/1000)}K` : (period === '30d' ? `${Math.round(v/1000)}K` : `${Math.round(v/1000)}K`)}
                tickMargin={12}
              />
              <Tooltip 
                formatter={(v) => currencyFormat(v, currencyCode, locale)} 
                cursor={{ fill: 'rgba(229,231,235,0.35)' }}
                contentStyle={{
                  fontSize: '12px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}
                labelStyle={{
                  fontSize: '11px',
                  fontWeight: '500'
                }}
                itemStyle={{
                  fontSize: '11px',
                  margin: '4px 0'
                }}
              />
              <Line type="monotone" dataKey="income" stroke="#29A073" strokeWidth={3} dot={false} strokeLinecap="round" strokeLinejoin="round" />
              <Line type="monotone" dataKey="expense" stroke="#C8EE44" strokeWidth={3} dot={false} strokeLinecap="round" strokeLinejoin="round" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}


