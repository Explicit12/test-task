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
  ],
});

export default router;
