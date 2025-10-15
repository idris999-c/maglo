import http from './httpClient';
import { getCachedData, setCachedData } from './apiCache';

// Cache'li API çağrısı yapan yardımcı fonksiyon
const cachedApiCall = async (endpoint, apiFunction) => {
  // Önce cache'den kontrol et
  const cached = getCachedData(endpoint);
  if (cached) {
    console.log(`📦 Cache'den veri alındı: ${endpoint}`);
    return cached;
  }

  // Cache'de yoksa API'den çek
  console.log(`🌐 API'den veri çekiliyor: ${endpoint}`);
  const data = await apiFunction();
  
  // Cache'e kaydet
  setCachedData(endpoint, data);
  console.log(`💾 Veri cache'e kaydedildi: ${endpoint}`);
  
  return data;
};

export const getFinancialSummary = async () => {
  return cachedApiCall('/financial/summary', async () => {
    const { data } = await http.get('/financial/summary');
    return data?.data;
  });
};

export const getWorkingCapital = async () => {
  return cachedApiCall('/financial/working-capital', async () => {
    const { data } = await http.get('/financial/working-capital');
    return data?.data;
  });
};

export const getWalletCards = async () => {
  return cachedApiCall('/financial/wallet', async () => {
    const { data } = await http.get('/financial/wallet');
    return data?.data?.cards || [];
  });
};

export const getRecentTransactions = async (limit = 20) => {
  const endpoint = `/financial/transactions/recent?limit=${limit}`;
  return cachedApiCall(endpoint, async () => {
    const { data } = await http.get('/financial/transactions/recent', { params: { limit } });
    return data?.data;
  });
};

export const getScheduledTransfers = async () => {
  return cachedApiCall('/financial/transfers/scheduled', async () => {
    const { data } = await http.get('/financial/transfers/scheduled');
    return data?.data;
  });
};

export const getUserProfile = async () => {
  return cachedApiCall('/users/profile', async () => {
    const { data } = await http.get('/users/profile');
    return data;
  });
};



