# Backup & Recovery Strategy

This document outlines the backup and disaster recovery strategy for the Automexus website.

## Table of Contents
1. [Database Backups (Supabase)](#database-backups-supabase)
2. [Deployment Rollback (Vercel)](#deployment-rollback-vercel)
3. [Environment Variables Backup](#environment-variables-backup)
4. [Disaster Recovery Procedures](#disaster-recovery-procedures)

---

## Database Backups (Supabase)

### Automatic Backups

Supabase provides automatic daily backups for all projects:

**Backup Schedule:**
- **Free/Pro Plans:** Daily backups retained for 7 days
- **Team/Enterprise Plans:** Daily backups with configurable retention

**Access Backups:**
1. Go to https://supabase.com/dashboard
2. Select your project: `aipmvjykvdyvxrsvhsxs`
3. Navigate to **Settings** → **Database** → **Backups**
4. View available backups and restore points

### Manual Backup

To create a manual backup of the `contacts` table:

```bash
# Using Supabase CLI (install first: npm install -g supabase)
supabase db dump -f backup.sql

# Or export data directly via SQL
# In Supabase SQL Editor, run:
COPY (SELECT * FROM contacts) TO STDOUT WITH CSV HEADER;
```

### Restore from Backup

**Option 1: Point-in-Time Recovery (Enterprise only)**
1. Supabase Dashboard → Database → Backups
2. Select restore point
3. Click "Restore"

**Option 2: Manual Restore**
```sql
-- Restore contacts table from backup
TRUNCATE contacts;
COPY contacts FROM '/path/to/backup.csv' WITH CSV HEADER;
```

### Critical Tables
- `contacts` - Contact form submissions (RLS enabled)

**Backup Frequency Recommendation:** Daily automated (already configured)

---

## Deployment Rollback (Vercel)

### Instant Rollback

Vercel keeps a complete history of all deployments. To rollback:

**Via Dashboard:**
1. Go to https://vercel.com/moakturk/test-project/deployments
2. Find the last working deployment
3. Click **"..."** → **"Promote to Production"**
4. Confirm rollback

**Via CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# List deployments
vercel ls

# Promote specific deployment to production
vercel promote <deployment-url>
```

### Deployment History

Vercel maintains:
- **Complete build history** for all deployments
- **Source code snapshots** for each build
- **Environment variables** at time of deployment
- **Build logs** for debugging

**Retention:** Unlimited deployment history

### Git-Based Recovery

All deployments are tied to Git commits:

```bash
# View recent commits
git log --oneline -10

# Rollback to specific commit locally
git revert <commit-hash>

# Or hard reset (use with caution)
git reset --hard <commit-hash>
git push -f origin main
```

**Current Branch:** `claude/automexus-website-build-011CUuMBy3iSDTVPvZkZJbHD`

---

## Environment Variables Backup

### Current Environment Variables

**Production (.env.local):**
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://aipmvjykvdyvxrsvhsxs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[REDACTED]
SUPABASE_SERVICE_ROLE_KEY=[REDACTED]

# Email
RESEND_API_KEY=[REDACTED]
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=info@automexus.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-F6816J8JQC
```

### Backup Process

**1. Export from Vercel:**
```bash
# Using Vercel CLI
vercel env pull .env.backup
```

**2. Secure Storage:**
- Store in password manager (1Password, LastPass, Bitwarden)
- Keep offline backup in secure location
- **NEVER commit to Git** (.env.local is in .gitignore)

**3. Restore:**
```bash
# Add variables back via Vercel Dashboard
# Settings → Environment Variables → Add New

# Or via CLI
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
```

---

## Disaster Recovery Procedures

### Scenario 1: Database Corruption

**Impact:** Contact form data lost or corrupted
**Recovery Time:** 15-30 minutes

**Steps:**
1. Access Supabase Dashboard → Database → Backups
2. Identify last known good backup (max 7 days old)
3. Restore from backup point
4. Verify data integrity:
   ```sql
   SELECT COUNT(*) FROM contacts;
   SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;
   ```
5. Test contact form submission
6. Monitor for issues

### Scenario 2: Bad Deployment

**Impact:** Website broken or not functioning
**Recovery Time:** 5-10 minutes

**Steps:**
1. Identify issue in Vercel build logs
2. Go to Vercel Deployments page
3. Find last successful deployment (marked with ✓)
4. Click **"..."** → **"Promote to Production"**
5. Verify website is working: https://automexus.com
6. Fix issue in code and redeploy

**Prevention:**
- Always test locally: `npm run build` before pushing
- Use preview deployments for testing
- Monitor Vercel Analytics for errors

### Scenario 3: Lost Environment Variables

**Impact:** Features not working (contact form, analytics, etc.)
**Recovery Time:** 10-15 minutes

**Steps:**
1. Retrieve from secure backup (password manager)
2. Vercel Dashboard → Settings → Environment Variables
3. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Redeploy: `git commit --allow-empty -m "Redeploy" && git push`
5. Verify all features working

### Scenario 4: Complete Site Loss

**Impact:** Entire website unavailable
**Recovery Time:** 1-2 hours

**Steps:**
1. Clone repository: `git clone https://github.com/moakturk/test-project.git`
2. Install dependencies: `npm install`
3. Create new Vercel project or reconnect existing
4. Restore environment variables from backup
5. Deploy: `vercel --prod`
6. Update DNS if needed (automexus.com → new Vercel deployment)
7. Verify all functionality

### Scenario 5: Supabase Project Deleted

**Impact:** Database and authentication lost
**Recovery Time:** 2-3 hours

**Steps:**
1. Create new Supabase project
2. Restore database schema:
   ```sql
   CREATE TABLE contacts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     company TEXT,
     phone TEXT,
     message TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
   -- Add RLS policies (see docs/DATABASE.md)
   ```
3. Restore data from backup if available
4. Update environment variables in Vercel
5. Redeploy application
6. Test contact form

---

## Backup Checklist

### Weekly
- [ ] Verify Supabase automatic backups are running
- [ ] Check Vercel deployment history
- [ ] Review build logs for warnings

### Monthly
- [ ] Export manual database backup
- [ ] Verify environment variables backup is up-to-date
- [ ] Test recovery procedure (rollback to previous deployment)
- [ ] Review and update this document

### Quarterly
- [ ] Perform full disaster recovery drill
- [ ] Verify all team members have access to backups
- [ ] Update credentials if needed

---

## Emergency Contacts

**Vercel Support:** https://vercel.com/support
**Supabase Support:** https://supabase.com/support
**GitHub Support:** https://support.github.com

---

## Important URLs

- **Vercel Dashboard:** https://vercel.com/moakturk/test-project
- **Supabase Dashboard:** https://supabase.com/dashboard/project/aipmvjykvdyvxrsvhsxs
- **GitHub Repository:** https://github.com/moakturk/test-project
- **Production Site:** https://automexus.com
- **Analytics:** https://analytics.google.com

---

**Last Updated:** 2025-11-09
**Document Version:** 1.0
