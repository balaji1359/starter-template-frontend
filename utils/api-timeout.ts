/**
 * API Timeout Configuration
 * 
 * This utility provides centralized timeout management for different types of API requests.
 * Timeouts are configured based on the expected complexity and duration of operations.
 */

export const API_TIMEOUTS = {
  // Default timeout for most API requests
  DEFAULT: 60000, // 60 seconds
  
  // Extended timeout for complex queries (links, collections, etc.)
  COMPLEX_QUERY: 90000, // 90 seconds
  
  // Long-running operations (data export, bulk operations)
  LONG_OPERATION: 300000, // 5 minutes
  
  // Very long operations (data import, processing)
  VERY_LONG_OPERATION: 600000, // 10 minutes
  
  // Retry timeout (used when retrying failed requests)
  RETRY: 120000, // 2 minutes
} as const

/**
 * Get appropriate timeout for different types of operations
 */
export function getTimeoutForOperation(operation: 'default' | 'complex' | 'long' | 'very-long' | 'retry'): number {
  switch (operation) {
    case 'complex':
      return API_TIMEOUTS.COMPLEX_QUERY
    case 'long':
      return API_TIMEOUTS.LONG_OPERATION
    case 'very-long':
      return API_TIMEOUTS.VERY_LONG_OPERATION
    case 'retry':
      return API_TIMEOUTS.RETRY
    default:
      return API_TIMEOUTS.DEFAULT
  }
}

/**
 * Format timeout duration for user-friendly display
 */
export function formatTimeoutDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`
  }
  return `${seconds} second${seconds > 1 ? 's' : ''}`
}

/**
 * Check if a request should be retried based on error type
 */
export function shouldRetryRequest(error: Error): boolean {
  // Retry on timeout errors
  if (error.name === 'AbortError') {
    return true
  }
  
  // Retry on network errors
  if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
    return true
  }
  
  // Don't retry on authentication errors
  if (error.message.includes('401') || error.message.includes('Authentication')) {
    return false
  }
  
  // Don't retry on client errors (4xx)
  if (error.message.includes('400') || error.message.includes('403') || error.message.includes('404')) {
    return false
  }
  
  // Retry on server errors (5xx)
  if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
    return true
  }
  
  return false
}


