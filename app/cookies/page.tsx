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

export default function CookiesPage() {
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
                Cookie
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
                  This Cookie Policy explains how Automexus ("we," "us," or "our") uses cookies and similar tracking technologies on our website. By using our website, you consent to the use of cookies as described in this policy.
                </p>
                <p>
                  This policy should be read in conjunction with our Privacy Policy, which explains how we collect, use, and protect your personal information.
                </p>
              </Section>

              <Section title="2. What Are Cookies?">
                <p>
                  Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
                <p>
                  Cookies help us understand how visitors interact with our website, remember your preferences, and improve your overall experience.
                </p>
              </Section>

              <Section title="3. Types of Cookies We Use">

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
                    <p>
                      These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and form submissions. The website cannot function properly without these cookies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h3>
                    <p>
                      These cookies help us understand how visitors use our website by collecting and reporting information anonymously. We use this data to improve our website's performance and user experience.
                    </p>
                    <p>
                      Examples: Google Analytics, which tracks page views, session duration, bounce rates, and user demographics.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Functional Cookies</h3>
                    <p>
                      These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we use on our pages.
                    </p>
                    <p>
                      Examples: Language preferences, region selection, and customized content display.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Marketing Cookies</h3>
                    <p>
                      These cookies track your browsing habits to deliver personalized advertisements and measure the effectiveness of our marketing campaigns. They may be set by us or our advertising partners.
                    </p>
                    <p>
                      Examples: Remarketing pixels, conversion tracking, and social media advertising cookies.
                    </p>
                  </div>
                </div>
              </Section>

              <Section title="4. How We Use Cookies">
                <p>We use cookies for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Website Operation:</strong> To ensure our website functions correctly and securely</li>
                  <li><strong>User Experience:</strong> To remember your preferences and settings</li>
                  <li><strong>Analytics:</strong> To understand how visitors use our website and identify areas for improvement</li>
                  <li><strong>Marketing:</strong> To deliver relevant content and measure campaign effectiveness</li>
                  <li><strong>Security:</strong> To detect and prevent fraudulent activity and enhance website security</li>
                  <li><strong>Performance:</strong> To optimize website speed and functionality</li>
                </ul>
              </Section>

              <Section title="5. Third-Party Cookies">
                <p>
                  We may use third-party service providers who set cookies on our website to help us analyze usage, provide social media features, and deliver targeted advertising.
                </p>
                <p>
                  Third parties that may set cookies include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Google Analytics - for website analytics</li>
                  <li>Social media platforms (LinkedIn, Twitter) - for social sharing and advertising</li>
                  <li>Marketing platforms - for email campaigns and retargeting</li>
                  <li>Payment processors - for secure transaction processing</li>
                </ul>
                <p>
                  These third parties have their own privacy policies governing their use of cookies and data collection.
                </p>
              </Section>

              <Section title="6. Cookie Duration">
                <p>Cookies may be:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser. They help us maintain your session as you navigate through pages.
                  </li>
                  <li>
                    <strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them. They help us recognize you when you return to our website and remember your preferences.
                  </li>
                </ul>
              </Section>

              <Section title="7. Managing Your Cookie Preferences">
                <p>
                  You have the right to accept or reject cookies. You can manage your cookie preferences through:
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Browser Settings</h3>
                    <p>
                      Most web browsers allow you to control cookies through their settings. You can set your browser to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Block all cookies</li>
                      <li>Accept only first-party cookies</li>
                      <li>Delete cookies when you close your browser</li>
                      <li>Be notified when a website tries to set a cookie</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Browser-Specific Instructions</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Chrome: Settings → Privacy and Security → Cookies</li>
                      <li>Firefox: Settings → Privacy & Security → Cookies</li>
                      <li>Safari: Preferences → Privacy → Cookies</li>
                      <li>Edge: Settings → Cookies and Site Permissions</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Opt-Out Tools</h3>
                    <p>
                      For analytics cookies, you can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
                    </p>
                    <p>
                      For advertising cookies, you can visit industry opt-out pages such as:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Network Advertising Initiative (NAI) - networkadvertising.org/choices</li>
                      <li>Digital Advertising Alliance (DAA) - optout.aboutads.info</li>
                    </ul>
                  </div>
                </div>

                <p className="text-yellow-400 mt-4">
                  <strong>Note:</strong> Blocking or deleting cookies may impact your experience on our website and limit certain functionality.
                </p>
              </Section>

              <Section title="8. Do Not Track Signals">
                <p>
                  Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want your online activity tracked. Currently, there is no industry standard for how to respond to DNT signals. We do not currently respond to DNT browser signals.
                </p>
              </Section>

              <Section title="9. Changes to This Cookie Policy">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. Any changes will be posted on this page with an updated "Last updated" date.
                </p>
                <p>
                  We encourage you to review this policy periodically to stay informed about how we use cookies.
                </p>
              </Section>

              <Section title="10. Contact Us">
                <p>
                  If you have questions or concerns about our use of cookies or this Cookie Policy, please contact us at:
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
