-- Admin Users Table Migration
-- Run this in Supabase SQL Editor
-- Date: 2025-11-09

-- ================================================
-- Step 1: Create admin_users table
-- ================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- ================================================
-- Step 2: Enable Row Level Security
-- ================================================

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ================================================
-- Step 3: Create RLS Policies
-- ================================================

-- Policy 1: Service role can do everything (for NextAuth)
CREATE POLICY "Service role has full access"
ON admin_users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy 2: Authenticated admins can read their own data
CREATE POLICY "Admins can read own data"
ON admin_users
FOR SELECT
TO authenticated
USING (auth.uid()::text = id::text);

-- ================================================
-- Step 4: Create first admin user
-- ================================================

-- Email: admin@automexus.com
-- Password: A1d2m3i4n5_
-- IMPORTANT: Change this password after first login!

INSERT INTO admin_users (email, password_hash, name, role)
VALUES (
  'admin@automexus.com',
  '$2b$10$PnneMs4TsK5BTpL6rwT4wuzYjamlqC6SHQBqhnGoRKvQMNZxY32Wu',
  'Admin',
  'admin'
)
ON CONFLICT (email) DO NOTHING;

-- ================================================
-- Step 5: Update contacts table (add status column)
-- ================================================

-- Add status column to contacts table if it doesn't exist
ALTER TABLE contacts
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'new';

-- Add index for status filtering
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- Create enum type for status (optional, for future)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'contact_status') THEN
    CREATE TYPE contact_status AS ENUM ('new', 'read', 'replied', 'archived');
  END IF;
END $$;

-- ================================================
-- Verification Queries
-- ================================================

-- Uncomment to verify after running migration:
-- SELECT * FROM admin_users;
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'admin_users';
-- SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5;
