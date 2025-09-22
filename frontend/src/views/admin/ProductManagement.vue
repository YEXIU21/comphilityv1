<template>
  <div class="product-management">
    <!-- Header Controls -->
    <div class="controls-header">
      <button class="create-btn" @click="showCreateModal = true">
        <i class="fas fa-plus-circle"></i>
        Create New
      </button>
      
      <div class="filter-controls">
        <div class="filter-dropdown">
          <button class="filter-btn" @click="toggleSort">
            {{ sortLabel }}
            <i class="fas fa-chevron-down"></i>
          </button>
          <div v-if="showSortMenu" class="dropdown-menu">
            <a @click="setSortBy('lastAdded')">Last Added</a>
            <a @click="setSortBy('name')">Name</a>
            <a @click="setSortBy('price')">Price</a>
          </div>
        </div>
        
        <div class="filter-dropdown">
          <button class="filter-btn" @click="toggleCategory">
            {{ categoryLabel }}
            <i class="fas fa-chevron-down"></i>
          </button>
          <div v-if="showCategoryMenu" class="dropdown-menu">
            <a @click="setCategory('all')">All Categories</a>
            <a @click="setCategory('processor')">Processor</a>
            <a @click="setCategory('motherboard')">Motherboard</a>
            <a @click="setCategory('memory')">Memory</a>
            <a @click="setCategory('graphics')">Graphics Card</a>
            <a @click="setCategory('storage')">Storage</a>
            <a @click="setCategory('monitor')">Monitor</a>
            <a @click="setCategory('mouse')">Mouse</a>
            <a @click="setCategory('keyboard')">Keyboard</a>
            <a @click="setCategory('laptops')">Laptops</a>
            <a @click="setCategory('pc-sets')">PC Sets</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Category Title -->
    <h2 v-if="selectedCategory !== 'all'" class="category-title">
      {{ selectedCategory.toUpperCase() }}
    </h2>
    
    <!-- Products Grid -->
    <div class="products-grid">
      <div class="product-card" v-for="product in filteredProducts" :key="product.id">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        
        <div class="product-details">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">₱{{ formatPrice(product.price) }}</p>
          
          <div class="product-actions">
            <button class="action-btn edit" @click="editProduct(product)">
              <i class="fas fa-edit"></i>
              Edit
            </button>
            <button class="action-btn delete" @click="confirmDelete(product)">
              <i class="fas fa-trash"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Pagination -->
    <div class="pagination">
      <button class="page-btn" @click="previousPage" :disabled="currentPage === 1">
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <button 
        v-for="page in visiblePages" 
        :key="page"
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      
      <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="cancelDelete">
      <div class="modal delete-modal" @click.stop>
        <h2>Are You Sure?</h2>
        <p>You Want to Delete this Product?</p>
        
        <div class="modal-actions">
          <button class="btn-confirm" @click="deleteProduct">YES</button>
          <button class="btn-cancel" @click="cancelDelete">NO</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductManagement',
  data() {
    return {
      products: [
        // Sample products - replace with API call
        {
          id: 1,
          name: 'Rakk Alti BVR/RGY Illuminated Gaming Mouse',
          price: 300.00,
          category: 'mouse',
          image: 'https://via.placeholder.com/200'
        },
        {
          id: 2,
          name: 'MSI NVIDIA GeForce RTX 3060 Ventus',
          price: 18950.00,
          category: 'graphics',
          image: 'https://via.placeholder.com/200'
        },
        {
          id: 3,
          name: 'Acer AC-550 550w Full Modular 80plus Bronze Power Supply',
          price: 1435.00,
          category: 'power-supply',
          image: 'https://via.placeholder.com/200'
        }
      ],
      currentPage: 1,
      itemsPerPage: 9,
      selectedCategory: 'all',
      sortBy: 'lastAdded',
      showSortMenu: false,
      showCategoryMenu: false,
      showDeleteModal: false,
      showCreateModal: false,
      productToDelete: null
    }
  },
  computed: {
    filteredProducts() {
      let filtered = this.products
      
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === this.selectedCategory)
      }
      
      // Sort products
      if (this.sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name))
      } else if (this.sortBy === 'price') {
        filtered.sort((a, b) => a.price - b.price)
      }
      
      // Paginate
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      
      return filtered.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage)
    },
    visiblePages() {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, this.currentPage - 2)
      let end = Math.min(this.totalPages, start + maxVisible - 1)
      
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
    },
    sortLabel() {
      const labels = {
        'lastAdded': 'Last Added',
        'name': 'Name',
        'price': 'Price'
      }
      return labels[this.sortBy] || 'Last Added'
    },
    categoryLabel() {
      return this.selectedCategory === 'all' ? 'Category' : this.selectedCategory
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('en-PH', { minimumFractionDigits: 2 })
    },
    toggleSort() {
      this.showSortMenu = !this.showSortMenu
      this.showCategoryMenu = false
    },
    toggleCategory() {
      this.showCategoryMenu = !this.showCategoryMenu
      this.showSortMenu = false
    },
    setSortBy(sort) {
      this.sortBy = sort
      this.showSortMenu = false
    },
    setCategory(category) {
      this.selectedCategory = category
      this.showCategoryMenu = false
      this.currentPage = 1
    },
    editProduct(product) {
      this.$router.push(`/admin/products/edit/${product.id}`)
    },
    confirmDelete(product) {
      this.productToDelete = product
      this.showDeleteModal = true
    },
    deleteProduct() {
      // API call to delete product
      const index = this.products.findIndex(p => p.id === this.productToDelete.id)
      if (index > -1) {
        this.products.splice(index, 1)
      }
      this.showDeleteModal = false
      this.productToDelete = null
    },
    cancelDelete() {
      this.showDeleteModal = false
      this.productToDelete = null
    },
    goToPage(page) {
      this.currentPage = page
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.filter-dropdown')) {
        this.showSortMenu = false
        this.showCategoryMenu = false
      }
    })
  }
}
</script>

