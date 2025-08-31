"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/components/auth-provider'
import Link from 'next/link'

export default function SigninPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { signin, googleSignin, isAuthenticated, isLoading: authLoading } = useAuth()

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    console.log('SigninPage - Auth state changed:', { isAuthenticated, authLoading })
    if (isAuthenticated && !authLoading) {
      console.log('SigninPage - User already authenticated, redirecting to dashboard')
      router.push('/dashboard')
    }
  }, [isAuthenticated, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      console.log('SigninPage - Starting signin process...', { email })
      
      // Use email as username to match the SigninCredentials interface
      await signin(email, password)
      
      console.log('SigninPage - Signin completed successfully, redirecting...')
      router.push('/dashboard')
    } catch (error: any) {
      console.error('SigninPage - Signin failed:', error)
      setError(error.message || 'Signin failed')
    } finally {
      console.log('SigninPage - Signin process finished, setting loading to false')
      setIsLoading(false)
    }
  }

  const handleGoogleSignin = async () => {
    setError('')
    setIsLoading(true)
    
    try {
      console.log('SigninPage - Starting Google signin process...')
      await googleSignin()
      console.log('SigninPage - Google signin completed successfully')
      // The useEffect will handle the redirect when isAuthenticated changes
    } catch (error: any) {
      console.error('SigninPage - Google signin failed:', error)
      setError(error.message || 'Google sign-in failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7e5be]">
      <div className="grid lg:grid-cols-2 min-h-screen" role="main">
        {/* Left Side - Visual & Illustration */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-[#f7e5be] relative">
          <div className="max-w-lg w-full">
            <img 
              src="/assets/bee/Lucid_Origin_Bee_Colony_System_Illustration_A_stylized_hive_wi_3-removebg-preview.png"
              alt="BeeKeeper Organization System"
              className="w-full h-auto"
            />
          </div>
          
          <div className="text-center space-y-4 mt-8 max-w-md">
            <h2 className="text-2xl font-semibold text-[#312718]">
              Welcome back to BeeKeeper
            </h2>
            <p className="text-[#63512b]">
              Sign in to continue organizing your digital workspace
            </p>
          </div>
        </div>

        {/* Right Side - Signin Form */}
        <div className="flex items-center justify-center p-8 bg-slate-50">
          <div className="w-full max-w-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center space-x-2 mb-6">
                <span className="text-3xl">🐝</span>
                <span className="text-xl font-semibold text-[#312718]">BeeKeeper</span>
              </Link>
              <h1 className="text-2xl font-semibold text-[#312718] mb-2">Welcome Back</h1>
              <p className="text-[#63512b]">Sign in to your BeeKeeper account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-[#63512b] mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 border-[#b7c4c9] rounded-lg focus:border-[#f3c233] focus:ring-2 focus:ring-[#f3c233]/20 bg-white"
                    required
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="password" className="text-sm font-medium text-[#63512b]">
                      Password
                    </Label>
                    <Link href="/forgot-password" className="text-sm text-[#c09b33] hover:text-[#90742d]">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 border-[#b7c4c9] rounded-lg focus:border-[#f3c233] focus:ring-2 focus:ring-[#f3c233]/20 bg-white"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-[#c09b33] hover:bg-[#90742d] text-white font-medium rounded-colors" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className="text-center text-sm text-[#8d887e]">
                Don't have an account?{' '}
                <Link href="/signup" className="text-[#c09b33] hover:text-[#90742d] font-medium">
                  Sign up
                </Link>
              </div>
            </form>

            {/* Social Signin Options */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#b7c4c9]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-50 text-[#63512b]">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button 
                  onClick={handleGoogleSignin}
                  disabled={isLoading}
                  className="flex justify-center items-center px-4 py-3 border border-[#b7c4c9] rounded-lg text-sm font-medium text-[#63512b] hover:bg-[#f7e5be] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-[#63512b] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  <span className="ml-2">{isLoading ? 'Signing in...' : 'Google'}</span>
                </button>
                
                <button className="flex justify-center items-center px-4 py-3 border border-[#b7c4c9] rounded-lg text-sm font-medium text-[#63512b] hover:bg-[#f7e5be] transition-colors">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
