"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const CONSENT_KEY = "automexus-cookie-consent"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      // Show banner after a small delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted")
    setShowBanner(false)
    // Trigger analytics load event
    window.dispatchEvent(new Event("cookieConsentAccepted"))
  }

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected")
    setShowBanner(false)
    // Trigger analytics disable event
    window.dispatchEvent(new Event("cookieConsentRejected"))
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/95 to-gray-900/90 border border-gray-700 rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Text Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                🍪 We use cookies
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic,
                and deliver personalized content. By clicking "Accept All", you consent to
                our use of cookies.{" "}
                <Link
                  href="/cookies"
                  className="text-primary-400 hover:text-primary-300 underline transition-colors"
                >
                  Learn more
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleReject}
                className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-all duration-200 font-medium text-sm whitespace-nowrap"
              >
                Reject All
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-medium text-sm shadow-lg shadow-primary-500/25 whitespace-nowrap"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to check if consent is given
export function hasConsent(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(CONSENT_KEY) === "accepted"
}
