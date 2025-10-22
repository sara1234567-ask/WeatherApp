
import React, { createContext, useState } from "react";

export const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]); 
  const [user, setUser] = useState(null); 
  const [reviews, setReviews] = useState({}); 
  
  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(p => p.product.id === product.id);
      if (found) {
        return prev.map(p => p.product.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const addReview = (productId, review) => {
    setReviews(prev => {
      const arr = prev[productId] ? [...prev[productId]] : [];
      arr.unshift(review);
      return { ...prev, [productId]: arr };
    });
  };

  const placeOrder = () => {
    const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
    const order = { id: Date.now(), items: cart, total, date: new Date().toISOString() };
   
    clearCart();
    return order;
  };

  return (
    <ShopContext.Provider value={{
      cart, addToCart, removeFromCart, clearCart,
      user, setUser,
      reviews, addReview,
      
    }}>
      {children}
    </ShopContext.Provider>
  );
}
