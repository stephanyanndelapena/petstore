import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Filters({ onFilterChange }) {
  const brandBlue = '#1E3A8A';
  const [selectedSpecies, setSelectedSpecies] = useState([]);
const handleSpeciesChange = (label) => {
  // Map UI labels to exact backend enum values
  const speciesMap = {
    'Dogs': 'DOG',
    'Cats': 'CAT',
    'Birds': 'BIRD',
    'Fishes': 'FISH'
  };
  const finalValue = speciesMap[label];

  const newSpecies = selectedSpecies.includes(finalValue)
    ? selectedSpecies.filter(s => s !== finalValue)
    : [...selectedSpecies, finalValue];

  setSelectedSpecies(newSpecies);

  if (onFilterChange) {
    onFilterChange({
      species: newSpecies.length > 0 ? newSpecies : null
    });
  }
};

return (
  <div className="bg-white p-8 rounded-[24px] shadow-sm border-none">
    <div className="text-sm font-bold text-[#1E3A8A] uppercase tracking-wider">Filters</div>
    <Divider className="my-5" sx={{ borderColor: '#f0f0f0' }} />

    <div className="text-xs font-bold uppercase text-gray-400 mb-4">Category</div>

    <FormGroup className="flex flex-col gap-3">
      {['Dogs', 'Cats', 'Birds', 'Fishes'].map((label) => {
        const speciesMap = { 'Dogs': 'DOG', 'Cats': 'CAT', 'Birds': 'BIRD', 'Fishes': 'FISH' };
        const value = speciesMap[label];
        return (
          <FormControlLabel 
            key={label}
            className="!m-0" 
            control={
              <Checkbox 
                size="small" 
                checked={selectedSpecies.includes(value)}
                onChange={() => handleSpeciesChange(label)}
                sx={{ 
                  color: brandBlue, 
                  padding: '4px 8px', 
                  '&.Mui-checked': { color: brandBlue },
                  '& .MuiSvgIcon-root': { 
                    border: 'none', 
                    outline: 'none' 
                  },
                  '&:hover': { backgroundColor: 'transparent' }
                }} 
              />
            } 
            label={<span className="text-sm font-medium text-gray-700 ml-2" style={{ userSelect: 'none' }}>{label}</span>} 
          />
        );
      })}
    </FormGroup>
  </div>
);

}
