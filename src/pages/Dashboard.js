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
import { getFinancialSummary, getWorkingCapital, getWalletCards, getRecentTransactions, getScheduledTransfers, getUserProfile } from '../utils/financialApi';
import toast from 'react-hot-toast';
// Cache import'u kaldırıldı

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const [currencyCode, setCurrencyCode] = useState('USD');
  const [locale, setLocale] = useState('en-US');
  const [period, setPeriod] = useState('30d'); // default to Last 6 months

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

  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ balance: 0, spending: 0, saved: 0 });
  const [loading, setLoading] = useState(true);
  const [scheduledTransfers, setScheduledTransfers] = useState([]);
  const [workingCapitalData, setWorkingCapitalData] = useState(null);
  const [walletCards, setWalletCards] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    console.log('🚀 API çağrıları başlatılıyor... (Period:', period, ')');
    
    (async () => {
      try {
        setLoading(true);
        
        console.log('📡 API çağrıları başlatılıyor...');
        const [summary, wc, trx, sch, wallet, profile] = await Promise.all([
          getFinancialSummary(),
          getWorkingCapital(),
          getRecentTransactions(20),
          getScheduledTransfers(),
          getWalletCards(),
          getUserProfile(),
        ]);
        
        console.log('📡 API çağrıları tamamlandı:', {
          summary: !!summary,
          wc: !!wc,
          wcData: wc?.data?.length || 0,
          wcFullData: wc,
          trx: !!trx,
          sch: !!sch,
          wallet: !!wallet,
          walletCards: wallet?.length || 0,
          profile: !!profile
        });
        
        console.log('✅ API verileri başarıyla alındı');
        console.log('📈 Working Capital API verisi:', wc);
        
        const balance = summary?.totalBalance?.amount || 0;
        const spending = summary?.totalExpense?.amount || 0;
        const saved = summary?.totalSavings?.amount || 0;
        const totalsData = { balance, spending, saved };
        
        console.log('💰 Totals data:', totalsData);
        setTotals(totalsData);

        const trxList = trx?.transactions || [];
        const transactionsData = trxList.map(t => ({
          id: t.id,
          name: t.name,
          type: t.type,
          amount: t.amount,
          date: t.date,
          business: t.business,
          image: t.image,
        }));
        
        console.log('💳 Transactions data:', transactionsData);
        setTransactions(transactionsData);

        const scheduledData = sch?.transfers?.slice(0,5) || [];
        console.log('📅 Scheduled transfers data:', scheduledData);
        setScheduledTransfers(scheduledData);

        const walletData = wallet || [];
        console.log('💳 Wallet cards data:', walletData);
        setWalletCards(walletData);

        const profileData = profile?.data || null;
        console.log('👤 User profile data:', profileData);
        setUserProfile(profileData);

        // Working Capital API verisini işle - sadece "Last 6 months" için
        if (wc?.data && period === '30d') {
          console.log('📈 Working Capital API verisi:', wc);
          
          // API'den gelen 6 aylık veriyi düzgün işle
          const chartData = wc.data.map(monthData => {
            // Sayısal değerleri kontrol et ve düzelt
            const income = typeof monthData.income === 'number' ? monthData.income : 0;
            const expense = typeof monthData.expense === 'number' ? monthData.expense : 0;
            const net = typeof monthData.net === 'number' ? monthData.net : (income - expense);
            
            console.log(`📊 ${monthData.month}: income=${income}, expense=${expense}, net=${net}`);
            
            return {
              day: monthData.month, // API'den gelen ay ismi (Mayıs, Haziran, vb.)
              income: income,
              expense: expense,
              net: net
            };
          });
          
          console.log('📈 Working Capital chart data (6 months):', chartData);
          setWorkingCapitalData(chartData);
        } else {
          // Diğer period'lar için null veri
          setWorkingCapitalData(null);
        }

        console.log('🎉 Tüm veriler state\'e kaydedildi');
        
      } catch (err) {
        console.error('❌ API hatası:', err);
        toast.error(err?.message || 'Veriler yüklenemedi');
      } finally {
        setLoading(false);
      }
    })();
  }, [period]); // Period değiştiğinde de çalışsın

  // Period'a göre veri seç
  const chartData = workingCapitalData || staticChartData[period] || null;
  
  // Debug için
  console.log('🔍 Chart data debug:', {
    period,
    hasWorkingCapitalData: !!workingCapitalData,
    workingCapitalDataLength: workingCapitalData?.length || 0,
    finalChartData: chartData?.length || 0
  });

  return (
    <div className="min-h-screen bg-white" data-page-title="maglo - dashboard">
      <div className="grid gap-[8px] sm:gap-[12px] md:gap-[40px] grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[250px_1fr]">
        <div className="hidden md:block">
          <Sidebar onLogout={logout} />
        </div>

        <div className="space-y-[8px] sm:space-y-[12px] md:space-y-[40px] px-1 sm:px-2 md:px-4 pb-2 sm:pb-3 md:pb-6">
          <Topbar user={userProfile || user} onOpenSidebar={() => setShowMobileSidebar(true)} />

          {showMobileSidebar && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="absolute inset-0 bg-black/30" onClick={() => setShowMobileSidebar(false)}></div>
              <div className="absolute left-0 top-0 h-full w-[140px] sm:w-[160px] bg-[#FAFAFA] p-1 sm:p-1.5">
                <Sidebar onLogout={() => { setShowMobileSidebar(false); logout(); }} />
              </div>
            </div>
          )}

          <div className="grid gap-[8px] sm:gap-[12px] md:gap-[40px] grid-cols-1 lg:grid-cols-[1fr_200px] xl:grid-cols-[1fr_434px]">
            <main className="space-y-[8px] sm:space-y-[12px] md:space-y-[30px]">

              <div className="flex flex-wrap items-center gap-0.5 sm:gap-1 md:gap-2 mb-0.5 sm:mb-1 md:mb-2">
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

            <section className="space-y-2 sm:space-y-3 md:space-y-4">
              <WalletPanel cards={walletCards} loading={loading} />
              <ScheduledTransfers transfers={scheduledTransfers} loading={loading} currencyCode={currencyCode} locale={locale} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}