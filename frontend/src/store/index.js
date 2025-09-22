import { createStore } from 'vuex'
import admin from './modules/admin'

export default createStore({
  modules: {
    admin
  },
  state: {
    // Modal states
    showLoginModal: false,
    showSignupModal: false,
    showPasswordResetModal: false,
    showUserDropdown: false,
    
    // User state
    user: null,
    isAuthenticated: false,
    
    // Cart and Wishlist
    cart: [],
    wishlist: [],
    
    // Products
    products: [],
    categories: [
      {
        id: 1,
        name: 'Components',
        subcategories: [
          'Processor', 'Motherboard', 'Memory', 'SSD', 'HDD', 
          'Graphics Card', 'CPU Fan', 'Chassis Fan', 'Power Supply', 'PC Case'
        ]
      },
      {
        id: 2,
        name: 'Peripherals',
        subcategories: [
          'Mouse', 'Keyboard', 'Monitor', 'Printer', 'Speaker', 
          'Headset', 'Web Cam', 'AVR', 'Microphone'
        ]
      },
      {
        id: 3,
        name: 'PC Furnitures',
        subcategories: ['Chairs', 'Tables']
      }
    ]
  },
  
  mutations: {
    // Modal mutations
    showLoginModal(state) {
      state.showLoginModal = true
    },
    hideLoginModal(state) {
      state.showLoginModal = false
    },
    showSignupModal(state) {
      state.showSignupModal = true
    },
    hideSignupModal(state) {
      state.showSignupModal = false
    },
    showPasswordResetModal(state) {
      state.showPasswordResetModal = true
    },
    hidePasswordResetModal(state) {
      state.showPasswordResetModal = false
    },
    toggleUserDropdown(state) {
      state.showUserDropdown = !state.showUserDropdown
    },
    hideUserDropdown(state) {
      state.showUserDropdown = false
    },
    
    // User mutations
    setUser(state, user) {
      state.user = user
      state.isAuthenticated = true
    },
    
    logout(state) {
      state.user = null
      state.isAuthenticated = false
    },
    
    // Cart mutations
    addToCart(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    },
    
    clearCart(state) {
      state.cart = []
    },
    updateCartQuantity(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    
    // Wishlist mutations
    addToWishlist(state, product) {
      const exists = state.wishlist.find(item => item.id === product.id)
      if (!exists) {
        state.wishlist.push(product)
      }
    },
    removeFromWishlist(state, productId) {
      state.wishlist = state.wishlist.filter(item => item.id !== productId)
    },
    
    // Product mutations
    setProducts(state, products) {
      state.products = products
    }
  },
  
  actions: {
    // Auth actions
    async login({ commit }, credentials) {
      // Simulate API call
      try {
        // In real app, this would be an API call
        const user = { id: 1, name: 'John Doe', email: credentials.email }
        commit('setUser', user)
        commit('hideLoginModal')
        return { success: true }
      } catch (error) {
        return { success: false, message: 'Login failed' }
      }
    },
    
    async signup({ commit }, userData) {
      // Simulate API call
      try {
        const user = { id: 1, name: userData.name, email: userData.email }
        commit('setUser', user)
        commit('hideSignupModal')
        return { success: true }
      } catch (error) {
        return { success: false, message: 'Signup failed' }
      }
    },
    
    async resetPassword({ commit }, email) {
      // Simulate API call
      try {
        // Password reset logic will be handled by authService
        // For now, just simulate success
        commit('hidePasswordResetModal')
        return { success: true, message: 'Password reset email sent' }
      } catch (error) {
        return { success: false, message: 'Reset failed' }
      }
    }
  },
  
  getters: {
    cartTotal: state => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    cartItemCount: state => {
      return state.cart.reduce((count, item) => count + item.quantity, 0)
    },
    wishlistCount: state => {
      return state.wishlist.length
    },
    isInWishlist: state => productId => {
      return state.wishlist.some(item => item.id === productId)
    }
  }
})
