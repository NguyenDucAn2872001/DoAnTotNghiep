import { createRouter, createWebHistory } from 'vue-router'
import LoginClient from '../views/Login/LoginClient.vue'
import NewLogin from '../views/Login/NewLogin.vue'
import Home from '../views/Home/HomeView.vue'
import ForgotPassword from '../views/Login/ForgotPassword.vue'
import ManageClient from '../views/Admin/ManageClient.vue'
import ContributionStatistics from '../views/Admin/ContributionStatistics.vue'
import ManageDocument from '../views/Admin/ManageDocument.vue'
import AccountStatistics from '../views/Admin/AccountStatistics.vue'
import EditDocument from '../views/Home/EditDocument.vue'
import TestConnectSocketIo from '../views/Home/TestConnectSocketIo.vue'
import NewEdit from '../views/Home/NewEdit.vue'
import NewEditOneUser from '../views/Home/NewEditOneUser.vue'
import EditDocumentUser from '../views/Home/EditDocumentUser.vue'
import DocumentApproval from '../views/Home/DocumentApproval.vue'
import Community from '../views/Client/Community.vue'

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
      path: '/ManageClient/ContributionStatistics',
      name: 'ContributionStatistics',
      component: ContributionStatistics,    
      meta: {
        requiresAuth:true
      }       
    },
    {
      path: '/ManageClient/ManageDocument',
      name: 'ManageDocument',
      component: ManageDocument,    
      meta: {
        requiresAuth:true
      }       
    },
    {
      path: '/ManageClient/AccountStatistics',
      name: 'AccountStatistics',
      component: AccountStatistics,    
      meta: {
        requiresAuth:true
      }       
    },
    {
      path: '/Home/:id',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth:true
      }
           
    },
    {
      path: '/Home/NewEdit/:id',
      name: 'NewEdit',
      component: NewEdit,
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '/Home/NewEditOneUser/:id',
      name: 'NewEditOneUser',
      component: NewEditOneUser,
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '/Home/EditDocumentUser/:id',
      name: 'EditDocumentUser',
      component: EditDocumentUser,
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '/Home/DocumentApproval/:id',
      name: 'DocumentApproval',
      component: DocumentApproval,
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '/Home/Community/:id',
      name: 'Community',
      component: Community,
      meta: {
        requiresAuth:true
      }
    },
    {
      path: '/Home/EditDocument',
      name: 'EditDocument',
      component: EditDocument,
      meta: {
        requiresAuth:true
      }
           
    },
    {
      path: '/TestConnectSocketIo',
      name: 'TestConnectSocketIo',
      component: TestConnectSocketIo
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
