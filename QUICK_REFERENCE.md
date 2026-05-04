# Quick Reference - Petstore CRUD API

## API Endpoints

```
Base: http://localhost:8080/delapena/v1/pets
```

## Request Examples

### Create Pet (POST)
```javascript
fetch('http://localhost:8080/delapena/v1/pets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Buddy',
    species: 'dog',
    ageYears: 2,
    priceCents: 50000,
    availabilityStatus: 'available',
    images: JSON.stringify([{ url: 'https://example.com/buddy.jpg' }]),
    shortDescription: 'Friendly Golden Retriever',
    sellerId: 'seller-uuid-here'
  })
})
.then(r => r.json())
.then(pet => console.log('Created:', pet.id));
```

### Get Single Pet (GET)
```javascript
fetch('http://localhost:8080/delapena/v1/pets/7fe848c2-9530-4398-b980-4ac6da57442b')
  .then(r => r.json())
  .then(pet => console.log(pet.name, pet.species));
```

### Update Pet (PUT)
```javascript
fetch('http://localhost:8080/delapena/v1/pets/7fe848c2-9530-4398-b980-4ac6da57442b', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceCents: 60000,
    availabilityStatus: 'sold'
  })
})
.then(r => r.json())
.then(updated => console.log('Updated price:', updated.priceCents));
```

### Delete Pet (DELETE)
```javascript
fetch('http://localhost:8080/delapena/v1/pets/7fe848c2-9530-4398-b980-4ac6da57442b', {
  method: 'DELETE'
})
.then(r => console.log('Deleted:', r.status === 204));
```

## Response Examples

### Success Response (201 / 200)
```json
{
  "id": "a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6",
  "name": "Buddy",
  "species": "dog",
  "ageYears": 2,
  "priceCents": 50000,
  "availabilityStatus": "available",
  "images": "[{\"url\":\"https://example.com/buddy.jpg\"}]",
  "shortDescription": "Friendly Golden Retriever",
  "sellerId": "seller-uuid",
  "createdAt": "2026-05-04T20:32:15.000+08:00",
  "updatedAt": "2026-05-04T20:32:15.000+08:00"
}
```

### Error Response (404)
```json
{
  "timestamp": "2026-05-04T20:35:10.000+08:00",
  "status": 404,
  "error": "Not Found",
  "message": "Pet not found"
}
```

## HTTP Status Codes
| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 404 | Not Found | Pet ID doesn't exist |
| 500 | Server Error | Database or server issue |

## Frontend Integration

Import the helper functions:
```javascript
import { 
  createPet, 
  getPetById, 
  updatePet, 
  deletePet 
} from '@/services/petCrudExamples';

// Use them
const pet = await getPetById(petId);
await updatePet(petId, { priceCents: 60000 });
```

## Common Operations

### Add to Cart Handler
```javascript
const handleAddToCart = async (pet) => {
  // Update availability
  const updated = await updatePet(pet.id, {
    availabilityStatus: 'in-cart'
  });
  console.log('Added to cart:', updated.name);
};
```

### Delete Pet Handler
```javascript
const handleDelete = async (petId) => {
  const confirmed = window.confirm('Delete this pet?');
  if (confirmed) {
    await deletePet(petId);
    loadPets(); // Refresh list
  }
};
```

### Price Update
```javascript
const handlePriceChange = async (petId, newPrice) => {
  const updated = await updatePet(petId, {
    priceCents: Math.floor(newPrice * 100)
  });
  return updated.priceCents / 100;
};
```

## Filter Parameters

Use with GET /pets:
```javascript
// By species
/pets?species=dog

// By price range
/pets?min_price=10000&max_price=50000

// By availability
/pets?availability=available

// Combined
/pets?species=dog&availability=available&min_price=30000&limit=20
```

## Notes
- All prices are in cents (divide by 100 for display)
- Species should be lowercase: 'dog', 'cat', 'bird', 'fish'
- Timestamps are ISO 8601 format with timezone
- Images are stored as JSON string in database
