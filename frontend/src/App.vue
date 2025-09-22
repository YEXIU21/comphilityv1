<template>
  <div id="app">
    <!-- Show Admin Layout for admin routes -->
    <router-view v-if="isAdminRoute" />
    
    <!-- Show Regular Layout for customer routes -->
    <template v-else>
      <AppHeader />
      <main class="main-content">
        <router-view />
      </main>
      <AppFooter />
    </template>
    
    <!-- Modals -->
    <LoginModal v-if="showLoginModal" @close="hideLoginModal" />
    <SignupModal v-if="showSignupModal" @close="hideSignupModal" />
    <PasswordResetModal v-if="showPasswordResetModal" @close="hidePasswordResetModal" />
    
    <!-- Login Instructions for Development -->
    <LoginInstructions v-if="showInstructions && !isAdminRoute" />
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import LoginModal from './components/modals/LoginModal.vue'
import SignupModal from './components/modals/SignupModal.vue'
import PasswordResetModal from './components/modals/PasswordResetModal.vue'
import LoginInstructions from './components/LoginInstructions.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    LoginModal,
    SignupModal,
    PasswordResetModal,
    LoginInstructions
  },
  data() {
    return {
      showInstructions: true // Show in development mode
    }
  },
  computed: {
    ...mapState(['showLoginModal', 'showSignupModal', 'showPasswordResetModal']),
    isAdminRoute() {
      return this.$route.path.startsWith('/admin')
    }
  },
  methods: {
    ...mapMutations(['hideLoginModal', 'hideSignupModal', 'hidePasswordResetModal'])
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

body {
  margin: 0;
  background-color: #f8f9fa;
}
</style>
