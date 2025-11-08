"use client"

import { ModernHeader } from "@/components/layout/modern-header"
import { ModernFooter } from "@/components/layout/modern-footer"
import { AnimatedBackground } from "@/components/animated-background"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="text-gray-400 leading-relaxed space-y-4">{children}</div>
    </div>
  )
}

export default function TermsPage() {
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
                <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
                  Legal
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                Terms of
                <span className="block mt-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Service
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto backdrop-blur-xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 rounded-2xl p-8 md:p-12 space-y-12">

              <Section title="1. Acceptance of Terms">
                <p>
                  By accessing or using Automexus's website and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
                </p>
                <p>
                  These Terms constitute a legally binding agreement between you ("Client," "you," or "your") and Automexus ("we," "us," or "our").
                </p>
              </Section>

              <Section title="2. Services Description">
                <p>
                  Automexus provides AI-powered business automation solutions, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process automation and workflow optimization</li>
                  <li>Marketing automation solutions</li>
                  <li>CRM automation and integration</li>
                  <li>Data analytics and reporting</li>
                  <li>AI assistant development</li>
                  <li>Custom automation solutions tailored to client needs</li>
                </ul>
                <p>
                  All services are provided on a custom, project-basis as agreed upon in individual service agreements.
                </p>
              </Section>

              <Section title="3. Service Process">
                <p>
                  Our service delivery follows a structured process:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Initial Contact:</strong> Client submits a request through our contact form</li>
                  <li><strong>Analysis Form:</strong> We provide a detailed questionnaire to understand your business needs</li>
                  <li><strong>Video Analysis:</strong> We deliver a personalized video analysis outlining proposed solutions and approach</li>
                  <li><strong>Proposal & Agreement:</strong> Upon acceptance, we provide a detailed proposal and service agreement</li>
                  <li><strong>Implementation:</strong> Development and deployment of agreed-upon solutions</li>
                  <li><strong>Support:</strong> Optional ongoing maintenance and support services</li>
                </ul>
              </Section>

              <Section title="4. Client Responsibilities">
                <p>As a client, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information during the analysis phase</li>
                  <li>Grant necessary access to systems and data required for implementation</li>
                  <li>Respond to requests for information in a timely manner</li>
                  <li>Designate a point of contact for project communication</li>
                  <li>Review and approve deliverables within agreed timeframes</li>
                  <li>Comply with all applicable laws and regulations in your use of our services</li>
                </ul>
              </Section>

              <Section title="5. Pricing and Payment">
                <p>
                  All services are priced on a custom basis. Pricing is determined by project complexity, scope, integration requirements, and development time. Detailed pricing will be provided in individual proposals.
                </p>
                <p>
                  Payment terms will be specified in each service agreement. Generally:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>A deposit may be required before project commencement</li>
                  <li>Milestone payments may be established for larger projects</li>
                  <li>Final payment is due upon project completion and acceptance</li>
                  <li>Monthly retainers apply for ongoing support and maintenance services</li>
                </ul>
              </Section>

              <Section title="6. Intellectual Property">
                <p>
                  <strong>Client Data:</strong> You retain all rights to your business data, processes, and proprietary information.
                </p>
                <p>
                  <strong>Deliverables:</strong> Upon full payment, you receive ownership of the specific automation solutions developed for your project, subject to any third-party licensing requirements.
                </p>
                <p>
                  <strong>Automexus IP:</strong> We retain ownership of our methodologies, frameworks, code libraries, and general business processes used in delivering services.
                </p>
              </Section>

              <Section title="7. Confidentiality">
                <p>
                  Both parties agree to maintain confidentiality of proprietary information shared during the course of the engagement. We implement appropriate measures to protect your business information and trade secrets.
                </p>
                <p>
                  Confidentiality obligations survive termination of services and continue for a period of three (3) years.
                </p>
              </Section>

              <Section title="8. Warranties and Disclaimers">
                <p>
                  We warrant that services will be performed in a professional and workmanlike manner. However:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Services are provided "as is" without warranties of any kind, express or implied</li>
                  <li>We do not guarantee specific business outcomes or ROI</li>
                  <li>We are not responsible for third-party software or service interruptions</li>
                  <li>Client is responsible for maintaining backups of critical data</li>
                </ul>
              </Section>

              <Section title="9. Limitation of Liability">
                <p>
                  To the maximum extent permitted by law, Automexus's total liability for any claims arising from services shall not exceed the total amount paid by you for the specific service giving rise to the claim.
                </p>
                <p>
                  We are not liable for indirect, incidental, consequential, or punitive damages, including lost profits or business interruption.
                </p>
              </Section>

              <Section title="10. Term and Termination">
                <p>
                  Service agreements commence upon execution and continue until project completion or as specified in individual agreements.
                </p>
                <p>
                  Either party may terminate services:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For convenience with 30 days' written notice</li>
                  <li>Immediately for material breach that remains uncured after 15 days' notice</li>
                  <li>Immediately if the other party becomes insolvent or files for bankruptcy</li>
                </ul>
                <p>
                  Upon termination, you remain responsible for payment of services rendered up to the termination date.
                </p>
              </Section>

              <Section title="11. Support and Maintenance">
                <p>
                  Post-delivery support and maintenance are available through optional monthly retainer agreements. The scope and pricing of support services are defined in separate agreements.
                </p>
                <p>
                  Support services may include bug fixes, minor updates, technical assistance, and optimization services.
                </p>
              </Section>

              <Section title="12. Modifications to Terms">
                <p>
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of services after changes constitutes acceptance of modified Terms.
                </p>
                <p>
                  Material changes will be communicated via email to active clients.
                </p>
              </Section>

              <Section title="13. Governing Law">
                <p>
                  These Terms are governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration or in courts of competent jurisdiction as specified in individual service agreements.
                </p>
              </Section>

              <Section title="14. Entire Agreement">
                <p>
                  These Terms, together with individual service agreements and our Privacy Policy, constitute the entire agreement between you and Automexus regarding the use of our services.
                </p>
              </Section>

              <Section title="15. Contact Information">
                <p>
                  For questions regarding these Terms of Service, please contact us at:
                </p>
                <p>
                  <strong>Email:</strong> info@automexus.com<br />
                  <strong>Website:</strong> www.automexus.com
                </p>
              </Section>

            </div>
          </div>
        </section>

        <ModernFooter />
      </div>
    </main>
  )
}
