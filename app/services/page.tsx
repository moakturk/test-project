import { ModernHeader } from "@/components/layout/modern-header"
import { ModernFooter } from "@/components/layout/modern-footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Bot, TrendingUp, Users, Database, Workflow, Code, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive AI automation services for modern businesses",
}

const services = [
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Streamline your business operations with intelligent workflow automation that eliminates repetitive tasks and reduces human error.",
    features: [
      "Automated workflow orchestration",
      "Document processing & extraction",
      "Email & notification automation",
      "Task scheduling & management",
      "Integration with existing tools",
    ],
  },
  {
    icon: TrendingUp,
    title: "Marketing Automation",
    description: "Scale your marketing efforts with AI-powered campaigns, lead nurturing, and personalized customer journeys.",
    features: [
      "Multi-channel campaign automation",
      "Lead scoring & qualification",
      "Personalized content delivery",
      "Analytics & performance tracking",
      "A/B testing & optimization",
    ],
  },
  {
    icon: Users,
    title: "CRM Automation",
    description: "Enhance customer relationships with automated follow-ups, smart lead management, and data-driven insights.",
    features: [
      "Automated lead capture & routing",
      "Customer journey mapping",
      "Intelligent follow-up sequences",
      "Sales pipeline automation",
      "Customer data enrichment",
    ],
  },
  {
    icon: Database,
    title: "Data Analytics & Reporting",
    description: "Transform raw data into actionable insights with automated data collection, analysis, and visualization.",
    features: [
      "Real-time dashboard creation",
      "Automated report generation",
      "Predictive analytics",
      "Data visualization",
      "Custom KPI tracking",
    ],
  },
  {
    icon: Bot,
    title: "AI Chatbots & Assistants",
    description: "Deploy intelligent conversational AI to handle customer queries, support tickets, and routine interactions 24/7.",
    features: [
      "Natural language processing",
      "Multi-language support",
      "Knowledge base integration",
      "Sentiment analysis",
      "Seamless human handoff",
    ],
  },
  {
    icon: Code,
    title: "Custom Solutions",
    description: "Tailored automation solutions designed specifically for your unique business requirements and industry needs.",
    features: [
      "Custom workflow development",
      "API integration & development",
      "Legacy system modernization",
      "Industry-specific solutions",
      "Dedicated support & training",
    ],
  },
]

export default function ModernServicesPage() {
  return (
    <main className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <ModernHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,123,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,123,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,123,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block mb-4">
              <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">Our Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              Automation
              <span className="block mt-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Comprehensive AI-powered solutions to transform every aspect of your business operations
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
                >
                  {/* Icon & Content */}
                  <div className="flex-1 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary-400" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {service.title}
                      </h2>
                      <p className="text-lg text-gray-400 leading-relaxed mb-8">
                        {service.description}
                      </p>
                    </div>
                    <ul className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-primary-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual Element */}
                  <div className="flex-1 w-full">
                    <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-900/10 border border-gray-800 backdrop-blur-sm" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Let's discuss how our automation solutions can transform your business
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all hover:scale-105"
            >
              Contact Us Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

        <ModernFooter />
      </div>
    </main>
  )
}
