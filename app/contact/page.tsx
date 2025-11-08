import { ModernHeader } from "@/components/layout/modern-header"
import { ModernFooter } from "@/components/layout/modern-footer"
import { AnimatedBackground } from "@/components/animated-background"
import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin, Clock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Automexus. We're here to help you transform your business with AI automation.",
}

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
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  const content = (
                    <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 hover:border-primary-500/50 rounded-xl p-6 transition-all">
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

                  return item.link ? (
                    <a key={index} href={item.link}>
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  )
                })}
              </div>

              {/* FAQ Link */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-primary-900/20 to-primary-900/10 border border-primary-500/30 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2">Quick Questions?</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Check out our FAQ section for instant answers to common questions.
                </p>
                <a
                  href="#"
                  className="text-primary-400 font-medium hover:text-primary-300 text-sm inline-flex items-center gap-1"
                >
                  View FAQ →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prefer a Live Demo?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Schedule a personalized demonstration of our automation solutions with one of our experts.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-500/50 hover:border-primary-500 text-white font-semibold rounded-xl backdrop-blur-sm transition-all hover:bg-primary-500/10"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>

        <ModernFooter />
      </div>
    </main>
  )
}
