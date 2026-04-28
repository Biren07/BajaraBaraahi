import api from '../lib/api';

export const couponService = {
  createCoupon: async (couponData) => {
    const response = await api.post('/promo/create', couponData);
    return response.data;
  },

  getAllCoupons: async (params = {}) => {
    const response = await api.get('/promo/all', { params });
    return response.data;
  },

  getSingleCoupon: async (id) => {
    const response = await api.get(`/promo/${id}`);
    return response.data;
  },

  updateCoupon: async (id, couponData) => {
    const response = await api.patch(`/promo/${id}`, couponData);
    return response.data;
  },

  deleteCoupon: async (id) => {
    const response = await api.delete(`/promo/${id}`);
    return response.data;
  },
};

export default couponService;