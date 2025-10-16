import { useState, useEffect, useCallback } from 'react';
import { 
  getFinancialSummary, 
  getWorkingCapital, 
  getWalletCards, 
  getRecentTransactions, 
  getScheduledTransfers, 
  getUserProfile 
} from '../utils/financialApi';
import { withRetry, checkNetworkStatus } from '../utils/errorHandler';

export const useDashboardData = (period = '30d') => {
  const [data, setData] = useState({
    transactions: [],
    totals: { balance: 0, spending: 0, saved: 0 },
    scheduledTransfers: [],
    workingCapitalData: null,
    walletCards: [],
    userProfile: null,
    loading: true,
    error: null,
    retryCount: 0,
    isRetrying: false
  });

  const fetchData = useCallback(async (isRetry = false) => {
    try {
      setData(prev => ({ 
        ...prev, 
        loading: !isRetry, 
        error: null, 
        isRetrying: isRetry,
        retryCount: isRetry ? prev.retryCount + 1 : 0
      }));
      
      // Check network status
      if (!checkNetworkStatus()) {
        throw new Error('Network Error');
      }

      
      // API calls with retry logic (3 attempts, exponential backoff)
      const [summary, wc, trx, sch, wallet, profile] = await Promise.all([
        withRetry(() => getFinancialSummary(), 3, 1000),
        withRetry(() => getWorkingCapital(), 3, 1000),
        withRetry(() => getRecentTransactions(20), 3, 1000),
        withRetry(() => getScheduledTransfers(), 3, 1000),
        withRetry(() => getWalletCards(), 3, 1000),
        withRetry(() => getUserProfile(), 3, 1000),
      ]);
      
      
      // Process data
      const balance = summary?.totalBalance?.amount || 0;
      const spending = summary?.totalExpense?.amount || 0;
      const saved = summary?.totalSavings?.amount || 0;
      const totalsData = { balance, spending, saved };

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

      const scheduledData = sch?.transfers?.slice(0,5) || [];
      const walletData = wallet || [];
      const profileData = profile?.data || null;

      // Process Working Capital API data
      let workingCapitalData = null;
      if (wc?.data && period === '30d') {
        workingCapitalData = wc.data.map(monthData => {
          const income = typeof monthData.income === 'number' ? monthData.income : 0;
          const expense = typeof monthData.expense === 'number' ? monthData.expense : 0;
          const net = typeof monthData.net === 'number' ? monthData.net : (income - expense);
          
          return {
            day: monthData.month,
            income: income,
            expense: expense,
            net: net
          };
        });
      }

      setData({
        transactions: transactionsData,
        totals: totalsData,
        scheduledTransfers: scheduledData,
        workingCapitalData: workingCapitalData,
        walletCards: walletData,
        userProfile: profileData,
        loading: false,
        error: null,
        retryCount: 0,
        isRetrying: false
      });

      
    } catch (err) {
      console.error('❌ API error:', err);
      setData(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.message || 'Failed to load data',
        isRetrying: false
      }));
    }
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [period, fetchData]);

  const refetch = () => {
    fetchData();
  };

  const retry = () => {
    fetchData(true);
  };

  return {
    ...data,
    refetch,
    retry
  };
};

export default useDashboardData;
