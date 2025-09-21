<template>
  <div class="pc-sets">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">PC SETS</h1>
        <p class="page-description">
          Complete PC bundles ready to use. Choose from our carefully curated selection of gaming and professional workstation setups.
        </p>
      </div>

      <!-- Filters -->
      <div class="filters-section">
        <div class="filter-group">
          <label class="filter-label">Sort by:</label>
          <select v-model="sortBy" @change="applySorting" class="filter-select">
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Price Range:</label>
          <select v-model="priceFilter" @change="applyFilters" class="filter-select">
            <option value="all">All Prices</option>
            <option value="under-20k">Under ₱20,000</option>
            <option value="20k-50k">₱20,000 - ₱50,000</option>
            <option value="above-50k">Above ₱50,000</option>
          </select>
        </div>
      </div>

      <!-- Product Grid -->
      <ProductGrid :products="filteredProducts" />

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          @click="changePage(page)" 
          v-for="page in totalPages" 
          :key="page"
          :class="['page-btn', { active: currentPage === page }]"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductGrid from '../components/common/ProductGrid.vue'

export default {
  name: 'PcSets',
  components: {
    ProductGrid
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 9,
      sortBy: 'name',
      priceFilter: 'all',
      products: [
        {
          id: 101,
          name: 'INTEL CORE I3-12100',
          price: 14795.00,
          image: '/images/intel-i3-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets',
          description: 'COD & INSTALLMENT AVAILABLE'
        },
        {
          id: 102,
          name: 'INTEL CORE I7-12700',
          price: 16995.00,
          image: '/images/intel-i7-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets',
          description: 'COD & INSTALLMENT AVAILABLE'
        },
        {
          id: 103,
          name: 'AMD RYZEN 7 5700G',
          price: 21250.00,
          image: '/images/amd-ryzen7-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets',
          description: 'COD & INSTALLMENT AVAILABLE'
        },
        {
          id: 104,
          name: 'AMD ATHLON 200GE',
          price: 10869.00,
          image: '/images/amd-athlon-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets',
          description: 'COD & INSTALLMENT AVAILABLE'
        },
        {
          id: 105,
          name: 'AMD RYZEN 5 4650G',
          price: 15450.00,
          image: '/images/amd-ryzen5-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets',
          description: 'COD & INSTALLMENT AVAILABLE'
        },
        {
          id: 106,
          name: 'INTEL CORE I7 12700',
          price: 46139.00,
          image: '/images/intel-i7-12700-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets',
          description: 'COD & INSTALLMENT AVAILABLE'
        },
        {
          id: 107,
          name: 'AMD RYZEN 9 5950X',
          price: 102450.00,
          image: '/images/amd-ryzen9-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets',
          description: 'COD & INSTALLMENT AVAILABLE'
        },
        {
          id: 108,
          name: 'INTEL CORE I5 13600K',
          price: 97350.00,
          image: '/images/intel-i5-13600k-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets',
          description: 'COD & INSTALLMENT AVAILABLE'
        },
        {
          id: 109,
          name: 'AMD RYZEN 5 5600G',
          price: 16295.00,
          image: '/images/amd-ryzen5-5600g-bundle.jpg',
          rating: 5.0,
          category: 'PC Sets',
          description: 'COD & INSTALLMENT AVAILABLE'
        }
      ]
    }
  },
  computed: {
    filteredProducts() {
      let filtered = [...this.products]
      
      // Apply price filter
      if (this.priceFilter !== 'all') {
        filtered = filtered.filter(product => {
          switch (this.priceFilter) {
            case 'under-20k':
              return product.price < 20000
            case '20k-50k':
              return product.price >= 20000 && product.price <= 50000
            case 'above-50k':
              return product.price > 50000
            default:
              return true
          }
        })
      }
      
      // Apply sorting
      filtered.sort((a, b) => {
        switch (this.sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'rating':
            return b.rating - a.rating
          case 'name':
          default:
            return a.name.localeCompare(b.name)
        }
      })
      
      // Apply pagination
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return filtered.slice(start, end)
    },
    
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage)
    }
  },
  methods: {
    applySorting() {
      this.currentPage = 1
    },
    
    applyFilters() {
      this.currentPage = 1
    },
    
    changePage(page) {
      this.currentPage = page
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
.pc-sets {
  padding: 3rem 0;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--gray-50) 0%, #f0f4ff 100%);
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 1rem;
  letter-spacing: 0.025em;
}

.page-description {
  font-size: 1.125rem;
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.filters-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-label {
  font-weight: 600;
  color: var(--gray-700);
  white-space: nowrap;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 2px solid var(--gray-200);
  border-radius: var(--border-radius);
  background: var(--white);
  color: var(--gray-700);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-blue);
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
}

.page-btn {
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid var(--gray-200);
  background: var(--white);
  color: var(--gray-600);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.page-btn:hover {
  border-color: var(--primary-blue);
  color: var(--primary-blue);
}

.page-btn.active {
  background: var(--primary-blue);
  border-color: var(--primary-blue);
  color: var(--white);
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .filters-section {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .filter-group {
    justify-content: space-between;
  }
  
  .filter-select {
    flex: 1;
    max-width: 200px;
  }
}

@media (max-width: 576px) {
  .pc-sets {
    padding: 1rem 0;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .page-title {
    font-size: 1.75rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
  
  .filters-section {
    margin-bottom: 1.5rem;
    padding: 1rem;
  }
}
</style>
