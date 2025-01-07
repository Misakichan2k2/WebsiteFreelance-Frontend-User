export default [
  {
    path: "/profile",
    name: "Profile",
    meta: { publicPage: true },
    component: () => import("../Profile.vue"),
  },
  {
    path: "/freelancer-profile",
    name: "FreelancerProfile",
    meta: { publicPage: true },
    component: () => import("../FreelancerProfile.vue"),
  },
];
