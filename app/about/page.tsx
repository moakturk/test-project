import { ModernHeader } from "@/components/layout/modern-header"
import { ModernFooter } from "@/components/layout/modern-footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Target, Eye, Award, Users } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Automexus - our mission, vision, and commitment to transforming businesses through AI automation.",
}

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description: "We constantly push boundaries to deliver cutting-edge automation solutions that drive real business value.",
  },
  {
    icon: Users,
    title: "Customer Success",
    description: "Your success is our success. We're committed to delivering solutions that exceed expectations.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from code quality to customer service.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We believe in open communication and honest partnerships with our clients.",
  },
]

const stats = [
  { number: "500+", label: "Businesses Automated" },
  { number: "87%", label: "Average Time Saved" },
  { number: "50+", label: "Integrations" },
  { number: "24/7", label: "Support Available" },
]

export default function AboutPage() {
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
              <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              Building the Future of
              <span className="block mt-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Business Automation
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              We're on a mission to empower businesses worldwide with intelligent automation solutions
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                To revolutionize how businesses operate by providing accessible, intelligent automation
                solutions that eliminate repetitive tasks, reduce costs, and unlock human potential for
                creative and strategic work.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                To become the world's most trusted AI automation partner, enabling businesses of all
                sizes to compete on a global scale through innovative technology and exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>
                Automexus was founded with a simple yet powerful vision: to make enterprise-grade
                automation accessible to businesses of all sizes. We saw companies struggling with
                repetitive tasks, inefficient processes, and the inability to scale their operations
                effectively.
              </p>
              <p>
                Our team of AI experts, software engineers, and business strategists came together
                to build solutions that not only automate workflows but also continuously learn and
                improve. We've worked with hundreds of companies across various industries, helping
                them save time, reduce costs, and focus on what truly matters - growing their business.
              </p>
              <p>
                Today, Automexus serves clients globally, from startups to Fortune 500 companies,
                delivering tailored automation solutions that drive measurable results. Our commitment
                to innovation, excellence, and customer success remains at the core of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-2xl p-8 hover:border-primary-500/50 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-6 w-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 text-center">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm text-center">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-2xl p-8 text-center hover:border-primary-500/50 transition-all">
                <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">{stat.number}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

        <ModernFooter />
      </div>
    </main>
  )
}
