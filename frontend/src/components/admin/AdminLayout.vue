<template>
  <div class="admin-container">
    <!-- Admin Sidebar -->
    <aside class="admin-sidebar">
      <div class="admin-logo">
        <router-link to="/admin/dashboard">
          <span class="logo-text">COMPHILITY</span>
        </router-link>
      </div>
      
      <nav class="admin-nav">
        <router-link to="/admin/dashboard" class="nav-item" :class="{ active: $route.path === '/admin/dashboard' }">
          <i class="fas fa-home"></i>
          <span>Dashboard</span>
        </router-link>
        
        <router-link to="/admin/products" class="nav-item" :class="{ active: $route.path.includes('/admin/products') }">
          <i class="fas fa-box"></i>
          <span>Product Management</span>
        </router-link>
        
        <router-link to="/admin/orders" class="nav-item" :class="{ active: $route.path.includes('/admin/orders') }">
          <i class="fas fa-shopping-cart"></i>
          <span>Order Management</span>
        </router-link>
        
        <router-link to="/admin/users" class="nav-item" :class="{ active: $route.path.includes('/admin/users') }">
          <i class="fas fa-users"></i>
          <span>User Management</span>
        </router-link>
        
        <router-link to="/admin/statistics" class="nav-item" :class="{ active: $route.path === '/admin/statistics' }">
          <i class="fas fa-chart-bar"></i>
          <span>Statistics</span>
        </router-link>
      </nav>
    </aside>
    
    <!-- Main Content Area -->
    <div class="admin-main">
      <header class="admin-header">
        <h1 class="page-title">{{ pageTitle }}</h1>
        
        <div class="admin-actions">
          <button class="admin-user-btn" @click="toggleUserMenu">
            <i class="fas fa-user-circle"></i>
            <span>Admin</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          
          <div v-if="showUserMenu" class="admin-dropdown">
            <a href="#" @click.prevent="viewProfile">Profile</a>
            <a href="#" @click.prevent="logout">Logout</a>
          </div>
        </div>
      </header>
      
      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  data() {
    return {
      showUserMenu: false
    }
  },
  computed: {
    pageTitle() {
      const titles = {
        '/admin/dashboard': 'ADMIN DASHBOARD',
        '/admin/products': 'PRODUCT MANAGEMENT',
        '/admin/orders': 'ORDER MANAGEMENT',
        '/admin/users': 'USER MANAGEMENT',
        '/admin/statistics': 'STATISTICS'
      }
      
      for (let path in titles) {
        if (this.$route.path.includes(path.replace('/admin/', ''))) {
          return titles[path]
        }
      }
      return 'ADMIN PANEL'
    }
  },
  methods: {
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    viewProfile() {
      this.$router.push('/admin/profile')
      this.showUserMenu = false
    },
    logout() {
      this.$store.commit('logout')
      this.$router.push('/')
      this.showUserMenu = false
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.admin-actions')) {
        this.showUserMenu = false
      }
    })
  }
}
</script>

<style scoped>
.admin-container {
  display: flex;
  min-height: 100vh;
  background: #f0f2f5;
}

/* Sidebar */
.admin-sidebar {
  width: 200px;
  background: #5b7eff;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
}

.admin-logo {
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  text-align: center;
}

.admin-logo a {
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.logo-text {
  color: white;
}

.admin-nav {
  flex: 1;
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-left-color: white;
}

.nav-item i {
  width: 20px;
  margin-right: 12px;
  text-align: center;
}

.nav-item span {
  font-size: 0.9rem;
  font-weight: 500;
}

/* Main Content */
.admin-main {
  flex: 1;
  margin-left: 200px;
  display: flex;
  flex-direction: column;
}

.admin-header {
  background: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.page-title {
  font-size: 1.5rem;
  color: #5b7eff;
  font-weight: bold;
  margin: 0;
}

.admin-actions {
  position: relative;
}

.admin-user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #5b7eff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.admin-user-btn:hover {
  background: #4a6eef;
}

.admin-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  overflow: hidden;
  z-index: 1000;
}

.admin-dropdown a {
  display: block;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: background 0.3s ease;
}

.admin-dropdown a:hover {
  background: #f5f5f5;
}

.admin-content {
  flex: 1;
  padding: 30px;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-sidebar {
    width: 70px;
  }
  
  .admin-main {
    margin-left: 70px;
  }
  
  .nav-item span,
  .logo-text {
    display: none;
  }
  
  .nav-item {
    justify-content: center;
  }
  
  .nav-item i {
    margin-right: 0;
  }
}
</style>
