import { createRouter, createWebHistory } from 'vue-router'
import LoginClient from '../views/Login/LoginClient.vue'
import NewLogin from '../views/Login/NewLogin.vue'
import Home from '../views/Home/HomeView.vue'
import ForgotPassword from '../views/Login/ForgotPassword.vue'
import ManageClient from '../views/Admin/ManageClient.vue'
import {ref} from 'vue'
const check=ref(false)
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
      path: '/ManageClient',
      name: 'ManageClient',
      component: ManageClient,           
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth:check.value
      }
           
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (isLoggedIn()) {
      
      next();
    } else {
      // Người dùng chưa đăng nhập, điều hướng họ đến trang đăng nhập
      next('/');
    }
  } else {
    next();
  }
});

function isLoggedIn() {
  check.value=false
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  // Trả về true nếu đã đăng nhập và false nếu chưa
}

export default router
