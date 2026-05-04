-- V2: Seed sample sellers and 20 pets (5 of each species)
INSERT INTO sellers (id,name,contact_email,rating) VALUES (uuid_generate_v4(),'Acme Pets','hello@acme.example',4.8);

INSERT INTO pets (name,species,age_years,price_cents,availability_status,images,short_description,seller_id)
VALUES
-- DOGS (5)
('Buddy','DOG',3,19999,'AVAILABLE','["https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"]','Friendly and energetic companion.',(SELECT id FROM sellers LIMIT 1)),
('Charlie','DOG',1,25000,'AVAILABLE','["https://apupabove.com/cdn/shop/articles/Pomeranian_67f4663e-52b3-4fcf-8df1-daa563a84124.webp?v=1742407543&width=1600"]','Loyal puppy looking for a home.',(SELECT id FROM sellers LIMIT 1)),
('Bella','DOG',5,15000,'AVAILABLE','["https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80"]','Graceful retriever, very calm.',(SELECT id FROM sellers LIMIT 1)),
('Max','DOG',2,22000,'AVAILABLE','["https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80"]','Playful bulldog who loves treats.',(SELECT id FROM sellers LIMIT 1)),
('Cooper','DOG',4,18000,'AVAILABLE','["https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80"]','Smart and well-trained companion.',(SELECT id FROM sellers LIMIT 1)),

-- CATS (5)
('Whiskers','CAT',2,9999,'AVAILABLE','["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80"]','Very playful and loves attention.',(SELECT id FROM sellers LIMIT 1)),
('Luna','CAT',4,12000,'AVAILABLE','["https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=800&q=80"]','Quiet companion for a peaceful home.',(SELECT id FROM sellers LIMIT 1)),
('Oliver','CAT',3,8500,'AVAILABLE','["https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80"]','Curious tabby cat who loves exploring.',(SELECT id FROM sellers LIMIT 1)),
('Simba','CAT',1,11000,'AVAILABLE','["https://static.vecteezy.com/system/resources/thumbnails/050/393/628/small/cute-curious-gray-and-white-kitten-in-a-long-shot-photo.jpg"]','Tiny kitten with a big heart.',(SELECT id FROM sellers LIMIT 1)),
('Milo','CAT',2,9500,'AVAILABLE','["https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=800&q=80"]','Friendly and social ginger cat.',(SELECT id FROM sellers LIMIT 1)),

-- BIRDS (5)
('Bluey','BIRD',2,5500,'AVAILABLE','["https://static.scientificamerican.com/dam/m/4beab95014486f06/original/Tree-Swallow2.JPG?m=1714055470.635&crop=16%3A9%2Csmart&w=1920"]','Cheerful parrot who can talk a bit.',(SELECT id FROM sellers LIMIT 1)),
('Pip','BIRD',1,3000,'AVAILABLE','["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQotQ50BPdtsLlP0iFduVd3EKygqmW8tAPDZCFlPOhzf6yKj4x1qWGTGWpKE55iO-ZtnTuwnjsCO1iaqn6jyQuomKZp1OZV_tTtekQH5A&s=10"]','Sweet canary with a beautiful song.',(SELECT id FROM sellers LIMIT 1)),
('Sky','BIRD',3,7000,'AVAILABLE','["https://images.unsplash.com/photo-1486365227551-f3f90034a57c?auto=format&fit=crop&w=800&q=80"]','Beautiful blue parakeet.',(SELECT id FROM sellers LIMIT 1)),
('Sunny','BIRD',1,4500,'AVAILABLE','["https://myrightbird.com/assets/uploads/mybird_sun_conure_on_perch-900x651.jpg"]','Bright yellow cockatiel.',(SELECT id FROM sellers LIMIT 1)),
('Rio','BIRD',2,8000,'AVAILABLE','["https://cdn.download.ams.birds.cornell.edu/api/v2/asset/202984001/1200"]','Energetic lovebird pair.',(SELECT id FROM sellers LIMIT 1)),

-- FISHES (5)
('Goldie','FISH',1,1999,'AVAILABLE','["https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80"]','Classic goldfish for any tank.',(SELECT id FROM sellers LIMIT 1)),
('Nemo','FISH',1,2500,'AVAILABLE','["https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80"]','Vibrant clownfish, very active.',(SELECT id FROM sellers LIMIT 1)),
('Bubbles','FISH',1,3500,'AVAILABLE','["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"]','Colorful betta fish with long fins.',(SELECT id FROM sellers LIMIT 1)),
('Fin','FISH',1,1500,'AVAILABLE','["https://spca.bc.ca/wp-content/uploads/fish-discus-swimming.jpg"]','Small neon tetra, great for schools.',(SELECT id FROM sellers LIMIT 1)),
('Splash','FISH',1,4500,'AVAILABLE','["https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80"]','Large angelfish, very elegant.',(SELECT id FROM sellers LIMIT 1));
