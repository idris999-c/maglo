import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Dropdown from '../components/Dropdown';
import StatCards from '../components/StatCards';
import WorkingCapitalChart from '../components/WorkingCapitalChart';
import RecentTransactions from '../components/RecentTransactions';
import WalletPanel from '../components/WalletPanel';
import ScheduledTransfers from '../components/ScheduledTransfers';
import LottieAnimation from '../components/LottieAnimation';
import { useDashboardData } from '../hooks/useDashboardData';

export default function Dashboard() {
  const { user, logout, showWelcomeAnimation, hideWelcomeAnimation } = useAuth();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const [currencyCode, setCurrencyCode] = useState('USD');
  const [locale, setLocale] = useState('en-US');
  const [period, setPeriod] = useState('30d'); // default to Last 6 months

  // Manage dashboard data with custom hook
  const {
    transactions,
    totals,
    scheduledTransfers,
    workingCapitalData,
    walletCards,
    userProfile,
    loading,
    error,
    retryCount,
    isRetrying,
    // refetch, // Unused for now
    retry
  } = useDashboardData(period);

  // Static data for Today and Last 7 days
  const staticChartData = {
    daily: [
      { day: '00:00', income: 1200, expense: 800 },
      { day: '04:00', income: 1500, expense: 900 },
      { day: '08:00', income: 2200, expense: 1100 },
      { day: '12:00', income: 1800, expense: 1300 },
      { day: '16:00', income: 2500, expense: 1000 },
      { day: '20:00', income: 1900, expense: 1200 }
    ],
    '7d': [
      { day: 'Mon', income: 3600, expense: 6250 },
      { day: 'Tue', income: 5600, expense: 2400 },
      { day: 'Wed', income: 2500, expense: 5900 },
      { day: 'Thu', income: 5750, expense: 2300 },
      { day: 'Fri', income: 1600, expense: 5600 },
      { day: 'Sat', income: 5400, expense: 2200 },
      { day: 'Sun', income: 3250, expense: 4900 }
    ]
  };

  // Select data based on period, using static data as fallback
  const chartData = workingCapitalData || staticChartData[period] || null;
  


  return (
    <div className="min-h-screen bg-white overflow-x-hidden" data-page-title="maglo - dashboard">
      {/* Welcome Animation Overlay */}
      {showWelcomeAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
          <LottieAnimation 
            onComplete={hideWelcomeAnimation}
            className="w-48 h-48"
          />
        </div>
      )}

      <div className="grid gap-[8px] sm:gap-[12px] md:gap-[1px] grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[250px_1fr] 2xl:grid-cols-[250px_1fr]">
        <div className="hidden lg:block">
          <Sidebar onLogout={logout} />
        </div>

        <div className="space-y-[15px] sm:space-y-[12px] md:space-y-[40px] px-3 sm:px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-12 pb-4 sm:pb-3 md:pb-6">
          <Topbar 
            user={userProfile || user} 
            onOpenSidebar={() => setShowMobileSidebar(true)} 
          />

          {showMobileSidebar && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div className="absolute inset-0 bg-black/30" onClick={() => setShowMobileSidebar(false)}></div>
              <div className="absolute left-0 top-0 h-full w-[140px] sm:w-[160px] md:w-[200px] bg-[#FAFAFA] p-1 sm:p-1.5 md:p-2">
                <Sidebar onLogout={() => { setShowMobileSidebar(false); logout(); }} />
              </div>
            </div>
          )}

          <div className="grid gap-[8px] sm:gap-[12px] md:gap-[40px] grid-cols-1 lg:grid-cols-[1fr_200px] xl:grid-cols-[1fr_350px] 2xl:grid-cols-[1fr_400px]">
            <main className="space-y-[8px] sm:space-y-[12px] md:space-y-[30px] max-w-none">

              <div className="flex flex-wrap items-center gap-2 sm:gap-1 md:gap-2 mb-2 sm:mb-1 md:mb-2">
                <Dropdown
                  value={currencyCode}
                  onChange={setCurrencyCode}
                  options={[
                    { value: 'USD', label: 'USD' },
                    { value: 'EUR', label: 'EUR' },
                    { value: 'TRY', label: 'TRY' },
                  ]}
                  buttonClassName="bg-[#F8F8F8]"
                />
                <Dropdown
                  value={locale}
                  onChange={setLocale}
                  options={[
                    { value: 'en-US', label: 'en-US' },
                    { value: 'en-GB', label: 'en-GB' },
                    { value: 'tr-TR', label: 'tr-TR' },
                  ]}
                  buttonClassName="bg-[#F8F8F8]"
                />
                <div className="ml-auto" />
              </div>

              <StatCards totals={totals} loading={loading} currencyCode={currencyCode} locale={locale} />
              
              {/* Error and Retry UI */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 text-sm">
                      {error} {retryCount > 0 && `(Retry ${retryCount}/3)`}
                    </span>
                  </div>
                  <button
                    onClick={retry}
                    disabled={isRetrying}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRetrying ? 'Retrying...' : 'Retry'}
                  </button>
                </div>
              )}

              <WorkingCapitalChart data={chartData} loading={loading} currencyCode={currencyCode} locale={locale} period={period} onChangePeriod={setPeriod} />

              {/* Tablet modunda wallet ve scheduled transfer'lar */}
              <div className="lg:hidden grid gap-[8px] sm:gap-[12px] md:gap-[20px] grid-cols-1 sm:grid-cols-2 mb-[20px] sm:mb-[30px] md:mb-[40px]">
                <WalletPanel cards={walletCards} loading={loading} />
                <ScheduledTransfers transfers={scheduledTransfers} loading={loading} currencyCode={currencyCode} locale={locale} />
              </div>

              <RecentTransactions transactions={transactions} loading={loading} currencyCode={currencyCode} locale={locale} />
            </main>

            <section className="hidden lg:block space-y-2 sm:space-y-3 md:space-y-4">
              <WalletPanel cards={walletCards} loading={loading} />
              <ScheduledTransfers transfers={scheduledTransfers} loading={loading} currencyCode={currencyCode} locale={locale} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}