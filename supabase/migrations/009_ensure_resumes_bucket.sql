-- Ensure the resumes bucket exists and is properly configured
-- This migration will create the bucket if it doesn't exist

-- First, check if bucket exists, if not create it
DO $$
BEGIN
    -- Check if bucket exists
    IF NOT EXISTS (
        SELECT 1 FROM storage.buckets WHERE id = 'resumes'
    ) THEN
        -- Create the bucket
        INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
        VALUES (
            'resumes',
            'resumes',
            true, -- Make it public for easier access
            5242880, -- 5MB limit
            ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        );
    ELSE
        -- Update existing bucket to be public if it's not
        UPDATE storage.buckets 
        SET public = true 
        WHERE id = 'resumes' AND public = false;
    END IF;
END $$;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public to upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public to read resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated to upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated to read resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow service role to upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Allow service role to read resumes" ON storage.objects;

-- Policy: Allow public/anonymous users to upload resumes
CREATE POLICY "Allow public to upload resumes"
  ON storage.objects FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (bucket_id = 'resumes');

-- Policy: Allow public/anonymous users to read resumes
CREATE POLICY "Allow public to read resumes"
  ON storage.objects FOR SELECT
  TO anon, authenticated, service_role
  USING (bucket_id = 'resumes');

-- Policy: Allow public/anonymous users to delete their own resumes (optional, for cleanup)
CREATE POLICY "Allow public to delete resumes"
  ON storage.objects FOR DELETE
  TO anon, authenticated, service_role
  USING (bucket_id = 'resumes');

