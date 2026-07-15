import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const cartService = {
  getCart: async (token) => {
    return axios.get(`${API_BASE}/api/cart`, getHeaders(token));
  },

  addToCart: async (productId, token) => {
    return axios.post(`${API_BASE}/api/cart/items`, { productId }, getHeaders(token));
  },

  removeFromCart: async (cartItemId, token) => {
    return axios.delete(`${API_BASE}/api/cart/items/${cartItemId}`, getHeaders(token));
  },

  deleteCart: async (token) => {
    return axios.delete(`${API_BASE}/api/cart`, getHeaders(token));
  }
};

export default cartService;
