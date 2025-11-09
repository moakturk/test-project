-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CONTACTS TABLE
-- Stores basic contact form submissions
-- =====================================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DETAILED ANALYSIS TABLE
-- Stores detailed 10-question analysis form responses
-- =====================================================
CREATE TABLE IF NOT EXISTS detailed_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,

  -- 10 Analysis Questions
  current_processes TEXT,
  pain_points TEXT,
  team_size VARCHAR(50),
  current_tools TEXT,
  automation_goals TEXT,
  budget_range VARCHAR(100),
  timeline VARCHAR(100),
  success_metrics TEXT,
  integration_needs TEXT,
  additional_info TEXT,

  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'proposal_sent', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_detailed_analysis_contact_id ON detailed_analysis(contact_id);
CREATE INDEX IF NOT EXISTS idx_detailed_analysis_status ON detailed_analysis(status);
CREATE INDEX IF NOT EXISTS idx_detailed_analysis_created_at ON detailed_analysis(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- Enable RLS for security (will use service role for now)
-- =====================================================
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE detailed_analysis ENABLE ROW LEVEL SECURITY;

-- Allow service role to do everything
CREATE POLICY "Service role can do everything on contacts" ON contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can do everything on detailed_analysis" ON detailed_analysis
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- HELPFUL VIEWS
-- =====================================================

-- View to see contacts with their analysis submissions
CREATE OR REPLACE VIEW contacts_with_analysis AS
SELECT
  c.*,
  da.id as analysis_id,
  da.status as analysis_status,
  da.created_at as analysis_submitted_at
FROM contacts c
LEFT JOIN detailed_analysis da ON c.id = da.contact_id;

-- =====================================================
-- SAMPLE QUERIES FOR REFERENCE
-- =====================================================

-- Get all new contacts
-- SELECT * FROM contacts WHERE status = 'new' ORDER BY created_at DESC;

-- Get contacts with their analysis
-- SELECT * FROM contacts_with_analysis ORDER BY created_at DESC;

-- Get conversion rate
-- SELECT
--   COUNT(*) as total_contacts,
--   COUNT(*) FILTER (WHERE status = 'converted') as converted,
--   ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'converted') / COUNT(*), 2) as conversion_rate
-- FROM contacts;
