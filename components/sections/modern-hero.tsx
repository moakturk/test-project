"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function ModernHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle Gradient Overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-16">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge with stagger animation */}
          <div
            className={`inline-flex items-center gap-2 backdrop-blur-md bg-white/5 border border-primary-500/20 rounded-full px-6 py-2.5 shadow-lg transition-all duration-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            <Sparkles className="h-4 w-4 text-primary-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-200">
              AI-Powered Business Automation
            </span>
          </div>

          {/* Main Heading with reveal animation */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span
              className={`block text-white transition-all duration-700 delay-200 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Future of
            </span>
            <span
              className={`block mt-2 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent transition-all duration-700 delay-500 ${
                mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}
              style={{
                backgroundSize: '200% auto',
                animation: mounted ? 'gradient-shift 3s ease infinite' : 'none'
              }}
            >
              Business Automation
            </span>
          </h1>

          {/* Subheading with stagger */}
          <div className="space-y-2">
            <p
              className={`text-xl sm:text-2xl md:text-3xl text-gray-400 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Transform your operations with cutting-edge AI solutions.
            </p>
            <p
              className={`text-lg sm:text-xl text-gray-500 transition-all duration-700 delay-1000 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Scale smarter. Work faster. Grow bigger.
            </p>
          </div>

          {/* CTA Buttons with pop animation */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 transition-all duration-700 delay-1000 ${
              mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
            }`}
          >
            <Button
              variant="default"
              size="xl"
              className="group bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/50 hover:shadow-primary-500/70 transition-all hover:scale-105 active:scale-95"
              asChild
            >
              <Link href="/contact" className="flex items-center whitespace-nowrap">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-gray-700 text-gray-300 hover:bg-gray-800/50 backdrop-blur-sm hover:scale-105 active:scale-95 transition-all"
              asChild
            >
              <Link href="/services">
                Explore Solutions
              </Link>
            </Button>
          </div>

          {/* Stats with stagger animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-16 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Businesses Automated", delay: 1200 },
              { value: "87%", label: "Time Saved", delay: 1400 },
              { value: "24/7", label: "AI Support", delay: 1600 },
              { value: "50+", label: "Integrations", delay: 1800 },
            ].map((stat, i) => (
              <div
                key={i}
                className={`backdrop-blur-md bg-white/5 border border-gray-800 rounded-xl p-6 hover:border-primary-500/50 hover:scale-105 transition-all duration-500 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${stat.delay}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2 animate-fade-in">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator with bounce */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-2000 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex items-start justify-center p-2 animate-bounce">
          <div className="w-1.5 h-3 bg-primary-500 rounded-full animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}
