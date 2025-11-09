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
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('automexus-visited')

    if (!hasVisited) {
      // First time visitor - show intro
      setIsFirstVisit(true)
      setShowIntro(true)
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

      {/* Intro overlay - web sitesi arkada zaten var */}
      {showIntro && (
        <EpicIntro
          onComplete={() => {
            setShowIntro(false)
            // Mark as visited so intro won't show again
            localStorage.setItem('automexus-visited', 'true')
          }}
        />
      )}
    </main>
  )
}
