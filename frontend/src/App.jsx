import React, { useState, useEffect } from 'react';
import ListingPage from './components/ListingPage/ListingPage';

function CartPage({ cart, onUpdateQuantity, onRemove, onBack }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
      <button 
        onClick={onBack} 
        style={{ marginBottom: '24px', padding: '8px 16px', borderRadius: '8px', border: '1px solid #ddd', cursor: 'pointer', background: 'white' }}
      >
        Back to Hub
      </button>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '32px', color: '#1E3A8A' }}>Your Cart</h1>
      
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img src={item.images[0]} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} alt={item.name} />
                <div>
                  <h3 style={{ fontWeight: 'bold', margin: 0 }}>{item.name}</h3>
                  <p style={{ color: '#666', margin: '4px 0' }}>${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #ddd', borderRadius: '8px', padding: '4px' }}>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0 8px' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0 8px' }}>+</button>
                </div>
                <button onClick={() => onRemove(item.id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '32px', textAlign: 'right', borderTop: '2px solid #eee', paddingTop: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Total: ${total.toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('petstore-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [view, setView] = useState('hub');

  useEffect(() => {
    localStorage.setItem('petstore-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pet) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === pet.id);
      if (existing) {
        return prev.map(item => item.id === pet.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...pet, quantity: 1 }];
    });
  };

  const updateQuantity = (id, q) => {
    if (q < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: q } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#F8F9F5' }}>
      {/* Top Navbar - THIS stays sticky */}
      <nav style={{ 
        width: '100%', 
        backgroundColor: 'white', 
        borderBottom: '1px solid #eee', 
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1100, 
        boxSizing: 'border-box'
      }}>
        <div 
          onClick={() => setView('hub')} 
          style={{ fontWeight: 'bold', color: '#1E3A8A', cursor: 'pointer', fontSize: '1.25rem' }}
        >
          PETSTORE
        </div>
        <div 
          onClick={() => setView('cart')}
          style={{ 
            backgroundColor: '#D4A017', 
            padding: '8px 16px', 
            borderRadius: '12px', 
            fontSize: '0.875rem', 
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Cart ({cartCount})
        </div>
      </nav>

      <main>
        {view === 'hub' ? (
          <ListingPage onAddToCart={addToCart} />
        ) : (
          <CartPage 
            cart={cart} 
            onUpdateQuantity={updateQuantity} 
            onRemove={removeFromCart} 
            onBack={() => setView('hub')} 
          />
        )}
      </main>
    </div>
  );
}