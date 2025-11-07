import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
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
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              About Automexus
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We're on a mission to empower businesses worldwide with intelligent automation solutions
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-2 border-primary-200 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To revolutionize how businesses operate by providing accessible, intelligent automation
                  solutions that eliminate repetitive tasks, reduce costs, and unlock human potential for
                  creative and strategic work.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary-200 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-secondary-500 to-accent-500 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To become the world's most trusted AI automation partner, enabling businesses of all
                  sizes to compete on a global scale through innovative technology and exceptional service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
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
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-secondary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
