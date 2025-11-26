/*
  # Create contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `name` (text) - Name of the person submitting the form
      - `phone` (text) - Phone number of the person
      - `email` (text) - Email address of the person
      - `message` (text) - The message content
      - `files_info` (jsonb) - Information about attached files (names, sizes)
      - `created_at` (timestamptz) - Timestamp when the message was created
      - `status` (text) - Status of the message (new, read, archived)
  
  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for inserting messages (public access for form submissions)
    - Add policy for reading messages (authenticated users only)
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  files_info jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);