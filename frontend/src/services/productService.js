import api from './api'

export const productService = {
  // Get all products with optional filters
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params })
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch products' 
      }
    }
  },

  // Get product by ID
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`)
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Product not found' 
      }
    }
  },

  // Get products by category
  async getProductsByCategory(category, params = {}) {
    try {
      const response = await api.get(`/products/category/${category}`, { params })
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch products' 
      }
    }
  },

  // Search products
  async searchProducts(query, params = {}) {
    try {
      const response = await api.get('/products/search', { 
        params: { q: query, ...params } 
      })
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Search failed' 
      }
    }
  },

  // Get featured products
  async getFeaturedProducts() {
    try {
      const response = await api.get('/products/featured')
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch featured products' 
      }
    }
  },

  // Get best sellers
  async getBestSellers() {
    try {
      const response = await api.get('/products/best-sellers')
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch best sellers' 
      }
    }
  },

  // Get product categories
  async getCategories() {
    try {
      const response = await api.get('/categories')
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch categories' 
      }
    }
  },

  // Get product reviews
  async getProductReviews(productId) {
    try {
      const response = await api.get(`/products/${productId}/reviews`)
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch reviews' 
      }
    }
  },

  // Add product review
  async addProductReview(productId, reviewData) {
    try {
      const response = await api.post(`/products/${productId}/reviews`, reviewData)
      return { success: true, data: response }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add review' 
      }
    }
  }
}
