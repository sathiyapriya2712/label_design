import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const authService = {
  sendOtp: async (email) => {
    return axios.post(`${API_BASE}/api/auth/send-otp`, { email });
  },

  verifyOtp: async (email, otp) => {
    return axios.post(`${API_BASE}/api/auth/verify-otp`, { email, otp });
  }
};

export default authService;
