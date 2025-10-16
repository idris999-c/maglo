// Global API cache yönetimi
let apiCallInProgress = false;
let apiDataCache = new Map(); // Her endpoint için ayrı cache
let cacheTimestamps = new Map(); // Cache zamanları
const CACHE_DURATION = 2 * 1000; // 2 saniye cache süresi (test için)

export const isApiCallInProgress = () => apiCallInProgress;
export const setApiCallInProgress = (value) => { apiCallInProgress = value; };

// Cache kontrolü
export const getCachedData = (endpoint) => {
  const cached = apiDataCache.get(endpoint);
  const timestamp = cacheTimestamps.get(endpoint);
  
  if (!cached || !timestamp) return null;
  
  // Cache süresi dolmuş mu?
  if (Date.now() - timestamp > CACHE_DURATION) {
    apiDataCache.delete(endpoint);
    cacheTimestamps.delete(endpoint);
    return null;
  }
  
  return cached;
};

// Cache'e veri kaydet
export const setCachedData = (endpoint, data) => {
  apiDataCache.set(endpoint, data);
  cacheTimestamps.set(endpoint, Date.now());
};

// Belirli endpoint cache'ini temizle
export const clearEndpointCache = (endpoint) => {
  apiDataCache.delete(endpoint);
  cacheTimestamps.delete(endpoint);
};

// Tüm cache'i temizle
export const clearApiCache = () => { 
  apiDataCache.clear(); 
  cacheTimestamps.clear(); 
  apiCallInProgress = false; 
};

// Cache durumunu göster (test için)
export const getCacheStatus = () => {
  const status = {};
  for (const [endpoint, data] of apiDataCache.entries()) {
    const timestamp = cacheTimestamps.get(endpoint);
    const age = Date.now() - timestamp;
    status[endpoint] = {
      hasData: !!data,
      age: Math.round(age / 1000) + 's',
      expired: age > CACHE_DURATION
    };
  }
  return status;
};
