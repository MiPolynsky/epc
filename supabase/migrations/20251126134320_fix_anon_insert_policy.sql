/*
  # Fix anonymous insert policy for contact messages

  This migration fixes the RLS policy that was blocking anonymous users from submitting contact forms.
  
  1. Changes
    - Drop existing restrictive INSERT policy for anonymous users
    - Create new INSERT policy for anonymous users that allows all inserts
    - Ensure anon role can submit contact forms without authentication
*/

DROP POLICY IF EXISTS "Anonymous users can insert contact messages" ON contact_messages;

CREATE POLICY "Allow anonymous inserts to contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);
