import React, { useEffect, useState } from 'react';
import { getPets } from '../../services/apiClient';

export default function ListingPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getPets({ limit: 10 }).then(data => setItems(data.items || []));
  }, []);

  return (
    <div>
      <h1>Listings</h1>
      <div data-testid="listing-items">
        {items.map(it => <div key={it.id}>{it.name} - ${it.price}</div>)}
      </div>
    </div>
  );
}
