/*
  # Update notification trigger to use Telegram
  
  1. Changes
    - Replace SMTP Edge Function with Telegram notification function
    - Function now calls send-telegram-notification Edge Function
    - Sends all message details to Telegram bot
  
  2. Configuration
    - Edge Function endpoint: /functions/v1/send-telegram-notification
    - Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID secrets in Supabase
*/

CREATE OR REPLACE FUNCTION notify_new_contact_message()
RETURNS TRIGGER AS $$
DECLARE
  supabase_url text;
  service_role_key text;
BEGIN
  supabase_url := current_setting('app.settings.supabase_url', true);
  service_role_key := current_setting('app.settings.service_role_key', true);

  IF supabase_url IS NULL THEN
    supabase_url := 'https://apzouhutnaeigyhdfyqf.supabase.co';
  END IF;

  IF service_role_key IS NULL THEN
    RAISE NOTICE 'Service role key not configured, notification may fail';
  END IF;

  PERFORM net.http_post(
    url := supabase_url || '/functions/v1/send-telegram-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || COALESCE(service_role_key, '')
    ),
    body := jsonb_build_object(
      'name', NEW.name,
      'phone', NEW.phone,
      'email', NEW.email,
      'message', COALESCE(NEW.message, ''),
      'files_info', COALESCE(NEW.files_info, '[]'::jsonb),
      'created_at', NEW.created_at
    )
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_contact_message_created ON contact_messages;

CREATE TRIGGER on_contact_message_created
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact_message();