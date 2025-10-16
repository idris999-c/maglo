import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { currencyFormat } from '../utils/format';
import Dropdown from './Dropdown';
import toast from 'react-hot-toast';
import CustomToast from './CustomToast';

export default function WorkingCapitalChart({ data, loading, currencyCode, locale, period, onChangePeriod }) {
  // Toast mesajları için fonksiyonlar
  const handleChartAction = (action) => {
    switch (action) {
      case 'loadError':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Failed to load chart data" 
            type="error" 
          />
        ));
        break;
      case 'dataUpdate':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Chart data updated" 
            type="success" 
          />
        ));
        break;
      case 'periodChange':
        toast.custom((t) => (
          <CustomToast 
            toast={t} 
            message="Chart period changed" 
            type="info" 
          />
        ));
        break;
      default:
        break;
    }
  };

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
  return (
    <div className="bg-white rounded-lg sm:rounded-xl md:rounded-xl pl-[8px] sm:pl-[12px] md:pl-[25px] pt-[8px] sm:pt-[12px] md:pt-[20px] pb-[15px] sm:pb-[20px] md:pb-[50px] pr-[8px] sm:pr-[12px] md:pr-[20px] border w-full max-w-[716px] h-[120px] sm:h-[150px] md:h-[291px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
          <div className="font-semibold text-[10px] sm:text-[12px] md:text-[18px] text-gray-900">Working Capital</div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 md:gap-16">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 text-[8px] sm:text-[9px] md:text-xs text-gray-600">
            <span className="flex items-center gap-0.5 sm:gap-1 md:gap-2"><span className="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 rounded-full" style={{ backgroundColor: '#29A073' }} />Income</span>
            <span className="flex items-center gap-0.5 sm:gap-1 md:gap-2"><span className="inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 rounded-full" style={{ backgroundColor: '#C8EE44' }} />Expenses</span>
          </div>
          <Dropdown
          value={period}
          onChange={(v)=> {
            onChangePeriod && onChangePeriod(v);
            handleChartAction('periodChange');
          }}
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
        <div className="h-[60px] sm:h-[80px] md:h-56 rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-200 rounded" />
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
      ) : (
        <div className="h-[60px] sm:h-[80px] md:h-56">
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


