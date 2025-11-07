import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { ServicesOverview } from "@/components/sections/services-overview"
import { Features } from "@/components/sections/features"
import { CTA } from "@/components/sections/cta"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ServicesOverview />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
