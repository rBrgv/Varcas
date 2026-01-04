-- Create storage bucket for resumes
-- Note: If bucket already exists, update it to be public for easier access
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy: Allow authenticated users to upload resumes
CREATE POLICY "Allow public to upload resumes"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'resumes');

-- Policy: Allow public to read resumes (for download)
CREATE POLICY "Allow public to read resumes"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'resumes');

