import { createRouter, createWebHistory } from "vue-router";

import RoutesAuth from "@/views/auth/services/routes";

const routes = [
  {
    path: "/",
    name: "App",
    component: App,
    meta: {},
    redirect: {
      name: "Home",
    },
    children: [...RoutesHome, ...RoutesAuth],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
