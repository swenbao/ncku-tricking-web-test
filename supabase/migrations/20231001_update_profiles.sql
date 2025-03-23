
-- Add new columns to the profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS sex TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS completed_tricks TEXT[] DEFAULT '{}';
