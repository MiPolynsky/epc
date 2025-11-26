/*
  # Fix message field to allow NULL values

  1. Changes
    - Make message field nullable to allow form submission without message
    - Set default value to empty string for backward compatibility
*/

ALTER TABLE contact_messages 
ALTER COLUMN message DROP NOT NULL,
ALTER COLUMN message SET DEFAULT '';
