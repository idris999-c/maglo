import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Dropdown from '../components/Dropdown';
import StatCards from '../components/StatCards';
import WorkingCapitalChart from '../components/WorkingCapitalChart';
import RecentTransactions from '../components/RecentTransactions';
import WalletPanel from '../components/WalletPanel';
import ScheduledTransfers from '../components/ScheduledTransfers';
// currencyFormat kaldırıldı: burada kullanılmıyor

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const [currencyCode, setCurrencyCode] = useState('USD');
  const [locale, setLocale] = useState('en-US');
  const [period, setPeriod] = useState('daily'); // default to Today

  const chartSource = useMemo(
    () => {
      const seven = [
        { day: 'Apr 14', income: 3600, expense: 5200 },
        { day: 'Apr 15', income: 7400, expense: 3300 },
        { day: 'Apr 16', income: 4200, expense: 6800 },
        { day: 'Apr 17', income: 8100, expense: 4700 },
        { day: 'Apr 18', income: 2300, expense: 5200 },
        { day: 'Apr 19', income: 6600, expense: 2100 },
        { day: 'Apr 20', income: 3500, expense: 5900 },
      ];
      const thirty = Array.from({ length: 30 }).map((_, i) => ({ day: `Apr ${i + 1}`, income: 4000 + Math.round(Math.random()*3000), expense: 2000 + Math.round(Math.random()*2000) }));
      // Daily (hourly) data: sinusoidal pattern + slight noise to ensure visible ups/downs
      const daily = Array.from({ length: 24 }).map((_, i) => {
        const rad = (i / 24) * Math.PI * 2;
        const incomeBase = 800 + 500 * Math.sin(rad - Math.PI / 2) + 200 * Math.sin(rad * 2);
        const expenseBase = 600 + 350 * Math.cos(rad) - 150 * Math.sin(rad * 2);
        const income = Math.max(60, Math.round(incomeBase + (Math.random() - 0.5) * 150));
        const expense = Math.max(40, Math.round(expenseBase + (Math.random() - 0.5) * 120));
        return { day: `${String(i).padStart(2,'0')}:00`, income, expense };
      });
      const weekly = [];
      for (let i = 0; i < thirty.length; i += 7) {
        const slice = thirty.slice(i, i + 7);
        const income = slice.reduce((a, b) => a + b.income, 0);
        const expense = slice.reduce((a, b) => a + b.expense, 0);
        weekly.push({ day: `Week ${Math.floor(i / 7) + 1}`, income, expense });
      }
      return { '7d': seven, '30d': thirty, weekly, daily };
    },
    []
  );

  const [transactions] = useState([
    { id: 1, name: 'Iphone 13 Pro MAX', type: 'Mobile', amount: 420.84, date: '2022-04-14' },
    { id: 2, name: 'Netflix Subscription', type: 'Entertainment', amount: 100.0, date: '2022-04-05' },
    { id: 3, name: 'Figma Subscription', type: 'Software', amount: 244.2, date: '2022-04-02' },
  ]);

  const [totals] = useState({ balance: 5240.21, spending: 250.8, saved: 550.25 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simüle veri yükleme (skeleton göstermek için)
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const chartData = chartSource[period];

  return (
    <div className="min-h-screen bg-white" data-page-title="maglo - dashboard">
      <div className="grid gap-3 sm:gap-4 md:gap-6 md:[grid-template-columns:280px_1fr]">
        <div className="hidden md:block">
          <Sidebar onLogout={logout} />
        </div>

        <div className="space-y-4 md:space-y-6 px-6 md:px-8 pb-12 md:pb-16">
          <Topbar user={user} onOpenSidebar={() => setShowMobileSidebar(true)} />

          {showMobileSidebar && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="absolute inset-0 bg-black/30" onClick={() => setShowMobileSidebar(false)}></div>
              <div className="absolute left-0 top-0 h-full w-80 bg-[#FAFAFA] p-3">
                <Sidebar onLogout={() => { setShowMobileSidebar(false); logout(); }} />
              </div>
            </div>
          )}

          <div className="grid gap-4 md:gap-6 md:[grid-template-columns:1fr_415px] lg:[grid-template-columns:1fr_475px]">
            <main className="space-y-4 md:space-y-6">

              <div className="flex flex-wrap items-center gap-3 mb-2">
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

              <WorkingCapitalChart data={chartData} loading={loading} currencyCode={currencyCode} locale={locale} period={period} onChangePeriod={setPeriod} />

              <RecentTransactions transactions={transactions} loading={loading} currencyCode={currencyCode} locale={locale} />
            </main>

            <section className="space-y-6">
              <WalletPanel />
              <ScheduledTransfers amounts={[435,132,826,435,228]} loading={loading} currencyCode={currencyCode} locale={locale} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


