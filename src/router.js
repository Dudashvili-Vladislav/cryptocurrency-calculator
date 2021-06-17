import { createRouter, createWebHistory } from 'vue-router'
import store from './vuex/store'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Secure from './components/Secure.vue'
import Register from './views/Register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/secure',
      name: 'secure',
      component: Secure,
      meta: { 
        requiresAuth: true
      }
    }
  ]
}) 

router.beforeEach((to, from, next) => {
  console.log('user', store.user)
  // если залогинен => redirect next()
  // если не залогинен => redirect на стринацу логина
  console.log('to', to)
  if (to.meta.requiresAuth) {
    if (!store.user) {
      next({ path: '/login' });
    } else {
      next()
    }
  } else {
    next()
  }
  
})

export default router