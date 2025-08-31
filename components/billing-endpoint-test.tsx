"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

export default function BillingEndpointTest() {
  const [results, setResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<string | null>(null)

  const testEndpoint = async (endpoint: string, name: string) => {
    setLoading(endpoint)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL not set")
      }

      const url = `${baseUrl}${endpoint}`
      const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
      
      console.log(`Testing ${name} at ${url}`)
      
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })

      const data = await response.json()
      
      setResults(prev => ({
        ...prev,
        [endpoint]: {
          success: response.ok,
          status: response.status,
          data: data,
          error: response.ok ? null : data.detail || data.message || "Unknown error"
        }
      }))
    } catch (error) {
      console.error(`Error testing ${name}:`, error)
      setResults(prev => ({
        ...prev,
        [endpoint]: {
          success: false,
          error: error instanceof Error ? error.message : String(error)
        }
      }))
    } finally {
      setLoading(null)
    }
  }

  const endpoints = [
    { path: "/billing/my-subscription/", name: "Subscription Status" },
    { path: "/billing/usage/", name: "Usage Statistics" },
    { path: "/billing/plans/public/", name: "Public Plans" },
  ]

  const testAll = async () => {
    for (const endpoint of endpoints) {
      await testEndpoint(endpoint.path, endpoint.name)
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Billing Endpoint Test
        </CardTitle>
        <p className="text-sm text-gray-600">
          Test individual billing endpoints to identify which one is causing the SQLAlchemy error
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || "NOT SET"}
          </div>
          
          <div className="flex gap-2">
            <Button onClick={testAll} disabled={loading !== null}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Test All Endpoints
            </Button>
          </div>

          <div className="grid gap-2">
            {endpoints.map((endpoint) => (
              <div key={endpoint.path} className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => testEndpoint(endpoint.path, endpoint.name)}
                  disabled={loading === endpoint.path}
                >
                  {loading === endpoint.path ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : results[endpoint.path]?.success ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : results[endpoint.path]?.error ? (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  ) : null}
                  {loading === endpoint.path ? "Testing..." : `Test ${endpoint.name}`}
                </Button>
                <span className="text-sm font-mono">{endpoint.path}</span>
              </div>
            ))}
          </div>

          {Object.keys(results).length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Results:</h3>
              <div className="space-y-4">
                {Object.entries(results).map(([endpoint, result]: [string, any]) => (
                  <div key={endpoint} className={`border rounded p-3 ${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <h4 className="font-semibold flex items-center gap-2">
                      {result.success ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      {endpoint}
                    </h4>
                    {result.error ? (
                      <div className="text-red-600 text-sm mt-2">
                        <strong>Error:</strong> {result.error}
                      </div>
                    ) : (
                      <div className="text-green-600 text-sm mt-2">
                        <strong>Status:</strong> {result.status} - Success
                      </div>
                    )}
                    {result.data && (
                      <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto max-h-32">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 