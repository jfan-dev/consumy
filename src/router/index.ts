import SignIn from '../components/SignIn.vue';
import WelcomeView from '../views/WelcomeView.vue';

const routes = [
  { path: '/', name: 'welcome', component: WelcomeView },
  { path: '/signin', name: 'signin', component: SignIn }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
