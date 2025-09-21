import api from './api'

export const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      const { token, user } = response
      
      // Store token and user data
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      return { success: true, user, token }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      }
    }
  },

  // Register new user
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      const { token, user } = response
      
      // Store token and user data
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      return { success: true, user, token }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      }
    }
  },

  // Reset password
  async resetPassword(email) {
    try {
      await api.post('/auth/reset-password', { email })
      return { 
        success: true, 
        message: 'Password reset email sent successfully' 
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Password reset failed' 
      }
    }
  },

  // Change password
  async changePassword(passwordData) {
    try {
      await api.put('/auth/change-password', passwordData)
      return { 
        success: true, 
        message: 'Password changed successfully' 
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Password change failed' 
      }
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  },

  // Get current user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('auth_token')
  }
}
