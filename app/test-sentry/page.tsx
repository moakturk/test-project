"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import * as Sentry from "@sentry/nextjs"

export default function SentryTestPage() {
  const [testResult, setTestResult] = useState<string>("")

  const testClientError = () => {
    try {
      setTestResult("Triggering client-side error...")
      // Intentionally throw an error
      throw new Error("Test client-side error from Sentry test page")
    } catch (error) {
      Sentry.captureException(error)
      setTestResult("✅ Client error captured! Check your Sentry dashboard.")
    }
  }

  const testServerError = async () => {
    try {
      setTestResult("Triggering server-side error...")
      const response = await fetch("/api/test-sentry-error")
      const data = await response.json()
      setTestResult(data.message || "✅ Server error triggered! Check your Sentry dashboard.")
    } catch (err) {
      console.error(err)
      setTestResult("❌ Failed to trigger server error")
    }
  }

  const testCustomEvent = () => {
    setTestResult("Sending custom event...")
    Sentry.captureMessage("Test custom message from Automexus", "info")
    setTestResult("✅ Custom message sent! Check your Sentry dashboard.")
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">🔍 Sentry Test Page</h1>
          <p className="text-gray-400">
            Test Sentry integration to ensure error tracking is working correctly.
          </p>
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-400">
              ⚠️ <strong>Note:</strong> This page is for testing only. Remove it in production.
            </p>
          </div>
        </div>

        {/* Test Result Display */}
        {testResult && (
          <div className="mb-8 p-4 bg-gray-800 border border-gray-700 rounded-lg">
            <p className="text-sm">{testResult}</p>
          </div>
        )}

        {/* Test Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Client Error Test */}
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Client-Side Error</h2>
            <p className="text-sm text-gray-400 mb-4">
              Throws an error in the browser and captures it with Sentry.
            </p>
            <Button
              onClick={testClientError}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              Test Client Error
            </Button>
          </div>

          {/* Server Error Test */}
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Server-Side Error</h2>
            <p className="text-sm text-gray-400 mb-4">
              Triggers an error on the server API route.
            </p>
            <Button
              onClick={testServerError}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Test Server Error
            </Button>
          </div>

          {/* Custom Message Test */}
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Custom Message</h2>
            <p className="text-sm text-gray-400 mb-4">
              Sends a custom info message to Sentry.
            </p>
            <Button
              onClick={testCustomEvent}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Send Custom Message
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-gray-900 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">📋 Instructions</h2>
          <ol className="space-y-2 text-sm text-gray-400">
            <li>1. Click any test button above</li>
            <li>2. Go to your Sentry dashboard: <a href="https://sentry.io" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">https://sentry.io</a></li>
            <li>3. Navigate to your project (automexus or your project name)</li>
            <li>4. Check "Issues" tab to see captured errors and messages</li>
            <li>5. You should see the errors/messages appear within a few seconds</li>
          </ol>
        </div>

        {/* Current Config */}
        <div className="mt-6 p-6 bg-gray-900 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">⚙️ Current Configuration</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Sentry DSN:</span>
              <code className="text-primary-400">
                {process.env.NEXT_PUBLIC_SENTRY_DSN ? "✅ Configured" : "❌ Missing"}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Environment:</span>
              <code className="text-primary-400">{process.env.NODE_ENV}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
