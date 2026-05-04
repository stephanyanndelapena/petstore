/**
 * Pet CRUD Examples using Vanilla JavaScript fetch()
 * These examples show how to interact with the backend endpoints
 */

const API_BASE = 'http://localhost:8080/delapena/v1';

/**
 * CREATE: Add a new pet to the catalog
 */
export async function createPet(petData) {
  try {
    const response = await fetch(`${API_BASE}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: petData.name,
        species: petData.species,
        ageYears: petData.ageYears,
        priceCents: petData.priceCents,
        availabilityStatus: petData.availabilityStatus || 'available',
        images: JSON.stringify(petData.images || []),
        shortDescription: petData.shortDescription,
        sellerId: petData.sellerId
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const createdPet = await response.json();
    console.log('Pet created successfully:', createdPet);
    return createdPet;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
}

/**
 * READ ONE: Get a specific pet by ID
 */
export async function getPetById(petId) {
  try {
    const response = await fetch(`${API_BASE}/pets/${petId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Pet not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const pet = await response.json();
    console.log('Pet retrieved:', pet);
    return pet;
  } catch (error) {
    console.error('Error retrieving pet:', error);
    throw error;
  }
}

/**
 * UPDATE: Modify an existing pet
 */
export async function updatePet(petId, updates) {
  try {
    const response = await fetch(`${API_BASE}/pets/${petId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updates.name,
        species: updates.species,
        ageYears: updates.ageYears,
        priceCents: updates.priceCents,
        availabilityStatus: updates.availabilityStatus,
        images: updates.images ? JSON.stringify(updates.images) : undefined,
        shortDescription: updates.shortDescription,
        sellerId: updates.sellerId
      })
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Pet not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedPet = await response.json();
    console.log('Pet updated successfully:', updatedPet);
    return updatedPet;
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
}

/**
 * DELETE: Remove a pet from the catalog
 */
export async function deletePet(petId) {
  try {
    const response = await fetch(`${API_BASE}/pets/${petId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Pet not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Pet deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }
}

/**
 * USAGE EXAMPLES
 */

// Example 1: Create a new pet
/*
const newPet = await createPet({
  name: 'Max',
  species: 'dog',
  ageYears: 2,
  priceCents: 50000,
  availabilityStatus: 'available',
  images: ['https://example.com/max.jpg'],
  shortDescription: 'Friendly golden retriever',
  sellerId: 'seller-uuid-here'
});
*/

// Example 2: Get a specific pet
/*
const petId = 'your-pet-uuid-here';
const pet = await getPetById(petId);
*/

// Example 3: Update a pet's availability
/*
const petId = 'your-pet-uuid-here';
const updated = await updatePet(petId, {
  availabilityStatus: 'sold'
});
*/

// Example 4: Update a pet's price
/*
const petId = 'your-pet-uuid-here';
const updated = await updatePet(petId, {
  priceCents: 60000
});
*/

// Example 5: Delete a pet
/*
const petId = 'your-pet-uuid-here';
await deletePet(petId);
*/
