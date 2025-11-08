"use client"

import { Bot, TrendingUp, Users, Database, Workflow, Code } from "lucide-react"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const services = [
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Streamline workflows and eliminate repetitive tasks with intelligent automation",
  },
  {
    icon: TrendingUp,
    title: "Marketing Automation",
    description: "Scale campaigns with AI-powered personalization and data-driven insights",
  },
  {
    icon: Users,
    title: "CRM Automation",
    description: "Enhance relationships with automated follow-ups and intelligent scoring",
  },
  {
    icon: Database,
    title: "Data Analytics",
    description: "Transform data into insights with automated reporting and visualization",
  },
  {
    icon: Bot,
    title: "AI Assistants",
    description: "Deploy intelligent chatbots for 24/7 customer support and engagement",
  },
  {
    icon: Code,
    title: "Custom Solutions",
    description: "Tailored automation designed for your unique business requirements",
  },
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const { ref, isVisible } = useScrollAnimation()
  const Icon = service.icon

  return (
    <div
      ref={ref}
      className={`group relative backdrop-blur-sm bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 hover:border-primary-500/50 rounded-2xl p-8 transition-all duration-700 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

      <div className="relative">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Icon className="h-7 w-7 text-primary-400" />
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-400 leading-relaxed text-sm">
          {service.description}
        </p>
      </div>
    </div>
  )
}

export function ModernServices() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-4">
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Automation
            <span className="block mt-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Comprehensive AI-powered solutions to transform every aspect of your business
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all hover:scale-105"
          >
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
