# Monitoring & Uptime Guide

Comprehensive guide for monitoring the Automexus website health, uptime, and performance.

## Table of Contents
1. [Health Check Endpoint](#health-check-endpoint)
2. [Uptime Monitoring Setup](#uptime-monitoring-setup)
3. [Vercel Monitoring](#vercel-monitoring)
4. [Google Analytics Monitoring](#google-analytics-monitoring)
5. [Alert Configuration](#alert-configuration)
6. [Monitoring Checklist](#monitoring-checklist)

---

## Health Check Endpoint

### Overview

The health check endpoint provides real-time status of critical application services:

**Endpoint:** `https://automexus.com/api/health`

**Response Format:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-09T12:00:00.000Z",
  "checks": {
    "database": "ok",
    "environment": "ok"
  },
  "version": "1.0.0",
  "uptime": 45
}
```

### Status Codes

| Status | HTTP Code | Meaning |
|--------|-----------|---------|
| `healthy` | 200 | All systems operational |
| `degraded` | 503 | Some non-critical issues |
| `unhealthy` | 503 | Critical service failure |

### Checks Performed

1. **Database Connectivity** - Supabase connection test
2. **Environment Variables** - Critical config verification
3. **Response Time** - API latency measurement

### Testing

```bash
# Test health endpoint
curl https://automexus.com/api/health

# Expected response (healthy):
# {"status":"healthy","timestamp":"...","checks":{...}}

# Check with verbose output
curl -v https://automexus.com/api/health
```

---

## Uptime Monitoring Setup

### Recommended: UptimeRobot (Free)

UptimeRobot provides free monitoring for up to 50 monitors with 5-minute intervals.

**Setup Steps:**

1. **Create Account**
   - Visit: https://uptimerobot.com
   - Sign up for free account
   - Verify email

2. **Add Monitor**
   - Click **"+ Add New Monitor"**
   - Monitor Type: `HTTP(s)`
   - Friendly Name: `Automexus - Main Site`
   - URL: `https://automexus.com`
   - Monitoring Interval: `5 minutes`
   - Click **"Create Monitor"**

3. **Add Health Check Monitor**
   - Click **"+ Add New Monitor"**
   - Monitor Type: `HTTP(s)`
   - Friendly Name: `Automexus - Health Check`
   - URL: `https://automexus.com/api/health`
   - Monitoring Interval: `5 minutes`
   - Advanced Settings:
     - Response Should Contain: `"status":"healthy"`
   - Click **"Create Monitor"**

4. **Configure Alerts**
   - Go to **"My Settings"** → **"Alert Contacts"**
   - Add your email address
   - Verify email
   - Enable notifications for all monitors

### Alternative: Better Uptime

Better Uptime offers more features with a free tier:

**Setup:**
1. Visit: https://betteruptime.com
2. Sign up for free account
3. Create monitor for `https://automexus.com`
4. Set check interval to 30 seconds (free tier)
5. Configure email/SMS alerts

### Alternative: Vercel Built-in Monitoring

Vercel automatically monitors deployments:

**Access:**
- Dashboard: https://vercel.com/moakturk/test-project/analytics
- Automatically tracks:
  - Deployment status
  - Build failures
  - Runtime errors
  - Performance metrics

---

## Vercel Monitoring

### Vercel Analytics

**Dashboard:** https://vercel.com/moakturk/test-project/analytics

**Metrics Tracked:**
- Real-time visitor count
- Page views by route
- Top pages
- Visitor geography
- Referrer sources

**Alerts:**
Vercel automatically alerts on:
- Build failures
- Deployment errors
- Excessive error rates

**Configuration:**
Already enabled via `<Analytics />` component in `app/layout.tsx`

### Vercel Speed Insights

**Dashboard:** https://vercel.com/moakturk/test-project/speed-insights

**Core Web Vitals:**
- **LCP** (Largest Contentful Paint) - Target: < 2.5s
- **FID** (First Input Delay) - Target: < 100ms
- **CLS** (Cumulative Layout Shift) - Target: < 0.1
- **TTFB** (Time to First Byte) - Target: < 800ms

**Real User Monitoring (RUM):**
- Actual user experience data
- Device/browser breakdown
- Geographic performance

**Configuration:**
Already enabled via `<SpeedInsights />` component in `app/layout.tsx`

### Vercel Logs

**Access Logs:**
```bash
# Real-time logs
vercel logs <deployment-url> --follow

# Recent logs
vercel logs <deployment-url>

# Filter by function
vercel logs <deployment-url> --function=/api/contact
```

**Via Dashboard:**
1. Go to: https://vercel.com/moakturk/test-project/deployments
2. Click on latest deployment
3. Navigate to **"Functions"** tab
4. View logs for each API route

---

## Google Analytics Monitoring

### Real-Time Monitoring

**Dashboard:** https://analytics.google.com

**Real-Time Reports:**
1. Navigate to **Reports** → **Real-time**
2. View:
   - Active users now
   - Page views per minute
   - Top active pages
   - User locations

### Custom Alerts

**Setup GA4 Insights:**
1. Go to **Explore** → **Insights**
2. Configure automatic insights for:
   - Traffic anomalies
   - Conversion changes
   - New trends

### Events Monitoring

**Tracked Events:**
- `page_view` - Automatic
- `contact_form_submit` - Custom event

**View Events:**
1. Go to **Reports** → **Events**
2. Monitor event counts
3. Set up alerts for event anomalies

---

## Alert Configuration

### Critical Alerts (Immediate Action Required)

| Alert | Condition | Action |
|-------|-----------|--------|
| **Site Down** | HTTP status ≠ 200 | Check Vercel deployment, rollback if needed |
| **Health Check Failed** | `/api/health` returns 503 | Check database connection, environment vars |
| **Database Offline** | Supabase unreachable | Check Supabase status, contact support |
| **Build Failed** | Vercel build error | Check logs, fix TypeScript/build errors |

### Warning Alerts (Monitor Closely)

| Alert | Condition | Action |
|-------|-----------|--------|
| **Slow Response** | TTFB > 2s | Check Vercel logs, optimize slow queries |
| **High Error Rate** | > 5% 5xx errors | Review error logs, check recent deployments |
| **Low Uptime** | < 99.9% in 24h | Investigate downtime cause |

### UptimeRobot Alert Configuration

**Recommended Settings:**
- Alert when down for: `1 minute` (after 1 failed check)
- Alert contacts: `Email` (instant)
- Re-alert if still down: `Every 30 minutes`
- Send "Up" notification: `Yes`

---

## Monitoring Checklist

### Daily Checks (Automated)

- [x] UptimeRobot monitoring `https://automexus.com`
- [x] UptimeRobot monitoring `/api/health`
- [x] Vercel Analytics active
- [x] Google Analytics tracking
- [x] Vercel Speed Insights active

### Weekly Review (Manual)

- [ ] Check UptimeRobot uptime percentage (target: 99.9%)
- [ ] Review Vercel Analytics for traffic anomalies
- [ ] Review Google Analytics for user behavior trends
- [ ] Check Vercel Speed Insights for performance regressions
- [ ] Review error logs in Vercel dashboard
- [ ] Verify health check endpoint responding correctly

### Monthly Review (Manual)

- [ ] Analyze uptime trends (monthly average)
- [ ] Review Core Web Vitals performance
- [ ] Check for any alert patterns
- [ ] Update monitoring thresholds if needed
- [ ] Verify all monitoring services are active
- [ ] Test disaster recovery procedures

---

## Monitoring Dashboard URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Production Site** | https://automexus.com | Live website |
| **Health Check** | https://automexus.com/api/health | System status |
| **Vercel Dashboard** | https://vercel.com/moakturk/test-project | Deployment & analytics |
| **Vercel Analytics** | https://vercel.com/moakturk/test-project/analytics | Traffic monitoring |
| **Vercel Speed Insights** | https://vercel.com/moakturk/test-project/speed-insights | Performance metrics |
| **Google Analytics** | https://analytics.google.com | Detailed analytics |
| **Supabase Dashboard** | https://supabase.com/dashboard/project/aipmvjykvdyvxrsvhsxs | Database monitoring |

---

## Troubleshooting

### Health Check Returns "unhealthy"

**Possible Causes:**
1. Database connection failed
   - Check Supabase status: https://status.supabase.com
   - Verify environment variables in Vercel
   - Test database manually via Supabase dashboard

2. Environment variables missing
   - Go to Vercel → Settings → Environment Variables
   - Verify all required variables are set
   - Redeploy if variables were just added

**Fix:**
```bash
# Test locally
npm run build
npm run start
curl http://localhost:3000/api/health

# If local works, check Vercel environment variables
vercel env ls
```

### UptimeRobot Shows "Down"

**Steps:**
1. Visit https://automexus.com manually
   - If works: False alarm, wait for next check
   - If doesn't work: Proceed to step 2

2. Check Vercel deployment status
   - Go to: https://vercel.com/moakturk/test-project/deployments
   - Look for failed deployments
   - Check build logs

3. Check health endpoint
   - Visit: https://automexus.com/api/health
   - If 503: Critical service failure
   - If 200: Site is healthy, UptimeRobot issue

4. Rollback if needed
   - See: [QUICK_RECOVERY.md](./QUICK_RECOVERY.md)

### High Error Rate in Vercel

**Investigation Steps:**
1. Check Vercel Functions logs
2. Identify failing endpoint
3. Review recent code changes
4. Check third-party services (Supabase, Resend)
5. Rollback if needed

---

## Performance Benchmarks

### Target Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Uptime** | 99.9% | - | Monitor |
| **TTFB** | < 800ms | - | Monitor |
| **LCP** | < 2.5s | - | Monitor |
| **FID** | < 100ms | - | Monitor |
| **CLS** | < 0.1 | - | Monitor |
| **Response Time** | < 500ms | - | Monitor |

### Alerting Thresholds

- **Critical:** Uptime < 99%
- **Warning:** TTFB > 1.5s
- **Warning:** LCP > 3.5s
- **Critical:** Error rate > 5%

---

## Next Steps

1. **Set up UptimeRobot** (10 minutes)
   - Create account
   - Add 2 monitors (main site + health check)
   - Configure email alerts

2. **Review Vercel Analytics** (5 minutes)
   - Verify tracking is working
   - Set up custom alerts if available

3. **Set Google Analytics Alerts** (5 minutes)
   - Configure traffic anomaly detection
   - Set up conversion tracking alerts

4. **Test Alerts** (5 minutes)
   - Trigger test alert in UptimeRobot
   - Verify email notifications work

5. **Document Baselines** (5 minutes)
   - Record initial performance metrics
   - Set improvement goals

---

**Last Updated:** 2025-11-09
**Document Version:** 1.0
