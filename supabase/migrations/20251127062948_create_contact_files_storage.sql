/*
  # Create storage bucket for contact form files

  1. Storage
    - Create `contact-files` bucket for storing uploaded files
    - Enable public access for authenticated users to download files
  
  2. Security
    - Allow authenticated users to read files
    - Allow anyone to upload files (for contact form)
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('contact-files', 'contact-files', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public upload to contact-files"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'contact-files');

CREATE POLICY "Allow authenticated read from contact-files"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'contact-files');
