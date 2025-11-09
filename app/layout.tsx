import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import StructuredData from "@/components/StructuredData";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://automexus.com'),
  title: {
    default: "Automexus - AI-Powered Business Automation Solutions",
    template: "%s | Automexus"
  },
  description: "Transform your business with intelligent automation. Automexus delivers cutting-edge AI solutions for marketing, operations, and workflow automation to help businesses scale efficiently.",
  keywords: [
    "AI automation",
    "business automation",
    "marketing automation",
    "workflow automation",
    "process automation",
    "AI solutions",
    "yapay zeka otomasyon",
    "iş otomasyonu",
    "dijital dönüşüm"
  ],
  authors: [{ name: "Automexus" }],
  creator: "Automexus",
  publisher: "Automexus",
  alternates: {
    canonical: 'https://automexus.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['tr_TR'],
    url: 'https://automexus.com',
    siteName: 'Automexus',
    title: 'Automexus - AI-Powered Business Automation Solutions',
    description: 'Transform your business with intelligent automation solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Automexus - AI Automation Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automexus - AI-Powered Business Automation',
    description: 'Transform your business with intelligent automation solutions.',
    images: ['/og-image.jpg'],
    creator: '@automexus',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans">
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        <StructuredData type="organization" />
        <StructuredData type="website" />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
