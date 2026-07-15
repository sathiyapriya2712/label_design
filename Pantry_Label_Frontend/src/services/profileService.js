import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const profileService = {
  getProfile: async (token) => {
    return axios.get(`${API_BASE}/api/profile`, getHeaders(token));
  },

  saveProfile: async (profileData, token) => {
    return axios.post(`${API_BASE}/api/profile`, profileData, getHeaders(token));
  },

  updateProfile: async (profileData, token) => {
    return axios.put(`${API_BASE}/api/profile`, profileData, getHeaders(token));
  }
};

export default profileService;
