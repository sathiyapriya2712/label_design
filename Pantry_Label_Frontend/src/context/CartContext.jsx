import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { cartService } from '../services/cartService';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { token, isAuthenticated } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const response = await cartService.getCart(token);
      setCart(response.data || null);
    } catch (error) {
      console.error('Error fetching cart from backend:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated, token]);

  const addToCart = async (productId) => {
    if (!isAuthenticated) return false;
    try {
      await cartService.addToCart(productId, token);
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return false;
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!isAuthenticated) return false;
    try {
      await cartService.removeFromCart(cartItemId, token);
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return false;
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return false;
    try {
      await cartService.deleteCart(token);
      setCart(null);
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  };

  const value = {
    cart, // Includes backend calculations (subTotal, gst, shipping, grandTotal, etc.)
    cartItems: cart?.items || [],
    cartCount: cart?.items?.length || 0,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    fetchCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
