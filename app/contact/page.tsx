import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactForm } from "@/components/contact-form"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
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
    icon: Phone,
    title: "Phone",
    details: "+1 (234) 567-890",
    link: "tel:+1234567890",
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
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600">
                  Have a question or ready to automate your business? Reach out to our team.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  const content = (
                    <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                        <div className="text-gray-600">{item.details}</div>
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
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-lg border-2 border-primary-200">
                <h3 className="font-semibold text-gray-900 mb-2">Quick Questions?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Check out our FAQ section for instant answers to common questions.
                </p>
                <a
                  href="#"
                  className="text-primary-600 font-medium hover:text-primary-700 text-sm"
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

      {/* Map or Additional CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Prefer a Live Demo?
            </h2>
            <p className="text-lg text-gray-600">
              Schedule a personalized demonstration of our automation solutions with one of our experts.
            </p>
            <div className="pt-4">
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-500 text-primary-600 font-medium rounded-md hover:bg-primary-50 transition-colors"
              >
                Schedule a Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
