"use client"

import { ModernHeader } from "@/components/layout/modern-header"
import { ModernFooter } from "@/components/layout/modern-footer"
import { AnimatedBackground } from "@/components/animated-background"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Bot, TrendingUp, Users, Database, Workflow, Code, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

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

function CTASection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl p-12 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
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
  )
}

function ServiceItem({ service, index }: { service: typeof services[0], index: number }) {
  const { ref, isVisible } = useScrollAnimation()
  const Icon = service.icon
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
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
}

export default function ModernServicesPage() {
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
            {services.map((service, index) => (
              <ServiceItem key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />

        <ModernFooter />
      </div>
    </main>
  )
}
