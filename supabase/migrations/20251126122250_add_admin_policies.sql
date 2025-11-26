/*
  # Add admin policies for contact messages
  
  1. Changes
    - Add policy for authenticated users to update message status
    - Add policy for authenticated users to delete messages
    - These policies allow admin users to manage contact form submissions
*/

CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact messages"
  ON contact_messages
  FOR DELETE
  TO authenticated
  USING (true);
