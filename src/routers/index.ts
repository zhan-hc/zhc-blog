import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/home/index.vue")
  },
  {
    path: "/nav",
    name: "Nav",
    component: () => import("@/pages/home/nav.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
