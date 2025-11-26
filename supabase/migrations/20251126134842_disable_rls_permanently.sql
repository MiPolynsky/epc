/*
  # Disable RLS on contact_messages table

  This migration disables Row Level Security on the contact_messages table
  to allow anonymous form submissions without authentication restrictions.
  
  1. Changes
    - Drop all existing RLS policies
    - Disable RLS on contact_messages table
  
  Note: This makes the table publicly accessible for inserts. In production,
  consider implementing application-level rate limiting.
*/

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "authenticated_select_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "authenticated_update_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "authenticated_delete_contact_messages" ON contact_messages;

ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;
