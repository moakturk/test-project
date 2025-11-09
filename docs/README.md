# Automexus Documentation

Comprehensive documentation for the Automexus website infrastructure, deployment, and maintenance.

## 📚 Documentation Index

### Operations & Maintenance
- **[BACKUP_RECOVERY.md](./BACKUP_RECOVERY.md)** - Complete backup and disaster recovery procedures
- **[QUICK_RECOVERY.md](./QUICK_RECOVERY.md)** - Quick reference for emergency scenarios

## 🚀 Quick Start

### For Developers

```bash
# Clone repository
git clone https://github.com/moakturk/test-project.git
cd test-project

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with actual values

# Run development server
npm run dev
```

### For Emergency Recovery

See [QUICK_RECOVERY.md](./QUICK_RECOVERY.md) for immediate action items.

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend:** Next.js 15 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend API
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4, Vercel Analytics, Speed Insights

### Key Features
1. **Contact Form** with Supabase backend and RLS security
2. **Rate Limiting** (3 requests/min per IP)
3. **SEO Optimization** (sitemap, robots.txt, meta tags)
4. **Performance Optimization** (image optimization, caching, compression)
5. **Security** (CSP, security headers, HTTPS enforcement)
6. **Monitoring** (GA4, Vercel Analytics, Speed Insights)

## 📁 Project Structure

```
automexus/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── contact-form.tsx  # Contact form
│   └── GoogleAnalytics.tsx # GA4 tracking
├── lib/                   # Utility functions
│   └── rate-limit.ts     # Rate limiting logic
├── public/               # Static assets
│   ├── logo.svg
│   └── *.svg             # Service icons
├── docs/                 # Documentation (this folder)
├── .env.example          # Environment variable template
├── .env.local            # Local environment variables (gitignored)
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
└── package.json          # Dependencies
```

## 🔧 Environment Variables

See [.env.example](../.env.example) for required variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `RESEND_API_KEY` - Resend email API key
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 ID

## 📊 Monitoring & Analytics

### Google Analytics 4
- **Measurement ID:** G-F6816J8JQC
- **Dashboard:** https://analytics.google.com
- **Events Tracked:**
  - Page views (automatic)
  - Contact form submissions

### Vercel Analytics
- **Dashboard:** https://vercel.com/moakturk/test-project/analytics
- **Metrics:**
  - Real-time visitors
  - Page performance
  - Error tracking

### Speed Insights
- **Dashboard:** https://vercel.com/moakturk/test-project/speed-insights
- **Metrics:**
  - Core Web Vitals (LCP, FID, CLS)
  - Real User Monitoring (RUM)

## 🔐 Security Features

### Implemented
- ✅ Rate limiting (3 requests/min)
- ✅ Content Security Policy (CSP)
- ✅ Security headers (X-Frame-Options, HSTS, etc.)
- ✅ Supabase Row Level Security (RLS)
- ✅ HTTPS enforcement
- ✅ No sensitive data exposure

### Monitoring
- Vercel automatically monitors for:
  - DDoS attempts
  - Suspicious traffic patterns
  - SSL/TLS issues

## 🎯 Performance Metrics

### Target Metrics
- **Lighthouse Score:** 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint (FCP):** < 1.8s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Time to Interactive (TTI):** < 3.8s

### Optimizations Applied
- Image optimization (AVIF, WebP)
- Static asset caching (1 year)
- Gzip/Brotli compression
- System font usage (zero network requests)
- Code splitting and tree shaking
- Console.log removal in production

## 🚀 Deployment

### Automatic Deployment
Every push to `main` branch automatically deploys to production via Vercel.

### Manual Deployment
```bash
# Via Vercel CLI
vercel --prod

# Via Git
git push origin main
```

### Preview Deployments
Every pull request gets a unique preview URL for testing.

## 📝 Maintenance Tasks

### Daily
- Monitor Vercel Analytics for errors
- Check contact form submissions

### Weekly
- Review Google Analytics traffic
- Check Vercel deployment logs
- Verify backups are running

### Monthly
- Review and update dependencies: `npm outdated`
- Security audit: `npm audit`
- Performance audit: Run Lighthouse
- Test disaster recovery procedures

## 🆘 Support & Resources

### Documentation
- **Next.js:** https://nextjs.org/docs
- **Supabase:** https://supabase.com/docs
- **Vercel:** https://vercel.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

### Support Channels
- **Vercel Support:** https://vercel.com/support
- **Supabase Support:** https://supabase.com/support
- **GitHub Issues:** https://github.com/moakturk/test-project/issues

## 📜 License

Proprietary - Automexus © 2025

---

**Last Updated:** 2025-11-09
**Maintained by:** Automexus Team
