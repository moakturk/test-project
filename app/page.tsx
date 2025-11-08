import { ModernHeader } from "@/components/layout/modern-header"
import { ModernFooter } from "@/components/layout/modern-footer"
import { ModernHero } from "@/components/sections/modern-hero"
import { ModernServices } from "@/components/sections/modern-services"
import { ModernCTA } from "@/components/sections/modern-cta"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <ModernHeader />
      <ModernHero />
      <ModernServices />
      <ModernCTA />
      <ModernFooter />
    </main>
  )
}
