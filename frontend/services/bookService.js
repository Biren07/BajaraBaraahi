import api from '../lib/api';

export const bookService = {
  // Get all books with optional query parameters
  getBooks: async (params = {}) => {
    const response = await api.get('/book', { params });
    return response.data;
  },

  // Add a new book (admin only)
  addBook: async (bookData, coverImage) => {
    const formData = new FormData();

    // Add text fields
    Object.keys(bookData).forEach(key => {
      if (bookData[key] !== undefined && bookData[key] !== null) {
        formData.append(key, bookData[key]);
      }
    });

    // Add image file
    if (coverImage) {
      formData.append('cover_Img', coverImage);
    }

    const response = await api.post('/book/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update a book (admin only)
  updateBook: async (id, bookData, coverImage) => {
    const formData = new FormData();

    // Add text fields
    Object.keys(bookData).forEach(key => {
      if (bookData[key] !== undefined && bookData[key] !== null) {
        formData.append(key, bookData[key]);
      }
    });

    // Add image file
    if (coverImage) {
      formData.append('cover_Img', coverImage);
    }

    const response = await api.patch(`/book/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete a book (admin only)
  deleteBook: async (id) => {
    const response = await api.delete(`/book/delete/${id}`);
    return response.data;
  },

  // Toggle book in wishlist (user only)
  toggleWishlist: async (bookId) => {
    const response = await api.post(`/book/add-fav/${bookId}`);
    return response.data;
  },

  // Get user's wishlist (user only)
  getWishlist: async () => {
    const response = await api.get('/book/get-fav');
    return response.data;
  },
};

export default bookService;
