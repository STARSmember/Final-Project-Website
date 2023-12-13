import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
const { isAuthenticated } = useAuth()
import MainPage from '@/components/MainPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import SettingsPage from '@/components/SettingsPage.vue'
import NotFound from '@/components/NotFound.vue'
import HomePage from '@/views/HomePage.vue'


const routes = [
  { path: '/final-project-website/', name: 'Home', component: MainPage }, // <--- Change path name to "Final.Project.Website"
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/settings', name: 'Settings', component: SettingsPage, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/other', name: 'Other', component: () => import('@/view/OtherPage.vue') },
  //{ path: '/api/villains/:id', name: 'Villain', component: () => import('/@views/VillainPage.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) next({ name: 'Login', query: { redirect: to.fullPath } })
  else next()
})

export default router