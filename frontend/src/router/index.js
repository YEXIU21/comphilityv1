import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PcSets from '../views/PcSets.vue'
import Laptops from '../views/Laptops.vue'
import BestSellers from '../views/BestSellers.vue'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'
import Wishlist from '../views/Wishlist.vue'
import BuildPc from '../views/BuildPc.vue'
import Profile from '../views/Profile.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Processors from '../views/Processors.vue'
import Motherboards from '../views/Motherboards.vue'
import GraphicsCards from '../views/GraphicsCards.vue'
import Checkout from '../views/Checkout.vue'
import Memory from '../views/Memory.vue'
import Storage from '../views/Storage.vue'
import PowerSupply from '../views/PowerSupply.vue'
import Peripherals from '../views/Peripherals.vue'
import PcCases from '../views/PcCases.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pc-sets',
    name: 'PcSets',
    component: PcSets
  },
  {
    path: '/laptops',
    name: 'Laptops',
    component: Laptops
  },
  {
    path: '/best-sellers',
    name: 'BestSellers',
    component: BestSellers
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/processors',
    name: 'Processors',
    component: Processors
  },
  {
    path: '/motherboards',
    name: 'Motherboards',
    component: Motherboards
  },
  {
    path: '/graphics-cards',
    name: 'GraphicsCards',
    component: GraphicsCards
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist
  },
  {
    path: '/build-pc',
    name: 'BuildPc',
    component: BuildPc
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/memory',
    name: 'Memory',
    component: Memory
  },
  {
    path: '/storage',
    name: 'Storage',
    component: Storage
  },
  {
    path: '/power-supply',
    name: 'PowerSupply',
    component: PowerSupply
  },
  {
    path: '/peripherals',
    name: 'Peripherals',
    component: Peripherals
  },
  {
    path: '/pc-cases',
    name: 'PcCases',
    component: PcCases
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
