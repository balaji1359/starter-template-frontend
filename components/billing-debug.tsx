"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BillingDebug() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState<string | null>(null)

  const testEndpoint = async (endpoint: string, method: string = "GET", body?: any) => {
    setLoading(endpoint)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
      const url = `${baseUrl}${endpoint}`
      
      const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
      
      const options: RequestInit = {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
      
      if (body) {
        options.body = JSON.stringify(body)
      }

      console.log(`Testing ${method} ${url}`)
      const response = await fetch(url, options)
      const data = await response.json()
      
      setResults((prev: any) => ({
        ...prev,
        [endpoint]: {
          status: response.status,
          ok: response.ok,
          data: data,
          headers: Object.fromEntries(response.headers.entries())
        }
      }))
    } catch (error) {
      setResults((prev: any) => ({
        ...prev,
        [endpoint]: {
          error: error instanceof Error ? error.message : String(error)
        }
      }))
    } finally {
      setLoading(null)
    }
  }

  const endpoints = [
    { path: "/health", method: "GET", name: "Health Check" },
    { path: "/billing/my-subscription", method: "GET", name: "My Subscription" },
    { path: "/billing/usage", method: "GET", name: "Usage" },
    { path: "/billing/plans/public/", method: "GET", name: "Public Plans" },
    { path: "/billing/checkout", method: "POST", name: "Create Checkout", body: { plan_id: 1, billing_cycle: "monthly", success_url: "http://localhost:3000", cancel_url: "http://localhost:3000" } },
    { path: "/billing/portal", method: "POST", name: "Create Portal", body: { return_url: "http://localhost:3000/account" } },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Billing API Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || "NOT SET"}
          </div>
          
          <div className="grid gap-2">
            {endpoints.map((endpoint) => (
              <div key={endpoint.path} className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => testEndpoint(endpoint.path, endpoint.method, endpoint.body)}
                  disabled={loading === endpoint.path}
                >
                  {loading === endpoint.path ? "Testing..." : `Test ${endpoint.name}`}
                </Button>
                <span className="text-sm font-mono">{endpoint.method} {endpoint.path}</span>
              </div>
            ))}
          </div>

          {Object.keys(results).length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Results:</h3>
              <div className="space-y-4">
                {Object.entries(results).map(([endpoint, result]: [string, any]) => (
                  <div key={endpoint} className="border rounded p-3">
                    <h4 className="font-semibold">{endpoint}</h4>
                    <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
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