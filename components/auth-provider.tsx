"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthStore } from '@/hooks/use-auth'
import { useAuthInterceptor } from '@/hooks/use-auth-interceptor'

interface AuthContextType {
  user: any
  isAuthenticated: boolean
  isLoading: boolean
  signin: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, fullName?: string) => Promise<void>
  googleSignin: () => void
  googleSignup: () => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    signin, 
    signup, 
    googleSignin,
    googleSignup,
    logout,
    initializeAuth 
  } = useAuthStore()
  
  // Initialize auth interceptor
  useAuthInterceptor()

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('Starting auth initialization...')
        
        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Auth initialization timeout')), 1000) // 1 second timeout
        })
        
        const authPromise = initializeAuth()
        
        await Promise.race([authPromise, timeoutPromise])
        console.log('Auth initialization completed successfully')
      } catch (error) {
        // Log all errors for debugging
        console.log('Auth initialization result:', error instanceof Error ? error.message : error)
      } finally {
        console.log('Setting auth as initialized')
        setIsInitialized(true)
      }
    }

    initAuth()
  }, [initializeAuth])

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signin,
    signup,
    googleSignin,
    googleSignup,
    logout,
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        <div className="text-center">
          <div className="text-4xl mb-4">🐝</div>
          <div className="text-amber-800 text-lg">Loading BeeKeeper...</div>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 