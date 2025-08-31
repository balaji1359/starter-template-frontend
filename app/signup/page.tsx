"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/components/auth-provider'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [debugInfo, setDebugInfo] = useState('')
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})
  const router = useRouter()
  const { signup, googleSignup, isAuthenticated } = useAuth()

  console.log('SignupPage render - isAuthenticated:', isAuthenticated)

  const validateForm = () => {
    const errors: {[key: string]: string} = {}

    // Full name validation
    if (!fullName.trim()) {
      errors.fullName = 'Full name is required'
    } else if (fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters'
    }

    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setDebugInfo('')
    setValidationErrors({})

    // Client-side validation
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      setDebugInfo('Starting signup...')
      
      await signup(email, password, fullName.trim())
      setDebugInfo('Signup successful, redirecting to dashboard...')
      router.push('/dashboard')
    } catch (error: any) {
      const errorMessage = error.message || 'Signup failed'
      setError(errorMessage)
      setDebugInfo(`Error: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    googleSignup()
  }

  return (
    <div className="min-h-screen bg-[#f7e5be]">
      <div className="grid lg:grid-cols-2 min-h-screen" role="main">
        {/* Left Side - Visual & Illustration */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-[#f7e5be] relative">
          <div className="max-w-lg w-full">
            <img 
              src="/assets/bee/Lucid_Origin_Bee_Colony_System_Illustration_A_stylized_hive_wi_2-removebg-preview.png"
              alt="BeeKeeper Organization System"
              className="w-full h-auto"
            />
          </div>
          
          <div className="text-center space-y-4 mt-8 max-w-md">
            <h2 className="text-2xl font-semibold text-[#312718]">
              Welcome to BeeKeeper
            </h2>
            <p className="text-[#63512b]">
              Join thousands organizing their digital workspace
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex items-center justify-center p-8 bg-slate-50">
          <div className="w-full max-w-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center space-x-2 mb-6">
                <span className="text-3xl">🐝</span>
                <span className="text-xl font-semibold text-[#312718]">BeeKeeper</span>
              </Link>
              <h1 className="text-2xl font-semibold text-[#312718] mb-2">Create Account</h1>
              <p className="text-[#63512b]">Join BeeKeeper and start organizing your links</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-[#63512b] mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full h-12 border rounded-lg focus:border-[#f3c233] focus:ring-2 focus:ring-[#f3c233]/20 bg-white ${
                      validationErrors.fullName ? 'border-red-400' : 'border-[#b7c4c9]'
                    }`}
                    required
                  />
                  {validationErrors.fullName && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.fullName}</p>
                  )}
                </div>
                
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
                    className={`w-full h-12 border rounded-lg focus:border-[#f3c233] focus:ring-2 focus:ring-[#f3c233]/20 bg-white ${
                      validationErrors.email ? 'border-red-400' : 'border-[#b7c4c9]'
                    }`}
                    required
                  />
                  {validationErrors.email && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-[#63512b] mb-2 block">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full h-12 border rounded-lg focus:border-[#f3c233] focus:ring-2 focus:ring-[#f3c233]/20 bg-white ${
                      validationErrors.password ? 'border-red-400' : 'border-[#b7c4c9]'
                    }`}
                    required
                  />
                  {validationErrors.password ? (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.password}</p>
                  ) : (
                    <p className="text-xs text-[#8d887e] mt-1">Must be at least 8 characters with uppercase, lowercase, and number</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#63512b] mb-2 block">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full h-12 border rounded-lg focus:border-[#f3c233] focus:ring-2 focus:ring-[#f3c233]/20 bg-white ${
                      validationErrors.confirmPassword ? 'border-red-400' : 'border-[#b7c4c9]'
                    }`}
                    required
                  />
                  {validationErrors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
                  {error}
                </div>
              )}

              {debugInfo && (
                <div className="text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  Debug: {debugInfo}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-[#c09b33] hover:bg-[#90742d] text-white font-medium rounded-lg transition-colors" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>

              <div className="text-center text-sm text-[#63512b]">
                Already have an account?{' '}
                <Link href="/signin" className="text-[#c09b33] hover:text-[#90742d] font-medium">
                  Sign in
                </Link>
              </div>
            </form>

            {/* Social Signup Options */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#b7c4c9]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-50 text-[#63512b]">Or sign up with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={handleGoogleSignup} className="flex justify-center items-center px-4 py-3 border border-[#b7c4c9] rounded-lg text-sm font-medium text-[#63512b] hover:bg-[#f7e5be] transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2">Google</span>
                </button>
                
                <button className="flex justify-center items-center px-4 py-3 border border-[#b7c4c9] rounded-lg text-sm font-medium text-[#63512b] hover:bg-[#f7e5be] transition-colors">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-4 text-xs text-[#63512b]">
                <span>✓ Free forever plan</span>
                <span>✓ No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}