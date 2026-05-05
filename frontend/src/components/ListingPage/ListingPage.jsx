import React, { useEffect, useState } from 'react';
import { getPets, addPet, updatePet, deletePet } from '../../services/apiClient';
import ListingCard from './ListingCard';
import Filters from './Filters';
import PetFormModal from './PetFormModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function ListingPage({ onAddToCart, showAddModal, onModalClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [petToDelete, setPetToDelete] = useState(null);
  const LIMIT = 50;

  useEffect(() => {
    if (showAddModal) {
      setEditingPet(null);
      setIsModalOpen(true);
    }
  }, [showAddModal]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPet(null);
    if (onModalClose) onModalClose();
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    console.log('Delete click for id:', id);
    const pet = items.find(it => it.id === id);
    if (pet) {
      console.log('Found pet to delete:', pet);
      setPetToDelete(pet);
      setIsDeleteModalOpen(true);
    } else {
      console.warn('Could not find pet with id:', id);
    }
  };

  const handleDeleteConfirm = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!petToDelete) return;
    try {
      await deletePet(petToDelete.id);
      setItems(prev => prev.filter(item => item.id !== petToDelete.id));
      setIsDeleteModalOpen(false);
      setPetToDelete(null);
      await load();
    } catch (err) {
      console.error('Failed to delete pet:', err);
      setError('Failed to delete pet: ' + (err.message || String(err)));
    }
  };

  const handleSubmit = async (formData) => {
    console.log('Submitting form with data:', formData);
    try {
      if (editingPet) {
        console.log('Updating pet:', editingPet.id);
        await updatePet(editingPet.id, formData);
      } else {
        console.log('Adding new pet');
        await addPet(formData);
      }
      await load();
      handleCloseModal();
    } catch (e) {
      console.error('Failed to save pet:', e);
      setError('Failed to save pet: ' + (e.message || String(e)));
    }
  };

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
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-xl flex justify-between items-center shadow-sm">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    {error}
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-500 font-bold"
              >
                &times;
              </button>
            </div>
          )}
          
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
              <ListingCard 
                key={it.id} 
                pet={it} 
                onAddToCart={onAddToCart} 
                onEdit={handleEdit} 
                onDelete={handleDeleteClick} 
              />
            ))}
          </div>

          {items.length === 0 && !loading && (
             <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
               No pets match your criteria.
             </div>
          )}
        </main>
      </div>

      {/* Modals moved to bottom to detach from main layout flow */}
      <PetFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmit} 
        pet={editingPet} 
      />

      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onCancel={() => { setIsDeleteModalOpen(false); setPetToDelete(null); }}
        onConfirm={handleDeleteConfirm}
        petName={petToDelete?.name}
      />
    </div>
  );
}
