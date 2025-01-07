export default [
  {
    path: "/freelancer/board",
    name: "FreelancerBoard",
    meta: { publicPage: true },
    component: () => import("../FreelancerBoard.vue"),
  },
  {
    path: "/freelancer/post",
    name: "FreelancerPost",
    meta: { publicPage: true },
    component: () => import("../FreelancePost.vue"),
  },
  {
    path: "/freelancer/detail/:id",
    name: "FreelancerDetail",
    meta: { publicPage: true },
    component: () => import("../FreelancerDetail.vue"),
  },
  {
    path: "/freelancer/sign-up",
    name: "FreelancerSignUp",
    meta: { publicPage: true },
    component: () => import("../FreelancerSignUp.vue"),
  },
  {
    path: "/freelancer/detail/profile/:id",
    name: "FreelancerProfileId",
    meta: { publicPage: true },
    component: () => import("../FreelancerProfileId.vue"),
  },
];
