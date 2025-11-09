import Script from 'next/script'

interface StructuredDataProps {
  type: 'organization' | 'website' | 'service'
  data?: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Automexus',
          url: 'https://automexus.com',
          logo: 'https://automexus.com/logo.svg',
          description: 'AI-Powered Business Automation Solutions - Transform your business with intelligent automation for marketing, operations, and workflow optimization.',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'TR',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'info@automexus.com',
            url: 'https://automexus.com/contact',
          },
          sameAs: [
            // Social media profiles eklenebilir
            // 'https://twitter.com/automexus',
            // 'https://linkedin.com/company/automexus',
          ],
        }

      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Automexus',
          url: 'https://automexus.com',
          description: 'AI-Powered Business Automation Solutions',
          publisher: {
            '@type': 'Organization',
            name: 'Automexus',
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://automexus.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: data?.serviceType || 'Business Automation',
          provider: {
            '@type': 'Organization',
            name: 'Automexus',
            url: 'https://automexus.com',
          },
          areaServed: {
            '@type': 'Country',
            name: 'Turkey',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Automation Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Marketing Automation',
                  description: 'Automated marketing campaigns, email sequences, and customer engagement tools powered by AI.',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Process Automation',
                  description: 'Streamline repetitive tasks and optimize business workflows with intelligent automation.',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'CRM Automation',
                  description: 'Automated customer relationship management, lead tracking, and sales pipeline optimization.',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Data Analytics Automation',
                  description: 'Automated data collection, analysis, and reporting with AI-powered insights.',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'AI Chatbot Solutions',
                  description: '24/7 intelligent chatbot solutions for customer support and lead generation.',
                },
              },
            ],
          },
          ...data,
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
