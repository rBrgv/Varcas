-- Add SELECT policy for enquiries to allow admin access
-- This policy allows the service role (used by admin API) to read all enquiries

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow service role to read enquiries" ON enquiries;

-- Create policy for service role to read all enquiries
CREATE POLICY "Allow service role to read enquiries"
  ON enquiries FOR SELECT
  TO service_role
  USING (true);

-- Also allow authenticated users to read (in case admin uses authenticated role)
DROP POLICY IF EXISTS "Allow authenticated to read enquiries" ON enquiries;

CREATE POLICY "Allow authenticated to read enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (true);

