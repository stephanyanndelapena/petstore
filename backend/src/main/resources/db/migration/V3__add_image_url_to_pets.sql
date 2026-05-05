-- V3: Add image_url column to pets table
ALTER TABLE pets ADD COLUMN IF NOT EXISTS image_url TEXT;
