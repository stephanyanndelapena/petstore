import React from 'react';

export default function PreviewModal({pet, onClose, onAdd}){
  if(!pet) return null;
  return (
    <div className="preview-modal">
      <h2>{pet.name}</h2>
      <button onClick={() => onAdd(pet.id)}>Add to cart</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
