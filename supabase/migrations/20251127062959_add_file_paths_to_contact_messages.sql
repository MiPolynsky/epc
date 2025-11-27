/*
  # Add file storage paths to contact messages

  1. Changes
    - Add `file_paths` column to store array of file paths in storage
    - This will store the actual storage paths for files uploaded via the contact form
  
  2. Notes
    - Keep `files_info` for backward compatibility (metadata only)
    - `file_paths` will contain storage paths like: ["uuid/filename.pdf"]
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'contact_messages' AND column_name = 'file_paths'
  ) THEN
    ALTER TABLE contact_messages ADD COLUMN file_paths text[] DEFAULT '{}';
  END IF;
END $$;
