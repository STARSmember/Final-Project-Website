/* import {createRouter, createWebHistory} from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import NotFound from '@/components/NotFound.vue'

// here is the path for the MainPage and LoginPage
// this must be renamed in order to find the path.
const routes = [
    { path: '/', name: 'Home', component: MainPage },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/:pathMatch(.*)*', name: 'NotFound', componet: NotFound },
  ]

  export defualt createRouter({
    history: createWebHistory(),
    routes,
}) */

import { createRouter, createWebHistory } from 'vue-router'

import { useAuth } from '@/composables/useAuth' 
const { isAuthenticated } = useAuth()

import MainPage from '@/components/MainPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import SettingsPage from '@/components/SettingsPage.vue'
import NotFound from '@/components/NotFound.vue'

const routes = [
  { path: '/Vue-Company-Directory/', name: 'Home', component: MainPage }, // <--- Change path name to "Vue-Company-Directory"
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/settings', name: 'Settings', component: SettingsPage, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
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