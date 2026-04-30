-- V1: Create sellers and pets tables
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS sellers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact_email TEXT,
  rating NUMERIC(2,1)
);

CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  age_years INT,
  price_cents INT,
  availability_status TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  short_description TEXT,
  seller_id UUID REFERENCES sellers(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pets_species ON pets(species);
CREATE INDEX IF NOT EXISTS idx_pets_price ON pets(price_cents);
CREATE INDEX IF NOT EXISTS idx_pets_availability ON pets(availability_status);
CREATE INDEX IF NOT EXISTS idx_pets_created_at ON pets(created_at);
