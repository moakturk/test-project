'use client'

import Script from 'next/script'
import { useState, useEffect } from 'react'

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const [loadAnalytics, setLoadAnalytics] = useState(false)

  useEffect(() => {
    // Check if user has given consent
    const checkConsent = () => {
      const consent = localStorage.getItem('automexus-cookie-consent')
      if (consent === 'accepted') {
        setLoadAnalytics(true)
      }
    }

    // Check initial consent
    checkConsent()

    // Listen for consent changes
    const handleConsentAccepted = () => setLoadAnalytics(true)
    const handleConsentRejected = () => setLoadAnalytics(false)

    window.addEventListener('cookieConsentAccepted', handleConsentAccepted)
    window.addEventListener('cookieConsentRejected', handleConsentRejected)

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleConsentAccepted)
      window.removeEventListener('cookieConsentRejected', handleConsentRejected)
    }
  }, [])

  if (!measurementId || !loadAnalytics) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Extend window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, string | number | boolean>
    ) => void
  }
}

// Helper function for tracking events
export const trackEvent = (eventName: string, eventParams?: Record<string, string | number | boolean>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}
