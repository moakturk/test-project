import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, TrendingUp, Users, Database, Workflow, Code, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive AI automation services including process automation, marketing automation, CRM solutions, and more.",
}

const services = [
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Streamline your business operations with intelligent workflow automation that eliminates repetitive tasks and reduces human error.",
    features: [
      "Automated workflow orchestration",
      "Document processing & data extraction",
      "Email & notification automation",
      "Task scheduling & management",
      "Integration with existing tools",
    ],
    color: "from-blue-500 to-blue-600",
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
    color: "from-purple-500 to-purple-600",
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
    color: "from-green-500 to-green-600",
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
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Bot,
    title: "AI Chatbots & Assistants",
    description: "Deploy intelligent conversational AI to handle customer queries, support tickets, and routine interactions 24/7.",
    features: [
      "Natural language processing",
      "Multi-language support",
      "Integration with knowledge bases",
      "Sentiment analysis",
      "Seamless human handoff",
    ],
    color: "from-pink-500 to-pink-600",
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
    color: "from-indigo-500 to-indigo-600",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Our Services
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Comprehensive AI automation solutions to transform every aspect of your business operations
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                >
                  {/* Icon & Title */}
                  <div className="flex-1 space-y-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Placeholder Image */}
                  <div className="flex-1 w-full">
                    <div className={`aspect-video rounded-2xl bg-gradient-to-br ${service.color} opacity-20 shadow-xl`} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl md:text-4xl mb-4">
                Ready to Get Started?
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Let's discuss how our automation solutions can transform your business
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="gradient" size="xl" asChild>
                <Link href="/contact">
                  Contact Us Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
