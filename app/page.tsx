"use client"

import { ModernHeader } from "@/components/layout/modern-header"
import { ModernFooter } from "@/components/layout/modern-footer"
import { ModernHero } from "@/components/sections/modern-hero"
import { ModernServices } from "@/components/sections/modern-services"
import { ModernCTA } from "@/components/sections/modern-cta"
import { AnimatedBackground } from "@/components/animated-background"
import { EpicIntro } from "@/components/epic-intro"
import { useState, useEffect } from "react"

export default function Home() {
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    // Check BOTH localStorage and sessionStorage
    const hasVisitedEver = localStorage.getItem('automexus-visited')
    const hasVisitedThisSession = sessionStorage.getItem('automexus-session-visited')

    console.log('🔍 Intro check:', {
      hasVisitedEver,
      hasVisitedThisSession,
      willShowIntro: !hasVisitedEver && !hasVisitedThisSession
    })

    // Only show intro if NEVER visited before
    if (!hasVisitedEver && !hasVisitedThisSession) {
      console.log('✨ Showing intro animation - first visit!')
      // Mark as visited in BOTH storages
      localStorage.setItem('automexus-visited', 'true')
      sessionStorage.setItem('automexus-session-visited', 'true')
      setShowIntro(true)
    } else {
      console.log('⏭️ Skipping intro - user has visited before')
      // Make sure session is also marked (in case localStorage was set but session wasn't)
      sessionStorage.setItem('automexus-session-visited', 'true')
    }
  }, [])

  return (
    <main className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <ModernHeader />
        <ModernHero />
        <ModernServices />
        <ModernCTA />
        <ModernFooter />
      </div>

      {/* Intro overlay - sadece ilk ziyarette gösterilir */}
      {showIntro && <EpicIntro onComplete={() => setShowIntro(false)} />}
    </main>
  )
}
