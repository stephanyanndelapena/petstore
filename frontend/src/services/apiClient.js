const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/delapena/v1';

function safeParseImages(images) {
  if (!images) return [];
  if (Array.isArray(images)) return images;
  try { return JSON.parse(images); } catch (e) { return []; }
}

export async function getPets(query = {}) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => { 
    if (v !== undefined && v !== null) {
      if (Array.isArray(v)) {
        v.forEach(val => params.append(k, val));
      } else {
        params.append(k, v);
      }
    } 
  });
  const queryString = params.toString();
  const url = `${API_BASE}/pets${queryString ? `?${queryString}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const json = await res.json();
  const rawItems = Array.isArray(json) ? json : (json.items || json.value || []);

  const fallbackByName = {
    'Goldie': 'https://cafishvet.com/wp-content/uploads/2020/10/gold-fish-1.jpg',
    'Whiskers': 'https://www.animalmedical.net/blog/wp-content/uploads/2021/02/iStock-149052633-1-1.jpg',
    'Buddy': 'https://www.nylabone.com/-/media/project/oneweb/nylabone/images/dog101/10-intelligent-dog-breeds/golden-retriever-tongue-out.jpg?h=430&w=710&hash=7FEB820D235A44B76B271060E03572C7'
  };
  const fallbackBySpecies = {
    'dog': 'https://www.nylabone.com/-/media/project/oneweb/nylabone/images/dog101/10-intelligent-dog-breeds/golden-retriever-tongue-out.jpg?h=430&w=710&hash=7FEB820D235A44B76B271060E03572C7',
    'cat': 'https://www.animalmedical.net/blog/wp-content/uploads/2021/02/iStock-149052633-1-1.jpg',
    'fish': 'https://cafishvet.com/wp-content/uploads/2020/10/gold-fish-1.jpg',
    'bird': 'https://via.placeholder.com/600x400.png?text=Bird'
  };

  const items = rawItems.map(it => {
    const parsedImages = safeParseImages(it.images);
    let finalImages = (parsedImages && parsedImages.length) ? parsedImages : [];

    const nameKey = (it.name || '').toString();
    const speciesKey = (it.species || '').toString().toLowerCase();

    if (!finalImages || finalImages.length === 0) {
      if (fallbackByName[nameKey]) finalImages = [fallbackByName[nameKey]];
      else if (fallbackBySpecies[speciesKey]) finalImages = [fallbackBySpecies[speciesKey]];
      else finalImages = ['https://via.placeholder.com/600x400.png?text=Pet'];
    }

    return {
      id: it.id,
      name: it.name,
      species: (it.species || '').toLowerCase(),
      age: it.ageYears ?? it.age ?? 0,
      price: (it.priceCents != null) ? (it.priceCents / 100) : (it.price ?? 0),
      availability_status: (it.availabilityStatus || it.availability_status || '').toLowerCase(),
      short_description: it.shortDescription || it.short_description || '',
      images: finalImages,
      imageUrl: it.imageUrl,
      seller_id: it.sellerId || it.seller_id
    };
  });

  return { items, pagination: json.pagination || { next_cursor: null, has_more: false }, filters_applied: json.filters_applied || {} };
}

export async function addPet(petData) {
  const body = {
    name: petData.name,
    species: (petData.species || '').toUpperCase(),
    ageYears: parseInt(petData.ageYears || 0),
    priceCents: Math.round(parseFloat(petData.priceCents || 0)),
    shortDescription: petData.shortDescription || '',
    availabilityStatus: petData.availabilityStatus || 'available',
    imageUrl: petData.imageUrl || '',
    images: JSON.stringify(petData.images || [])
  };

  console.log('Adding pet with body:', body);

  const res = await fetch(`${API_BASE}/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `Failed to add pet: ${res.status}`);
  }
  return res.json();
}

export async function updatePet(id, petData) {
  const body = {
    name: petData.name,
    species: (petData.species || '').toUpperCase(),
    ageYears: parseInt(petData.ageYears || 0),
    priceCents: Math.round(parseFloat(petData.priceCents || 0)),
    shortDescription: petData.shortDescription || '',
    availabilityStatus: petData.availabilityStatus || 'available',
    imageUrl: petData.imageUrl || '',
    images: JSON.stringify(petData.images || [])
  };

  console.log(`Updating pet ${id} with body:`, body);

  const res = await fetch(`${API_BASE}/pets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `Failed to update pet: ${res.status}`);
  }
  return res.json();
}

export async function deletePet(id) {
  console.log(`Deleting pet ${id}`);
  const res = await fetch(`${API_BASE}/pets/${id}`, {
    method: 'DELETE'
  });
  
  if (!res.ok && res.status !== 204) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `Failed to delete pet: ${res.status}`);
  }
  return true;
}
