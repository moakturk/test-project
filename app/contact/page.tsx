"use client"

import { ModernHeader } from "@/components/layout/modern-header"
import { ModernFooter } from "@/components/layout/modern-footer"
import { AnimatedBackground } from "@/components/animated-background"
import { ContactForm } from "@/components/contact-form"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Mail, MapPin, Clock } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "info@automexus.com",
    link: "mailto:info@automexus.com",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Global Operations",
    link: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "24/7 Support Available",
    link: null,
  },
]

function ContactInfoCard({ item, index }: { item: typeof contactInfo[0], index: number }) {
  const { ref, isVisible } = useScrollAnimation()
  const Icon = item.icon

  const content = (
    <div
      ref={ref}
      className={`backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 hover:border-primary-500/50 rounded-xl p-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
          <Icon className="h-6 w-6 text-primary-400" />
        </div>
        <div>
          <div className="font-semibold text-white mb-1">{item.title}</div>
          <div className="text-gray-400">{item.details}</div>
        </div>
      </div>
    </div>
  )

  return item.link ? <a href={item.link}>{content}</a> : content
}

function ContactFormSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`lg:col-span-2 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`}
    >
      <ContactForm />
    </div>
  )
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <ModernHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block mb-4">
              <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">Contact Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              Let's Build Something
              <span className="block mt-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Ready to transform your business? We're here to help you get started
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-400">
                  Have a question or ready to automate your business? Reach out to our team.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <ContactInfoCard key={index} item={item} index={index} />
                ))}
              </div>

              {/* FAQ Link */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-primary-900/20 to-primary-900/10 border border-primary-500/30 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2">Quick Questions?</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Check out our FAQ section for instant answers to common questions.
                </p>
                <a
                  href="/faq"
                  className="text-primary-400 font-medium hover:text-primary-300 text-sm inline-flex items-center gap-1"
                >
                  View FAQ →
                </a>
              </div>
            </div>

            <ContactFormSection />
          </div>
        </div>
      </section>

        <ModernFooter />
      </div>
    </main>
  )
}
