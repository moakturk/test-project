import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, TrendingUp, Users, Database, Workflow, Code } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Automate repetitive tasks and streamline workflows to increase efficiency and reduce operational costs.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Marketing Automation",
    description: "Scale your marketing efforts with intelligent automation, personalized campaigns, and data-driven insights.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Users,
    title: "CRM Automation",
    description: "Enhance customer relationships with automated follow-ups, lead scoring, and intelligent customer insights.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Database,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with automated reporting and real-time analytics dashboards.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Bot,
    title: "AI Assistants",
    description: "Deploy intelligent chatbots and virtual assistants to handle customer queries 24/7 with natural language processing.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Code,
    title: "Custom Solutions",
    description: "Tailored automation solutions designed specifically for your unique business requirements and workflows.",
    color: "from-indigo-500 to-indigo-600",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Automation
            <span className="block mt-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Comprehensive AI-powered solutions to transform every aspect of your business operations
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary-200"
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="gradient" size="lg" asChild>
            <Link href="/services">
              Explore All Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
