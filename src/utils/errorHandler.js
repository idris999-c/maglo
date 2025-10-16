import toast from 'react-hot-toast';
import CustomToast from '../components/CustomToast';

// Error messages based on HTTP status codes
const getErrorMessage = (error) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message || error?.message || 'An unknown error occurred';

  switch (status) {
    case 400:
      return 'Bad Request: Please check your input data';
    case 401:
      return 'Unauthorized: Please log in again';
    case 403:
      return 'Forbidden: You do not have permission to access this resource';
    case 404:
      return 'Not Found: The requested resource was not found';
    case 409:
      return 'Conflict: This action conflicts with existing data';
    case 422:
      return 'Validation Error: Please check your input data';
    case 429:
      return 'Too Many Requests: Please wait before trying again';
    case 500:
      return 'Server Error: Please try again later';
    case 502:
      return 'Bad Gateway: Server is temporarily unavailable';
    case 503:
      return 'Service Unavailable: Server is under maintenance';
    case 504:
      return 'Gateway Timeout: Request timed out';
    default:
      if (error?.code === 'NETWORK_ERROR') {
        return 'Network Error: Please check your internet connection';
      }
      if (error?.code === 'TIMEOUT') {
        return 'Request Timeout: Please try again';
      }
      return message;
  }
};

// Show toast message based on error type
const showErrorToast = (error, customMessage = null) => {
  const message = customMessage || getErrorMessage(error);
  const status = error?.response?.status;
  
  // Different toast styles based on error type
  let type = 'error';
  if (status === 401) type = 'warning';
  if (status >= 500) type = 'error';
  if (error?.code === 'NETWORK_ERROR') type = 'warning';

  toast.custom((t) => (
    <CustomToast 
      toast={t} 
      message={message} 
      type={type}
    />
  ));
};

// Wrapper to catch API errors
export const handleApiError = (error, customMessage = null) => {
  console.error('API Error:', error);
  showErrorToast(error, customMessage);
  
  // Can logout in case of 401 error
  if (error?.response?.status === 401) {
    // Can call logout function from Auth context
    // This part can be implemented depending on AuthContext
  }
  
  return error;
};

// API call with retry logic
export const withRetry = async (apiCall, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      // Errors that should not be retried
      if (error?.response?.status === 401 || 
          error?.response?.status === 403 || 
          error?.response?.status === 404) {
        throw error;
      }
      
      // Wait if not the last attempt
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};

// Check network status
export const checkNetworkStatus = () => {
  if (!navigator.onLine) {
    showErrorToast({ code: 'NETWORK_ERROR' });
    return false;
  }
  return true;
};

const errorHandler = {
  handleApiError,
  withRetry,
  checkNetworkStatus,
  getErrorMessage
};

export default errorHandler;