<style scoped>
.product-management {
  max-width: 1400px;
  margin: 0 auto;
}

/* Header Controls */
.controls-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #5b7eff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.create-btn:hover {
  background: #4a6eef;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(91, 126, 255, 0.3);
}

.filter-controls {
  display: flex;
  gap: 15px;
}

.filter-dropdown {
  position: relative;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 2px solid #5b7eff;
  color: #5b7eff;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: #5b7eff;
  color: white;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  z-index: 100;
  overflow: hidden;
}

.dropdown-menu a {
  display: block;
  padding: 10px 16px;
  color: #333;
  cursor: pointer;
  transition: background 0.3s ease;
}

.dropdown-menu a:hover {
  background: #f5f5f5;
}

/* Category Title */
.category-title {
  font-size: 1.5rem;
  color: #5b7eff;
  margin-bottom: 20px;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  padding: 20px;
}

.product-name {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
  line-height: 1.4;
}

.product-price {
  font-size: 1.3rem;
  color: #5b7eff;
  font-weight: bold;
  margin-bottom: 15px;
}

.product-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.action-btn.edit {
  background: #e3f2fd;
  color: #2196f3;
}

.action-btn.edit:hover {
  background: #2196f3;
  color: white;
}

.action-btn.delete {
  background: #ffebee;
  color: #f44336;
}

.action-btn.delete:hover {
  background: #f44336;
  color: white;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #5b7eff;
  background: white;
  color: #5b7eff;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled) {
  background: #5b7eff;
  color: white;
}

.page-btn.active {
  background: #5b7eff;
  color: white;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Delete Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.delete-modal {
  background: #5b7eff;
  color: white;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  min-width: 400px;
}

.delete-modal h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.delete-modal p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.modal-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn-confirm,
.btn-cancel {
  padding: 12px 50px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-confirm {
  background: white;
  color: #5b7eff;
}

.btn-confirm:hover {
  transform: scale(1.05);
}

.btn-cancel {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-cancel:hover {
  background: white;
  color: #5b7eff;
}

/* Responsive */
@media (max-width: 768px) {
  .controls-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .filter-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
