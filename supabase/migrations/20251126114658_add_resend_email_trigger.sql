/*
  # Add Resend email notification trigger
  
  1. Changes
    - Create function to call Resend Edge Function
    - Create trigger to send email on new contact message
    - Uses Resend API for reliable email delivery
*/

CREATE OR REPLACE FUNCTION trigger_resend_email_notification()
RETURNS TRIGGER AS $$
DECLARE
  function_url TEXT;
  payload JSONB;
BEGIN
  function_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/send-email-resend';
  
  payload := jsonb_build_object(
    'name', NEW.name,
    'phone', NEW.phone,
    'email', NEW.email,
    'message', NEW.message,
    'files_info', NEW.files_info,
    'created_at', NEW.created_at
  );
  
  PERFORM net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := payload
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS send_resend_email_on_contact_message ON contact_messages;

CREATE TRIGGER send_resend_email_on_contact_message
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION trigger_resend_email_notification();