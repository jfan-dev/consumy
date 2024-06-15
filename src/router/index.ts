import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },

    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },

    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
})

export default router;
