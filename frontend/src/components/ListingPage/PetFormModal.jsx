import React, { useState, useEffect } from 'react';

export default function PetFormModal({ isOpen, onClose, onSubmit, pet }) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    ageYears: '',
    priceCents: '',
    shortDescription: '',
    availabilityStatus: 'available',
    imageUrl: ''
  });

  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name || '',
        species: (pet.species || '').toLowerCase(),
        ageYears: pet.age || pet.ageYears || '',
        priceCents: pet.price != null ? Math.round(pet.price * 100) : (pet.priceCents || ''),
        shortDescription: pet.short_description || pet.shortDescription || '',
        availabilityStatus: pet.availability_status || pet.availabilityStatus || 'available',
        imageUrl: pet.imageUrl || ''
      });
    } else {
      setFormData({
        name: '',
        species: '',
        ageYears: '',
        priceCents: '',
        shortDescription: '',
        availabilityStatus: 'available',
        imageUrl: ''
      });
    }
  }, [pet, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const submissionData = {
      ...formData,
      ageYears: parseInt(formData.ageYears, 10),
      priceCents: Math.round(parseFloat(formData.priceCents || 0))
    };
    onSubmit(submissionData);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Backdrop */}
      <div 
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} 
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', width: '100%', maxWidth: '450px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {pet ? 'Edit Pet' : 'Add New Pet'}
          </h2>
          <button 
            type="button"
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation();
              onClose(); 
            }} 
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="e.g. Buddy"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
              <select
                required
                name="species"
                value={formData.species}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
              >
                <option value="">Select...</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="fish">Fish</option>
                <option value="bird">Bird</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age (Years)</label>
              <input
                required
                type="number"
                name="ageYears"
                value={formData.ageYears}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
                placeholder="2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (Cents)</label>
            <input
              required
              type="number"
              name="priceCents"
              value={formData.priceCents}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
              placeholder="9999"
            />
            <p className="text-[10px] text-gray-400 mt-1">Enter price in cents (e.g., 9999 for $99.99)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none"
              placeholder="https://example.com/pet.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <textarea
              required
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none h-24 resize-none"
              placeholder="Tell us about the pet..."
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                onClose(); 
              }}
              className="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-[#1E3A8A] text-white font-bold hover:bg-blue-800 transition-colors"
            >
              {pet ? 'Save Changes' : 'Add Pet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
