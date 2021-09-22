import { createRouter, createWebHistory } from "vue-router";
import store from "./vuex/store";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import SiteAdmin from "./views/SiteAdmin.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        auth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/siteadmin",
      name: "siteadmin",
      component: SiteAdmin,
    },
  ],
});

function getCurrentUser() {
  const localUserString = window.localStorage.getItem("user") || null;
/*   const localUserEmail = window.localStorage.getItem("email") || null;  */
  return JSON.parse(localUserString);
}
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.auth;
  console.log("window.localStorage", window.localStorage);
  console.log("window.localStorage", window.localStorage.user);
  console.log("requiresAuth", requiresAuth);
  
/*    if (to.path === "/siteadmin" && localUserEmail === "admin@adm.com") 
    next();  */
   if (requiresAuth && getCurrentUser()) {
    next();
  } else if (requiresAuth && !getCurrentUser()) {
    next("/login?message=login");
  } else {
    next();
  }
});

/*  router.beforeEach((to, from, next) => {
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
  
})  */

export default router;
