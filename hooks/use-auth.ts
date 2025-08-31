import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthApiService } from '@/services/auth-api.service'
import FirebaseAuthService from '@/services/firebase-auth.service'
import type { User, SigninCredentials, RegisterCredentials } from '@/types/auth.types'

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthActions {
  signin: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, fullName?: string) => Promise<void>
  googleSignin: () => void
  googleSignup: () => void
  logout: () => Promise<void>
  initializeAuth: () => Promise<void>
  setUser: (user: User) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  clearAuth: () => void
  checkAuthStatus: () => boolean
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      signin: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const credentials: SigninCredentials = { username: email, password: password }
          const response = await AuthApiService.signin(credentials)
          
          console.log('Signin response received:', {
            hasAccessToken: !!response.access_token,
            hasUser: !!response.user,
            userVerified: response.user?.is_verified,
            isRevoked: response.is_revoked
          })
          
          // Check if tokens were stored (this determines if user is verified and not revoked)
          const storedToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
          
          if (!storedToken) {
            throw new Error('Signin failed: User not verified or account revoked')
          }
          
          console.log('Tokens confirmed in localStorage, updating Zustand store...')
          
          // Update the Zustand store with tokens
          set({
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            isAuthenticated: true,
          })
          
          console.log('Zustand store updated, now fetching user data...')
          
          // Now call /users/me to get fresh user data  
          const user = await AuthApiService.getUser()
          
          console.log('User data fetched successfully:', user)
          
          set({
            user: user,
            isLoading: false,
          })
        } catch (error) {
          console.error('Signin error in store:', error)
          set({ isLoading: false })
          throw error
        }
      },

      signup: async (email: string, password: string, fullName?: string) => {
        set({ isLoading: true })
        try {
          console.log('Making signup request...')
          
          const credentials: RegisterCredentials = {
            email,
            password,
            full_name: fullName,
          }
          
          const response = await AuthApiService.register(credentials)
          
          console.log('Signup success response:', response)
          
          set({
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          console.error('Signup error in store:', error)
          set({ isLoading: false })
          throw error
        }
      },

      googleSignin: async () => {
        try {
          const { idToken } = await FirebaseAuthService.getInstance().signInWithGoogle();
          const response = await AuthApiService.verifyFirebaseToken(idToken);
          console.log('Firebase Google sign-in successful:', response);
          
          // Update auth store state after successful Firebase authentication
          set({
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Firebase Google sign-in failed:', error);
          throw error;
        }
      },

      googleSignup: async () => {
        try {
          const { idToken } = await FirebaseAuthService.getInstance().signInWithGoogle();
          const response = await AuthApiService.verifyFirebaseToken(idToken);
          console.log('Firebase Google sign-up successful:', response);
          
          // Update auth store state after successful Firebase authentication
          set({
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Firebase Google sign-up failed:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          await AuthApiService.logout()
        } catch (error) {
          console.error('Logout request failed:', error)
        } finally {
          get().clearAuth()
        }
      },

      initializeAuth: async () => {
        try {
          console.log('initializeAuth: Starting...')
          
          // Check if we have tokens in localStorage (AuthApiService handles this)
          const accessToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
          const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null
          
          if (!accessToken || !refreshToken) {
            console.log('initializeAuth: No tokens found, user not authenticated')
            set({ isAuthenticated: false, user: null })
            return
          }
          
          // Check if token is expired
          if (AuthApiService.isTokenExpired()) {
            console.log('initializeAuth: Token expired, clearing auth')
            get().clearAuth()
            return
          }
          
          // Get user data using your working AuthApiService
          console.log('initializeAuth: Making API call to get user...')
          const user = await AuthApiService.getUser()
          console.log('initializeAuth: User data received:', user)
          
          set({ 
            accessToken, 
            refreshToken, 
            user, 
            isAuthenticated: true 
          })
        } catch (error) {
          console.error('Failed to initialize auth:', error)
          // Clear any invalid tokens
          get().clearAuth()
        }
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },

      setTokens: (accessToken: string, refreshToken: string) => {
        set({ accessToken, refreshToken, isAuthenticated: true })
      },

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },

      checkAuthStatus: () => {
        const { accessToken, user } = get()
        return !!(accessToken && user)
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
