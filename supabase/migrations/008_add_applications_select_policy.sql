-- Add SELECT policy for job_applications to allow admin access
-- This policy allows the service role (used by admin API) to read all job applications

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow service role to read job_applications" ON job_applications;

-- Create policy for service role to read all job applications
CREATE POLICY "Allow service role to read job_applications"
  ON job_applications FOR SELECT
  TO service_role
  USING (true);

-- Also allow authenticated users to read (in case admin uses authenticated role)
DROP POLICY IF EXISTS "Allow authenticated to read job_applications" ON job_applications;

CREATE POLICY "Allow authenticated to read job_applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (true);

