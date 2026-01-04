-- Add resume_url column to enquiries table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'enquiries' 
        AND column_name = 'resume_url'
    ) THEN
        ALTER TABLE enquiries ADD COLUMN resume_url TEXT;
    END IF;
END $$;

