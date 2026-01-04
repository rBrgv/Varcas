-- Enable Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policies for enquiries: Allow public inserts
CREATE POLICY "Allow public inserts on enquiries"
  ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy for enquiries: Allow service role to read all enquiries (for admin)
CREATE POLICY "Allow service role to read enquiries"
  ON enquiries FOR SELECT
  TO service_role
  USING (true);

-- Policies for jobs: Allow public to read active jobs only
CREATE POLICY "Allow public to read active jobs"
  ON jobs FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Policies for job_applications: Allow public inserts
CREATE POLICY "Allow public inserts on job_applications"
  ON job_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

