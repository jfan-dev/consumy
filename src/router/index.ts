import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
import StoresList from '@/components/StoresList.vue'
import StoreProducts from '@/components/StoreProducts.vue'
import Cart from '@/components/Cart.vue'

const routes = [
  { path: '/', name: 'welcome', component: WelcomeView },
  { path: '/signin', name: 'signin', component: SignIn },
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/stores', name: 'stores', component: StoresList },
  { path: '/stores/:id/products', name: 'store-products', component: StoreProducts, props: true },
  { path: '/cart/:storeId', name: 'cart', component: Cart }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
