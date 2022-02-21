import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/addPartner",
    name: "new-Partner",
    component: () => import("../views/addNewPartner.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/partners",
    name: "partners-list",
    component: () => import("../views/allPartners.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/addUser",
    name: "new-User",
    component: () => import("../views/addNewUser.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users",
    name: "users-list",
    component: () => import("../views/allUsers.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/forgot",
    name: "forgot-password",
    component: () => import("../views/forgot.vue")
  },
  {
    path: "/changePass",
    name: "change-pass",
    component: () => import("../views/changePass.vue"),
  },
  {
    path:'/activate',
    name:"activate-account",
    component: () => import("../views/changePass.vue"),
  }
  // {
  //   path: "/register",
  //   name: "register",
  //   component: () => import("../views/register.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
