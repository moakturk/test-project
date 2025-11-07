import { Check, Zap, Shield, TrendingUp, Clock, Globe } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Deployment",
    description: "Get your automation solutions up and running in days, not months. Our streamlined process ensures rapid implementation.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Bank-level encryption and compliance with international security standards to keep your data safe and secure.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Grow without limits. Our infrastructure scales seamlessly with your business needs, from startup to enterprise.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock expert support to ensure your automation runs smoothly at all times, no matter your timezone.",
  },
  {
    icon: Globe,
    title: "Global Integration",
    description: "Connect with 50+ popular tools and platforms. Our solutions integrate with your existing tech stack effortlessly.",
  },
  {
    icon: Check,
    title: "Proven ROI",
    description: "Our clients see an average 87% reduction in manual tasks and 3x productivity increase within the first quarter.",
  },
]

export function Features() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose
            <span className="block mt-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Automexus
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Trusted by leading companies worldwide for reliable, efficient, and innovative automation solutions
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-600 mb-2">50+</div>
              <div className="text-sm text-gray-600">Integrations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
