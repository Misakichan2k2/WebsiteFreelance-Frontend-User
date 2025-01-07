export default [
  {
    path: "/jobs/post",
    name: "JobPost",
    meta: { publicPage: true },
    component: () => import("../JobPost.vue"),
  },
  {
    path: "/jobs/board",
    name: "JobBoard",
    meta: { publicPage: true },
    component: () => import("../JobBoard.vue"),
  },
  {
    path: "/jobs/detail/:id",
    name: "JobDetail",
    meta: { publicPage: true },
    component: () => import("../JobDetail.vue"),
  },
  {
    path: "/jobs/user-guide",
    name: "UserGuide",
    meta: { publicPage: true },
    component: () => import("../UserGuide.vue"),
  },
];
