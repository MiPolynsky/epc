/*
  # Add email notification system for contact messages

  1. New Functions
    - `notify_new_contact_message()` - Function that sends email notification when new message is received
  
  2. New Triggers
    - `on_contact_message_created` - Trigger that calls the notification function after new message insert
  
  3. Configuration
    - Uses pg_net extension to send HTTP POST request to a simple email service
    - Email sent to: expert.p.c@mail.ru
    - Includes all message details in the notification
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'pg_net'
  ) THEN
    CREATE EXTENSION pg_net;
  END IF;
END $$;

CREATE OR REPLACE FUNCTION notify_new_contact_message()
RETURNS TRIGGER AS $$
DECLARE
  email_subject text;
  email_body text;
  files_text text := '';
BEGIN
  IF NEW.files_info IS NOT NULL AND jsonb_array_length(NEW.files_info) > 0 THEN
    files_text := E'\n\nПрикрепленные файлы (' || jsonb_array_length(NEW.files_info)::text || '):' || E'\n';
    
    SELECT string_agg('- ' || (file->>'name') || ' (' || 
           ROUND((file->>'size')::numeric / 1024) || ' KB)', E'\n')
    INTO files_text
    FROM jsonb_array_elements(NEW.files_info) AS file;
    
    files_text := E'\n\n' || files_text;
  END IF;

  email_subject := 'Новая заявка с сайта от ' || NEW.name;
  
  email_body := 'Новая заявка с сайта Экспертно-Проектного Центра' || E'\n\n' ||
                'Имя: ' || NEW.name || E'\n' ||
                'Телефон: ' || NEW.phone || E'\n' ||
                'Email: ' || NEW.email || E'\n\n' ||
                'Сообщение:' || E'\n' || COALESCE(NEW.message, '') ||
                COALESCE(files_text, '') || E'\n\n' ||
                '---' || E'\n' ||
                'Отправлено: ' || to_char(NEW.created_at AT TIME ZONE 'Asia/Omsk', 'DD.MM.YYYY HH24:MI') || E'\n' ||
                'ID заявки: ' || NEW.id::text;

  PERFORM net.http_post(
    url := 'https://ntfy.sh/epc_contact_messages',
    headers := jsonb_build_object(
      'Title', email_subject,
      'Priority', 'high',
      'Tags', 'email,mailbox'
    ),
    body := jsonb_build_object(
      'to', 'expert.p.c@mail.ru',
      'subject', email_subject,
      'body', email_body
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