import React, { useEffect, useState } from 'react';
import { getPets } from '../../services/apiClient';
import ListingCard from './ListingCard';

export default function ListingPage() {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LIMIT = 10;

  async function load(nextCursor = null) {
    setLoading(true);
    setError(null);
    try {
      const q = { limit: LIMIT };
      if (nextCursor) q.page_cursor = nextCursor;
      const res = await getPets(q);
      setItems(prev => nextCursor ? [...prev, ...res.items] : res.items || []);
      setCursor(res.pagination?.next_cursor || null);
      setHasMore(res.pagination?.has_more || false);
    } catch (e) {
      console.error('Failed to load pets', e);
      setError(e.message || String(e));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(null); }, []);

  return (
    <div>
      <header className="py-12 bg-white">
        <div className="container text-center">
          <h1 className="text-4xl font-bold">Petstore</h1>
          <p className="mt-3 text-gray-600">Find your perfect companion among our dogs, cats, birds, and fishes.</p>
        </div>
      </header>

      <main className="container py-12">
        <h2 className="text-2xl font-semibold mb-6">Listings</h2>

        {loading && <div className="text-gray-600">Loading...</div>}
        {error && <div className="text-red-600">Error loading pets: {error}</div>}

        {!loading && !error && items.length === 0 && (
          <div className="text-gray-600">No listings found. Ensure the backend is running at <code>http://localhost:8080/delapena/v1</code> and returns data from /pets.</div>
        )}

        <div data-testid="listing-items" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mt-4">
          {items.map(it => (
            <ListingCard key={it.id} pet={it} />
          ))}
        </div>

        {!hasMore && items.length > 0 && (
          <div className="mt-8 text-center text-gray-500">No more pets to load.</div>
        )}

      </main>

      {/* Debug panel removed for cleaner UI */}
    </div>
  );
}
