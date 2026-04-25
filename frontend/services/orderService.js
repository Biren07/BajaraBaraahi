import api from '../lib/api';

export const orderService = {
  // Place an order
  placeOrder: async (orderData, screenshot) => {
    const formData = new FormData();

    // Add text fields
    Object.keys(orderData).forEach(key => {
      if (orderData[key] !== undefined && orderData[key] !== null) {
        formData.append(key, orderData[key]);
      }
    });

    // Add screenshot file if provided
    if (screenshot) {
      formData.append('screenshot', screenshot);
    }

    const response = await api.post('/order/place', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get user's orders
  getMyOrders: async () => {
    const response = await api.get('/order/get-my-orders');
    return response.data;
  },

  // Get all orders (admin only)
  getAllOrders: async (params = {}) => {
    const response = await api.get('/order/all', { params });
    return response.data;
  },

  // Verify payment (admin only)
  verifyPayment: async (orderId, paymentData) => {
    const response = await api.patch(`/order/verify-payment/${orderId}`, paymentData);
    return response.data;
  },

  // Update order status (admin only)
  updateOrder: async (orderId, updateData) => {
    const response = await api.patch(`/order/update/${orderId}`, updateData);
    return response.data;
  },
};

export default orderService;