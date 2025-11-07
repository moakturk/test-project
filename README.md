# Automexus - AI-Powered Business Automation

A modern, professional website for Automexus, showcasing AI automation solutions for businesses worldwide.

## Features

- Modern, responsive design with TailwindCSS
- Built with Next.js 15 and TypeScript
- Professional UI components
- SEO optimized
- Multiple pages: Home, Services, About, Contact
- Contact form with validation
- Mobile-first approach

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Custom components with Shadcn/ui patterns
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── sections/         # Page sections (Hero, Features, etc.)
│   ├── ui/               # UI components (Button, Card, etc.)
│   └── contact-form.tsx  # Contact form component
├── lib/                   # Utility functions
└── public/               # Static assets

```

## Color Palette

- Primary: #007bff (Logo blue)
- Secondary: #7B2FFF (Innovation purple)
- Accent: #00D9A3 (Success green)
- Orange: #FF6B35 (CTA orange)

## Deployment

This project is optimized for Vercel deployment:

1. Push to GitHub
2. Import to Vercel
3. Connect your domain (automexus.com)
4. Deploy automatically

## License

© 2024 Automexus. All rights reserved.
