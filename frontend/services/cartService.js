import api from '../lib/api';

export const cartService = {
  // Add item to cart
  addToCart: async (bookId, quantity = 1) => {
    const response = await api.post(`/cart/add/${bookId}`, { quantity });
    return response.data;
  },

  // Get user's cart
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Update cart item quantity
  updateCartQuantity: async (cartItemId, quantity) => {
    const response = await api.patch(`/cart/update/${cartItemId}`, { quantity });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (cartItemId) => {
    const response = await api.delete(`/cart/remove/${cartItemId}`);
    return response.data;
  },

  // Clear entire cart
  clearCart: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  },
};

export default cartService;