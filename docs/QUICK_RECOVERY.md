# Quick Recovery Guide

Fast reference for common recovery scenarios. For detailed procedures, see [BACKUP_RECOVERY.md](./BACKUP_RECOVERY.md).

## 🚨 Emergency Procedures

### Website Down or Broken

```bash
# Option 1: Rollback via Vercel Dashboard (FASTEST)
1. Visit: https://vercel.com/moakturk/test-project/deployments
2. Find last working deployment (with ✓)
3. Click "..." → "Promote to Production"

# Option 2: Rollback via Git
git log --oneline -10                    # Find last working commit
git revert <bad-commit-hash>             # Revert bad commit
git push origin main                     # Deploy fixed version
```

**Expected Recovery Time:** 5 minutes

---

### Contact Form Not Working

**Check in this order:**

1. **Supabase Connection:**
   ```bash
   # Verify environment variables in Vercel
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   ```

2. **Email Service:**
   ```bash
   # Verify Resend API key
   RESEND_API_KEY
   ```

3. **Check Vercel Logs:**
   - Vercel Dashboard → Deployments → Latest → Logs
   - Look for 500 errors or API failures

4. **Test Database:**
   ```sql
   -- Run in Supabase SQL Editor
   SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5;
   ```

**Expected Recovery Time:** 10-15 minutes

---

### Lost Environment Variables

**Restore from this backup:**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://aipmvjykvdyvxrsvhsxs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from-secure-backup>
SUPABASE_SERVICE_ROLE_KEY=<from-secure-backup>

# Resend Email
RESEND_API_KEY=<from-secure-backup>
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=info@automexus.com

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-F6816J8JQC
```

**Add via Vercel Dashboard:**
1. Settings → Environment Variables → Add New
2. Select: Production, Preview, Development
3. Redeploy: Deployments → Latest → Redeploy

**Expected Recovery Time:** 10 minutes

---

### Database Data Loss

```bash
# 1. Access Supabase Dashboard
https://supabase.com/dashboard/project/aipmvjykvdyvxrsvhsxs

# 2. Navigate to Backups
Settings → Database → Backups

# 3. Restore from latest backup
Select backup → Restore

# 4. Verify
SELECT COUNT(*) FROM contacts;
```

**Expected Recovery Time:** 15-30 minutes

---

## 📋 Pre-Flight Checklist

Before deploying changes:

```bash
# 1. Test build locally
npm run build

# 2. Check for TypeScript errors
npm run lint

# 3. Test locally
npm run dev
# Visit: http://localhost:3000

# 4. Commit and push
git add .
git commit -m "Description of changes"
git push

# 5. Monitor deployment
# Watch Vercel dashboard for successful deployment
```

---

## 🔗 Quick Links

| Service | URL | Purpose |
|---------|-----|---------|
| **Production Site** | https://automexus.com | Live website |
| **Vercel Dashboard** | https://vercel.com/moakturk/test-project | Deployments & logs |
| **Supabase Dashboard** | https://supabase.com/dashboard/project/aipmvjykvdyvxrsvhsxs | Database & backups |
| **Google Analytics** | https://analytics.google.com | Traffic analytics |
| **GitHub Repo** | https://github.com/moakturk/test-project | Source code |

---

## 🛠️ Useful Commands

```bash
# View deployment logs
vercel logs <deployment-url>

# Test production build locally
npm run build && npm run start

# Database export
supabase db dump -f backup.sql

# Check environment variables
vercel env ls

# Pull environment variables
vercel env pull .env.local
```

---

## ⚠️ What NOT to Do

❌ **Never** commit `.env.local` to Git
❌ **Never** use `git push --force` on main branch
❌ **Never** delete Supabase project without backup
❌ **Never** share API keys publicly
❌ **Never** disable RLS policies without testing

---

## 📞 Support

- **Vercel:** https://vercel.com/support
- **Supabase:** https://supabase.com/support
- **Emergency:** Check Slack/Email for team contact

---

**Keep this document updated as procedures change!**

Last Updated: 2025-11-09
