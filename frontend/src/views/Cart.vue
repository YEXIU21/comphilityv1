<template>
  <div class="cart">
    <div class="container">
      <!-- Page Header -->
      <div class="cart-header fade-in">
        <h1 class="page-title">Shopping Cart</h1>
        <p class="cart-subtitle">Review your items before checkout</p>
      </div>
      <p v-if="cartItems.length > 0" class="cart-count">{{ cartItemCount }} items in your cart</p>

      <!-- Empty Cart -->
      <div v-if="cartItems.length === 0" class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started</p>
        <router-link to="/" class="btn btn-primary">Continue Shopping</router-link>
      </div>

      <!-- Cart Content -->
      <div v-else class="cart-content">
        <div class="cart-items">
          <div class="cart-header">
            <div class="cart-actions">
              <button @click="clearCart" class="btn btn-outline">
                Clear Cart
              </button>
              <button @click="proceedToCheckout" class="btn btn-primary">
                Proceed to Checkout
              </button>
            </div>
            <h3>Cart Items</h3>
          </div>
          
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-image">
              <img :src="item.image || '/images/placeholder-product.png'" :alt="item.name" />
            </div>
            
            <div class="item-details">
              <h4 class="item-name">{{ item.name }}</h4>
              <p class="item-price">₱{{ formatPrice(item.price) }}</p>
              <p v-if="item.category" class="item-category">{{ item.category }}</p>
            </div>
            
            <div class="item-quantity">
              <button @click="decreaseQuantity(item)" class="quantity-btn">
                <i class="fas fa-minus"></i>
              </button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="quantity-btn">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            
            <div class="item-total">
              <p class="total-price">₱{{ formatPrice(item.price * item.quantity) }}</p>
              <button @click="removeItem(item.id)" class="remove-btn" title="Remove item">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <div class="summary-card">
            <h3>Order Summary</h3>
            
            <div class="summary-row">
              <span>Subtotal ({{ cartItemCount }} items)</span>
              <span>₱{{ formatPrice(subtotal) }}</span>
            </div>
            
            <div class="summary-row">
              <span>Shipping Fee</span>
              <span>₱{{ formatPrice(shippingFee) }}</span>
            </div>
            
            <div class="summary-row">
              <span>Tax</span>
              <span>₱{{ formatPrice(tax) }}</span>
            </div>
            
            <hr class="summary-divider">
            
            <div class="summary-row total-row">
              <span>Total</span>
              <span>₱{{ formatPrice(total) }}</span>
            </div>
            
            <button @click="proceedToCheckout" class="btn btn-primary checkout-btn">
              <i class="fas fa-lock"></i>
              Proceed to Checkout
            </button>
            
            <router-link to="/" class="continue-shopping">
              <i class="fas fa-arrow-left"></i>
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal', 'cartItemCount']),
    
    cartItems() {
      return this.cart
    },
    
    subtotal() {
      return this.cartTotal
    },
    
    shippingFee() {
      return this.subtotal > 5000 ? 0 : 150
    },
    
    tax() {
      return this.subtotal * 0.12 // 12% VAT
    },
    
    total() {
      return this.subtotal + this.shippingFee + this.tax
    }
  },
  methods: {
    ...mapMutations(['removeFromCart', 'updateCartQuantity', 'clearCart']),
    
    formatPrice(price) {
      return new Intl.NumberFormat('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price)
    },
    
    increaseQuantity(item) {
      this.updateCartQuantity({
        productId: item.id,
        quantity: item.quantity + 1
      })
    },
    
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.updateCartQuantity({
          productId: item.id,
          quantity: item.quantity - 1
        })
      } else {
        this.removeItem(item.id)
      }
    },
    
    removeItem(productId) {
      this.removeFromCart(productId)
    },
    
    clearCart() {
      if (confirm('Are you sure you want to clear your cart?')) {
        this.$store.commit('clearCart')
      }
    },
    
    proceedToCheckout() {
      this.$router.push('/checkout')
    }
  }
}
</script>

<style scoped>
.cart {
  padding: 3rem 0;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--gray-50) 0%, #f0f4ff 100%);
}

.cart-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-blue) 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.cart-subtitle {
  font-size: 1.25rem;
  color: var(--gray-600);
  font-weight: 500;
  margin: 0;
}

.cart-count {
  color: var(--gray-600);
  font-size: 1.125rem;
  margin: 0;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--gray-500);
}

.empty-cart i {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-cart h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--gray-700);
}

.empty-cart p {
  margin-bottom: 2rem;
  font-size: 1.125rem;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

.cart-items {
  background: var(--white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.cart-header h3 {
  margin: 0;
  color: var(--gray-800);
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-100);
  align-items: center;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: var(--border-radius);
  overflow: hidden;
  background: var(--gray-50);
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--gray-800);
  line-height: 1.3;
}

.item-price {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.25rem;
}

.item-category {
  font-size: 0.875rem;
  color: var(--gray-500);
  margin: 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--gray-200);
  border-radius: var(--border-radius);
  padding: 0.25rem;
}

.quantity-btn {
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  color: var(--gray-600);
  cursor: pointer;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.quantity-btn:hover {
  background: var(--gray-100);
}

.quantity {
  min-width: 2rem;
  text-align: center;
  font-weight: 600;
}

.item-total {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.total-price {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--gray-800);
  margin: 0;
}

.remove-btn {
  background: none;
  border: none;
  color: var(--danger);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: background-color 0.2s ease;
}

.remove-btn:hover {
  background: rgba(220, 53, 69, 0.1);
}

.cart-summary {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.summary-card {
  background: var(--white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;
}

.summary-card h3 {
  margin-bottom: 1.5rem;
  color: var(--gray-800);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.summary-row:last-of-type {
  margin-bottom: 0;
}

.summary-divider {
  border: none;
  border-top: 1px solid var(--gray-200);
  margin: 1.5rem 0;
}

.total-row {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--gray-800);
}

.checkout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.continue-shopping {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--primary-blue);
  text-decoration: none;
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: background-color 0.2s ease;
}

.continue-shopping:hover {
  background: var(--gray-50);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .cart-summary {
    position: static;
    order: -1;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .cart-item {
    grid-template-columns: 60px 1fr;
    gap: 1rem;
  }
  
  .item-quantity,
  .item-total {
    grid-column: 2;
    justify-self: end;
    margin-top: 0.75rem;
  }
  
  .item-total {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
}

@media (max-width: 576px) {
  .cart {
    padding: 1rem 0;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .page-title {
    font-size: 1.75rem;
  }
  
  .cart-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .empty-cart {
    padding: 3rem 1rem;
  }
  
  .empty-cart i {
    font-size: 3rem;
  }
  
  .empty-cart h3 {
    font-size: 1.25rem;
  }
}
</style>
