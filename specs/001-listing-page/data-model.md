# Data Model: Listing Page

## Entities

### Pet
- id: UUID (PK)
- name: string (required, max 200)
- species: enum (DOG, CAT, BIRD, FISH)
- age_years: integer (>=0)
- price_cents: integer (>=0)
- availability_status: enum (AVAILABLE, LOW_STOCK, SOLD_OUT)
- short_description: string
- long_description: text
- images: JSONB array of {id, url, alt_text}
- seller_id: UUID (FK → Seller)
- created_at, updated_at: timestamps

Validation:
- price_cents >= 0; name non-empty; species in allowed set.

### Seller
- id: UUID (PK)
- name: string
- contact_email: string (validated)
- rating: decimal (0-5)

### Inventory (optional denormalized snapshot)
- pet_id: UUID (PK, FK)
- quantity: integer
- reserved: integer
- last_synced_at: timestamp

### ListingSnapshot
- id: UUID
- pet_id: UUID
- price_cents: integer
- availability_status: enum
- snapshot_at: timestamp

## Relationships
- Pet (many) → Seller (one)
- Pet (one) → Inventory (one)

## Notes
- Use Postgres JSONB for images and flexible metadata.
- Use Flyway migration V1__create_pets_table.sql to create Pet and Seller tables.
- Indexes: species, price_cents, availability_status, seller_id, created_at.
