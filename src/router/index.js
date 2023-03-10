import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: () => ({ name: "home", params: { page: 1 } }),
    },
    {
      path: "/:page",
      name: "home",
      component: HomeView,
    },
    {
      path: "/map",
      name: "map",
      component: () => import("@/views/MapView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
