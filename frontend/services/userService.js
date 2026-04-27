import api from "../lib/api";

export const userService = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const formData = new FormData();

    // Add text fields safely
    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // IMPORTANT: do NOT manually set Content-Type
    // axios will handle boundary automatically
    const response = await api.patch(
      "/user/update-profile",
      formData
    );

    return response.data;
  },

  // Get user by ID (admin)
  getUserById: async (userId) => {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  },

  // Get all users (admin)
  getAllUsers: async (params = {}) => {
    const response = await api.get("/user/", { params });
    return response.data;
  },

  // Delete user (admin)
  deleteUser: async (userId) => {
    const response = await api.delete(`/user/delete-user/${userId}`);
    return response.data;
  },
};

export default userService;