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
      
      {/* Hero Header */}
      <div style={{ padding: '24px', boxSizing: 'border-box' }}>
        <div className="hero-box" style={{ 
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
            <h1 className="hero-title" style={{ fontSize: '2.25rem', fontWeight: 'bold', margin: 0 }}>
              Pet Discovery Hub
            </h1>
            <p style={{ marginTop: '8px', opacity: 0.8, fontSize: '1.125rem' }}>
              Find your perfect companion.
            </p>
          </div>
          <div style={{ maxWidth: '500px', width: '100%' }}>
            <input 
              type="text" 
              placeholder="Search by name" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 20px', 
                borderRadius: '16px', 
                border: 'none', 
                color: '#333', 
                outline: 'none',
                boxSizing: 'border-box'
              }} 
            />
          </div>
        </div>
      </div>

      {/* Main Content Layout - Uses the responsive CSS class */}
      <div className="main-layout" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Sidebar Container */}
        <aside className="sidebar-container" style={{ 
          width: '280px', 
          flexShrink: 0, 
          position: 'sticky', 
          top: '80px', 
          height: 'fit-content' 
        }}>
          <Filters onFilterChange={(f) => setFilters(prev => ({...prev, ...f}))} />
        </aside>

        {/* Listings Grid Area */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#1E3A8A' }}>
              Available Listings
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '4px' }}>
              Showing {items.length} pets
            </p>
          </div>
          
          {/* Responsive Grid: Cards will be 1-column on tiny phones, 2-column on tablets, and 3+ on desktop */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
            gap: '24px' 
          }}>
            {items.map(it => (
              <ListingCard key={it.id} pet={it} onAddToCart={onAddToCart} />
            ))}
          </div>

          {items.length === 0 && !loading && (
             <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
               No pets match your criteria.
             </div>
          )}
        </main>
      </div>
    </div>
  );
}