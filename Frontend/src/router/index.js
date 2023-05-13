import { createRouter, createWebHistory } from 'vue-router'
import LoginClient from '../views/Login/LoginClient.vue'
import NewLogin from '../views/Login/NewLogin.vue'
import Home from '../views/Home/HomeView.vue'
import ForgotPassword from '../views/Login/ForgotPassword.vue'
import ManageClient from '../views/Admin/ManageClient.vue'
// import { ref } from 'vue'

// const check= ref(localStorage.getItem('id'))
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
      meta: {
        requiresAuth:true
      }       
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth:true
      }
           
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isLoggedIn()) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

function isLoggedIn (){
  
  if(localStorage.getItem('id')!='false')
  {
    return true
  }else{
    return false
  }
  
  //console.log("aaa");
}

export default router
