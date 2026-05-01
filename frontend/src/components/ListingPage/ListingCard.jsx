import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

export default function ListingCard({ pet }) {
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
    <div className="bg-white p-5 rounded-[32px] shadow-sm flex flex-col h-full border-b-4 border-gray-100 hover:border-blue-200 transition-all">
      <div className="w-full h-48 overflow-hidden rounded-[24px] mb-4 bg-gray-50">
        {imgSrc ? (
          <img src={imgSrc} alt={pet.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <Chip 
          label={pet.species?.toUpperCase()} 
          size="small" 
          className={`!text-[10px] !font-bold !h-6 w-fit mb-2 ${chipStyles}`} 
        />
        <Typography variant="h6" className="font-bold text-gray-900 leading-tight mb-1">
          {pet.name}
        </Typography>
        
        <div className="text-xs font-bold text-[#1E3A8A] flex items-center gap-1 mb-4">
          <span className="text-lg">✓</span> Available Now
        </div>

        <div className="mt-auto">
          <Typography variant="h6" className="text-[#1E3A8A] font-black mb-5 text-2xl">
            ${(pet.price ?? 0).toFixed(2)}
          </Typography>

          {/* FIXED: Added gap-3 and vertical padding to buttons */}
          <div className="flex gap-3">
            <Button
              variant="contained"
              fullWidth
              className="!bg-[#D4A017] !text-black !font-bold !shadow-none !rounded-xl !capitalize !py-2.5"
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              className="!border-gray-200 !text-gray-500 !rounded-xl !capitalize !px-4 !py-2.5"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}