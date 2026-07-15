import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const selectionService = {
  postSelections: async (selectionData, token) => {
    // selectionData contains: { productIds, font, shape, background }
    return axios.post(`${API_BASE}/api/selections`, selectionData, getHeaders(token));
  }
};

export default selectionService;
