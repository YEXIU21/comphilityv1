<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">Login</h3>
        <button @click="closeModal" class="modal-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address :</label>
            <input
              id="email"
              type="email"
              v-model="loginData.email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password :</label>
            <input
              id="password"
              type="password"
              v-model="loginData.password"
              class="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div class="form-actions">
            <button
              type="button"
              @click="openPasswordReset"
              class="forgot-password-link"
            >
              Forgot Password?
            </button>
            <button
              type="button"
              @click="openAdminLogin"
              class="admin-login-link"
            >
              Login as Admin
            </button>
          </div>
          
          <button
            type="submit"
            class="btn btn-primary login-btn"
            :disabled="isLoading"
          >
            <span v-if="isLoading">
              <i class="fas fa-spinner fa-spin"></i>
              Logging in...
            </span>
            <span v-else>LOGIN</span>
          </button>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>
        
        <div class="divider">
          <span>Or Continue With</span>
        </div>
        
        <div class="social-login">
          <button @click="loginWithFacebook" class="btn social-btn facebook-btn">
            <i class="fab fa-facebook-f"></i>
            Facebook
          </button>
          <button @click="loginWithGoogle" class="btn social-btn google-btn">
            <i class="fab fa-google"></i>
            Google
          </button>
        </div>
        
        <div class="signup-link">
          <p>Don't have an account? 
            <button @click="switchToSignup" class="link-btn">Sign up here</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import mockAuth from '@/services/mockAuth'

export default {
  name: 'LoginModal',
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      isLoading: false,
      error: ''
    }
  },
  methods: {
    ...mapMutations([
      'hideLoginModal', 
      'showSignupModal', 
      'showPasswordResetModal'
    ]),
    ...mapActions(['login']),
    
    closeModal() {
      this.hideLoginModal()
      this.resetForm()
    },
    
    async handleLogin() {
      this.isLoading = true
      this.error = ''
      
      try {
        // Use mock authentication service
        const result = await mockAuth.login(this.loginData.email, this.loginData.password)
        
        if (result.success) {
          // Update Vuex store
          this.$store.commit('setUser', result.user)
          this.closeModal()
          
          // Show success message
          alert(`Welcome back, ${result.user.name}!`)
        } else {
          this.error = result.message || 'Login failed. Please try again.'
        }
      } catch (error) {
        this.error = 'An error occurred. Please try again.'
      } finally {
        this.isLoading = false
      }
    },
    
    switchToSignup() {
      this.hideLoginModal()
      this.showSignupModal()
    },
    
    openPasswordReset() {
      this.hideLoginModal()
      this.showPasswordResetModal()
    },
    
    async openAdminLogin() {
      this.isLoading = true
      this.error = ''
      
      try {
        // Use mock admin authentication
        const result = await mockAuth.adminLogin(this.loginData.email, this.loginData.password)
        
        if (result.success) {
          // Update admin store
          this.$store.commit('admin/SET_ADMIN_USER', result.user)
          this.closeModal()
          
          // Redirect to admin dashboard
          this.$router.push('/admin/dashboard')
          
          // Show success message
          alert(`Welcome Admin: ${result.user.name}!`)
        } else {
          this.error = result.message || 'Invalid admin credentials. Use admin@comphility.com / admin123'
        }
      } catch (error) {
        this.error = 'An error occurred. Please try again.'
      } finally {
        this.isLoading = false
      }
    },
    
    loginWithFacebook() {
      // Facebook OAuth integration - to be implemented
      alert('Facebook login will be available after backend integration')
    },
    
    loginWithGoogle() {
      // Google OAuth integration - to be implemented
      alert('Google login will be available after backend integration')
    },
    
    resetForm() {
      this.loginData = {
        email: '',
        password: ''
      }
      this.error = ''
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
.login-form {
  margin-bottom: 1.5rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.forgot-password-link,
.admin-login-link {
  background: none;
  border: none;
  color: var(--primary-blue);
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

.forgot-password-link:hover,
.admin-login-link:hover {
  color: var(--primary-blue-dark);
}

.login-btn {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.error-message {
  color: var(--danger);
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(220, 53, 69, 0.1);
  border-radius: var(--border-radius);
}

.divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
  color: var(--gray-500);
  font-size: 0.875rem;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gray-200);
  z-index: 1;
}

.divider span {
  background: var(--white);
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

.social-login {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  font-weight: 500;
  border: 2px solid var(--gray-200);
}

.facebook-btn {
  background: #1877F2;
  border-color: #1877F2;
  color: var(--white);
}

.facebook-btn:hover {
  background: #166FE5;
  border-color: #166FE5;
}

.google-btn {
  background: #DB4437;
  border-color: #DB4437;
  color: var(--white);
}

.google-btn:hover {
  background: #C23321;
  border-color: #C23321;
}

.signup-link {
  text-align: center;
  color: var(--gray-600);
  font-size: 0.875rem;
}

.signup-link p {
  margin: 0;
}

.link-btn {
  background: none;
  border: none;
  color: var(--primary-blue);
  cursor: pointer;
  text-decoration: underline;
  font-size: inherit;
  padding: 0;
}

.link-btn:hover {
  color: var(--primary-blue-dark);
}

/* Responsive */
@media (max-width: 576px) {
  .social-login {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>
