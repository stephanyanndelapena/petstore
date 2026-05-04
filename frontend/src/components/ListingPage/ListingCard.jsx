import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

export default function ListingCard({ pet, onAddToCart }) {
  const brandBlue = '#1E3A8A';
  const imgSrc = pet.images?.[0]?.url || pet.images?.[0] || null;
  const species = (pet.species || '').toLowerCase();

  const chipStyles = {
    dog: 'bg-blue-50 text-blue-700',
    cat: 'bg-indigo-50 text-indigo-700',
    fish: 'bg-cyan-50 text-cyan-700',
    bird: 'bg-sky-50 text-sky-700'
  }[species] || 'bg-gray-100 text-gray-600';

  return (
    <div className="bg-white p-6 rounded-[32px] shadow-sm flex flex-col h-full border-b-4 border-gray-100 hover:border-blue-200 transition-all overflow-hidden" style={{ boxSizing: 'border-box', minWidth: 0, width: '100%' }}>
      {/* Forced Consistent Image Container */}
      <div 
        className="w-full mb-4 bg-gray-50 flex-shrink-0" 
        style={{ 
          height: '200px', 
          borderRadius: '24px', 
          overflow: 'hidden', 
          position: 'relative' 
        }}
      >
        {imgSrc ? (
          <img 
            src={imgSrc} 
            alt={pet.name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              display: 'block' 
            }} 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
        )}
      </div>

      <div className="flex-1 flex flex-col min-w-0" style={{ boxSizing: 'border-box', overflow: 'hidden' }}>
        <Chip 
          label={pet.species?.toUpperCase()} 
          size="small" 
          className={`!text-[10px] !font-bold !h-6 w-fit mb-2 ${chipStyles}`} 
        />
        <h3 className="font-bold text-gray-900 leading-tight mb-1 text-lg truncate" style={{ margin: '0 0 4px 0' }}>
          {pet.name}
        </h3>
        
        <div className="text-xs font-bold text-[#1E3A8A] flex items-center gap-1 mb-4">
          <span className="text-lg">✓</span> Available Now
        </div>

        <div className="mt-auto pt-4" style={{ width: '100%', boxSizing: 'border-box' }}>
          <div className="text-[#1E3A8A] font-black mb-4 text-2xl">
            ${(pet.price ?? 0).toFixed(2)}
          </div>

          <div style={{ width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
            <button
              onClick={() => {
                if (onAddToCart) onAddToCart(pet);
                console.log(`Added ${pet.name} to cart`);
              }}
              style={{ 
                width: '100%', 
                backgroundColor: '#D4A017', 
                color: 'black', 
                fontWeight: 'bold', 
                border: 'none', 
                borderRadius: '12px', 
                padding: '12px 0', // Changed to 0 horizontal to prevent any potential text/padding push
                cursor: 'pointer',
                fontSize: '0.875rem',
                display: 'block',
                transition: 'opacity 0.2s',
                boxSizing: 'border-box',
                margin: 0,
                textAlign: 'center'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
