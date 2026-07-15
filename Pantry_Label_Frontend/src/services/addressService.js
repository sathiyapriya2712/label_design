import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const addressService = {
  getAddresses: async (token) => {
    return axios.get(`${API_BASE}/api/addresses`, getHeaders(token));
  },

  saveAddress: async (addressData, token) => {
    return axios.post(`${API_BASE}/api/addresses`, addressData, getHeaders(token));
  }
};

export default addressService;
