import { createRouter, createWebHistory } from 'vue-router'
import LoginClient from '../views/Login/LoginClient.vue'
import NewLogin from '../views/Login/NewLogin.vue'
import Home from '../views/Home/HomeView.vue'
import ForgotPassword from '../views/Login/ForgotPassword.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      LoginClient: 'home',
      component: LoginClient
    },
    {
      path: '/Login/NewLogin',
      name: 'NewLogin',
      component: NewLogin
    },
    {
      path: '/Login/ForgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    
  ]
})

export default router
