"use client"

import { ModernHeader } from "@/components/layout/modern-header"
import { ModernFooter } from "@/components/layout/modern-footer"
import { ModernHero } from "@/components/sections/modern-hero"
import { ModernServices } from "@/components/sections/modern-services"
import { ModernCTA } from "@/components/sections/modern-cta"
import { AnimatedBackground } from "@/components/animated-background"
import { EpicIntro } from "@/components/epic-intro"
import { useState } from "react"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  if (showIntro) {
    return <EpicIntro onComplete={() => setShowIntro(false)} />
  }

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
    </main>
  )
}
