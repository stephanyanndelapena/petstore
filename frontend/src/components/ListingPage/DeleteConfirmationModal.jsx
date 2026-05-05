import React from 'react';

export default function DeleteConfirmationModal({ isOpen, onCancel, onConfirm, petName }) {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Backdrop */}
      <div 
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} 
        onClick={onCancel}
      />
      
      {/* Modal Box */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', width: '100%', maxWidth: '450px', position: 'relative' }}>
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Delete Pet?</h3>
        <p className="text-gray-600 mb-8 text-center">
          Are you sure you want to delete <span className="font-bold text-gray-800">{petName}</span>? This action cannot be undone.
        </p>
        
        <div className="flex gap-4">
          <button
            type="button"
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation();
              onCancel(); 
            }}
            className="flex-1 px-6 py-2 rounded-lg border border-gray-200 font-bold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation();
              onConfirm(e); 
            }}
            className="flex-1 px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
