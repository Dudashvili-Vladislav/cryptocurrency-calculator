import { createRouter, createWebHistory } from 'vue-router'
import vRecommended from "./components/v-recommended";
import vCustomQA from './components/v-customQA';
import vCustomPro from './components/v-customPro';


import Vue from 'vue'
import store from './vuex/store'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './components/Login.vue'
import Secure from './components/Secure.vue'
import Register from './components/Register.vue'






  export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/recommended', component: vRecommended, alias: '/' },
        {path: '/CustomPro', component: vCustomPro },
        {path: '/CustomQA', component: vCustomQA },
        {
            path: '/',
            name: 'home',
            component: Home
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
          },
          {
            path: '/about',
            name: 'about',
            component: About
          }
    ]
}) 