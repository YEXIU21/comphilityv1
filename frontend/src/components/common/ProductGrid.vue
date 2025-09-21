<template>
  <div class="product-grid">
    <div v-if="products.length === 0" class="empty-grid">
      <i class="fas fa-box-open"></i>
      <p>No products available</p>
    </div>
    <div v-else class="grid">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product"
        @add-to-cart="handleAddToCart"
        @toggle-wishlist="handleToggleWishlist"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'ProductGrid',
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Number,
      default: 4
    }
  },
  computed: {
    ...mapGetters(['isInWishlist']),
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.columns}, 1fr)`
      }
    }
  },
  methods: {
    ...mapMutations(['addToCart', 'addToWishlist', 'removeFromWishlist']),
    
    handleAddToCart(product) {
      this.addToCart(product)
      // Show toast notification
      this.$emit('product-added', {
        type: 'cart',
        product
      })
    },
    
    handleToggleWishlist(product) {
      if (this.isInWishlist(product.id)) {
        this.removeFromWishlist(product.id)
        this.$emit('product-removed', {
          type: 'wishlist',
          product
        })
      } else {
        this.addToWishlist(product)
        this.$emit('product-added', {
          type: 'wishlist',
          product
        })
      }
    }
  }
}
</script>

<style scoped>
.product-grid {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.empty-grid {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--gray-500);
}

.empty-grid i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-grid p {
  font-size: 1.125rem;
  margin: 0;
}

/* Responsive Grid */
@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 576px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
