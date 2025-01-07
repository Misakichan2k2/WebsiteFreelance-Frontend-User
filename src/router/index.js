import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/home/HomePage.vue";
import RoutesAuth from "@/views/auth/services/routes";
import RoutesPost from "@/views/Job/services/routes";
import RoutesProfile from "@/views/Profile/services/routes";
import RoutesFreelancer from "@/views/Freelancer/services/routes";
import RoutesPayment from "@/views/Payment/services/routes";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  ...RoutesAuth,
  ...RoutesPost,
  ...RoutesFreelancer,
  ...RoutesProfile,
  ...RoutesPayment,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
