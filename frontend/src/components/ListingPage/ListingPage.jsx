import React, { useEffect, useState } from 'react';
import { getPets } from '../../services/apiClient';
import ListingCard from './ListingCard';
import Filters from './Filters';

export default function ListingPage({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const LIMIT = 50;

  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedSearch(search.trim()); }, 200);
    return () => clearTimeout(handler);
  }, [search]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const queryParams = { limit: LIMIT, search: debouncedSearch || null, ...filters };
      const res = await getPets(queryParams);
      setItems(res.items || []);
    } catch (e) {
      setError(e.message || String(e));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [filters, debouncedSearch]);

  return (
    <div style={{ width: '100%', backgroundColor: '#F8F9F5' }}>
      
      {/* Blue Hero Header - NOT STICKY */}
      <div style={{ padding: '24px' }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '1280px',
          margin: '0 auto',
          borderRadius: '32px', 
          backgroundColor: '#1E3A8A', 
          color: 'white', 
          padding: '40px', 
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          boxSizing: 'border-box'
        }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', margin: 0 }}>Pet Discovery Hub</h1>
            <p style={{ marginTop: '8px', opacity: 0.8, fontSize: '1.125rem' }}>Find your perfect companion.</p>
          </div>
          <div style={{ maxWidth: '500px' }}>
            <input 
              type="text" 
              placeholder="Search by name" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 20px', borderRadius: '16px', border: 'none', color: '#333', outline: 'none' }} 
            />
          </div>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '40px', 
        alignItems: 'flex-start', 
        padding: '0 24px 48px 24px'
      }}>
        
        {/* Sidebar - Remains Sticky so filters stay visible */}
        <aside style={{ 
          width: '280px', 
          flexShrink: 0, 
          position: 'sticky', 
          top: '80px', // Sticks just below the white Navbar
          height: 'fit-content' 
        }}>
          <Filters onFilterChange={(f) => setFilters(prev => ({...prev, ...f}))} />
        </aside>

        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#1E3A8A' }}>Available Listings</h2>
            <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '4px' }}>Showing {items.length} pets</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {items.map(it => (
              <ListingCard key={it.id} pet={it} onAddToCart={onAddToCart} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}