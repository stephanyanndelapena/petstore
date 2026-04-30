import React from 'react';

export default function ListingCard({pet}){
  return (
    <div className="listing-card">
      <h3>{pet.name}</h3>
      <p>{pet.short_description}</p>
    </div>
  );
}
