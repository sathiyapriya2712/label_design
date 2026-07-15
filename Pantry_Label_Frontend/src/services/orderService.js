import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const orderService = {
  createOrder: async (orderData, token) => {
    // orderData: { addressId, cartId }
    return axios.post(`${API_BASE}/api/orders`, orderData, getHeaders(token));
  },

  getOrderDetails: async (orderId, token) => {
    return axios.get(`${API_BASE}/api/orders/${orderId}`, getHeaders(token));
  },

  getOrders: async (token) => {
    return axios.get(`${API_BASE}/api/orders`, getHeaders(token));
  }
};

export default orderService;
