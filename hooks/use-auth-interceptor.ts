import { useEffect } from 'react'
import { useAuthStore } from './use-auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export const useAuthInterceptor = () => {
  const { accessToken, refreshToken, setTokens, clearAuth } = useAuthStore()

  useEffect(() => {
    // Create a custom fetch function that handles token refresh
    const originalFetch = window.fetch

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      // Only intercept requests to our API
      const url = typeof input === 'string' ? input : input.toString()
      if (!url.startsWith(API_BASE_URL)) {
        return originalFetch(input, init)
      }

      console.log('Auth Interceptor - Processing request:', url)

      // Add auth header if we have a token
      const headers = new Headers(init?.headers)
      
      // Try to get token from Zustand store first, then localStorage as fallback
      const tokenToUse = accessToken || (typeof window !== "undefined" ? localStorage.getItem("access_token") : null)
      
      if (tokenToUse) {
        headers.set('Authorization', `Bearer ${tokenToUse}`)
        console.log('Auth Interceptor - Adding auth header with token:', tokenToUse ? 'present' : 'missing')
      } else {
        console.log('Auth Interceptor - No token available for request')
      }

      const response = await originalFetch(input, {
        ...init,
        headers,
      })

      // If we get a 401, try to refresh the token
      if (response.status === 401 && refreshToken) {
        try {
                      const refreshResponse = await originalFetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              refresh_token: refreshToken,
            }),
          })

          if (refreshResponse.ok) {
            const data = await refreshResponse.json()
            setTokens(data.access_token, data.refresh_token)

            // Retry the original request with the new token
            headers.set('Authorization', `Bearer ${data.access_token}`)
            return originalFetch(input, {
              ...init,
              headers,
            })
          } else {
            // Refresh failed, clear auth
            clearAuth()
            return response
          }
        } catch (error) {
          // Refresh failed, clear auth
          clearAuth()
          return response
        }
      }

      return response
    }

    // Cleanup function
    return () => {
      window.fetch = originalFetch
    }
  }, [accessToken, refreshToken, setTokens, clearAuth])
}
