/*
  # Remove notification triggers
  
  1. Changes
    - Drop trigger for Telegram notifications
    - Forms will still save to database
    - No notifications will be sent
*/

DROP TRIGGER IF EXISTS send_telegram_on_contact_message ON contact_messages;
DROP FUNCTION IF EXISTS trigger_telegram_notification();
