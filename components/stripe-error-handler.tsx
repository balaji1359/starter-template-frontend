'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface StripeErrorHandlerProps {
  children: React.ReactNode
}

export function StripeErrorHandler({ children }: StripeErrorHandlerProps) {
  const [hasStripeError, setHasStripeError] = useState(false)
  const [errorCount, setErrorCount] = useState(0)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Check if error is related to Stripe CORS issues
      if (
        event.message.includes('stripe.com') ||
        event.message.includes('CORS') ||
        event.message.includes('Cross-Origin') ||
        event.filename?.includes('stripe')
      ) {
        setErrorCount(prev => prev + 1)
        
        // Only show error after multiple failures to avoid false positives
        if (errorCount >= 2) {
          setHasStripeError(true)
        }
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason?.message?.includes('stripe.com') ||
        event.reason?.message?.includes('CORS') ||
        event.reason?.message?.includes('Cross-Origin')
      ) {
        setErrorCount(prev => prev + 1)
        
        if (errorCount >= 2) {
          setHasStripeError(true)
        }
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [errorCount])

  const handleRetry = () => {
    setHasStripeError(false)
    setErrorCount(0)
    window.location.reload()
  }

  if (hasStripeError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <AlertTitle className="text-orange-800 dark:text-orange-200">
              Payment System Temporarily Unavailable
            </AlertTitle>
            <AlertDescription className="text-orange-700 dark:text-orange-300 mt-2">
              We're experiencing issues with our payment system. This might be due to:
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Browser privacy settings or ad blockers</li>
                <li>Network connectivity issues</li>
                <li>Temporary service disruption</li>
              </ul>
            </AlertDescription>
            <div className="mt-4 flex gap-2">
              <Button 
                onClick={handleRetry} 
                size="sm" 
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setHasStripeError(false)}
              >
                Continue Anyway
              </Button>
            </div>
          </Alert>
        </div>
      </div>
    )
  }

  return <>{children}</>
} 