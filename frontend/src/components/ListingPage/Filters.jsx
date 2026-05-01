import React from 'react';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Filters() {
  const brandBlue = '#1E3A8A';

  return (
    <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100">
      <div className="text-sm font-bold text-[#1E3A8A] uppercase tracking-wider">Filters</div>
      <Divider className="my-5" />
      
      <div className="text-xs font-bold uppercase text-gray-400 mb-4">Category</div>
      
      {/* Added space between each checkbox item */}
      <FormGroup className="flex flex-col gap-3">
        {['Dogs', 'Cats', 'Birds', 'Fishes'].map((label) => (
          <FormControlLabel 
            key={label}
            className="!m-0" 
            control={
              <Checkbox 
                size="small" 
                sx={{ 
                  color: brandBlue, 
                  padding: '4px 8px', 
                  '&.Mui-checked': { color: brandBlue } 
                }} 
              />
            } 
            label={<span className="text-sm font-medium text-gray-700 ml-2">{label}</span>} 
          />
        ))}
      </FormGroup>
    </div>
  );
}