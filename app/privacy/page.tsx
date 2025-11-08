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

export default function PrivacyPage() {
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
                Privacy
                <span className="block mt-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Policy
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

              <Section title="1. Introduction">
                <p>
                  Automexus ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
              </Section>

              <Section title="2. Information We Collect">
                <p>We collect several types of information from and about users of our services:</p>
                <p>
                  <strong>Personal Information:</strong> Information that can be used to identify you, such as your name, email address, company name, phone number, and any other information you provide through contact forms or during consultations.
                </p>
                <p>
                  <strong>Technical Information:</strong> Information about your device, browser type, IP address, operating system, and browsing behavior when you interact with our website.
                </p>
                <p>
                  <strong>Business Information:</strong> Details about your business operations, processes, and automation needs that you share with us through our analysis forms or consultations.
                </p>
              </Section>

              <Section title="3. How We Use Your Information">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our automation services</li>
                  <li>Prepare personalized video analyses and custom solutions for your business</li>
                  <li>Communicate with you about our services, updates, and support</li>
                  <li>Process your requests and respond to your inquiries</li>
                  <li>Analyze usage patterns to improve our website and services</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </Section>

              <Section title="4. Information Sharing and Disclosure">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our business, subject to confidentiality agreements</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                </ul>
              </Section>

              <Section title="5. Data Security">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </Section>

              <Section title="6. Data Retention">
                <p>
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Business information and project-related data are retained for the duration of our service relationship and for a reasonable period thereafter.
                </p>
              </Section>

              <Section title="7. Your Rights">
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and obtain a copy of your personal data</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at info@automexus.com.
                </p>
              </Section>

              <Section title="8. Cookies and Tracking Technologies">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our website, analyze usage patterns, and deliver personalized content. You can control cookie settings through your browser preferences. For more information, please see our Cookie Policy.
                </p>
              </Section>

              <Section title="9. Third-Party Links">
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </Section>

              <Section title="10. Children's Privacy">
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.
                </p>
              </Section>

              <Section title="11. International Data Transfers">
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                </p>
              </Section>

              <Section title="12. Changes to This Privacy Policy">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </Section>

              <Section title="13. Contact Us">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
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
