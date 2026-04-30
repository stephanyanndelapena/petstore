-- V2: Seed sample sellers and pets
INSERT INTO sellers (id,name,contact_email,rating) VALUES (uuid_generate_v4(),'Acme Pets','hello@acme.example',4.8);

INSERT INTO pets (name,species,age_years,price_cents,availability_status,images,short_description,seller_id)
VALUES
('Buddy','DOG',3,19999,'AVAILABLE','[]','Friendly dog',(SELECT id FROM sellers LIMIT 1)),
('Whiskers','CAT',2,9999,'AVAILABLE','[]','Playful cat',(SELECT id FROM sellers LIMIT 1)),
('Goldie','FISH',1,1999,'AVAILABLE','[]','Goldfish',(SELECT id FROM sellers LIMIT 1));
