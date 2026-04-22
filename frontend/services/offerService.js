import api from '../lib/api';

export const offerService = {
  createOffer: async (offerData) => {
    const response = await api.post('/offer/create', offerData);
    return response.data;
  },

  getAllOffers: async (params = {}) => {
    const response = await api.get('/offer', { params });
    return response.data;
  },

  getSingleOffer: async (id) => {
    const response = await api.get(`/offer/${id}`);
    return response.data;
  },

  updateOffer: async (id, offerData) => {
    const response = await api.patch(`/offer/update/${id}`, offerData);
    return response.data;
  },
};

export default offerService;