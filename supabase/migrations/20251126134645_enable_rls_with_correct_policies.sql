/*
  # Re-enable RLS with correct policies for contact messages

  This migration re-enables RLS on the contact_messages table with proper policies
  that allow anonymous users to submit contact forms.
  
  1. Changes
    - Enable RLS on contact_messages table
    - Drop all existing policies
    - Create new INSERT policy for anon users (contact form submissions)
    - Create SELECT, UPDATE, DELETE policies for authenticated users (admin access)
  
  2. Security
    - Anonymous users can only INSERT (submit forms)
    - Authenticated users can view and manage all messages
*/

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous inserts to contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can read contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can delete contact messages" ON contact_messages;

CREATE POLICY "anon_insert_contact_messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "authenticated_select_contact_messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_update_contact_messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "authenticated_delete_contact_messages"
  ON contact_messages
  FOR DELETE
  TO authenticated
  USING (true);
