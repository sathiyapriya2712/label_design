import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const paymentService = {
  createRazorpayOrder: async (orderId, token) => {
    return axios.post(`${API_BASE}/api/payments/razorpay/create`, { orderId }, getHeaders(token));
  },

  verifyPayment: async (paymentDetails, token) => {
    // paymentDetails: { razorpayOrderId, razorpayPaymentId, razorpaySignature }
    return axios.post(`${API_BASE}/api/payments/razorpay/verify`, paymentDetails, getHeaders(token));
  }
};

export default paymentService;
