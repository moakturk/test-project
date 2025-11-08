"use client"

import { ModernHeader } from "@/components/layout/modern-header"
import { ModernFooter } from "@/components/layout/modern-footer"
import { AnimatedBackground } from "@/components/animated-background"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "What does your process look like exactly?",
    answer: `Our process is split into three steps to ensure maximum efficiency and a custom-fit solution:

**Initial Contact:** You reach out to us via the form on our "Contact Us" page.

**Detailed Analysis Form:** After reviewing your request, we send a detailed analysis form (approx. 10 questions) to deeply understand your business needs and goals.

**Personalized Video Analysis:** Based on your answers, we prepare and send a custom video analysis detailing what we can do for your company, identifying potential automation opportunities, and outlining the process.`,
  },
  {
    question: 'Why do you send a "video analysis" instead of doing a "live demo"?',
    answer: `This is our core strategy. A standard live demo often shows general features and takes up your valuable time. With our method, we first learn about your business via the form, then prepare a strategy video focused on your specific challenges. This means you get an "expert analysis" focused directly on your problems, without the hassle of scheduling a meeting.`,
  },
  {
    question: "What is your pricing model? Do you have standard packages?",
    answer: `No, we do not have standard packages. Just as every business is unique, every automation solution we provide is "tailor-made." Pricing is determined by the project's complexity, the number of systems to integrate, and the required development time. We provide a custom quote after reviewing your analysis form.`,
  },
  {
    question: "What kind of businesses or industries do you work with?",
    answer: `We work with businesses of all types, regardless of industry. Our focus isn't on your sector, but on the operational challenges you need to solve. Any business looking to make its processes more efficient and eliminate repetitive tasks is an ideal client for us.`,
  },
  {
    question: "How soon will I see a return on investment (ROI) from your solutions?",
    answer: `This depends entirely on the nature of the automated process. Some automations (e.g., eliminating manual data entry) provide immediate time and cost savings. Others (e.g., marketing automation) show their impact over the medium term through increased revenue. We will address potential ROI projections in your personalized video analysis.`,
  },
  {
    question: "Can you integrate with my existing software (CRM, ERP, etc.)?",
    answer: `Yes. API integration and development are cornerstones of our service. Whatever software you currently use, we ensure our automation solutions can "talk" to those systems and exchange data seamlessly.`,
  },
  {
    question: "Do you provide support after the project is delivered?",
    answer: `Absolutely. We see ourselves as "solution partners," not just a "project delivery" firm. After the project is complete, we offer optional paid monthly technical support and maintenance retainers, tailored to the project's scope, to ensure your systems continue to run smoothly.`,
  },
  {
    question: "Why is the \"10-question analysis form\" so important?",
    answer: `Because we respect your time. Instead of engaging in inefficient "discovery meetings" that consume time for both of us, this form allows us to get straight to the root of the problem. It helps us understand your needs from your perspective and guarantees that the video analysis we send is not "general," but "perfectly tailored" to you.`,
  },
  {
    question: "Will process automation cause our team to lose their jobs?",
    answer: `No. Our mission is to "unlock human potential." Automation isn't about replacing people; it's about liberating them from tedious, repetitive, and error-prone tasks. Our goal is to ensure your valuable team spends their time on strategic thinking and creative work, not "data entry."`,
  },
  {
    question: "Can I request changes or new features after the project is finished?",
    answer: `Of course. Automation is a dynamic process, and your needs may change as your business grows. For any updates, optimizations, or new features you need after delivery, our monthly technical support and development retainers (mentioned in question 7) come into play. This ensures your system always stays up-to-date and efficient.`,
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors"
      >
        <span className="text-lg font-semibold text-white pr-8">{faq.question}</span>
        <ChevronDown
          className={`h-5 w-5 text-primary-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 text-gray-400 leading-relaxed whitespace-pre-line">
          {faq.answer}
        </div>
      </div>
    </div>
  )
}

export default function FAQPage() {
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
                  FAQ
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                Frequently Asked
                <span className="block mt-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed">
                Everything you need to know about our process, pricing, and approach
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Get in touch with our team and we'll be happy to help you out.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/50 hover:shadow-primary-500/70 transition-all hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        <ModernFooter />
      </div>
    </main>
  )
}
