import React, { useEffect, useState } from 'react';
import { getPets } from '../../services/apiClient';
import ListingCard from './ListingCard';
import Filters from './Filters';
import Chip from '@mui/material/Chip';

export default function ListingPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const LIMIT = 10;

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await getPets({ limit: LIMIT });
      setItems(res.items || []);
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

return (
  <div style={{ width: '100%', minHeight: '100-vh', backgroundColor: '#F8F9F5' }}>
    {/* Blue Hero Header */}
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px 0 24px' }}>
      <div style={{ width: '100%', marginBottom: '32px', borderRadius: '32px', backgroundColor: '#1E3A8A', color: 'white', padding: '40px', position: 'relative' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', margin: 0 }}>Pet Discovery Hub</h1>
        <p style={{ marginTop: '8px', opacity: 0.8, fontSize: '1.125rem' }}>Find your perfect companion in our curated blue catalog.</p>
      </div>
    </div>

    {/* THE FIX: Forced Flex Row with Inline Styles */}
    <div style={{ 
      maxWidth: '1280px', 
      margin: '0 auto', 
      display: 'flex', 
      flexDirection: 'row', // This FORCES side-by-side orientation
      gap: '40px', 
      alignItems: 'flex-start', 
      padding: '0 24px 48px 24px' 
    }} className="main-layout-container">
      
      {/* Sidebar */}
      <aside style={{ width: '280px', flexShrink: 0 }}>
        <Filters />
      </aside>

      {/* Grid Area */}
      <main style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px', color: '#1E3A8A' }}>Available Listings</h2>
        
        {loading && <div style={{ color: '#1E3A8A' }}>Loading pets...</div>}
        
        {/* The Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '24px' 
        }}>
          {items.map(it => (
            <ListingCard key={it.id} pet={it} />
          ))}
        </div>
      </main>
    </div>
  </div>
);
}