"use client"

import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function ModernCTA() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Content */}
          <div
            ref={ref}
            className={`backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl p-12 md:p-16 shadow-2xl transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
            }`}
          >
            <div className="text-center space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Ready to Transform
                <span className="block mt-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Your Business?
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                Join hundreds of companies automating their way to success
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-300 pt-4">
                {["14-day free trial", "No credit card required", "Cancel anytime"].map((benefit, i) => (
                  <div
                    key={benefit}
                    className={`flex items-center gap-2 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${600 + i * 100}ms` }}
                  >
                    <Check className="h-5 w-5 text-primary-400" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '900ms' }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/50 hover:shadow-primary-500/70 transition-all hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-700 hover:border-primary-500/50 text-gray-300 hover:text-white font-semibold rounded-xl backdrop-blur-sm transition-all hover:bg-gray-800/50"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
