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
      meta: {
        admin: true,
      },
    },
  ],
});

function isLoggedIn() {
  const localUserString = window.localStorage.getItem("user") || null;
/*   const localUserEmail = window.localStorage.getItem("email") || null;  */
  return !!JSON.parse(localUserString);
}


router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.auth;
  const requiresAdmin = to.meta.auth;
  const isAdmin = store.state.auth.admin
  console.log('isAdmin', isAdmin)
  console.log("window.localStorage", window.localStorage);
  console.log("window.localStorage", window.localStorage.user);
  console.log("requiresAuth", requiresAuth);
  
/*    if (to.path === "/siteadmin" && localUserEmail === "admin@adm.com") 
    next();  */
  requiresAdmin && !isAdmin => next({name: 'home'})

  if (requiresAuth && isLoggedIn()) {
    next();
  } else if (requiresAuth && !isLoggedIn()) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
