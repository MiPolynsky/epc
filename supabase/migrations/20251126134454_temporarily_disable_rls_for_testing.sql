/*
  # Temporarily disable RLS for testing

  This migration temporarily disables RLS on contact_messages table to test if the issue is with RLS policies.
  Once we confirm the form works, we'll re-enable RLS with proper policies.
  
  1. Changes
    - Disable RLS on contact_messages table temporarily
*/

ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;
