import api from "../lib/api";

export const userService = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  // Update user profile
  // Accepts a plain FormData object built by the caller — do NOT rebuild it here
  updateProfile: async (formData) => {
    const response = await api.patch("/user/update-profile", formData, {
      headers: {
        // Let axios set Content-Type with boundary automatically
        "Content-Type": "multipart/form-data",
      },
    });
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
