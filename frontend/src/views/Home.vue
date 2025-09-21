<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-background">
        <div class="hero-gradient"></div>
        <div class="hero-particles"></div>
      </div>
      <div class="container">
        <div class="hero-slider">
          <div class="hero-slide active fade-in">
            <div class="hero-content slide-up">
              <div class="hero-badge">✨ Premium Components</div>
              <h1 class="hero-title">Build Your Dream PC</h1>
              <p class="hero-subtitle">
                High-performance components for gamers, creators, and professionals. Experience the power of custom builds with our expert guidance.
              </p>
              <div class="hero-actions">
                <router-link to="/build-pc" class="btn btn-primary hero-cta">
                  <i class="fas fa-wrench"></i>
                  Start Building
                </router-link>
                <router-link to="/products" class="btn btn-outline">
                  <i class="fas fa-th-large"></i>
                  Browse Components
                </router-link>
              </div>
              <div class="hero-stats">
                <div class="stat-item">
                  <span class="stat-number">1000+</span>
                  <span class="stat-label">Components</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">500+</span>
                  <span class="stat-label">Happy Customers</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">24/7</span>
                  <span class="stat-label">Support</span>
                </div>
              </div>
            </div>
            <div class="hero-image scale-in">
              <div class="hero-image-wrapper">
                <img src="/images/hero-pc-build.jpg" alt="Custom PC Build" />
                <div class="image-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- PC Sets Section -->
    <section class="products-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">PC SETS</h2>
          <router-link to="/pc-sets" class="see-more-link">
            SEE MORE
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
        <ProductGrid :products="pcSets" />
      </div>
    </section>

    <!-- Laptops Section -->
    <section class="products-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">LAPTOPS</h2>
          <router-link to="/laptops" class="see-more-link">
            SEE MORE
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
        <ProductGrid :products="laptops" />
      </div>
    </section>

    <!-- Best Sellers Section -->
    <section class="products-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">BEST SELLER</h2>
          <router-link to="/best-sellers" class="see-more-link">
            SEE MORE
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
        <ProductGrid :products="bestSellers" />
      </div>
    </section>
  </div>
</template>

<script>
import ProductGrid from '../components/common/ProductGrid.vue'

export default {
  name: 'Home',
  components: {
    ProductGrid
  },
  data() {
    return {
      pcSets: [
        {
          id: 1,
          name: 'INTEL I5 BUNDLE',
          price: 25195.00,
          image: '/images/intel-i5-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets'
        },
        {
          id: 2,
          name: 'RYZEN 5 BUNDLE',
          price: 16295.00,
          image: '/images/ryzen-5-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets'
        },
        {
          id: 3,
          name: 'INTEL I7 BUNDLE',
          price: 46139.00,
          image: '/images/intel-i7-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets'
        },
        {
          id: 4,
          name: 'RYZEN 7 BUNDLE',
          price: 21250.00,
          image: '/images/ryzen-7-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets'
        }
      ],
      laptops: [
        {
          id: 5,
          name: 'MSI THIN 15',
          price: 51999.00,
          image: '/images/msi-thin-15.jpg',
          rating: 5.0,
          category: 'Laptops'
        },
        {
          id: 6,
          name: 'ACER NITRO 5',
          price: 45999.00,
          image: '/images/acer-nitro-5.jpg',
          rating: 5.0,
          category: 'Laptops'
        },
        {
          id: 7,
          name: 'PREDATOR HELIOS NEO 16',
          price: 98999.00,
          image: '/images/predator-helios.jpg',
          rating: 5.0,
          category: 'Laptops'
        },
        {
          id: 8,
          name: 'LENOVO LEGION 5 PRO',
          price: 118999.00,
          image: '/images/lenovo-legion.jpg',
          rating: 5.0,
          category: 'Laptops'
        }
      ],
      bestSellers: [
        {
          id: 9,
          name: 'MSI Pro MP223 21.5" 100Hz',
          price: 3620.00,
          image: '/images/msi-monitor.jpg',
          rating: 5.0,
          category: 'Monitor'
        },
        {
          id: 10,
          name: 'Nvision EC2451 PRO 180HZ',
          price: 5230.00,
          image: '/images/nvision-monitor.jpg',
          rating: 5.0,
          category: 'Monitor'
        },
        {
          id: 11,
          name: 'Nvision S2515 24.5" 100HZ',
          price: 98999.00,
          image: '/images/nvision-s2515.jpg',
          rating: 5.0,
          category: 'Monitor'
        },
        {
          id: 12,
          name: 'Nvision N2455PRO 100Hz',
          price: 3950.00,
          image: '/images/nvision-n2455.jpg',
          rating: 5.0,
          category: 'Monitor'
        }
      ]
    }
  },
  mounted() {
    // Load products from API or store
    this.loadProducts()
  },
  methods: {
    loadProducts() {
      // In a real app, this would load from API
      console.log('Loading products...')
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  position: relative;
  padding: 4rem 0;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding-top: 2rem;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-blue) 0%, #3B82F6 50%, var(--primary-blue-dark) 100%);
}

.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 2px, transparent 2px),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 2px, transparent 2px),
    radial-gradient(circle at 40% 40%, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 100px 100px, 150px 150px, 200px 200px;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(120deg); }
  66% { transform: translateY(-20px) rotate(240deg); }
  100% { transform: translateY(0px) rotate(360deg); }
}

.hero-slide {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 600px;
  color: var(--white);
  transform: translateY(-30px);
}

.hero-badge {
  display: inline-block;
  background: rgba(255,255,255,0.15);
  color: var(--white);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.375rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.7;
  font-weight: 500;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.hero-cta {
  font-size: 1.125rem;
  padding: 1.25rem 2.5rem;
  background: var(--white);
  color: var(--primary-blue);
  border: none;
  font-weight: 700;
}

.hero-cta:hover {
  background: var(--gray-100);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

/* Fix Browse Components button visibility on blue background */
.hero-actions .btn-outline {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid var(--white);
  color: var(--white);
  backdrop-filter: blur(10px);
}

.hero-actions .btn-outline:hover {
  background: var(--white);
  color: var(--primary-blue);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.hero-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--white);
  line-height: 1;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  opacity: 0.8;
  margin-top: 0.5rem;
  font-weight: 500;
}

.hero-image-wrapper {
  position: relative;
}

.hero-image-wrapper img {
  width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

.image-glow {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border-radius: 36px;
  filter: blur(20px);
  z-index: -1;
}

.products-section {
  padding: 4rem 0;
  background: var(--white);
  border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
  margin-top: -2rem;
  position: relative;
  z-index: 1;
  box-shadow: 0 -10px 30px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  position: relative;
}

.section-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-blue), var(--primary-blue-light));
  border-radius: 2px;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--gray-800);
  letter-spacing: -0.02em;
  position: relative;
}

.see-more-link {
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--primary-blue);
  border-radius: var(--border-radius-lg);
  transition: all 0.3s ease;
  background: rgba(91, 126, 255, 0.05);
}

.see-more-link:hover {
  color: var(--white);
  background: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(91, 126, 255, 0.3);
}

.see-more-link i {
  transition: transform 0.3s ease;
}

.see-more-link:hover i {
  transform: translateX(4px);
}

.see-more-link i {
  font-size: 0.75rem;
  transition: transform 0.2s ease;
}

.see-more-link:hover i {
  transform: translateX(2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: 1rem 0;
    margin-bottom: 2rem;
  }
  
  .products-section {
    margin-bottom: 3rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .see-more-link {
    align-self: flex-end;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.25rem;
  }
}
</style>
