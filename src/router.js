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
  return !!JSON.parse(localUserString);
}

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.auth;
  const requiresAdmin = to.meta.admin;
  const isAdmin = window.localStorage.getItem("admin")
  console.log("isAdmin", isAdmin);
  console.log("window.localStorage", window.localStorage);
  console.log("window.localStorage", window.localStorage.user);
  console.log("requiresAuth", requiresAuth);
  console.log("requiresAdmin", requiresAdmin);


  if (requiresAuth && isLoggedIn()) {
    next();
  } else if (requiresAdmin && !isAdmin) {
    next({ name: "home" });
  } 
  else if (requiresAuth && requiresAdmin) {
    next({ name: "siteadmin" });
  }
  else if (requiresAuth && !isLoggedIn()) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
