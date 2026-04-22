import api from '../lib/api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (firstname, lastname, email, phone, password) => {
    const response = await api.post('/auth/register', {
      firstname,
      lastname,
      email,
      phone,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getLoggedUser: async () => {
    const response = await api.get('/auth/logged-user');
    return response.data;
  },

  googleAuth: async (data) => {
    const response = await api.post('/auth/google-auth', data);
    return response.data;
  },
};

export default authService;