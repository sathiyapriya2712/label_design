import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const invoiceService = {
  downloadInvoice: async (orderId, token) => {
    return axios.get(`${API_BASE}/api/invoices/${orderId}/download`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'blob'
    });
  }
};

export default invoiceService;
