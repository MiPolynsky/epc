/*
  # Disable email notification triggers
  
  1. Changes
    - Drop the Resend email trigger and function
    - Email notifications now handled client-side via Resend API
*/

DROP TRIGGER IF EXISTS send_resend_email_on_contact_message ON contact_messages;
DROP FUNCTION IF EXISTS trigger_resend_email_notification();
